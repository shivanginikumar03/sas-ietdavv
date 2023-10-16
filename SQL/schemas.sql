-- CREATE QUERIES 
CREATE TABLE user_auth (
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE students (
    email VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    enrollment_number VARCHAR(10) NOT NULL,
    roll_number VARCHAR(10) NOT NULL
);

CREATE TABLE teacher (
    email VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE teaches (
    email VARCHAR(50) NOT NULL,
    subject_code VARCHAR(10) NOT NULL
);

CREATE TABLE takes_class (
    email VARCHAR(50) NOT NULL,
    semester_number INT NOT NULL,
    branch VARCHAR(50) NOT NULL,
    section VARCHAR(50)
);

CREATE TABLE class (
    roll_number VARCHAR(50) NOT NULL,
    semester_number INT NOT NULL,
    branch VARCHAR(50) NOT NULL,
    section VARCHAR(50)
);

CREATE TABLE takes (
    semester_number INT NOT NULL,
    branch VARCHAR(50) NOT NULL,
    subject_code VARCHAR(10) NOT NULL
);

CREATE TABLE subject (
    subject_name VARCHAR(50) NOT NULL,
    subject_code VARCHAR(10) NOT NULL,
    subject_type VARCHAR(10)
);

CREATE TABLE attendance (
    subject_code VARCHAR(10) NOT NULL,
    roll_number VARCHAR(10) NOT NULL,
    status CHAR(10) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);