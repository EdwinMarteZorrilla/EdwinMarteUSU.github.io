<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");

$filename = explode('.',$_FILES['file']['name']);
if($filename[1] == 'csv'){
  $handle = fopen($_FILES['file']['tmp_name'], "r");
  while($data = fgetcsv($handle)){
    $sql = "INSERT INTO ids" . $_POST['exam'] . "(study_id,bday,anumber) VALUES('" . strtoupper($data[0]) . "','"  . $data[1] . "','" . strtoupper($data[2]) . "')";
    $result = mysqli_query($connect,$sql);
  }
}


if($result){
  echo '{"result": true}';
}
else{
  echo '{"result": false}';
}

?>
