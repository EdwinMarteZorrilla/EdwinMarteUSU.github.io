<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$sql = "DELETE FROM " . $_POST['exam'] . " WHERE question_id='" . $_POST['id'] . "'";
$sql2 = "DELETE FROM answers" . $_POST['exam'] . " WHERE question_id='" . $_POST['id'] . "'";
$result = mysqli_query($connect,$sql);
$result2 = mysqli_query($connect,$sql2);
if($result && $result2){
  echo '{"result": true}';
}
else{
  echo '{"result": false}';
}


?>
