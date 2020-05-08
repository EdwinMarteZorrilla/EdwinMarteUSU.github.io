CREATE SCHEMA exam_variables;
USE exam_variables;
CREATE TABLE exam1 (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, value VARCHAR(20000), PRIMARY KEY (id));
INSERT INTO exam1 (name,value) VALUES('Saliva','Yes');
INSERT INTO exam1 (name,value) VALUES('Time between saliva samples (mins)','45');
INSERT INTO exam1 (name,value) VALUES('Intro Title','');
INSERT INTO exam1 (name,value) VALUES('Intro Message','');
INSERT INTO exam1 (name,value) VALUES('Intro Video','');
INSERT INTO exam1 (name,value) VALUES('Main screen message','');
