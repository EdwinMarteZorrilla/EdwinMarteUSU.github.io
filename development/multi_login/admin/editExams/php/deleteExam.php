<?php

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
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
