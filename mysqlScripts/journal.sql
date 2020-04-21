-- Created by: Eduardo Cordova
-- Date: 2020-April-6

-- If you have not created the login database uncomment the next line
CREATE DATABASE journal;
USE journal;
CREATE TABLE entries (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    journal_entry_date TIMESTAMP NOT NULL,
    test VARCHAR(100) NOT NULL,
    activity VARCHAR(100) NOT NULL,
    detail VARCHAR(21844),
	PRIMARY KEY (id)
);
