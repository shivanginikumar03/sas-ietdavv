-- CREATE QUERIES 
CREATE TABLE user_auth (
    email VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE students (
    email VARCHAR(50) FOREIGN KEY REFERENCES user_auth(email) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    enrollment_number VARCHAR(10) PRIMARY KEY,
    roll_number VARCHAR(10) NOT NULL
);

CREATE TABLE teacher (
    email VARCHAR(50) FOREIGN KEY REFERENCES user_auth(email) ON DELETE CASCADE,
    employee_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE teaches (
    email VARCHAR(50) FOREIGN KEY REFERENCES teacher(email) ON DELETE CASCADE,
    subject_code VARCHAR(10) FOREIGN KEY REFERENCES subject(subject_code) ON DELETE CASCADE
);

CREATE TABLE takes_class (
    email VARCHAR(50) FOREIGN KEY REFERENCES teacher(email) ON DELETE CASCADE,
    semester_number INT NOT NULL,
    branch VARCHAR(50) NOT NULL,
    section VARCHAR(50)
);

CREATE TABLE class (
    roll_number VARCHAR(50) FOREIGN KEY REFERENCES students(roll_number) ON DELETE CASCADE,
    semester_number INT NOT NULL,
    branch VARCHAR(50) NOT NULL,
    section VARCHAR(50)
);

CREATE TABLE takes (
    semester_number INT NOT NULL,
    branch VARCHAR(50) NOT NULL,
    subject_code VARCHAR(10) FOREIGN KEY REFERENCES subject(subject_code) ON DELETE CASCADE
);

CREATE TABLE subject (
    subject_name VARCHAR(50) NOT NULL,
    subject_code VARCHAR(10) NOT NULL,
    subject_type VARCHAR(10)
);

CREATE TABLE attendance (
    subject_code VARCHAR(10) FOREIGN KEY REFERENCES subject(subject_code) ON DELETE CASCADE,
    roll_number VARCHAR(10) FOREIGN KEY REFERENCES students(roll_number) ON DELETE CASCADE,
    status CHAR(10) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);