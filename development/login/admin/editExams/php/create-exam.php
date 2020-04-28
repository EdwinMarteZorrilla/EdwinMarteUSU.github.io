<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$connect2 = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exam_variables");
$result = mysqli_query($connect,"SHOW TABLES IN exams;");
while($row = $result->fetch_assoc()){
  if($row['Tables_in_exams'] == $_POST['name']){
    echo '{"result":false,"error": "The name you selected is already in use"}';
    die();
  }
}


$exam = "CREATE TABLE " . $_POST['name'] . " ( question_id INT NOT NULL AUTO_INCREMENT, question VARCHAR(21844) NOT NULL, image VARCHAR(1000), answer VARCHAR(5) NOT NULL, PRIMARY KEY (question_id));";
$answers = "CREATE TABLE answers" . $_POST['name'] . " ( answer_id INT NOT NULL AUTO_INCREMENT, question_id INT NOT NULL, answer VARCHAR(21844) NOT NULL, PRIMARY KEY (answer_id));
";
$ids = "CREATE TABLE ids" . $_POST['name'] . " (id INT NOT NULL AUTO_INCREMENT, study_id VARCHAR(100) NOT NULL, bday VARCHAR(30) NOT NULL, anumber VARCHAR(20) NOT NULL, PRIMARY KEY (id))";
$links = "CREATE TABLE links" . $_POST['name'] . " (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(200) NOT NULL, link VARCHAR(2000) NOT NULL, on_question INT NOT NULL, PRIMARY KEY (id));";
$variables = "CREATE TABLE " . $_POST['name'] . " (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, value VARCHAR(20000), PRIMARY KEY (id));";
$variables1 = "INSERT INTO " . $_POST['name'] . " (name,value) VALUES('Saliva','Yes');";
$variables2 = "INSERT INTO " . $_POST['name'] . " (name,value) VALUES('Time between saliva samples (mins)','45');";
$variables3 = "INSERT INTO " . $_POST['name'] . " (name,value) VALUES('Intro Title','');";
$variables4 = "INSERT INTO " . $_POST['name'] . " (name,value) VALUES('Intro Message','');";
$variables5 = "INSERT INTO " . $_POST['name'] . " (name,value) VALUES('Intro Video','');";

$result = mysqli_query($connect,$exam);
$result2 = mysqli_query($connect,$answers);
$result3 = mysqli_query($connect,$ids);
$result4 = mysqli_query($connect,$links);
$result5 = mysqli_query($connect2,$variables);
$result5 = mysqli_query($connect2,$variables1);
$result5 = mysqli_query($connect2,$variables2);
$result5 = mysqli_query($connect2,$variables3);
$result5 = mysqli_query($connect2,$variables4);
$result5 = mysqli_query($connect2,$variables5);


if($result and $result2 and $result3 and $result4 and $result5){
  echo '{"result": true}';
}
else{
  echo '{"result": false}';
}

?>
