<?php

require_once('/var/www/html/NHR-Core/include/config.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "");

function addId($exam, $newId) {
    global $connect;
    $sql = "INSERT INTO exams.ids" . $_POST['exam'] . " (study_id) VALUES('" . $_POST['newId'] . "')";
    $result = mysqli_query($connect,$sql);
    if($result){
      echo '{"result": true}';
    }
    else{
      echo '{"result": false}';
    }
}

function loadExams() {
    global $connect;
    $result = mysqli_query($connect,"SHOW TABLES IN exams;");
    $current = mysqli_query($connect,"SELECT * FROM exams.current;");
    
    while($row = $current->fetch_assoc()){
      $temp = $row['currentExam'];
      $examTable = '<h1 style="text-align:center">Exams</h1><div class="form-group"><label for="current"><b>Current exam: ' . $row['currentExam'] . '</b></label><select class="form-control" id="current">';
      $examTable .= '<option class="dropdown-item" href="#">' . $row['currentExam'] .'</option>';
    }
    
    while($row = $result->fetch_assoc()){
      if(substr($row['Tables_in_exams'],0,5) != 'links' and substr($row['Tables_in_exams'],0,3) != 'ids' and substr($row['Tables_in_exams'],0,3) != 'ans' and $row['Tables_in_exams'] !='current' and $row['Tables_in_exams'] != $temp ){
        $examTable .= '<option class="dropdown-item" href="#">' . $row['Tables_in_exams'] .'</option>';
      }
    }
    
    $examTable .= '</select></div>';
    $examTable .= '<table class="table table-striped table-bordered"> <tr><th>Exams</th><th></th></tr>';
    
    $result = mysqli_query($connect,"SHOW TABLES IN exams;");
    
    while($row = $result->fetch_assoc()){
      if(substr($row['Tables_in_exams'],0,5) != 'links' and substr($row['Tables_in_exams'],0,3) != 'ids' and substr($row['Tables_in_exams'],0,3) != 'ans' and $row['Tables_in_exams'] !='current' ){
        $sql = "SELECT taken FROM agenda.dates WHERE exam='" . $row['Tables_in_exams'] . "'";
        $result2 = mysqli_query($connect,$sql);
        $flag = false;
        while($row2 = $result2->fetch_assoc()){
          if($row2['taken'] < date("Y-m-d")){
            $flag = true;
          }
        }
        if($flag){
          $examTable .= '<tr><td>' . $row['Tables_in_exams'] . '</td><td><button style="margin-right:10px; margin-left:10px" class="btn btn-outline-success btn-sm" onclick="editExam(\'' . $row['Tables_in_exams'] . '\')">View</button>';
          $examTable .= '<button style="margin-right:10px; margin-left:10px" class="btn btn-outline-secondary btn-sm" onclick="copyExam(\'' . $row['Tables_in_exams'] . '\')">Copy</button>';
          $examTable .= '<button style="margin-right:10px; margin-left:10px" class="btn btn-outline-secondary btn-sm" onclick="exportCSV(\'' . $row['Tables_in_exams'] . '\')">Export</button>';
          $examTable .= '<p style="display:inline;">Taken exams cannot be deleted or edited</p>';
          $examTable .= '</td></tr>';
        }
        else{
          $examTable .= '<tr><td>' . $row['Tables_in_exams'] . '</td><td><button style="margin-right:10px; margin-left:10px" class="btn btn-outline-success btn-sm" onclick="editExam(\'' . $row['Tables_in_exams'] . '\')">Edit</button>';
          $examTable .= '<button style="margin-right:10px; margin-left:10px" class="btn btn-outline-secondary btn-sm" onclick="copyExam(\'' . $row['Tables_in_exams'] . '\')">Copy</button>';
          $examTable .= '<button style="margin-right:10px; margin-left:10px" class="btn btn-outline-secondary btn-sm" onclick="exportCSV(\'' . $row['Tables_in_exams'] . '\')">Export</button>';
          $examTable .= '<button style="margin-right:10px; margin-left:10px" class="btn btn-outline-danger btn-sm" onclick="deleteExam(\'' . $row['Tables_in_exams'] . '\')">Delete</button>';
          $examTable .= '</td></tr>';
        }
      }
    }
    $examTable .= '</table><button data-toggle="modal" data-target="#add" class="btn btn-lg btn-success btn-block">Add</button>';
    
    return $examTable;
}

function copyExams($parameters) {
    global $connect;
    $exam = "CREATE TABLE exams." . $parameters['new'] . " ( question_id INT NOT NULL AUTO_INCREMENT, question VARCHAR(21844) NOT NULL, image VARCHAR(1000), answer VARCHAR(5) NOT NULL, PRIMARY KEY (question_id));";
    $answers = "CREATE TABLE exams.answers" . $parameters['new'] . " ( answer_id INT NOT NULL AUTO_INCREMENT, question_id INT NOT NULL, answer VARCHAR(21844) NOT NULL, PRIMARY KEY (answer_id));";
    $ids = "CREATE TABLE exams.ids" . $parameters['new'] . " (id INT NOT NULL AUTO_INCREMENT, study_id VARCHAR(100) NOT NULL, PRIMARY KEY (id))";
    $links = "CREATE TABLE exams.links" . $parameters['new'] . "(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(200) NOT NULL, link VARCHAR(2000), after INT NOT NULL, PRIMARY KEY (id))";
    $result = mysqli_query($connect,$exam);
    $result2 = mysqli_query($connect,$answers);
    $result3 = mysqli_query($connect,$ids);
    $result4 = mysqli_query($connect,$links);
    
    $copyQuests = 'INSERT exams.' . $parameters['new'] . ' SELECT * FROM exams.' . $parameters['copy'];
    $copyIds = 'INSERT exams.ids' . $parameters['new'] . ' SELECT * FROM exams.ids' . $parameters['copy'];
    $copyAns = 'INSERT exams.answers' . $parameters['new'] . ' SELECT * FROM exams.answers' . $parameters['copy'];
    $copyLinks = 'INSERT exams.links' . $parameters['new'] . ' SELECT * FROM exams.links' . $parameters['copy'];
    $result5 = mysqli_query($connect,$copyQuests);
    $result6 = mysqli_query($connect,$copyAns);
    $result7 = mysqli_query($connect,$copyLinks);
    $result8 = mysqli_query($connect,$copyIds);
    
    
    $sql = "SELECT question_id, question, image, answer FROM exams." . $parameters['copy'];
    $result = mysqli_query($connect,$sql);
    return '{"result": true}';
}

?>
