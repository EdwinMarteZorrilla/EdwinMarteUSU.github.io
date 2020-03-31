<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$current = mysqli_query($connect,"SELECT * FROM current;");

while($row = $current->fetch_assoc()){
  $sql = "UPDATE current SET currentExam = '" . $_POST['new'] . "' WHERE currentExam = '" . $row['currentExam'] . "'";
  $result = mysqli_query($connect, $sql);
  $examTable .= '<option class="dropdown-item" href="#">' . $row['currentExam'] .'</option>';
}

if($result){
  echo '{"result": true}';
}
else{
  echo '{"result": false}';
}

?>
