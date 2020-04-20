<?php

require_once('../../../../../include/config.php');
require_once('/var/www/html/NHR-Core/development/login/admin/journal/journalFunctions.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$sql = "INSERT INTO links" . $_POST['exam'] . " (name,link,after) VALUES('" . $_POST['name'] . "','" . $_POST['newLink'] . "','" . $_POST['time'] . "')";
$result = mysqli_query($connect,$sql);


if($result){
  addEntryEvent(date("Y/m/d"), $_POST['exam'], "Added link to exam", "Added link:".$_POST['name']." to exam: ".$_POST['exam']);
  echo '{"result": true}';
}
else{
  echo '{"result": false}';
}

?>
