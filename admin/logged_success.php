<?php
session_start();
if(!isset($_SESSION['logged_in']) ) {
  // header("location:admin.php");
  header("Location: ../main/error.html?error=You_are_not_logged_in");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Admin - VF Study</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- bootstrap css -->
    <!-- Latest compiled Bootstrap and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/narrow-style.css">

    <!--[if IE]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <link href='//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <script src="../js/global.js"></script>
    <script src="../js/admin.js"></script>

</head>

<body>
    <div class="container">
        <div class="header">
            <h2 class="text-muted">Mock Test Configuration</h2>
        </div>
        
        <br>

        <div class="well">

            <form class="form-horizontal">
                <fieldset>
                    <!-- Form Name -->
                    <legend>Download Study Data</legend>

                    <div class="form-group">
                        <!-- <div class="col-md-4 col-md-offset-4">
                            <a id="download_from_db" class="btn btn-primary btn-outline flex-item form-control" role="button" href="../db/pull_users.php">
                                <span class="glyphicon glyphicon-download-alt"></span>&nbsp;&nbsp;Download from DB
                            </a>
                        </div> -->
                        <div class="col-md-4">
                            <a id="download_data" class="btn btn-primary btn-outline flex-item form-control" role="button" href="../db/pull_data.php">
                                <span class="glyphicon glyphicon-download-alt"></span>&nbsp;&nbsp;Download Data
                            </a>
                            <a id="send_email" class="btn btn-primary btn-outline flex-item form-control" role="button">
                                <span class="glyphicon glyphicon-download-alt"></span>&nbsp;&nbsp;Send Email
                            </a>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>

        <br><br>

        <!-- Modal for the Please Wait Form-->
        <div class="modal fade bs-example-modal-sm" id="myPleaseWait" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-time">
                            </span>&nbsp;&nbsp;Preparing ZIP File to Download...
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="progress">
                            <div class="progress-bar progress-bar-info progress-bar-striped active" style="width: 100%">
                            </div>
                            <br>
                        </div>
                        <div>
                            <p>This process could take a few minutes. Once the file is downloaded please close this message.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal ends Here -->

        <footer class="footer">
            <!-- <p>&copy; USU 2016</p> -->
        </footer>

    </div>
    <!-- /container -->

</body>

</html>