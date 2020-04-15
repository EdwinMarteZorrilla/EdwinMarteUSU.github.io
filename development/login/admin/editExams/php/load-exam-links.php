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
$sql = "SELECT name, link,after FROM links" . $_POST['exam'];
$result = mysqli_query($connect,$sql);
$examTable = '<h1 style="text-align:center">' .$_POST['exam'] . '</h1>';
$examTable .= '<nav class="nav nav-pills nav-fill"><a id="tab1" style="color:green;" onclick="switchTabs(\'questions\')" class="nav-item nav-link" href="#">Questions</a><a id="tab2" onclick="switchTabs(\'ids\')" style=" color:green" class="nav-item nav-link" href="#">Study ids</a>';
$examTable .= '<a id="tab3" onclick="switchTabs(\'links\')" style="color:white; background-color:green" class="nav-item nav-link" href="#">Links</a></nav>';
$examTable .= '<div style="display:flex; justify-content:space-between; padding:15px;"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
if($flag){
  $examTable .= '<button class="btn btn-lg btn-success" data-toggle="modal" data-target="#addLink" disabled>Add new Link</button></div>';
  $examTable .= '<table class="table table-striped table-bordered"><tr><th>#</th><th>Name</th><th>Link</th><th>After (mins)</th></tr>';
}
else{
  $examTable .= '<button class="btn btn-lg btn-success" data-toggle="modal" data-target="#addLink">Add new Link</button></div>';
  $examTable .= '<table class="table table-striped table-bordered"><tr><th>#</th><th>Name</th><th>Link</th><th>After (mins)</th><th></th></tr>';
}

$count = 1;


while($row = $result->fetch_assoc()){
  $examTable .= '<tr><td>' . $count . '</td><td>' . $row['name'] . '</td><td>' . $row['link'] . '</td><td>' . $row['after'] .'</td>';
  if(!$flag){
    $examTable .= '<td><button style="margin-right:10px; margin-left:10px" class="btn btn-outline-danger btn-sm" onclick="deleteLink(\'' . $row['link'] . '\')">Delete</button></td>';
  }
  $examTable .= '</tr>';
  // $examTable .= '<button style="margin-right:10px; margin-left:10px" class="btn btn-outline-danger btn-sm">Delete</button></td></tr>';
  $count = $count + 1;
}
$examTable .= '</table>';
$examTable .= '<div style="display:flex; justify-content:space-between; padding:15px"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
if($flag){
  $examTable .= '<button class="btn btn-lg btn-success" data-toggle="modal" data-target="#addLink" disabled>Add new Link</button></div>';
}
else{
  $examTable .= '<button class="btn btn-lg btn-success" data-toggle="modal" data-target="#addLink">Add new Link</button></div>';
}

if($count == 1){
  $examTable = '<h1 style="text-align:center">' .$_POST['exam'] . '</h1>';
  $examTable .= '<nav class="nav nav-pills nav-fill"><a id="tab1" style="color:green;" onclick="switchTabs(\'questions\')" class="nav-item nav-link" href="#">Questions</a><a id="tab2" onclick="switchTabs(\'ids\')" style=" color:green" class="nav-item nav-link" href="#">Study ids</a>';
  $examTable .= '<a id="tab3" onclick="switchTabs(\'links\')" style="color:white; background-color:green" class="nav-item nav-link" href="#">Links</a></nav>';
  $examTable .= '<div style="display:flex; justify-content:space-between; padding:15px;"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
  if($flag){
    $examTable .= '<button class="btn btn-lg btn-success" data-toggle="modal" data-target="#addLink" disabled>Add new Link</button></div>';
    $examTable .= '<h4 style="text-align:center">No links</h4>';
  }
  else{
    $examTable .= '<button class="btn btn-lg btn-success" data-toggle="modal" data-target="#addLink">Add new Link</button></div>';
    $examTable .= '<h4 style="text-align:center">No links</h4>';
  }
}
echo $examTable;
?>
