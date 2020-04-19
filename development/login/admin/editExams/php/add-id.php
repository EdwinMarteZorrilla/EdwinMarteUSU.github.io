<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$sql = "INSERT INTO ids" . $_POST['exam'] . " (study_id,bday,anumber) VALUES('" . $_POST['newId'] . "','" . $_POST['bday'] . "','" . $_POST['anum'] . "')";
$result = mysqli_query($connect,$sql);


if($result){
  echo '{"result": true}';
}
else{
  echo '{"result": false}';
}

?>
