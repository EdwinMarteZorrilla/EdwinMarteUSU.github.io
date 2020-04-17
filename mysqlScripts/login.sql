-- Created by: Eduardo Cordova
-- Date: 2020-March-17

-- If you have not created the login database uncomment the next line
-- CREATE DATABASE login;
USE login;
CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(100) NOT NULL,
	email VARCHAR(100),
	user_type VARCHAR(100),
	password VARCHAR(100),
	PRIMARY KEY (id)
);
