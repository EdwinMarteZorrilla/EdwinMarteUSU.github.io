--Created by: Rodrigo Calvo and Eduardo Cordova
--Date: 2020-March-10

--If you have not created the exams database uncomment the next line
--CREATE DATABASE exams;
USE exams;
CREATE TABLE exam1 (
	question_id INT NOT NULL AUTO_INCREMENT,
	question VARCHAR(21844) NOT NULL,
	image VARCHAR(1000),
	time INT,
	PRIMARY KEY (question_id)
);

CREATE TABLE answers1 (
	answer_id INT NOT NULL AUTO_INCREMENT,
	question_id INT NOT NULL,
	answer VARCHAR(21844) NOT NULL,
	image VARCHAR(1000),
	PRIMARY KEY (answer_id),
	FOREIN KEY (question_id)
		REFERENCES exam1 (question_id)
		ON DELETE CASCADE
);

INSERT INTO exam1 (
	question_id,
	question,
	image,
	time
) VALUES (
	0,
	"This is a test",
	"Test.jpg",
	60
);

INSERT INTO answers1 (
	answer_id,
	question_id,
	answer,
	image,
) VALUES (
	0,
	0,
	"This is a test answer",
	"TestAns.jpg",
);
