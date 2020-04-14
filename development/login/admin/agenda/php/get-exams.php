<?php

require_once('../../../../../include/config.php');


$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$result = mysqli_query($connect,"SHOW TABLES;");

$html = '';
while($row = $result->fetch_assoc()){
  if(substr($row['Tables_in_exams'],0,5) != 'links' and substr($row['Tables_in_exams'],0,3) != 'ids' and substr($row['Tables_in_exams'],0,3) != 'ans' and $row['Tables_in_exams'] !='current' and $row['Tables_in_exams'] != $temp ){
    $html .= '<option class="dropdown-item" href="#">' . $row['Tables_in_exams'] .'</option>';
  }
}

echo $html;

?>
