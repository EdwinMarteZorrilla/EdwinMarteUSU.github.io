<?php

DEFINE('EXAM_QUESTIONS_FILE', 'exam_questions.csv');
DEFINE('EXAM_ANSWERS_FILE', 'exam_answers.csv');
DEFINE('GAMES_QUESTIONS_FILE', 'game_questions.csv');
DEFINE('GAMES_ANSWERS_FILE', 'game_answers.csv');
DEFINE('MEDIA_PATH', '../media/');

// Define these as constants so that they can't be changed
DEFINE('DBUSER', 'hillab');
DEFINE('DBPWD', 'hiLL1388web@dm');
DEFINE('DBHOST', 'localhost');
DEFINE('DBNAME', 'hillab');

DEFINE('LOGUSER', 'feellab');
DEFINE('LOGPWD', 'Letmein1');

// email data
DEFINE('LAB_EMAIL', 'feel.lab@aggies.usu.edu');
DEFINE('LAB_EMAIL_NAME', 'FEEL Lab');
DEFINE('LAB_EMAIL_PASSWORD', 'parkinglightsilver');
DEFINE('LAB_SMTP_SERVER', 'smtp.office365.com');

DEFINE('OUTPUT_PATH', '/data/output');
DEFINE('ZIPS_PATH', '/data/zips');
DEFINE('ZIP_CSV_FILE', 'response_data.zip');

function console_log($data)
{
    echo '<script>';
    echo 'console.log(' . json_encode($data) . ')';
    echo '</script>';
}

function create_zip($files = array(), $destination = '', $overwrite = false)
{
    //if the zip file already exists and overwrite is false, return false
    
    // console_log('Files: ' . $files);
    // console_log('Overwrite: ' . $overwrite);
    //set error handler
    set_error_handler("customError");
    
    if (file_exists($destination) && !$overwrite) {
        return false;
    }
    
    $valid_files = array();
    
    // if files were passed in...
    if (is_array($files)) {
        // cycle through each file
        foreach ($files as $file) {
            // make sure the file exists
            if (file_exists($file)) {
                $valid_files[] = $file;
            }
        }
    }
    
    // if we have good files...
    if (count($valid_files)) {
        //create the archive
        
        // console_log('Destination: ' . $destination);
        // console_log('Valid files: ' . json_encode($valid_files));
        
        $zip = new ZipArchive();
        
        $result = $zip->open($destination, ZipArchive::CREATE | ZipArchive::OVERWRITE);
        
        if ($result !== true) {
            console_log(getZipErrorString($result));
            return false;
        }
        
        //add the files
        foreach ($valid_files as $file) {
            $zip->addFile($file, basename($file));
            // console_log('Adding file: ' . basename($file));
        }
        //debug
        //echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;
        
        //close the zip -- done!
        $zip->close();
        
        //check to make sure the file exists
        return file_exists($destination);
    } else {
        return false;
    }
}

function zip_folder($source, $destination, $overwrite = false)
{
    if (!extension_loaded('zip') || (file_exists($destination) && !$overwrite)) {
        return false;
    }
    
    // if (file_exists($destination) && !$overwrite) {
    //     return false;
    // }

    $zip = new ZipArchive();
    if (!$zip->open($destination, ZIPARCHIVE::CREATE | ZipArchive::OVERWRITE)) {
        return false;
    }
    
    $source = str_replace('\\', '/', realpath($source));
    
    if (is_dir($source) === true) {
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);
        
        foreach ($files as $file) {
            $file = str_replace('\\', '/', $file);
            
            // Ignore "." and ".." folders
            if (in_array(substr($file, strrpos($file, '/') + 1), array(
                '.',
                '..'
            )))
                continue;
            
            $file = realpath($file);
            
            if (is_dir($file) === true) {
                $zip->addEmptyDir(str_replace($source . '/', '', $file . '/'));
                // $zip->addEmptyDir(basename($file));
            } else if (is_file($file) === true) {
                $zip->addFromString(str_replace($source . '/', '', $file), file_get_contents($file));
                // $zip->addFromString(pathinfo($file, PATHINFO_BASENAME) . '/' . $file, file_get_contents($file));
            }
        }
    } else if (is_file($source) === true) {
        $zip->addFromString(basename($source), file_get_contents($source));
    }
    
    return $zip->close();
    //check to make sure the file exists
    // return file_exists($destination);
}

function getZipErrorString($error)
{
    
    switch ($error) {
        case ZipArchive::ER_EXISTS:
            return 'ZipArchive::ER_EXISTS -> File already exists';
            break;
        case ZipArchive::ER_INCONS:
            return 'ZipArchive::ER_INCONS -> Zip archive inconsistent.';
            break;
        case ZipArchive::ER_INVAL:
            return 'ZipArchive::ER_INVAL -> Invalid argument.';
            break;
        case ZipArchive::ER_MEMORY:
            return 'ZipArchive::ER_MEMORY -> Malloc failure.';
            break;
        case ZipArchive::ER_NOENT:
            return 'ZipArchive::ER_NOENT -> No such file.';
            break;
        case ZipArchive::ER_NOZIP:
            return 'ZipArchive::ER_NOZIP -> Not a zip archive.';
            break;
        case ZipArchive::ER_OPEN:
            return "ZipArchive::ER_OPEN -> Can't open file.";
            break;
        case ZipArchive::ER_READ:
            return 'ZipArchive::ER_READ -> Read error.';
            break;
        case ZipArchive::ER_SEEK:
            return 'ZipArchive::ER_SEEK -> Seek error.';
            break;
        default:
            return 'ZipArchive::UNKNOWN -> Unknown Error (' . $error . ')';
            break;
    }
}

//error handler function
function customError($errno, $errstr)
{
    // echo "<b>Error:</b> [$errno] $errstr";
    console_log('Error: [' . $errno . '] ' . $errstr);
}
