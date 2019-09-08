<?php
    
    require_once('../include/config.php');

    //set error handler
    set_error_handler("customError");

    // get the JSON with the responses
    $event = json_decode($_POST['event'], true);

    $dir_name = '..' . OUTPUT_PATH . "/" . date("m-d-Y");

    // create dir if it doesn't exist
    if (!file_exists($dir_name)) {
        mkdir($dir_name, 0777, true);
    }

    // Create the filename for this user
    $file_name = $dir_name . '/' . $event["study_id"] . "_events.csv";

    // if the file does not exist, create it and add the header
    if(!file_exists($file_name)) {
        $myfile = fopen($file_name, "w");
        $txt = "Unix Time,Date,Study ID,Participant ID,Type,Question,Answer Numeric,Answer Alpha,Correct Answer,Description\n";
        fwrite($myfile, $txt);
        fclose($myfile);     
    }

    $myfile = fopen($file_name, "a");

    // add the event into the file
    $txt = $event["unixtime"] . "," . $event["date"] . "," .
    $event["study_id"] . "," . $event["id"] . "," . $event["type"] . "," . $event["question"] . "," .
    $event["answer_num"] . "," . $event["answer_alpha"] . "," . $event["correct"] . "," . $event["description"] . "\n";
    
    fwrite($myfile, $txt);
    
    fclose($myfile);
    
    if(file_exists($file_name)) {
        echo "The CSV file was saved";
    } else {
        echo "Error: CSV file was not saved";
    }
    
?>
