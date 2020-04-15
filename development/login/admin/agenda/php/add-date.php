<?php

require_once('../../../../../include/config.php');


$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "agenda");

$sql = "INSERT INTO dates (exam,taken) VALUES('" . $_POST['exam'] . "','" . $_POST['date'] . "')";
$result = mysqli_query($connect,$sql);


if($result){
  echo '{"result":true}';

}
else{
  echo '{"result":false}';
}
?>
