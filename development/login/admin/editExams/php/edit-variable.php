<?php

require_once('../../../../../include/config.php');
require_once('/var/www/html/NHR-Core/development/login/admin/journal/journalFunctions.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exam_variables");
// Updating question
$sql = "UPDATE " .  $_POST['exam'] . " set value ='" . $_POST['value'] . "' WHERE id = " . $_POST['id'];
$result = mysqli_query($connect,$sql);

// addEntryEvent(date("Y/m/d"), $_POST['exam'], "Edited link: " . $_POST['name'] . " from " . $_POST['exam'], "");
if($result){
  echo '{"result": true}';
}
else{
  echo '{"result": false,"error":"Something went wrong, could not update variable"}';
}
?>
