<?php

$connect = mysqli_connect("127.0.0.1:3306", "root", "calvorm123", "exams");
$sql = "SELECT question_id, question, image, answer FROM " . $_POST['exam'];
$result = mysqli_query($connect,$sql);
$examTable = '<h1 style="text-align:center">' .$_POST['exam'] . '</h1><table class="table table-striped table-bordered"> <tr><th>Question</th><th>Text</th><th>Image</th><th>Answer</th></tr>';

while($row = $result->fetch_assoc()){
  $examTable .= '<tr><td>' . $row['question_id'] . '</td><td>' . $row['question'] . '</td><td>' . $row['image'] . '</td><td>' . $row['answer'] . '</td></tr>';
  $answer = mysqli_query($connect, "SELECT answer FROM answers" . $_POST['exam'] . " WHERE question_id = " . $row['question_id'] . ";");
  $examTable .= '<tr><td>Answers</td><td colspan=3><ol>';
  while($row2 = $answer->fetch_assoc()){
    $examTable .= "<li = type='A'>" . $row2['answer'] . "</li>";
  }
  $examTable .= '</ol></td></tr>';
}
$examTable .= '</table>';
$examTable .= '<div style="display:flex; justify-content:space-between;"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
$examTable .= '<button class="btn btn-lg btn-success" onclick="modify()">Add Question</button></div>';
echo $examTable;
?>
