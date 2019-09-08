<?php
	ob_start();

	require_once('../include/config.php');

	// username and password sent from form 
	$myusername=$_POST['myusername']; 
	$mypassword=$_POST['mypassword']; 

	if( $myusername == LOGUSER && $mypassword == LOGPWD ) 
	{
		session_start ();
		$_SESSION["logged_in"] = true;
		header("location:logged_success.php");
		//header("location:login_success.php");
	} else{
		header("Location: ../main/error.html?error=Wrong_Username_or_Password");
	}

	ob_end_flush();
?>