<?php

require_once('../include/config.php');


$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$query = "SELECT currentExam FROM current";
$result = mysqli_query($connect,$query);
while($row = $result->fetch_assoc()){
  $current = $row['currentExam'];
}
$question = "SELECT study_id FROM ids" . $current;
$result = mysqli_query($connect,$question);

$data = '<datalist id="ids">';
while($row = $result->fetch_assoc()){
  $data .= '<option value="' . $row['study_id'] . '">' ;
}
$data .= '</datalist>';
echo $data;
?>
