<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$exam = "CREATE TABLE " . $_POST['new'] . " ( question_id INT NOT NULL AUTO_INCREMENT, question VARCHAR(21844) NOT NULL, image VARCHAR(1000), answer VARCHAR(5) NOT NULL, PRIMARY KEY (question_id));";
$answers = "CREATE TABLE answers" . $_POST['new'] . " ( answer_id INT NOT NULL AUTO_INCREMENT, question_id INT NOT NULL, answer VARCHAR(21844) NOT NULL, PRIMARY KEY (answer_id), FOREIGN KEY (question_id) REFERENCES exam1 (question_id) ON DELETE CASCADE);
";
$ids = "CREATE TABLE ids" . $_POST['new'] . " (id INT NOT NULL AUTO_INCREMENT, study_id VARCHAR(100) NOT NULL, PRIMARY KEY (id))";
$links = "CREATE TABLE links" . $_POST['new'] . "(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(200) NOT NULL, link VARCHAR(2000), PRIMARY KEY (id))";
$result = mysqli_query($connect,$exam);
$result2 = mysqli_query($connect,$answers);
$result3 = mysqli_query($connect,$ids);
$result4 = mysqli_query($connect,$links);

$sql = "SELECT question_id, question, image, answer FROM " . $_POST['copy'];
$result = mysqli_query($connect,$sql);

while($row = $result->fetch_assoc()){


  $question = "INSERT INTO " . $_POST['new'] . " (question, image, answer) VALUES ('" . $row['question'] . "','" . $row['image'] . "','" . $row['answer'] . "');";
  $temp = mysqli_query($connect,$question);
}

$sql = "SELECT question_id, answer FROM answers" . $_POST['copy'];
$result = mysqli_query($connect,$sql);

while($row = $result->fetch_assoc()){

  $answer = "INSERT INTO answers" . $_POST['new'] . " (question_id, answer) VALUES ('" . $row['question_id'] . "','"  . $row['answer'] . "');";
  $temp = mysqli_query($connect,$answer);
}

$sql = "SELECT study_id FROM ids" . $_POST['copy'];
$result = mysqli_query($connect,$sql);

while($row = $result->fetch_assoc()){

  $answer = "INSERT INTO ids" . $_POST['new'] . " (study_id) VALUES ('" . $row['study_id'] . "');";
  $temp = mysqli_query($connect,$answer);
}

$sql = "SELECT name, link FROM links" . $_POST['copy'];
$result = mysqli_query($connect,$sql);

while($row = $result->fetch_assoc()){

  $answer = "INSERT INTO links" . $_POST['new'] . " (name,link) VALUES ('" . $row['name'] . "','"  . $row['link'] . "');";
  $temp = mysqli_query($connect,$answer);
}

echo '{"result": true}';
?>
