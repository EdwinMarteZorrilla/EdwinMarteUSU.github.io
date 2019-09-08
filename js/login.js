
$(document).ready(function () {

    // Ask for participant ID
    $('#login-modal').modal({backdrop: 'static', keyboard: false});
    // $('#login-modal').modal('show');

    // $("#login").click(function (event) {
    //     event.preventDefault();

    //     // read input from user
    //     var id = $('#user_id').val();
    //     // console.log("ID:" + id);

    //     if (id == "") {
    //         // alert("You must introduce a valid ID");
    //         console.log("No ID Provided");
    //         return false;
    //     } else {
    //         // save the User ID in a cookie
    //         setUserID(id);

    //         // get the exam questions
    //         getQuestions();

    //         $('#login-modal').modal('hide');
    //         // header("location:./main/test.html");
    //     }
    // });

});

function saveUserID(event) {
    event.preventDefault();

    // read input from user
    var id = $('#user_id').val();
    // console.log("ID:" + id);

    if (id == "") {
        // alert("You must introduce a valid ID");
        console.log("No ID Provided");
        return false;
    } else {
        // save the User ID in a cookie
        setUserID(id);

        // get the exam questions
        getQuestions();

        $('#login-modal').modal('hide');
        // header("location:./main/test.html");
    }
}

