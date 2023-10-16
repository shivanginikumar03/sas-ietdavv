-- INSERT QUERIES 
INSERT INTO students VALUES('20bit056@ietdavv.edu.in', 'Shivang Mishra', 'DE20415', '20I6056');
INSERT INTO students VALUES('20bit054@ietdavv.edu.in', 'SARVADA GOANTIYA', 'DE20536', '20I6054');



INSERT INTO teacher VALUES('shivangmishra0824@gmail.com', 'Shivang Mishra');

INSERT INTO teaches VALUES('shivangmishra0824@gmail.com', 'ITR6C2');

INSERT INTO attendance VALUES('ITR6C2','20I6056','Present');

INSERT INTO subject VALUES('Numerical & Optimization Techniques','AIR4C1','PC');
INSERT INTO subject VALUES('Wireless Protocols and Mobile Networks','ITR6C1','PC');
INSERT INTO subject VALUES('Design and Analysis of Algorithms','ITR6C2','PC');
INSERT INTO subject VALUES('Network and Information Security','ITR6C3','PC');
INSERT INTO subject VALUES('Software Testing and Quality Assurance','ITR6E1','PC');
INSERT INTO subject VALUES('Compiler Design','ITR6G4','GE');
INSERT INTO subject VALUES('Mobile Technology Lab','ITR6L4');
INSERT INTO subject VALUES('Entrepreneurship Development & IPR','SIR6S6');

INSERT INTO class VALUES('20I6054', 6, 'IT', 'A');
INSERT INTO class VALUES('20I6056', 6, 'IT', 'A');

INSERT INTO takes VALUES(6, 'IT', 'ITR6C1');
INSERT INTO takes VALUES(6, 'IT', 'ITR6C2');
INSERT INTO takes VALUES(6, 'IT', 'ITR6C3');
INSERT INTO takes VALUES(6, 'IT', 'ITR6E1');
INSERT INTO takes VALUES(6, 'IT', 'ITR6G4');
INSERT INTO takes VALUES(6, 'IT', 'SIR6S6');

INSERT INTO takes_class VALUES('shivangmishra0824@gmail.com', 6, 'IT', 'A');