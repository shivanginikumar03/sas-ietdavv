-- Attendance data fetch 
SELECT attendance.date, attendance.subject_code, subject.subject_name, teacher.name, attendance.status
FROM attendance
INNER JOIN students ON students.roll_number = attendance.roll_number 
INNER JOIN teaches ON attendance.subject_code = teaches.subject_code 
INNER JOIN subject ON attendance.subject_code = subject.subject_code 
INNER JOIN teacher ON teaches.email = teacher.email
WHERE students.email = '20bit056@ietdavv.edu.in';

-- Subjects Fetch 
SELECT subject.subject_name, subject.subject_code, teacher.name
FROM subject
INNER JOIN teaches ON teaches.subject_code = subject.subject_code
INNER JOIN teacher ON teacher.email = teaches.email
WHERE subject.subject_code IN (
    SELECT subject_code
    FROM takes
    INNER JOIN class ON (class.semester_number = takes.semester_number) AND (class.branch = takes.branch)
    INNER JOIN students ON class.roll_number = students.roll_number
    WHERE students.email = '20bit013@ietdavv.edu.in'
)
ORDER BY subject_code;

-- Subjects Attendance Percentage:

    -- Total classes in each subject
SELECT subject_code, COUNT(DISTINCT(date)) AS classes 
FROM attendance
WHERE attendance.subject_code IN (
    SELECT subject_code
    FROM takes
    INNER JOIN class ON (class.semester_number = takes.semester_number) AND (class.branch = takes.branch)
    INNER JOIN students ON class.roll_number = students.roll_number
    WHERE students.email = '20bit056@ietdavv.edu.in'
)
GROUP BY subject_code ORDER BY subject_code;

    -- Class Attended in each subject 
SELECT subject_code, COUNT(*) AS class_attended FROM attendance
INNER JOIN students on students.roll_number = attendance.roll_number
WHERE students.email = '20bit056@ietdavv.edu.in' AND attendance.status = 'Present'
GROUP BY subject_code ORDER BY subject_code;

-- Dates and Status of Attendance 
SELECT date, status, subject_code FROM attendance
INNER JOIN students ON students.roll_number = attendance.roll_number 
WHERE students.email = '20bit056@ietdavv.edu.in'
ORDER BY date;

-- Teaches Details
SELECT semester_number, branch, section, takes.subject_code 
FROM takes_class 
INNER JOIN class ON class.
WHERE email = 'teacher@gmail.com';

-- Student Details Shown To Teacher
SELECT students.roll_number, students.name 
FROM students
INNER JOIN class ON students.roll_number = class.roll_number
WHERE class.semester_number = 4 
AND class.branch = 'IT' 
AND class.section = 'A'
ORDER BY students.roll_number;

-- Teacher Teaches Class Subject:
SELECT subject_code, subject_name FROM subject 
WHERE subject_code = (
    SELECT subject_code FROM teaches WHERE email = 'teacher@gmail.com'
    INTERSECT
    SELECT subject_code FROM takes WHERE branch = 'IT' AND semester_number = 4
);

-- Attendance On Date 
SELECT students.name, attendance.roll_number, attendance.status
FROM attendance INNER JOIN students ON students.roll_number = attendance.roll_number
WHERE subject_code = 'ITR4C2' AND attendance.date = '2022-04-02'
ORDER BY attendance.roll_number;

-- Class Strength On Date 
SELECT date, count(*) FROM attendance WHERE subject_code = 'AIR4C1' 
AND status = 'Present' GROUP BY date;

-- Getting user password
SELECT password FROM student_authentications WHERE email='20bit056@ietdavv.edu.in';

-- Update user password
UPDATE student_authentications SET 
password='$2a$10$exlf2heGUTNZdRrkqN1BOOkO0OmTNtFrfxEf7pjxZNe62NYLqgr2e' 
WHERE email='20bit056@ietdavv.edu.in';
