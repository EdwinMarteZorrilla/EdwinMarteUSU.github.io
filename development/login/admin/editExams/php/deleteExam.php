<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$sql = "DROP TABLE answers" . $_POST['delete'];
$sql2 = "DROP TABLE " . $_POST['delete'];
$sql3 = "DROP TABLE ids" . $_POST['delete'];
$sql4 = "DROP TABLE links" . $_POST['delete'];
$result = mysqli_query($connect,$sql);
$result2 = mysqli_query($connect,$sql2);
$result3 = mysqli_query($connect,$sql3);
$result4 = mysqli_query($connect,$sql4);
if($result && $result2 && $result3 && $result4){
  echo '{"result": true}';
}
else{
  echo '{"result": false}';
}


?>
