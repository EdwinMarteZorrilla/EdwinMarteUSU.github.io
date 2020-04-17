<?php

require_once('/var/www/html/NHR-Core/development/login/admin/editExams/php/editExamsFunctions.php');

//header('Content-Type: application/json');

$aResult = array();

if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

//if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

if( !isset($aResult['error']) ) {

    switch($_POST['functionname']) {
        case 'add-id':
            $aResult['data'] = addId();
            break;
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

        default:
           $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
           break;
    }

}

//echo json_encode($aResult);
echo $aResult;

?>

