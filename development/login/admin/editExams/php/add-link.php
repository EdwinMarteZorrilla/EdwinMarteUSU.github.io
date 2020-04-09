<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$sql = "INSERT INTO links" . $_POST['exam'] . " (name,link) VALUES('" . $_POST['name'] . "','" . $_POST['newLink'] . "')";
$result = mysqli_query($connect,$sql);


if($result){
  echo '{"result": true}';
}
else{
  echo '{"result": false}';
}

?>
