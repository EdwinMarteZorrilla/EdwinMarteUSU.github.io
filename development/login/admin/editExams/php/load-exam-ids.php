<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
$sql = "SELECT id, study_id FROM ids" . $_POST['exam'];
$result = mysqli_query($connect,$sql);
$examTable = '<h1 style="text-align:center">' .$_POST['exam'] . '</h1>';
$examTable .= '<nav class="nav nav-pills nav-fill"><a id="tab1" style="color:green;" onclick="switchTabs(\'questions\')" class="nav-item nav-link" href="#">Questions</a><a id="tab2" onclick="switchTabs(\'ids\')" style="background-color:green; color:white" class="nav-item nav-link" href="#">Study ids</a>';
$examTable .= '<a id="tab3" onclick="switchTabs(\'links\')" style="color:green" class="nav-item nav-link" href="#">Links</a></nav>';
$examTable .= '<div style="display:flex; justify-content:space-between; padding:15px;"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
$examTable .= '<div style="display:flex justify-content:space-between"><button data-toggle="modal" data-target="#importModal" style="margin-right:10px"class="btn btn-lg btn-outline-secondary">Import</button><button class="btn btn-lg btn-success" data-toggle="modal" data-target="#idInput">Add new ID</button></div></div>';
$examTable .= '<table class="table table-striped table-bordered"><tr><th>#</th><th>ID</th></tr>';

while($row = $result->fetch_assoc()){
  $examTable .= '<tr><td>' . $row['id'] . '</td><td>' . $row['study_id'] . '</tr>';
}
$examTable .= '</table>';
$examTable .= '<div style="display:flex; justify-content:space-between; padding:15px"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
$examTable .= '<div style="display:flex justify-content:space-between"><button data-toggle="modal" data-target="#importModal" style="margin-right:10px"class="btn btn-lg btn-outline-secondary">Import</button><button class="btn btn-lg btn-success" data-toggle="modal" data-target="#idInput">Add new ID</button></div></div>';

echo $examTable;
?>
