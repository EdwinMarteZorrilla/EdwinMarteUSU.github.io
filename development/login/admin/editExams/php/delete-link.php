<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$sql = "DELETE FROM links" . $_POST['exam'] . " WHERE link='" . $_POST['link'] . "'";

$result = mysqli_query($connect,$sql);
if($result){
  echo '{"result": true}';
}
else{
  echo '{"result": false}';
}


?>
