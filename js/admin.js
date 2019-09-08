/*jshint multistr: true */

function executeCommand(command) {

    var r = confirm("Delete All Data?");
    if (r == true) {
        console.log("The command is: " + command);
        $.ajax({
            type: 'POST',
            url: '../db/admin-command.php',
            data: {
                command: command
            },
            success: function(data) {
                console.log("Command: [" + command + "] was executed");
                alert("Command: [" + command + "] was executed");
                PopulateTable();
            },
            error: function(msg) {
                console.log(msg);
            }
        });
    }
}

$(document).ready(function() {

    // if download was clicked then display a Please Wait... window
    $('#download_data').click(function(event) {
        // Remember the link href
        var href = this.href;

        // Don't follow the link
        event.preventDefault();

        // show a Please Wait... window
        $('#myPleaseWait').modal('show');

        window.location = href;
        // $('#myPleaseWait').modal('hide');
    });

    $("#send_email").click(function (event) {
        var table = '<div class="container">\
            <h2>Striped Rows</h2>\
            <p>Here is the results of your practice exam</p>\
            <table class="table table-striped">\
                <thead>\
                    <tr>\
                        <th>Firstname</th>\
                        <th>Lastname</th>\
                        <th>Email</th>\
                    </tr>\
                </thead>\
                <tbody>\
                    <tr>\
                        <td>John</td>\
                        <td>Doe</td>\
                        <td>john@example.com</td>\
                    </tr>\
                    <tr>\
                        <td>Mary</td>\
                        <td>Moe</td>\
                        <td>mary@example.com</td>\
                    </tr>\
                    <tr>\
                        <td>July</td>\
                        <td>Dooley</td>\
                        <td>july@example.com</td>\
                    </tr>\
                </tbody>\
            </table>\
        </div>';

        var email = 'paulvicioso@gmail.com';
        var subject = 'ENGR 2010 (Statics) Practice Exam Results';
        var body = 'Hi,<br><br>Here is the answers key from your practice test.<br>' + table;
        var ccmail = '';

        sendEMail(email, subject, body, ccmail);
    });

});