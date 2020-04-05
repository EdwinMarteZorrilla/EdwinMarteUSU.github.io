<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
header('Content-Type: text/csv; charset=utf-8');
$string = 'Content-Disposition: attachment; filename=' . $_POST['name'] . '.csv';
header('Content-Disposition: attachment; filename=data.csv');
$output = fopen('php://output','w');
fputcsv($output, array('','#','question','image','answer'));
$sql = "SELECT question_id, question, image, answer FROM " . $_POST['name'];
$result = mysqli_query($connect,$sql);

while($row = $result->fetch_assoc()){
  fputcsv($output,array('question', $row['question_id'],$row['question'], $row['image'], $row['answer']));
  $answer = mysqli_query($connect, "SELECT answer FROM answers" . $_POST['name'] . " WHERE question_id = " . $row['question_id'] . ";");
  while($row2 = $answer->fetch_assoc()){
    fputcsv($output,array('','',$row2['answer']));
  }
  fputcsv($output,array('','','','',''));
}
fclose($output);
