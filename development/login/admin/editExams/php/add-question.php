<?php

require_once('../../../../../include/config.php');
require_once('/var/www/html/NHR-Core/development/login/admin/journal/journalFunctions.php');

if(is_file($_FILES['file']['name'])){
  echo '{"result":false,"error":"File already exists,please rename the image"}';
  die();
}


if(isset($_FILES['file']['tmp_name'])){
  move_uploaded_file($_FILES['file']['tmp_name'],'/var/www/html/NHR-Core/media/' . $_FILES['file']['name']);
}

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");


if($_POST['type'] == 'textbox'){
  $question = "INSERT INTO " . $_POST['exam'] . " (question, image, answer,type) VALUES ('" . $_POST['question'] . "','" . $_POST['image'] . "','N/A','Short Answer');";
  $result = mysqli_query($connect,$question);

  $number = mysqli_query($connect,"SELECT question_id FROM " . $_POST['exam'] . " WHERE question = '" . $_POST['question'] . "';");

  while($row = $number->fetch_assoc()){
    $num = $row['question_id'];
  }

  $answer = "INSERT INTO answers" . $_POST['exam'] . " (question_id,answer) VALUES(" . $num . ",'Short Answer');";
  $result = mysqli_query($connect,$answer);
}

else if($_POST['type'] == 'fillin'){
  $question = "INSERT INTO " . $_POST['exam'] . " (question, image, answer,type) VALUES ('" . $_POST['question'] . "','" . $_POST['image'] . "','A','Fill in the blank');";
  $result = mysqli_query($connect,$question);

  $number = mysqli_query($connect,"SELECT question_id FROM " . $_POST['exam'] . " WHERE question = '" . $_POST['question'] . "';");

  while($row = $number->fetch_assoc()){
    $num = $row['question_id'];
  }

  $answer = "INSERT INTO answers" . $_POST['exam'] . " (question_id,answer) VALUES(" . $num . ",'" . $_POST['a'] . "');";
  $result = mysqli_query($connect,$answer);
}

else{
  if($_POST['type'] == 'mulchoice'){
    $question = "INSERT INTO " . $_POST['exam'] . " (question, image, answer,type) VALUES ('" . $_POST['question'] . "','" . $_POST['image'] . "','" . $_POST['correct'] . "','Multiple Choice');";
    $result = mysqli_query($connect,$question);
  }
  else if($_POST['type'] == 'mulresponses'){
    $question = "INSERT INTO " . $_POST['exam'] . " (question, image, answer,type) VALUES ('" . $_POST['question'] . "','" . $_POST['image'] . "','" . $_POST['correct'] . "','Multiple Responses');";
    $result = mysqli_query($connect,$question);
  }

  $number = mysqli_query($connect,"SELECT question_id FROM " . $_POST['exam'] . " WHERE question = '" . $_POST['question'] . "';");

  while($row = $number->fetch_assoc()){
    $num = $row['question_id'];

  }

  $answer = "INSERT INTO answers" . $_POST['exam'] . " (question_id,answer) VALUES(" . $num . ",'" . $_POST['a'] . "');";
  $result = mysqli_query($connect,$answer);

  $answer = "INSERT INTO answers" . $_POST['exam'] . " (question_id,answer) VALUES(" . $num . ",'" . $_POST['b'] . "');";

  $result = mysqli_query($connect,$answer);

  if($_POST['c'] != ''){
    $answer = "INSERT INTO answers" . $_POST['exam'] . " (question_id,answer) VALUES(" . $num . ",'" . $_POST['c'] . "');";
    $result = mysqli_query($connect,$answer);
  }

  if($_POST['d'] != ''){
    $answer = "INSERT INTO answers" . $_POST['exam'] . " (question_id,answer) VALUES(" . $num . ",'" . $_POST['d'] . "');";
    $result = mysqli_query($connect,$answer);
  }

  if($_POST['e'] != ''){
    $answer = "INSERT INTO answers" . $_POST['exam'] . " (question_id,answer) VALUES(" . $num . ",'" . $_POST['e'] . "');";
    $result = mysqli_query($connect,$answer);
  }
}







addEntryEvent(date("Y/m/d"), $_POST['exam'], "Added question to exam", "");
echo '{"result": true}';
?>
