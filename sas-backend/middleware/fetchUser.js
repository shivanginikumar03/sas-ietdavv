require('dotenv').config()
const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    //get token from jwt and add id to req object
    const token = req.header('authToken')
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.email = data.user.email
        next()
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchUser;