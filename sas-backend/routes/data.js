const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser');
require('dotenv').config();
const db = require('../db');

//Route 1: Get User Attendance Details using: POST "/api/data/getattendance". Login required
router.post('/getattendance', fetchUser, async (req, res) => {
  try {
    userEmail = req.email;
    const query = `
        SELECT a.date, a.subject_code, sub.subject_name, t.name, a.status
        FROM attendance a, teacher t, students s, subject sub, teaches te
        WHERE s.roll_number = a.roll_number 
        AND a.subject_code = te.subject_code 
        AND a.subject_code = sub.subject_code 
        AND te.email = t.email
        AND s.email = '${userEmail}'
        ORDER BY a.date DESC;
    `;
    const attendance = await db.query(query);
    res.send(attendance.rows);
  } catch (error) {
    res.status(500).send('User Not Found!');
  }
});

//Route 2: Feed Attendance Details using: POST "/api/auth/feedattendance". Login required
router.post('/feedattendance', fetchUser, async (req, res) => {
  try {
    userEmail = req.email;
    const ifExist = `SELECT * FROM attendance WHERE date = '${req.body.list[0].date}' AND subject_code = '${req.body.list[0].subject_code}';`;
    const count = await db.query(ifExist);

    if (count.rowCount === 0) {
      req.body.list.forEach((value) => {
        const query = `INSERT INTO attendance VALUES('${value.subject_code}','${value.roll_number}','${value.status}', '${value.date}');`;
        db.query(query);
      });
      res.status(200).send('Ok');
    } else {
      res.status(400).send('Attendance Already Exist');
    }
  } catch (error) {
    res.status(400).send('User Not Found!');
  }
});

//Route 3: Get User Subject Details using: POST "/api/data/getsubjects". Login required
router.post('/getsubjects', fetchUser, async (req, res) => {
  try {
    userEmail = req.email;
    const queryForSubjectDetails = `
    SELECT subject.subject_name, subject.subject_code, teacher.name
    FROM subject
    INNER JOIN teaches ON teaches.subject_code = subject.subject_code
    INNER JOIN teacher ON teacher.email = teaches.email
    WHERE subject.subject_code IN (
        SELECT subject_code
        FROM takes
        INNER JOIN class ON (class.semester_number = takes.semester_number) AND (class.branch = takes.branch)
        INNER JOIN students ON class.roll_number = students.roll_number
        WHERE students.email = '${userEmail}'
    )
    ORDER BY subject_code;
    `;
    const queryForTotalClassesInEachSubject = `
    SELECT subject_code, COUNT(DISTINCT(date)) AS classes 
    FROM attendance
    WHERE attendance.subject_code IN (
        SELECT subject_code
        FROM takes
        INNER JOIN class ON (class.semester_number = takes.semester_number) AND (class.branch = takes.branch)
        INNER JOIN students ON class.roll_number = students.roll_number
        WHERE students.email = '${userEmail}'
    )
    GROUP BY subject_code ORDER BY subject_code;
    `;
    const queryForClassAttendedInEachSubject = `
    SELECT subject_code, COUNT(*) AS class_attended FROM attendance
    INNER JOIN students on students.roll_number = attendance.roll_number
    WHERE students.email = '${userEmail}' AND attendance.status = 'Present'
    GROUP BY subject_code ORDER BY subject_code;
    `;
    const queryForDate = `
    SELECT date, status, subject_code FROM attendance
    INNER JOIN students ON students.roll_number = attendance.roll_number 
    WHERE students.email = '${userEmail}'
    ORDER BY date;
    `;
    const subjectDetails = await db.query(queryForSubjectDetails);
    const totalClassInEachSubject = await db.query(
      queryForTotalClassesInEachSubject
    );
    const classAttendedInEachSubject = await db.query(
      queryForClassAttendedInEachSubject
    );
    const calenderData = await db.query(queryForDate);
    const percentageInEachSubject = [];

    for (let index = 0; index < totalClassInEachSubject.rows.length; index++) {
      const percentage = classAttendedInEachSubject.rows[index]
        ? (classAttendedInEachSubject.rows[index].class_attended /
            totalClassInEachSubject.rows[index].classes) *
          100
        : 0;
      percentageInEachSubject.push(percentage);
    }

    res.send({
      subjectDetails: subjectDetails.rows,
      percentage: percentageInEachSubject,
      calanderData: calenderData.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('User Not Found!');
  }
});

//Route 4: Get teachers tought clases: POST "/api/data/getteaches". Login required
router.post('/getteaches', fetchUser, async (req, res) => {
  try {
    userEmail = req.email;
    const query = `SELECT semester_number, branch, section FROM takes_class WHERE email = '${userEmail}';`;
    const teaches = await db.query(query);
    res.send(teaches.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('User Not Found!');
  }
});

//Route 5: Get student of a class teacher teaches: POST "/api/data/getclassstudents". Login required
router.post('/getclassstudents', fetchUser, async (req, res) => {
  try {
    userEmail = req.email;
    const query = `
    SELECT students.roll_number, students.name 
    FROM students
    INNER JOIN class ON students.roll_number = class.roll_number
    WHERE class.semester_number = ${req.body.semester_number} 
    AND class.branch = '${req.body.branch}' 
    AND class.section = '${req.body.section}'
    ORDER BY students.roll_number;
    `;
    const querySubject = `
      SELECT subject_code, subject_name FROM subject 
      WHERE subject_code = (
          SELECT subject_code FROM teaches WHERE email = '${userEmail}'
          INTERSECT
          SELECT subject_code FROM takes WHERE branch = 'IT' AND semester_number = '${req.body.semester_number}'
      );
    `;

    const students = await db.query(query);
    const teachesSubject = await db.query(querySubject);

    res.send({ students: students.rows, subject: teachesSubject.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Class Not Found!');
  }
});

//Route 6: Get User Attendance Details on a particular date using: POST "/api/data/getattendanceondate". Login required
router.post('/getattendanceondate', fetchUser, async (req, res) => {
  try {
    const query = `
    SELECT students.name, attendance.roll_number, attendance.status
    FROM attendance INNER JOIN students ON students.roll_number = attendance.roll_number
    INNER JOIN class ON students.roll_number = class.roll_number
    WHERE subject_code = '${req.body.subject_code}' AND attendance.date = '${req.body.date}'
    AND class.branch = '${req.body.branch}' AND class.section = '${req.body.section}'
    ORDER BY attendance.roll_number;
    `;

    const strength = `
    SELECT date, count(*) FROM attendance 
    INNER JOIN class ON attendance.roll_number = class.roll_number
    WHERE subject_code = '${req.body.subject_code}'
    AND class.branch = '${req.body.branch}' AND class.section = '${req.body.section}'
    AND status = 'Present' GROUP BY date;
    `;
    const attendanceOnDate = await db.query(query);
    const strengthOnDate = await db.query(strength);
    res.send({
      attendanceOnDate: attendanceOnDate.rows,
      strengthOnDate: strengthOnDate.rows,
    });
  } catch (error) {
    res.status(500).send('User Not Found!');
  }
});

module.exports = router;
