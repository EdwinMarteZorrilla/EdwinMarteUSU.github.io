<?php

$connect = mysqli_connect("127.0.0.1:3306", "root", "calvorm123", "exams");
$sql = "DROP TABLE answers" . $_POST['delete'];
$sql2 = "DROP TABLE " . $_POST['delete'];
$result = mysqli_query($connect,$sql);
$result2 = mysqli_query($connect,$sql2);
if($result && $result2){
  echo '{"result": true}';
}
else{
  echo '{"result": false}';
}


?>
