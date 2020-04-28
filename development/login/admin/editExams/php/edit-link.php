<?php

require_once('../../../../../include/config.php');
require_once('/var/www/html/NHR-Core/development/login/admin/journal/journalFunctions.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
// Updating question
$sql = "UPDATE links" .  $_POST['exam'] . " set name ='" . $_POST['name'] . "' WHERE id = " . $_POST['id'];
$result = mysqli_query($connect,$sql);

// Updating image
$sql = "UPDATE links" .  $_POST['exam'] . " set link ='" . $_POST['newLink'] . "' WHERE id = " . $_POST['id'];
$result = mysqli_query($connect,$sql);

// Updating correct answer
$sql = "UPDATE links" .  $_POST['exam'] . " set on_question ='" . $_POST['on_question'] . "' WHERE id = " . $_POST['id'];
$result = mysqli_query($connect,$sql);



addEntryEvent(date("Y/m/d"), $_POST['exam'], "Edited link: " . $_POST['name'] . " from " . $_POST['exam'], "");
echo '{"result": true}';
?>
