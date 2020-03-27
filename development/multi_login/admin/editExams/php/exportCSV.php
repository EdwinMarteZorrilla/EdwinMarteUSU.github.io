<?php

$connect = mysqli_connect("127.0.0.1:3306", "root", "calvorm123", "exams");
header('Content-Type: text/csv; charset=utf-8');
$string = 'Content-Disposition: attachment; filename=' . $_POST['name'] . '.csv';
header('Content-Disposition: attachment; filename=data.csv');
$output = fopen('php://output','w');
fputcsv($output, array('#','question','image','answer'));
$sql = "SELECT question_id, question, image, answer FROM " . $_POST['name'];
$result = mysqli_query($connect,$sql);

while($row = $result->fetch_assoc()){
  fputcsv($output,$row);
}
fclose($output);
