<?php

$connect = mysqli_connect("127.0.0.1:3306", "root", "calvorm123", "exams");
$sql = "SELECT question_id, question, image, answer FROM " . $_POST['exam'];
$result = mysqli_query($connect,$sql);
$examTable = '<h1 style="text-align:center">' .$_POST['exam'] . '</h1><table class="table table-striped table-bordered"> <tr><th>Question</th><th>Text</th><th>Image</th><th>Answer</th></tr>';

while($row = $result->fetch_assoc()){
  $examTable .= '<tr><td>' . $row['question_id'] . '</td><td>' . $row['question'] . '</td><td>' . $row['image'] . '</td><td>' . $row['answer'] . '</td></tr>';
}
$examTable .= '</table>';
$examTable .= '<button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
$examTable .= '<button class="btn btn-lg btn-success" onclick="modify()">Add Question</button>';
echo $examTable;
?>
