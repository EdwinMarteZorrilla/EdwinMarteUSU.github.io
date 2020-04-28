<?php

require_once('../../../../../include/config.php');
require_once('/var/www/html/NHR-Core/development/login/admin/journal/journalFunctions.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$connect2 = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exam_variables");
$sql = "DROP TABLE answers" . $_POST['delete'];
$sql2 = "DROP TABLE " . $_POST['delete'];
$sql3 = "DROP TABLE ids" . $_POST['delete'];
$sql4 = "DROP TABLE links" . $_POST['delete'];
$sql5 = "DROP TABLE " . $_POST['delete'];
$result = mysqli_query($connect,$sql);
$result2 = mysqli_query($connect,$sql2);
$result3 = mysqli_query($connect,$sql3);
$result4 = mysqli_query($connect,$sql4);
$result5 = mysqli_query($connect2,$sql5);
if($result && $result2 && $result3 && $result4 && $result5){
  addEntryEvent(date("Y/m/d"), $_POST['delete'], "Delete exam", "Deleted exam: ".$_POST['delete']);
  echo '{"result": true}';
}
else{
  echo '{"result": false}';
}


?>
