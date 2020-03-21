<?php

$connect = mysqli_connect("127.0.0.1:3306", "root", "calvorm123", "exams");
$question = "INSERT INTO " . $_POST['exam'] . " (question, image, answer) VALUES ('" . $_POST['question'] . "','" . $_POST['image'] . "','" . $_POST['correct'] . "');";
$result = mysqli_query($connect,$question);
$number = mysqli_query($connect,"SELECT question_id FROM " . $_POST['exam'] . " WHERE question = '" . $_POST['question'] . "';");
while($row = $number->fetch_assoc()){
  $num = $row['question_id'];
}

$answer = "INSERT INTO answers" . $_POST['exam'] . "(question_id,answer) VALUE(" . $num . ",'" . $_POST['a'] . "');";

$result = mysqli_query($connect,$answer);

$answer = "INSERT INTO answers" . $_POST['exam'] . "(question_id,answer) VALUE(" . $num . ",'" . $_POST['b'] . "');";

$result = mysqli_query($connect,$answer);

if($_POST['c'] != ''){
  $answer = "INSERT INTO answers" . $_POST['exam'] . "(question_id,answer) VALUE(" . $num . ",'" . $_POST['c'] . "');";
  $result = mysqli_query($connect,$answer);
}

if($_POST['d'] != ''){
  $answer = "INSERT INTO answers" . $_POST['exam'] . "(question_id,answer) VALUE(" . $num . ",'" . $_POST['d'] . "');";
  $result = mysqli_query($connect,$answer);
}

if($_POST['e'] != ''){
  $answer = "INSERT INTO answers" . $_POST['exam'] . "(question_id,answer) VALUE(" . $num . ",'" . $_POST['e'] . "');";
  $result = mysqli_query($connect,$answer);
}


echo '{"result": true}';
?>
