/*jshint multistr: true */

var variantsJSONList = [];
var variantsObj = {};
var sessionInfo;
var examQuestions = {};

function getQuestions() {
    $.ajax({
        type: 'POST',
        url: './db/load-questions.php',
        dataType: 'json',
        data: {
        },
        success: function (data) {
            examQuestions = data;
            // console.log(examQuestions);
            return true;
        },
        error: function (msg) {
            console.log("AJAX Error");
            console.log(msg);
            return false;
        }
    });
}

function sendEMail(email, subject, body, ccmail) {
    $.ajax({
        type: 'POST',
        url: './db/send_email.php',
        data: {
            email: email.toString(),
            subject: subject.toString(),
            body: body.toString(),
            ccmail: ccmail.toString()
        },
        success: function (data, status) {
            if (data == 'OK') {
                console.log('Email Success');
                $('#msg').html('<h4>The email was sent successfully.</h4>');
                $('#msg_button').html('<br><br><a id="email_ok" class="btn btn-lg btn-primary" data-dismiss="modal">OK</a>');
                return true;
            }
        },
        error: function (xhr, desc, err) {
            console.log(xhr);
            console.log("Details: " + desc + "\nError:" + err);
            $('#msg').html('<h4>The email could not be delivered.</h4>');
            $('#msg_button').html('<br><br><a id="email_ok" class="btn btn-lg btn-primary" data-dismiss="modal">OK</a>');
            return true;
        }
    });
}

function savePromptQuestionAnswer(study_id, question, answer) {
    $.ajax({
        type: 'POST',
        url: './db/save_prompt_question.php',
        dataType: 'json',
        data: {
            study_id: study_id,
            question: question,
            answer: answer
        },
        success: function (data) {
            // TODO: check for correct transmission
            console.log(data);
            if (data.status == 200) {
                console.log('Success');
                return true;
            } else {
                console.log('Error: ' + data.status);
                return false;
            }
        },
        error: function (data) {
            console.log(data);
            if (data.status == 200) {
                console.log('Success');
                return true;
            } else {
                console.log('Error: ' + data.status);
                return false;
            }
        }
    });
}

function getAnswersKeyHTMLTable(answers_key) {

    var html = '<div class="container">\
            <table class="table table-striped">\
            <thead>\
                <tr>\
                <th>Question Number</th>\
                <th>Question Text</th>\
                <th>Your Answer</th>\
                <th>Correct or Incorrect</th>\
                </tr>\
            </thead>\
            <tbody>';

    for (var index in answers_key) {
        html += '<tr>' +
            '<td>' + answers_key[index].question + '</td>' +
            '<td>' + answers_key[index].text + '</td>' +
            '<td>' + answers_key[index].answer + '</td>' +
            '<td>' + answers_key[index].correct + '</td>' +
            '</tr>';
    }

    html += '</tbody></table></div>';

    return html;
}

function pad(num, size) {
    var s = num + "";

    if (num >= 0 && num < 10) {
        while (s.length < size)
            s = "0" + s;
    }

    return s;
}

function saveEventToCSV(event) {
    //console.log("Sent: " + file);

    var str_json = JSON.stringify(event);

    $.ajax({
        type: 'POST',
        url: './db/save_event.php',
        data: {
            event: str_json
        },
        success: function (msg) {
            // console.log(msg);
        },
        error: function (msg) {
            console.log(msg);
        }
    });
}

function saveSelfEfficacyToCSV(self_efficacy) {
    //console.log("Sent: " + file);

    var str_json = JSON.stringify(self_efficacy);
    // console.log(str_json);

    $.ajax({
        type: 'POST',
        url: './db/save_self_efficacy.php',
        data: {
            self_efficacy: str_json
        },
        success: function (msg) {
            //    console.log(msg);
        },
        error: function (msg) {
            console.log(msg);
        }
    });
}

// returns only unique elements of the given array
function getUniqueElementsFromArray(arr) {
    return arr.filter(function (elem, pos) {
        return arr.indexOf(elem) == pos;
    });
}

// Get the given param from the URL
function getQueryParam(key) {
    var vars = [],
        hash;
    var q = document.URL.split('?')[1];
    if (q != undefined) {
        q = q.split('&');
        for (var i = 0; i < q.length; i++) {
            hash = q[i].split('=');
            vars.push(hash[1]);
            vars[hash[0]] = hash[1];
        }
    }

    if (typeof (vars[key]) == "undefined")
        return "";
    else
        return vars[key];
}

function getUserID() {
    var id = $.cookie('user_id');
    return id;
}

function setUserID(val) {
    $.cookie('user_id', val);
}

function getStudyID() {
    var id = $.cookie('study_id');
    return id;
}

function setStudyID(val) {
    $.cookie('study_id', val);
}

// returns a string without repeated characters (letters)
function deleteRepeatedChars(str) {
    return str.split("").filter(function (elem, pos, s) {
        return s.indexOf(elem) == pos;
    }).join("");
}

// This function eliminates commas inside double quotes
function deleteCommasInDoubleQuotes(str) {
    // get rid of commas inside double quotes
    var result = str.replace(/"[^"]+"/g, function (match) {
        return match.replace(/,/g, '');
    });

    return result;
}

function compArrays(arr1, arr2) {
    // if the other arr1 is a falsy value, return
    if (!arr1 || !arr2)
        return false;

    // compare lengths - can save a lot of time
    if (arr2.length != arr1.length)
        return false;

    for (var i = 0, l = arr2.length; i < l; i++) {
        // Check if we have nested arr1s
        if (arr2[i] instanceof Array && arr1[i] instanceof Array) {
            // recurse into the nested arr1s
            if (!arr2[i].equals(arr1[i]))
                return false;
        } else if (arr2[i] != arr1[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }

    return true;
}

function difference(arr1, arr2) {

    var a1 = flatten(arr1, true);
    var a2 = flatten(arr2, true);

    var a = [],
        diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = false;
    }

    for (i = 0; i < a2.length; i++) {
        if (a[a2[i]] === false) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}

var flatten = function (a, shallow, r) {

    if (!r) {
        r = [];
    }

    if (shallow) {
        return r.concat.apply(r, a);
    }

    for (i = 0; i < a.length; i++) {
        if (a[i].constructor == Array) {
            flatten(a[i], shallow, r);
        } else {
            r.push(a[i]);
        }
    }

    return r;
};

function isEmail(email) {

    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
}

function getSessionVars() {

    $.ajax({
        type: 'POST',
        url: '../db/read-session.php',
        dataType: "json",
        success: function (data) {
            console.log(data);
            sessionInfo = data;
        },
        error: function (msg) {
            // console.log(msg);
            sessionInfo = [];
        }
    });
}

function readCookie() {
    var cookiesObj = {};
    var allcookies = document.cookie;
    // console.log ("All Cookies : " + allcookies );

    // Get all the cookies pairs in an array
    var cookiearray = allcookies.split(';');

    // Now take key value pair out of this array
    for (var i = 0; i < cookiearray.length; i++) {
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
        // console.log ("Key is : " + name.trim() + " and Value is : " + value.trim());
        cookiesObj[name.trim()] = value.trim();
    }

    // console.log(cookiesObj);
    return cookiesObj;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
