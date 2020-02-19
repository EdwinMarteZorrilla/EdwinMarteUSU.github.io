<?php
    
    require_once('../include/config.php');

    //set error handler
    set_error_handler("customError");

    $study_id = $_POST['study_id'];
    $question = $_POST['question'];
    $answer = $_POST['answer'];

    $dir_name = '..' . OUTPUT_PATH . "/" . date("m-d-Y");

    // create dir if it doesn't exist
    if (!file_exists($dir_name)) {
        mkdir($dir_name, 0777, true);
    }

    // Create the filename for this user
    $file_name = $dir_name . '/' . $study_id . "_prompt.txt";

    $txt = $question . PHP_EOL . PHP_EOL . $answer . PHP_EOL;

    $myfile = fopen($file_name, "w");
    
    fwrite($myfile, $txt);
    
    fclose($myfile);
    
    if(file_exists($file_name)) {
        echo "The TXT file was saved";
    } else {
        echo "Error: TXT file was not saved";
    }
    
?>
