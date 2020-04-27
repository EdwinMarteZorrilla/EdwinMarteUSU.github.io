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
	<form id="newEntryForm" method="post" action="journalFunctions.php">

		<?php echo display_error(); ?>

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

	<button type="submit" class="btn" onclick="loadPrevious()">&lt&lt&lt</button>
	<button type="submit" class="btn" onclick="loadNext()">&gt&gt&gt</button>

    <div>
        <table id="journalTable">
            <tr class="headerRow">
                <th>Date of Entry</th>
                <th>User</th>
                <th>Email</th>
                <th>Date of Event</th>
                <th>Test</th>
                <th>Activity</th>
                <th>Details</th>
                <th>Delete Entry</th>
            </tr>
        </table>
    </div>
</body>

</html>
