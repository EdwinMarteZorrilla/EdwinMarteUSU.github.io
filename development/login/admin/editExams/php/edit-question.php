<?php

require_once('../../../../../include/config.php');
require_once('/var/www/html/NHR-Core/development/login/admin/journal/journalFunctions.php');


if(isset($_FILES['file']['tmp_name'])){
  move_uploaded_file($_FILES['file']['tmp_name'],'/var/www/html/NHR-Core/media/' . $_FILES['file']['name']);
}

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
// Updating question
$sql = "UPDATE " .  $_POST['exam'] . " set question ='" . $_POST['question'] . "' WHERE question_id = " . $_POST['id'];
$result = mysqli_query($connect,$sql);

// Updating image
$sql = "UPDATE " .  $_POST['exam'] . " set image ='" . $_POST['image'] . "' WHERE question_id = " . $_POST['id'];
$result = mysqli_query($connect,$sql);

// Updating correct answer
$sql = "UPDATE " .  $_POST['exam'] . " set answer ='" . $_POST['correct'] . "' WHERE question_id = " . $_POST['id'];
$result = mysqli_query($connect,$sql);

// Deleting previous answers
$deleteQuery = "DELETE FROM answers" . $_POST['exam'] . " WHERE question_id=" . $_POST['id'];
$deletePrevious = mysqli_query($connect,$deleteQuery);

// Inserting first answer

$answer = "INSERT INTO answers" . $_POST['exam'] . " (question_id,answer) VALUES(" . $_POST['id'] . ",'" . $_POST['a'] . "');";
$result = mysqli_query($connect,$answer);

// Inserting second answer
$answer = "INSERT INTO answers" . $_POST['exam'] . " (question_id,answer) VALUES(" . $_POST['id'] . ",'" . $_POST['b'] . "');";
$result = mysqli_query($connect,$answer);

if($_POST['c'] != ''){
  $answer = "INSERT INTO answers" . $_POST['exam'] . " (question_id,answer) VALUES(" . $_POST['id'] . ",'" . $_POST['c'] . "');";
  $result = mysqli_query($connect,$answer);
}

if($_POST['d'] != ''){
  $answer = "INSERT INTO answers" . $_POST['exam'] . " (question_id,answer) VALUES(" . $_POST['id'] . ",'" . $_POST['d'] . "');";
  $result = mysqli_query($connect,$answer);
}

if($_POST['e'] != ''){
  $answer = "INSERT INTO answers" . $_POST['exam'] . " (question_id,answer) VALUES(" . $_POST['id'] . ",'" . $_POST['e'] . "');";
  $result = mysqli_query($connect,$answer);
}


addEntryEvent(date("Y/m/d"), $_POST['exam'], "Edited question " . $_POST['number'] . " from " . $_POST['exam'], "");
echo '{"result": true}';
?>
