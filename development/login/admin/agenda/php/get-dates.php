<?php

require_once('../../../../../include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "agenda");
$sql = "SELECT exam, taken FROM dates;";
$result = mysqli_query($connect,$sql);
$html = '<h1 style="text-align:center">Agenda</h1>';
$html .= '<div style="display:flex; justify-content:flex-end; padding:15px;">';
$html .= '<button class="btn btn-lg btn-success" data-toggle="modal" data-target="#schedule">Schedule exam</button></div>';
$html .= '<table class="table table-striped table-bordered"><tr><th>Exam</th><th>Taken/To be taken</th></tr>';
$count = 0;
while($row = $result->fetch_assoc()){
  $html .= '<tr><td>' . $row['exam'] . '</td><td>' . $row['taken'] . '</td></tr>';
  $count ++;
}
if($count == 0){
  $html = '<h1 style="text-align:center">Agenda</h1>';
  $html .= '<div style="display:flex; justify-content:flex-end; padding:15px;">';
  $html .= '<button class="btn btn-lg btn-success" data-toggle="modal" data-target="#schedule">Schedule exam</button></div>';
  $html .= '<h4 style="text-align:center">No data available</h4>';
}
else{
  $html .= '</table>';
}


echo $html;

?>
