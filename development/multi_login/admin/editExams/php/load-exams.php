<?php

$connect = mysqli_connect("127.0.0.1:3306", "root", "calvorm123", "exams");
$result = mysqli_query($connect,"SHOW TABLES;");
$examTable = '<h1 style="text-align:center">Exams</h1><table class="table table-striped table-bordered"> <tr><th>Exams</th><th></th></tr>';

while($row = $result->fetch_assoc()){
  if(substr($row['Tables_in_exams'],0,3) != 'ans'){
    $examTable .= '<tr><td>' . $row['Tables_in_exams'] . '</td><td><button class="btn btn-outline-success btn-sm" onclick="editExam(\'' . $row['Tables_in_exams'] . '\')">Edit</button></td></tr>';
  }
}
$examTable .= '</table><button class="btn btn-lg btn-success btn-block" onclick="addExam()">Add</button>';

echo $examTable;
?>
