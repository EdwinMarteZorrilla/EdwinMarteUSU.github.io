<?php

$connect = mysqli_connect("127.0.0.1:3306", "root", "calvorm123", "exams");
// $question = "INSERT INTO " . $_POST['exam'] . " (question, image, answer) VALUES (" . $_POST['question'] . "," . $_POST['image'] . "," . $_POST['correct'] ");";
$question = "INSERT INTO " . $_POST['exam'] . " (question, image, answer) VALUES ('" . $_POST['question'] . "','" . $_POST['image'] . "','" . $_POST['correct'] . "');";
$result = mysqli_query($connect,$question);
// $result2 = mysqli_query($connect,$answers);
// if($result and $result2){
//   echo '{"result": true}';
// }
// else{
//   echo '{"result": false}';
// }
echo '{"result": true}';
?>
