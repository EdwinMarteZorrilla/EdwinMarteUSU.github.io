CREATE SCHEMA exams;
use exams;
CREATE TABLE exam1 ( question_id INT NOT NULL AUTO_INCREMENT, question VARCHAR(21844) NOT NULL, image VARCHAR(1000), answer VARCHAR(5) NOT NULL, PRIMARY KEY (question_id));
INSERT INTO exam1 (question, answer) VALUES ('According to Hibbelers convention, all zero force members are two force members.','A');
INSERT INTO exam1 (question, answer) VALUES ('Using method of sections to analyze compression or tension in a truss member requires you to interpret a force pointing into the cut member as compressive?','A');
INSERT INTO exam1 (question, answer) VALUES ('If we have a joint on a truss experiencing a force from an external load, then we can say one of the members attached to this joint is a zero force member?','B');
INSERT INTO exam1 (question, answer) VALUES ('All frame and machine problems must have at least one _______________?','A');
INSERT INTO exam1 (question, answer) VALUES ('Two properly aligned journal bearings that support a straight shaft with an axis passing through them on a common line of action will _____?','D');
INSERT INTO exam1 (question, answer) VALUES ('Rollers are often used as a support on bridges to ___________________________?','C');
INSERT INTO exam1 (question,image, answer) VALUES ('What is the tensile force in the rope required to keep the rigid body in equilibrium with the indicated loads? ','Q07.png','E');
INSERT INTO exam1 (question,image, answer) VALUES ('The bent rod is supported at A, B, and C by smooth properly aligned journal bearings. The rod is subjected to the force F = 800 N. What is the vertical component of the 800 N force (Fz)? Could you find the other two F components? Could you find the reaction forces at the journal bearings?','Q08.png','B');
INSERT INTO exam1 (question,image, answer) VALUES ('Assume all bearings to be journal bearings. What would be the appropriate FBD to represent this problem? Assume any forces or moments that have 0 as magnitude to not be drawn.','Q09.png','C');
INSERT INTO exam1 (question,image, answer) VALUES ('Using the methods of sections, calculate the force in member DF and select the clower answer below to represent that force.','Q10.png','C');
INSERT INTO exam1 (question,image, answer) VALUES ('Determine the axial load (force in the members) of both members IL and IM. Select the best answer representing these forces from below.','Q11.png','E');
INSERT INTO exam1 (question,image, answer) VALUES ('Assume F = 100 lbs and L = 5 ft. Using method of joints, determine the axial load (force in the member) for member BC.','Q12.png','D');
INSERT INTO exam1 (question,image, answer) VALUES ('What is the force applied to the bolt by the jaw BCA?','Q13.png','A');
INSERT INTO exam1 (question,image, answer) VALUES ('Neglecting the weights of the pulleys and ignoring friction, determine the force T required to support the weight W if it is 500 lbs.','Q14.png','C');
INSERT INTO exam1 (question,image, answer) VALUES ('F = 100 N.  BA = 100 N, CA = 107 N, BC = 30 N, BD = 25 N, and DC = 17 N.  All weights act at the center of the beams length or its center of gravity.  Neglecting pin and support weights, determine the reactionary horizontal support force at B.','Q15.png','D');
CREATE TABLE answersexam1 ( answer_id INT NOT NULL AUTO_INCREMENT, question_id INT NOT NULL, answer VARCHAR(21844) NOT NULL, PRIMARY KEY (answer_id), FOREIGN KEY (question_id) REFERENCES exam1 (question_id) ON DELETE CASCADE);
INSERT INTO answersexam1 (question_id, answer) VALUE (1,'True');
INSERT INTO answersexam1 (question_id, answer) VALUE (1,'False');
INSERT INTO answersexam1 (question_id, answer) VALUE (2,'True');
INSERT INTO answersexam1 (question_id, answer) VALUE (2,'False');
INSERT INTO answersexam1 (question_id, answer) VALUE (3,'True');
INSERT INTO answersexam1 (question_id, answer) VALUE (3,'False');
INSERT INTO answersexam1 (question_id, answer) VALUE (4,'Multi-force member');
INSERT INTO answersexam1 (question_id, answer) VALUE (4,'Three-force member');
INSERT INTO answersexam1 (question_id, answer) VALUE (4,'Two-force member');
INSERT INTO answersexam1 (question_id, answer) VALUE (4,'Zero-force member');
INSERT INTO answersexam1 (question_id, answer) VALUE (5,'Keep the shaft from rotating');
INSERT INTO answersexam1 (question_id, answer) VALUE (5,'Force each other to feel an induced moment');
INSERT INTO answersexam1 (question_id, answer) VALUE (5,'Multiply force magnitudes seen acting along the shaft axis');
INSERT INTO answersexam1 (question_id, answer) VALUE (5,'Not prevent the shaft from sliding through them');
INSERT INTO answersexam1 (question_id, answer) VALUE (6,'Allow the bridge to become an indeterminant problem');
INSERT INTO answersexam1 (question_id, answer) VALUE (6,'Allow the bridge to contract without putting supporting structures in tension');
INSERT INTO answersexam1 (question_id, answer) VALUE (6,'Prevent thermodynamic induced forces from generating with temperature changes');
INSERT INTO answersexam1 (question_id, answer) VALUE (6,'Prevent zero force members from being loaded with a force value greater than zero');
INSERT INTO answersexam1 (question_id, answer) VALUE (7,'950 lbs');
INSERT INTO answersexam1 (question_id, answer) VALUE (7,'875 lbs');
INSERT INTO answersexam1 (question_id, answer) VALUE (7,'648 lbs');
INSERT INTO answersexam1 (question_id, answer) VALUE (7,'1020 lbs');
INSERT INTO answersexam1 (question_id, answer) VALUE (7,'410 lbs');
INSERT INTO answersexam1 (question_id, answer) VALUE (8,'350 N');
INSERT INTO answersexam1 (question_id, answer) VALUE (8,'690 N');
INSERT INTO answersexam1 (question_id, answer) VALUE (8,'450 N');
INSERT INTO answersexam1 (question_id, answer) VALUE (8,'550 N');
INSERT INTO answersexam1 (question_id, answer) VALUE (9,'A');
INSERT INTO answersexam1 (question_id, answer) VALUE (9,'B');
INSERT INTO answersexam1 (question_id, answer) VALUE (9,'C');
INSERT INTO answersexam1 (question_id, answer) VALUE (9,'D');
INSERT INTO answersexam1 (question_id, answer) VALUE (9,'E');
INSERT INTO answersexam1 (question_id, answer) VALUE (10,'2kN (C)');
INSERT INTO answersexam1 (question_id, answer) VALUE (10,'15 kN (C)');
INSERT INTO answersexam1 (question_id, answer) VALUE (10,'16 kN (T)');
INSERT INTO answersexam1 (question_id, answer) VALUE (10,'12 kN (T)');
INSERT INTO answersexam1 (question_id, answer) VALUE (10,' 9 kN (C)');
INSERT INTO answersexam1 (question_id, answer) VALUE (11,'IL = 28kN (C) , IM = 11 kN (T)');
INSERT INTO answersexam1 (question_id, answer) VALUE (11,'IL = 25 kN (T) , IM = 10 kN (C)');
INSERT INTO answersexam1 (question_id, answer) VALUE (11,'IL = 22 kN (T) , IM = 12 kN (T)');
INSERT INTO answersexam1 (question_id, answer) VALUE (11,'IL = 19 kN (T) , IM = 18 kN (C)');
INSERT INTO answersexam1 (question_id, answer) VALUE (11,'IL = 15 kN (C) , IM = 9 kN (C)');
INSERT INTO answersexam1 (question_id, answer) VALUE (12,'212 lbs (T)');
INSERT INTO answersexam1 (question_id, answer) VALUE (12,'360 lbs (C)');
INSERT INTO answersexam1 (question_id, answer) VALUE (12,'410 lbs (T)');
INSERT INTO answersexam1 (question_id, answer) VALUE (12,'390 lbs (C)');
INSERT INTO answersexam1 (question_id, answer) VALUE (12,'450 lbs (C)');
INSERT INTO answersexam1 (question_id, answer) VALUE (13,'1050 N up');
INSERT INTO answersexam1 (question_id, answer) VALUE (13,'1200 N down');
INSERT INTO answersexam1 (question_id, answer) VALUE (13,'1500 N up');
INSERT INTO answersexam1 (question_id, answer) VALUE (13,'800 N down');
INSERT INTO answersexam1 (question_id, answer) VALUE (13,'1750 N up');
INSERT INTO answersexam1 (question_id, answer) VALUE (14,'250 lbs');
INSERT INTO answersexam1 (question_id, answer) VALUE (14,'125 lbs');
INSERT INTO answersexam1 (question_id, answer) VALUE (14,'65 lbs');
INSERT INTO answersexam1 (question_id, answer) VALUE (14,'95 lbs');
INSERT INTO answersexam1 (question_id, answer) VALUE (14,'500 lbs');
INSERT INTO answersexam1 (question_id, answer) VALUE (14,'690 lbs');
INSERT INTO answersexam1 (question_id, answer) VALUE (15,'850 N to left');
INSERT INTO answersexam1 (question_id, answer) VALUE (15,'1250 N to right');
INSERT INTO answersexam1 (question_id, answer) VALUE (15,'590 N to right');
INSERT INTO answersexam1 (question_id, answer) VALUE (15,'540 N to left');
INSERT INTO answersexam1 (question_id, answer) VALUE (15,'420 N to left');
CREATE TABLE linksexam1 (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(200) NOT NULL, link VARCHAR(2000) NOT NULL, PRIMARY KEY (id));
INSERT INTO linksexam1 (name,link) VALUES('Intro Video','https://youtu.be/lDdtbynxyA0');
INSERT INTO linksexam1 (name,link) VALUES('Survey Prompt Link','https://oregon.qualtrics.com/jfe/form/SV_3ITkIqti7gfcHwp');
INSERT INTO linksexam1 (name,link) VALUES('Pre exam Link','https://oregon.qualtrics.com/jfe/form/SV_29uye3Rm6EvZw7r');
INSERT INTO linksexam1 (name,link) VALUES('40 min link','https://oregon.qualtrics.com/jfe/form/SV_5nVtBb53SNq3KvP');
INSERT INTO linksexam1 (name,link) VALUES('At end survey','https://oregon.qualtrics.com/jfe/form/SV_6XccY3rT0uwtRxH');
INSERT INTO linksexam1 (name,link) VALUES('After 20 min','https://oregon.qualtrics.com/jfe/form/SV_0cBWXNgHZ3IbzDf');
CREATE TABLE idsexam1 (id INT NOT NULL AUTO_INCREMENT, study_id VARCHAR(100) NOT NULL, PRIMARY KEY (id));
