<?php
    
require_once('../include/config.php');

//set error handler
set_error_handler("customError");

// get the JSON with the responses
$self_efficacy = json_decode($_POST['self_efficacy'], true);

$dir_name = '..' . OUTPUT_PATH . "/" . date("m-d-Y");

// create dir if it doesn't exist
if (!file_exists($dir_name)) {
    mkdir($dir_name, 0777, true);
}

// Create the filename for this user
$file_name = $dir_name . "/" . $self_efficacy["study_id"] . "_self_efficacy.csv";

// if the file does not exist, create it and add the headers
if (!file_exists($file_name)) {
    $myfile = fopen($file_name, "w");
    $txt = "Unix Time,Date,Study ID,Participant ID,Question,Confidence,Nervousness\n";
    fwrite($myfile, $txt);
    fclose($myfile);
}

$myfile = fopen($file_name, "a");

// add the efficacy response into the file
$txt = $self_efficacy["unixtime"] . "," . $self_efficacy["date"] . "," .
$self_efficacy["study_id"] . "," . $self_efficacy["id"] . "," . $self_efficacy["question"] . "," . $self_efficacy["confidence"] . "," . $self_efficacy["nervousness"] . "\n";

fwrite($myfile, $txt);

fclose($myfile);
    
if (file_exists($file_name)) {
    echo "The CSV file was saved";
} else {
    echo "Error: CSV file was not saved";
}
