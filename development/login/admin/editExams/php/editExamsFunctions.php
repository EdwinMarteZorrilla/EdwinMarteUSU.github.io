<?php

require_once('/var/www/html/NHR-Core/include/config.php');
require_once('/var/www/html/NHR-Core/development/login/admin/journal/journalFunctions.php');

$connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "");

function loadExams() {
    global $connect;
    $result = mysqli_query($connect,"SHOW TABLES IN exams;");
    $current = mysqli_query($connect,"SELECT * FROM exams.current;");

    while($row = $current->fetch_assoc()){
      $temp = $row['currentExam'];
      $examTable = '<h1 style="text-align:center">Exams</h1><div align="center" class="form-group"><label for="current"><b>Current exam: ' . $row['currentExam'] . '</b></label><select style="width:25vw;" class="form-control" id="current">';
      $examTable .= '<option class="dropdown-item" href="#">' . $row['currentExam'] .'</option>';
    }

    while($row = $result->fetch_assoc()){
      if(substr($row['Tables_in_exams'],0,5) != 'links' and substr($row['Tables_in_exams'],0,3) != 'ids' and substr($row['Tables_in_exams'],0,3) != 'ans' and $row['Tables_in_exams'] !='current' and $row['Tables_in_exams'] != $temp ){
        $examTable .= '<option class="dropdown-item" href="#">' . $row['Tables_in_exams'] .'</option>';
      }
    }

    $examTable .= '</select></div>';
    $examTable .= '<table align="center" style="width:85vw" class="table table-striped table-bordered"> <tr><th>Exams</th><th></th></tr>';

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
    $examTable .= '</table><div align="center" style="display:flex;justify-content:center"><button style="width:85vw" data-toggle="modal" data-target="#add" class="btn btn-lg btn-success btn-block">Add</button></div>';

    return $examTable;
}

function copyExams($parameters) {
    global $connect;
    $exam = "CREATE TABLE exams." . $parameters['new'] . " ( question_id INT NOT NULL AUTO_INCREMENT, question VARCHAR(21844) NOT NULL, image VARCHAR(1000), answer VARCHAR(5) NOT NULL, PRIMARY KEY (question_id));";
    $answers = "CREATE TABLE exams.answers" . $parameters['new'] . " ( answer_id INT NOT NULL AUTO_INCREMENT, question_id INT NOT NULL, answer VARCHAR(21844) NOT NULL, PRIMARY KEY (answer_id));";
    $ids = "CREATE TABLE exams.ids" . $parameters['new'] . " (id INT NOT NULL AUTO_INCREMENT, study_id VARCHAR(100) NOT NULL, bday VARCHAR(30) NOT NULL, anumber VARCHAR(20) NOT NULL, PRIMARY KEY (id))";
    $links = "CREATE TABLE exams.links" . $parameters['new'] . "(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(200) NOT NULL, link VARCHAR(2000), on_question INT NOT NULL, PRIMARY KEY (id))";
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
    addEntryEvent(date("Y/m/d"), $parameters['copy'], "Copy exam", "New exam: ".$parameters['new']);
    return '{"result": true}';
}

function loadExamLinks($parameters) {
    $json = '{"name":"' . $parameters['exam'] . '","editable":';
    $connect2 = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "agenda");
    $sql = "SELECT taken FROM dates WHERE exam='" . $parameters['exam'] . "'";
    $result2 = mysqli_query($connect2,$sql);
    $flag = false;
    while($row2 = $result2->fetch_assoc()){
      if($row2['taken'] < date("Y-m-d")){
        $json .= 'true, "links":[';
        $flag = true;
      }
    }
    if(!$flag){
      $json .= 'false, "links":[';
    }

    $connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
    $sql = "SELECT id,name, link,on_question FROM links" . $parameters['exam'];
    $result = mysqli_query($connect,$sql);

    $count = 1;


    while($row = $result->fetch_assoc()){
      $json .= '{"id":' . $row['id'] . ',"number":' . $count . ',"name":"' . $row['name'] . '","link":"' .$row['link'] . '","on_question":"' . $row['on_question'] . '"},';
      $count = $count + 1;
    }
    $json = rtrim($json,",");
    $json .= ']}';
    
    return $json;
}

function loadExamQuestions($parameters) {
    $json = '{"name":"' . $parameters['exam'] . '","editable":';
    $connect2 = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "agenda");
    $sql = "SELECT taken FROM dates WHERE exam='" . $parameters['exam'] . "'";
    $result2 = mysqli_query($connect2,$sql);
    $flag = false;
    while($row2 = $result2->fetch_assoc()){
      if($row2['taken'] < date("Y-m-d")){
        $json .= 'true, "questions":[';
        $flag = true;
      }
    }
    if(!$flag){
      $json .= 'false, "questions":[';
    }
    $connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
    $sql = "SELECT question_id, question, image, answer FROM " . $parameters['exam'];
    $result = mysqli_query($connect,$sql);
    $counter = 1;
    while($row = $result->fetch_assoc()){
      $json .= '{"id":' . $row['question_id'] . ',"number":' . $counter . ',"question":"' . $row['question'] . '","image":"' .$row['image'] . '","correct":"' . $row['answer'] . '","answers":[';

      $answer = mysqli_query($connect, "SELECT answer FROM answers" . $parameters['exam'] . " WHERE question_id = " . $row['question_id'] . ";");
      while($row2 = $answer->fetch_assoc()){
        $json .= '"' . $row2['answer'] . '",';
      }
      $json = rtrim($json, ",");
      $json .= ']},';
      $counter++;
    }
    $json = rtrim($json, ",");
    $json .= ']}';
    return $json;
}

function loadExamIds($parameters) {
    $connect2 = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "agenda");
    $sql = "SELECT taken FROM dates WHERE exam='" . $parameters['exam'] . "'";
    $result2 = mysqli_query($connect2,$sql);
    $flag = false;
    while($row2 = $result2->fetch_assoc()){
      if($row2['taken'] < date("Y-m-d")){
        $flag = true;
      }
    }
    $connect = mysqli_connect("127.0.0.1:3306", "root", DB_PASS, "exams");
    $sql = "SELECT id, study_id,bday,anumber FROM ids" . $parameters['exam'];
    $result = mysqli_query($connect,$sql);
    $examTable = '<h1 style="text-align:center">' .$parameters['exam'] . '</h1>';
    $examTable .= '<div style="display:flex; justify-content:center"><div style="width:85vw"><nav class="nav nav-pills nav-fill"><a id="tab1" style="border-style:solid;border-color:green; border-width:1px;color:green;" onclick="switchTabs(\'questions\')" class="nav-item nav-link" href="#">Questions</a><a id="tab2" onclick="switchTabs(\'ids\')" style="background-color:green; color:white" class="nav-item nav-link" href="#">Study IDs</a>';
    $examTable .= '<a id="tab3" onclick="switchTabs(\'links\')" style="border-style:solid;border-color:green; border-width:1px;color:green" class="nav-item nav-link" href="#">Links</a></nav>';
    $examTable .= '<div style="display:flex; justify-content:space-between; padding:15px;"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';

    if($flag){
      $examTable .= '<div style="display:flex justify-content:space-between"><button data-toggle="modal" data-target="#importModal" style="margin-right:10px"class="btn btn-lg btn-outline-secondary" disabled>Import</button><button class="btn btn-lg btn-success" data-toggle="modal" data-target="#idInput" disabled>Add new ID</button></div></div>';
      $examTable .= '<table class="table table-striped table-bordered"><tr><th>#</th><th>ID</th><th>Birthday</th><th>A-number</th></tr>';
    }
    else{
      $examTable .= '<div style="display:flex justify-content:space-between"><button data-toggle="modal" data-target="#importModal" style="margin-right:10px"class="btn btn-lg btn-outline-secondary">Import</button><button class="btn btn-lg btn-success" data-toggle="modal" data-target="#idInput">Add new ID</button></div></div>';
      $examTable .= '<table class="table table-striped table-bordered"><tr><th>#</th><th>ID</th><th>Birthday</th><th>A-number</th><th></th></tr>';
    }
    $count = 1;
    while($row = $result->fetch_assoc()){
      $examTable .= '<tr><td>' . $count . '</td><td>' . $row['study_id'] . '</td><td>' . $row['bday'] .'</td><td>' . $row['anumber'] .'</td>';
      if(!$flag){
        $examTable .= '<td><button style="margin-right:10px; margin-left:10px" class="btn btn-outline-danger btn-sm" onclick="deleteId(\'' . $row['study_id'] . '\')">Delete</button></td>';
      }
      $examTable .= '</tr>';
      $count = $count + 1;
    }
    $examTable .= '</table>';
    $examTable .= '<div style="display:flex; justify-content:space-between; padding:15px"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
    if($flag){
      $examTable .= '<div style="display:flex justify-content:space-between"><button data-toggle="modal" data-target="#importModal" style="margin-right:10px"class="btn btn-lg btn-outline-secondary" disabled>Import</button><button class="btn btn-lg btn-success" data-toggle="modal" data-target="#idInput" disabled>Add new ID</button></div></div></div></div>';
    }
    else{
      $examTable .= '<div style="display:flex justify-content:space-between"><button data-toggle="modal" data-target="#importModal" style="margin-right:10px"class="btn btn-lg btn-outline-secondary">Import</button><button class="btn btn-lg btn-success" data-toggle="modal" data-target="#idInput">Add new ID</button></div></div></div></div>';
    }
    if($count == 1){
      $examTable = '<h1 style="text-align:center">' .$parameters['exam'] . '</h1>';
      $examTable .= '<div style="display:flex; justify-content:center"><div style="width:85vw"><nav class="nav nav-pills nav-fill"><a id="tab1" style="border-style:solid;border-color:green; border-width:1px;color:green;" onclick="switchTabs(\'questions\')" class="nav-item nav-link" href="#">Questions</a><a id="tab2" onclick="switchTabs(\'ids\')" style="background-color:green; color:white" class="nav-item nav-link" href="#">Study IDs</a>';
      $examTable .= '<a id="tab3" onclick="switchTabs(\'links\')" style="border-style:solid;border-color:green; border-width:1px;color:green" class="nav-item nav-link" href="#">Links</a></nav>';
      $examTable .= '<div style="display:flex; justify-content:space-between; padding:15px;"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
      if($flag){
        $examTable .= '<div style="display:flex justify-content:space-between"><button data-toggle="modal" data-target="#importModal" style="margin-right:10px"class="btn btn-lg btn-outline-secondary" disabled>Import</button><button class="btn btn-lg btn-success" data-toggle="modal" data-target="#idInput" disabled>Add new ID</button></div></div></div></div>';
      }
      else{
        $examTable .= '<div style="display:flex justify-content:space-between"><button data-toggle="modal" data-target="#importModal" style="margin-right:10px"class="btn btn-lg btn-outline-secondary">Import</button><button class="btn btn-lg btn-success" data-toggle="modal" data-target="#idInput">Add new ID</button></div></div></div></div>';
      }
      $examTable .= '<h4 style="text-align:center">No IDs</h4>';
    }
    return $examTable;
}
?>
