<?php

require_once('../include/config.php');


$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$connect2 = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exam_variables");

$query = "SELECT currentExam FROM current";
$result = mysqli_query($connect,$query);
while($row = $result->fetch_assoc()){
  $current = $row['currentExam'];
}
$question = "SELECT name,value FROM " . $current;
$result = mysqli_query($connect2,$question);

$json = '{"variables": [';
while($row = $result->fetch_assoc()){
  $json .= '{"name":"' . $row['name'] . '","value":"' . $row['value'] .'"},';
}
$json = rtrim($json,",");
$json .= ']}';
echo $json;
?>
