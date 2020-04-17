<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");

echo($_POST['new']);
echo($_POST['copy']);

$exam = "CREATE TABLE " . $_POST['new'] . " ( question_id INT NOT NULL AUTO_INCREMENT, question VARCHAR(21844) NOT NULL, image VARCHAR(1000), answer VARCHAR(5) NOT NULL, PRIMARY KEY (question_id));";
$answers = "CREATE TABLE answers" . $_POST['new'] . " ( answer_id INT NOT NULL AUTO_INCREMENT, question_id INT NOT NULL, answer VARCHAR(21844) NOT NULL, PRIMARY KEY (answer_id));
";
$ids = "CREATE TABLE ids" . $_POST['new'] . " (id INT NOT NULL AUTO_INCREMENT, study_id VARCHAR(100) NOT NULL, PRIMARY KEY (id))";
$links = "CREATE TABLE links" . $_POST['new'] . "(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(200) NOT NULL, link VARCHAR(2000), after INT NOT NULL, PRIMARY KEY (id))";
$result = mysqli_query($connect,$exam);
$result2 = mysqli_query($connect,$answers);
$result3 = mysqli_query($connect,$ids);
$result4 = mysqli_query($connect,$links);

$copyQuests = 'INSERT ' . $_POST['new'] . ' SELECT * FROM ' . $_POST['copy'];
$copyIds = 'INSERT ids' . $_POST['new'] . ' SELECT * FROM ids' . $_POST['copy'];
$copyAns = 'INSERT answers' . $_POST['new'] . ' SELECT * FROM answers' . $_POST['copy'];
$copyLinks = 'INSERT links' . $_POST['new'] . ' SELECT * FROM links' . $_POST['copy'];
$result5 = mysqli_query($connect,$copyQuests);
$result6 = mysqli_query($connect,$copyAns);
$result7 = mysqli_query($connect,$copyLinks);
$result8 = mysqli_query($connect,$copyIds);


$sql = "SELECT question_id, question, image, answer FROM " . $_POST['copy'];
$result = mysqli_query($connect,$sql);


echo '{"result": true}';
?>
