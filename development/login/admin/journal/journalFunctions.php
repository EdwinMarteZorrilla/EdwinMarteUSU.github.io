<?php

require_once('/var/www/html/NHR-Core/include/config.php');
require_once('/var/www/html/NHR-Core/development/login/functions.php');

// connect to database
$db = mysqli_connect('127.0.0.1:3306', 'root', DB_PASS, 'journal');
$errors   = array();

function loadJournalData() {
    global $db;
    $sql = "SELECT journal_entry_date, username, email, event_date, test, activity, detail, id
            FROM entries";
    $result = mysqli_query($db,$sql);
    return $result->fetch_all();
}

if (isset($_POST['add_entry_btn'])) {
	addEntry();
}

function addEntry() {
    global $db;
	$username =  $_SESSION['user']['username'];
    if (!$username) {
        $username = "Unknown user";
    }
	$email =  $_SESSION['user']['email'];
    if (!$username && !$email) {
        $email = "Unknown user's email";
    } elseif (!$email) {
        $email = $username;
    }
    $journal_entry_date = date("Y/m/d");
    $event_date = e1($_POST['event_date']);
	$test  =  e1($_POST['test']);
	$activity  =  e1($_POST['activity']);
	$detail  =  e1($_POST['detail']);

	if (empty($username)) {
		array_push($errors, "Username is required");
	}
	if (empty($email)) {
		array_push($errors, "Email is required");
	}
    if (empty($event_date)) {
        array_push($errors, "Event date is required");
    }
    if (empty($journal_entry_date)) {
        array_push($errors, "An error occured with today's date");
    }
    if (empty($test)) {
        array_push($errors, "An valid test is required");
    }
    if (empty($activity)) {
        array_push($errors, "An activity is required. Ex: Test Scheduled");
    }
	if (count($errors) == 0) {
        $sql = "INSERT INTO entries (username, email, journal_entry_date, event_date, test, activity, detail) VALUES ('$username', '$email', '$journal_entry_date', '$event_date', '$test', '$activity', '$detail');";
        $result = mysqli_query($db, $sql);
        header('location: journal.php');
    }
}

function addEntryEvent($event_date, $test, $activity, $detail) {
    global $db;
	$username =  $_SESSION['user']['username'];
    if (!$username) {
        $username = "Unknown user";
    }
	$email =  $_SESSION['user']['email'];
    if (!$username && !$email) {
        $email = "Unknown user's email";
    } elseif (!$email) {
        $email = $username;
    }
    $journal_entry_date = date("Y/m/d");

	if (empty($username)) {
		array_push($errors, "Username is required");
	}
	if (empty($email)) {
		array_push($errors, "Email is required");
	}
    if (empty($event_date)) {
        array_push($errors, "Event date is required");
    }
    if (empty($journal_entry_date)) {
        array_push($errors, "An error occured with today's date");
    }
    if (empty($test)) {
        array_push($errors, "An valid test is required");
    }
    if (empty($activity)) {
        array_push($errors, "An activity is required. Ex: Test Scheduled");
    }
	if (count($errors) == 0) {
        $sql = "INSERT INTO entries (username, email, journal_entry_date, event_date, test, activity, detail) VALUES ('$username', '$email', '$journal_entry_date', '$event_date', '$test', '$activity', '$detail');";
        $result = mysqli_query($db, $sql);
    }
}

if (isset($_POST['delete_entry_btn'])) {
    $values = $_POST['delete_entry_btn'];
    $id = key($values);
	deleteEntry($id);
}

function deleteEntry($id) {
    global $db;
    $sql = "DELETE FROM entries
            WHERE id = $id";
    $result = mysqli_query($db, $sql);
    header('location: journal.php');
}

// escape string
function e1($val){
	global $db;
	return mysqli_real_escape_string($db, trim($val));
}


?>
