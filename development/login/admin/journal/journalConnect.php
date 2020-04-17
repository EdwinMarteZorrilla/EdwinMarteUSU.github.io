<?php

require_once('/var/www/html/NHR-Core/development/login/admin/journal/journalFunctions.php');

//header('Content-Type: application/json');

$aResult = array();

if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

if( !isset($aResult['error']) ) {

    switch($_POST['functionname']) {
        case 'loadJournalData':
           $aResult['data'] = loadJournalData();
           break;

        default:
           $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
           break;
    }

}

echo json_encode($aResult);

?>
