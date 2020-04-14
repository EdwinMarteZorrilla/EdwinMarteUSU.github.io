<?php
include('../../functions.php');

if (!isAdmin()) {
	$_SESSION['msg'] = "You must log in first";
	header('location: ../../login.php');
}

if (isset($_GET['logout'])) {
	session_destroy();
	unset($_SESSION['user']);
	header("location: ../../login.php");
}

require_once('../header/header.php');
require_once('./journalFunctions.php');
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Journal</title>
  <!-- bootstrap css -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

  <link href='//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'
    rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="journal.css">
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src='journal.js'></script>
  <script src="../../../../js/jquery.cookie.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>

</head>

<body>
    <h1>Exams Journal</h1>
	<form method="post" action="journalFunctions.php">

		<?php echo display_error(); ?>

		<div class="input-group">
			<label>Username</label>
			<input type="text" name="username" value="<?php echo $username; ?>">
		</div>
		<div class="input-group">
			<label>Email</label>
			<input type="email" name="email" value="<?php echo $email; ?>">
		</div>
		<div class="input-group">
			<label>Event Date</label>
			<input type="date" name="event_date">
		</div>
		<div class="input-group">
			<label>Test Name</label>
			<input type="text" name="test">
		</div>
		<div class="input-group">
			<label>Activity Type</label>
			<input type="text" name="activity">
		</div>
		<div class="input-group">
			<label>Details (Optional)</label>
			<input type="text" name="detail">
		</div>
		<div class="input-group">
			<button type="submit" class="btn" name="add_entry_btn">Add Entry</button>
		</div>
	</form>
    <div>
        <?php loadJournalData(); ?>
    </div>
</body>

</html>
