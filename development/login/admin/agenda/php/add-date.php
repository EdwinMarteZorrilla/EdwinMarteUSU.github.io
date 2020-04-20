<?php

require_once('../../../../../include/config.php');
require_once('/var/www/html/NHR-Core/development/login/admin/journal/journalFunctions.php');


$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "agenda");

$sql = "INSERT INTO dates (exam,taken) VALUES('" . $_POST['exam'] . "','" . $_POST['date'] . "')";
$result = mysqli_query($connect,$sql);


if($result){
  addEntryEvent($_POST['date'], $_POST['exam'], "Schedule exam", "Exam: ".$_POST['exam']." scheduled for date: ".$_POST['date']);
  echo '{"result":true}';

}
else{
  echo '{"result":false}';
}
?>
