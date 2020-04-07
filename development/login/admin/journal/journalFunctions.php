<?php

require_once('/var/www/html/NHR-Core/include/config.php');

// connect to database
$db = mysqli_connect('127.0.0.1:3306', 'root', DB_PASS, 'login');

function loadJournalData() {
    echo("Test ");
}

?>
