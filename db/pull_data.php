<?php

require_once('../include/config.php');

// set error handler
set_error_handler("customError");

$dir    = '..' . OUTPUT_PATH;
$zipFileName = '..' . ZIPS_PATH . '/' . ZIP_CSV_FILE;

// console_log($zipFileName);

// if true, good; if false, zip creation failed
// $result = create_zip($files_to_zip, $zipFileName, true);
$source = OUTPUT_PATH;
$result = zip_folder($dir, $zipFileName, true);

if ($result) {
	//Pass to browser
	header("Content-Type: text/html");
	header("Content-Disposition: attachment; filename=".basename($zipFileName));
	header("Content-Length: ".filesize($zipFileName));
	ob_clean();
	flush();
	readfile($zipFileName);
} else {
	header("Location: ../main/error.html?error=zip_file_could_not_been_created");
}

?>