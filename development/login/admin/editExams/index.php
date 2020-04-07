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
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Exams</title>
  <!-- <meta name="viewport" content="width=device-width,initial-scale=1"> -->
  <!-- bootstrap css -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

  <link href='//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'
    rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <script src='./js/main.js'></script>
  <script src="../../../../js/jquery.cookie.js"></script>

</head>

<body>
    <div class="contentMiddle">
            <div id="menu">
                <ul>
                    <li><a href="../home.php">Home</a></li>
                </ul>
            </div>
	</div>
  <div id="table">

  </div>
  <div id="exam" style="display:none;">
  </div>
	<div id="study_ids" style="display:none;">
	</div>
  <div id="add" style="display:none;">
    <label for="name">Exam name:</label>
    <input type="text" id="name" name="name">
    <button class="btn btn-lg btn-success" onclick="createExam()">Create</button>
  </div>

  <div id="questions" style="display:none;">
		`<div class="form-group">
      <label for="name">Question:</label>
      <input type="text" class="form-control"  id="question" placeholder="Enter the question" name"question">
    </div>
    <div class="form-group">
      <label for="name">Possible answer A:</label>
      <input type="text" class="form-control" placeholder="Answer A" id="A" name"a">
    </div>
    <div class="form-group">
      <label for="name">Possible answer B:</label>
      <input type="text" class="form-control" id="B" placeholder="Answer B" name"b">
    </div>
    <div class="form-group">
      <label for="name">Possible answer C:</label>
      <input type="text" class="form-control" id="C" placeholder="Answer C" name"c">
    </div>
    <div class="form-group">
      <label for="name">Possible answer D:</label>
      <input type="text" class="form-control" id="D" placeholder="Answer D" name"d">
    </div>
    <div class="form-group">
      <label for="name">Possible answer E:</label>
      <input type="text" class="form-control" id="E" placeholder="Answer E" name"e">
    </div>
    <div class="form-group">
      <label for="name">Correct answer:</label>
      <input type="text" class="form-control" maxlength="1"style="text-transform: uppercase" onkeydown="return limitInput(event);" id="correct" name"correct" placeholder="Please enter the letter of the correct answer A-E">
    </div>
    <label for="image">Image:</label>
	    <div class="custom-file">
	      <input accept="image/*" type="file" class="custom-file-input" id="image" name='userfile'>
	      <label class="custom-file-label" for="image" id="label">Choose file</label>
	    </div>
    <div style="display:flex; justify-content:space-between; padding:10px;">
      <button class="btn btn-secondary" onclick="backToExams()">Back to exams</button>
      <button class="btn btn-lg btn-success" onclick="newQuestion()">Add Question</button>
    </div>`
  </div>


	<div class="modal fade" id="idInput" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Enter the new ID</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <label for="newID" class="col-form-label">New ID:</label>
        <input style="text-transform: uppercase" onkeyup="this.value = this.value.toUpperCase()" type="text" class="form-control" id="newID">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-secondary btn-success" onclick="saveId()">Save</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="importModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
	<div class="modal-content">
		<div class="modal-header">
			<h5 class="modal-title" id="imputModalTitle">Select a file</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="modal-body">
			<div class="custom-file">
	      <input accept=".csv" type="file" class="custom-file-input" id="newImport" name='userfile'>
	      <label class="custom-file-label" for="image" id="csvlabel">Choose file</label>
	    </div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			<button type="button" class="btn btn-secondary btn-success" onclick="importIds()">Add</button>
		</div>
	</div>
</div>
</div>

</body>

</html>
