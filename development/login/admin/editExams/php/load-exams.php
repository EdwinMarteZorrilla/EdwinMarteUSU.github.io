<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$result = mysqli_query($connect,"SHOW TABLES;");
$current = mysqli_query($connect,"SELECT * FROM current;");


$examTable = '<h1 style="text-align:center">Exams</h1><div class="form-group"><label for="current"><b>Current exam:</b></label><select class="form-control" id="current">';

while($row = $current->fetch_assoc()){
  $temp = $row['currentExam'];
  $examTable .= '<option class="dropdown-item" href="#">' . $row['currentExam'] .'</option>';
}

while($row = $result->fetch_assoc()){
  if(substr($row['Tables_in_exams'],0,3) != 'ids' and substr($row['Tables_in_exams'],0,3) != 'ans' and $row['Tables_in_exams'] !='current' and $row['Tables_in_exams'] != $temp ){
    $examTable .= '<option class="dropdown-item" href="#">' . $row['Tables_in_exams'] .'</option>';
  }
}


$examTable .= '</select></div>';
$examTable .= '<table class="table table-striped table-bordered"> <tr><th>Exams</th><th></th></tr>';

$result = mysqli_query($connect,"SHOW TABLES;");
while($row = $result->fetch_assoc()){
  if(substr($row['Tables_in_exams'],0,3) != 'ids' and substr($row['Tables_in_exams'],0,3) != 'ans' and $row['Tables_in_exams'] !='current' ){
    $examTable .= '<tr><td>' . $row['Tables_in_exams'] . '</td><td><button style="margin-right:10px; margin-left:10px" class="btn btn-outline-success btn-sm" onclick="editExam(\'' . $row['Tables_in_exams'] . '\')">Edit</button>';
    $examTable .= '<button style="margin-right:10px; margin-left:10px" class="btn btn-outline-secondary btn-sm" onclick="copyExam(\'' . $row['Tables_in_exams'] . '\')">Copy</button>';
    $examTable .= '<button style="margin-right:10px; margin-left:10px" class="btn btn-outline-secondary btn-sm" onclick="exportCSV(\'' . $row['Tables_in_exams'] . '\')">Export</button>';
    $examTable .= '<button style="margin-right:10px; margin-left:10px" class="btn btn-outline-danger btn-sm" onclick="deleteExam(\'' . $row['Tables_in_exams'] . '\')">Delete</button>';
    $examTable .= '</td></tr>';
  }
}
$examTable .= '</table><button class="btn btn-lg btn-success btn-block" onclick="addExam()">Add</button>';

echo $examTable;
?>
