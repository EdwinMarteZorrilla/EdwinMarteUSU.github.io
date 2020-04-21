<?php

require_once('../include/config.php');


$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$query = "SELECT currentExam FROM current";
$result = mysqli_query($connect,$query);
while($row = $result->fetch_assoc()){
  $current = $row['currentExam'];
}
$question = "SELECT study_id,bday,anumber FROM ids" . $current;
$result = mysqli_query($connect,$question);

$json = '{"ids": [';
$data = '<datalist id="ids">';
while($row = $result->fetch_assoc()){
  $data .= '<option value="' . $row['study_id'] . '">' ;
  $json .= '{"study_id":"' . $row['study_id'] . '","bday":"' . $row['bday'] .'","aNum":"' . $row['anumber'] .'"},';
}
$json = rtrim($json,",");
$json .= ']}';
$data .= '</datalist>';
echo $json;
?>
