<?php

require_once('../../../../../include/config.php');

$connect2 = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "agenda");
$sql = "SELECT taken FROM dates WHERE exam='" . $_POST['exam'] . "'";
$result2 = mysqli_query($connect2,$sql);
$flag = false;
while($row2 = $result2->fetch_assoc()){
  if($row2['taken'] < date("Y-m-d")){
    $flag = true;
  }
}

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$sql = "SELECT question_id, question, image, answer FROM " . $_POST['exam'];
$result = mysqli_query($connect,$sql);
$examTable = '<h1 style="text-align:center">' .$_POST['exam'] . '</h1>';
$examTable .= '<nav class="nav nav-pills nav-fill"><a id="tab1" style="background-color:green; color:white" onclick="switchTabs(\'questions\')" class="nav-item nav-link" href="#">Questions</a><a id="tab2" onclick="switchTabs(\'ids\')" style="color:green" class="nav-item nav-link" href="#">Study ids</a>';
$examTable .= '<a id="tab3" onclick="switchTabs(\'links\')" style=" color:green" class="nav-item nav-link" href="#">Links</a></nav>';
$examTable .= '<div style="display:flex; justify-content:space-between; padding:15px;"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
if($flag){
  $examTable .= '<button class="btn btn-lg btn-success" onclick="modify()" disabled>Add Question</button></div>';
  $examTable .= '<table class="table table-striped table-bordered"><tr><th>Question</th><th>Text</th><th>Image</th><th>Answer</th></tr>';
}
else{
  $examTable .= '<button class="btn btn-lg btn-success" onclick="modify()">Add Question</button></div>';
  $examTable .= '<table class="table table-striped table-bordered"><tr><th>Question</th><th>Text</th><th>Image</th><th>Answer</th><th></th></tr>';
}

$counter = 1;


while($row = $result->fetch_assoc()){
  $examTable .= '<tr><td>' . $counter . '</td><td>' . $row['question'] . '</td><td>' . $row['image'] . '</td><td>' . $row['answer'] . '</td>';
  if(!$flag){
    $examTable .= '<td><button style="margin-right:10px; margin-left:10px" class="btn btn-outline-danger btn-sm" onclick="deleteQuestion(\'' . $row['question_id'] . '\')">Delete</button></td>';
  }
  $examTable .= '</tr>';
  $answer = mysqli_query($connect, "SELECT answer FROM answers" . $_POST['exam'] . " WHERE question_id = " . $row['question_id'] . ";");
  $examTable .= '<tr><td>Answers</td><td colspan=4><ol>';
  while($row2 = $answer->fetch_assoc()){
    $examTable .= "<li = type='A'>" . $row2['answer'] . "</li>";
  }
  $examTable .= '</ol></td></tr>';
  $counter++;
}
$examTable .= '</table>';
$examTable .= '<div style="display:flex; justify-content:space-between; padding:15px"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
if($flag){
  $examTable .= '<button class="btn btn-lg btn-success" onclick="modify()" disabled>Add Question</button></div>';
}
else{
  $examTable .= '<button class="btn btn-lg btn-success" onclick="modify()">Add Question</button></div>';
}

echo $examTable;
?>
