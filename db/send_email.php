<?php

require_once('../include/config.php');
// require_once('../phpmailer/PHPMailerAutoload.php');

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load composer's autoloader
require '../vendor/autoload.php';

$email = $_POST['email'];
$subject =  $_POST['subject'];
$body =  $_POST['body'];
$ccmail =  $_POST['ccmail'];

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions

try {
    //Server settings
    // $mail->SMTPDebug = 1;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = LAB_SMTP_SERVER;                            // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = LAB_EMAIL;                              // SMTP username
    $mail->Password = LAB_EMAIL_PASSWORD;                     // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    $mail->SMTPOptions = array(
      'ssl' => array(
          'verify_peer' => false,
          'verify_peer_name' => false,
          'allow_self_signed' => true
        )
    );

    //Recipients
    $mail->setFrom(LAB_EMAIL, LAB_EMAIL_NAME);
    $mail->addAddress($email);                                // Add a recipient
    // $mail->addAddress('ellen@example.com');                // Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    $mail->addCC(LAB_EMAIL);
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body    = $body;
    $mail->AltBody = strip_tags($body);

    $mail->send();
    echo 'OK';
} catch (Exception $e) {
    echo 'Error: ', $mail->ErrorInfo;
}

?>