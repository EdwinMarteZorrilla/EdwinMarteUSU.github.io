<?php

$connect = mysqli_connect("127.0.0.1:3306", "root", "calvorm123", "exams");
$result = mysqli_query($connect,"SHOW TABLES;");
$current = mysqli_query($connect,"SELECT * FROM current;");


$examTable = '<h1 style="text-align:center">Exams</h1><div class="form-group"><label for="current"><b>Current exam:</b></label><select class="form-control" id="current">';

while($row = $current->fetch_assoc()){
  $temp = $row['currentExam'];
  $examTable .= '<option class="dropdown-item" href="#">' . $row['currentExam'] .'</option>';
}

while($row = $result->fetch_assoc()){
  if(substr($row['Tables_in_exams'],0,3) != 'ans' and $row['Tables_in_exams'] !='current' and $row['Tables_in_exams'] != $temp ){
    $examTable .= '<option class="dropdown-item" href="#">' . $row['Tables_in_exams'] .'</option>';
  }
}


$examTable .= '</select></div>';
$examTable .= '<table class="table table-striped table-bordered"> <tr><th>Exams</th><th></th></tr>';

$result = mysqli_query($connect,"SHOW TABLES;");
while($row = $result->fetch_assoc()){
  if(substr($row['Tables_in_exams'],0,3) != 'ans' and $row['Tables_in_exams'] !='current' ){
    $examTable .= '<tr><td>' . $row['Tables_in_exams'] . '</td><td><button class="btn btn-outline-success btn-sm" onclick="editExam(\'' . $row['Tables_in_exams'] . '\')">Edit</button></td></tr>';
  }
}
$examTable .= '</table><button class="btn btn-lg btn-success btn-block" onclick="addExam()">Add</button>';

echo $examTable;
?>
