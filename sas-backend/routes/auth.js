const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser');
require('dotenv').config();
const db = require('../db');
const sendVerificationMail = require('../utlils/sendVerificationMail');

//Verify email of user
router.get('/verify/:token', (req, res) => {
  const { token } = req.params;

  // Verifing the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res
        .status(400)
        .send(
          'Email verification failed, possibly the link is invalid or expired'
        );
    } else {
      const userData = decoded.data;
      db.query(
        `INSERT INTO user_auth VALUES('${userData.email}','${userData.secPassword}')`
      );
      res.status(200).send('Email verified successfully. You can now login!');
    }
  });
});

//Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  '/createuser',
  [
    body('email', 'Enter a valid email').isEmail().exists(),
    body('password', 'Password must be atleast 5 characters').isLength({
      min: 5,
    }).exists(),
    body('type', 'Type Not Found').exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, email } = req.body;

    // Check whether the user with this email exists already
    try {
      let user = await db.query(
        `SELECT * FROM user_auth WHERE email= '${email}'`
      );

      let clg_authenticated =
        type === 'student'
          ? await db.query(`SELECT * FROM students WHERE email= '${email}'`)
          : await db.query(`SELECT * FROM teacher WHERE email= '${email}'`);

      if (user.rows.length > 0) {
        res.status(400).send('Sorry a user with this email already exists!');
      }

      if (clg_authenticated.rows.length === 0) {
        res.status(400).send('Sorry your email is not registered by collage!');
      }

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      const token = jwt.sign(
        {
          data: { email: email, type: type, secPassword: secPassword },
        },
        process.env.JWT_SECRET,
        { expiresIn: '10m' }
      );

      const emailSent = sendVerificationMail(email, token);

      emailSent
        ? res
          .status(200)
          .send(
            'Verification Email Sent! Please verify your account to continue.'
          )
        : res
          .status(400)
          .send(
            'Failed to send verification email. Please Provide a valid email address!'
          );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Some Error occured');
    }
  }
);

//Route 2: Login User using: POST "/api/auth/login". No login required
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
    body('type', 'Type Not Found').exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await db.query(
        `SELECT * FROM user_auth WHERE email='${email}'`
      );

      if (user.rows.length === 0) {
        return res.status(400).json({ error: 'Incorrect Email Or Password' });
      }

      const passwordComp = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (!passwordComp) {
        return res.status(400).json({ error: 'Incorrect Email Or Password' });
      }

      const data = {
        user: {
          email: email,
        },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.status(200).json({ authToken });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

//Route 3: Get User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchUser, async (req, res) => {
  try {
    userEmail = req.email;
    const user =
      req.body.type === 'student'
        ? await db.query(`SELECT * FROM students WHERE email='${userEmail}'`)
        : await db.query(`SELECT * FROM teacher WHERE email='${userEmail}'`);
    res.status(200).send(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('User Not Found!');
  }
});

//Route: Update Password: POST "/api/auth/changepassword". login required
router.post(
  '/changepassword',
  [
    body('newPassword', 'Password must be atleast 5 characters').isLength({
      min: 5,
    }),
    body('password', 'Password must be atleast 5 characters').exists(),
    body('type', 'Type Not Found').exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, newPassword, password, email } = req.body;

    // Check whether the user with this email exists already
    try {
      const oldPassword = await db.query(`
      SELECT password FROM user_auth 
      WHERE email='${email}';
    `);

      const comp = await bcrypt.compare(password, oldPassword.rows[0].password);

      if (comp) {
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(newPassword, salt);

        await db.query(`
        UPDATE user_auth SET 
        password='${secPassword}' 
        WHERE email='${email}';
      `);

        res.status(200).send('Updated Password');
      } else {
        res.status(401).send('Could Not Update Password');
      }
    } catch (error) {
      res.status(500).send('Some Error occured');
    }
  }
);

module.exports = router;
