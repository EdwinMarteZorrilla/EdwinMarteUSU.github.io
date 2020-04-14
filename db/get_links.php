<?php

require_once('../include/config.php');


$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$query = "SELECT currentExam FROM current";
$result = mysqli_query($connect,$query);
while($row = $result->fetch_assoc()){
  $current = $row['currentExam'];
}
$question = "SELECT name,link FROM links" . $current;
$result = mysqli_query($connect,$question);

$data = '{"links":[';
while($row = $result->fetch_assoc()){
  $data .= '{"name":"' . $row['name'] . '","link":"' . $row['link'] . '"},';
}
$data = rtrim($data, ",");
$data .= ']}';
echo $data;
?>
