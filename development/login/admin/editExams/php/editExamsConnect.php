<?php

require_once('/var/www/html/NHR-Core/development/login/admin/editExams/php/editExamsFunctions.php');
require_once('/var/www/html/NHR-Core/development/login/admin/journal/journalFunctions.php');

//header('Content-Type: application/json');

$aResult = array();

if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

//if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

if( !isset($aResult['error']) ) {

    switch($_POST['functionname']) {
        case 'loadExams':
            $aResult = loadExams();
            break;
        case 'copyExams':
            $parameters = $_POST['parameters'];
            $aResult = copyExams($parameters);
            break;
        case 'loadExamLinks':
            $parameters = $_POST['parameters'];
            $aResult = loadExamLinks($parameters);
            break;
        case 'loadExamQuestions':
            $parameters = $_POST['parameters'];
            $aResult = loadExamQuestions($parameters);
            break;
        case 'loadExamIds':
            $parameters = $_POST['parameters'];
            $aResult = loadExamIds($parameters);
            break;
        case 'loadExamVariables':
            $parameters = $_POST['parameters'];
            $aResult = loadExamVariables($parameters);
            break;

        default:
           $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
           break;
    }

}

//echo json_encode($aResult);
echo $aResult;

?>
