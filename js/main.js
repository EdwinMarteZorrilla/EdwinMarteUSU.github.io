/*jshint multistr: true */
let links = []
var DEBUG_MODE = true;
var NUM_TEST_QUESTIONS = 0; // 0 for all

// Qualtrics Surveys
var SURVEY_PRE_EXAM_LINK = "https://oregon.qualtrics.com/jfe/form/SV_29uye3Rm6EvZw7r";
var SURVEY_40_MIN_LINK = "https://oregon.qualtrics.com/jfe/form/SV_5nVtBb53SNq3KvP";
var SURVEY_AT_END_TEST_LINK = "https://oregon.qualtrics.com/jfe/form/SV_6XccY3rT0uwtRxH";
var SURVEY_AFTER_20_MIN_LINK = "https://oregon.qualtrics.com/jfe/form/SV_0cBWXNgHZ3IbzDf";
// var YOUTUBE_INTRO_VIDEO_LINK = "https://youtu.be/3KrfamSDrJA";
var YOUTUBE_INTRO_VIDEO_LINK = "https://youtu.be/lDdtbynxyA0";
var SURVEY_PROMPT_LINK = "https://oregon.qualtrics.com/jfe/form/SV_3ITkIqti7gfcHwp";

var timeCounter;

var GAME_TIME = 30.0;   // 30 seconds
var HALFTIME_BREAK_TIME = 40 * 60;   // 40 minutes
var AFTER_10_MIN_TIME = 10 * 60;   // 20 minutes
var AFTER_20_MIN_TIME = 20 * 60;   // 20 minutes
var SELF_EFFICACY_ANSWERS_DELAY = (1.0 / 60) * 60; // seconds
var ONE_SECOND = (1.0 / 60) * 60; // 1 second
var ONE_MIN = 1 * 60; // 1 minute
var SALIVA_SAMPLE_TIME = 60; // seconds
var ENDING_CLOSE_TIME = 150 * 60; // 2:30:00 = 150 min
var ENDED_TIME = 10 * 60; //10 min
var BEFORE_TEST_PAUSE_TIME = 2 * 60; // seconds

// var studyID = "SP18M01W01ES"; // Spring - 2018 - Midterm 1 -Wednesday Session- Seat 1- EDA & Saliva
var studyID = "FA18M01W01ES"; // Fall - 2018 - Midterm 1 -Wednesday Session- Seat 1- EDA & Saliva

if (DEBUG_MODE) {
    GAME_TIME = 3.0; // 3 seconds
    HALFTIME_BREAK_TIME = (60.0 / 60) * 60; // 1 minutes
    AFTER_20_MIN_TIME = (30.0 / 60) * 60; // 0.5 minutes
    AFTER_10_MIN_TIME = (30.0 / 60) * 60; // 20 minutes
    SELF_EFFICACY_ANSWERS_DELAY = (1.0 / 60) * 60; // 1 seconds
    BEFORE_TEST_PAUSE_TIME = (5.0 / 60) * 60; // seconds
    NUM_TEST_QUESTIONS = 0;
    SALIVA_SAMPLE_TIME = (6.0 / 60) * 60;; // seconds
}

var Modes = {
    EXAM: 1,
    SELF_EFFICACY: 2,
    GAME: 3,
};

var Survey = {
    PRIOR_EXAM: 0,
    PROMPT_ESSAY: 1,
    HALF_EXAM: 2,
    INMEDIATELY_END: 3,
    AFTER_20_MINUNTES_END: 4,
    END: 5
};

var salivaSample = {
    SAMPLE_A: 0,
    SAMPLE_B: 1,
    SAMPLE_C: 2,
    SAMPLE_D: 3,
    SAMPLE_E: 4,
    END: 5
};

var examQuestionEvent = {
    GO_TO_EXAM_QUESTION: 0,
    RETURN_FROM_EXAM_QUESTION: 1
};

var gameQuestionEvent = {
    GO_TO_GAME_QUESTION: 0,
    RETURN_FROM_GAME_QUESTION: 1
};

var salivaEvent = {
    GO_TO_SAMPLE: 0,
    RETURN_FROM_SAMPLE: 1
};

var surveyEvent = {
    GO_TO_SURVEY: 0,
    RETURN_FROM_SURVEY: 1
};

var videoEvent = {
    GO_TO_VIDEO: 0,
    RETURN_FROM_VIDEO: 1
};

var timer;

var currentSurvey = Survey.PRIOR_EXAM;
var currentSalivaSample = salivaSample.SAMPLE_A;

var answers_key = [];

var current_mode = Modes.EXAM;

var promptMessage = [
    "In a few sentences, discuss how one specific topic covered in Statics since your last exam could be useful to you in your future career or coursework and explain why.  Be as specific as possible.",
    "In a few sentences, describe, in as much detail as you can, what the entrance to the library looks like. Provide specific details about the features of the entranceway."
];

var promptQuestion;

function getHTML() {
    switch (current_mode) {
        case Modes.EXAM:
            return getExamQuestionHTML();
        case Modes.GAME:
            return getGameHTML();
        case Modes.SELF_EFFICACY:
            break;
    }
}

function getExamQuestionHTML() {

    var ret = "";

    // str.replace(/[^\x00-\x7F]/g, "");

    if (examQuestions.exam.pos < examQuestions.exam.total) {
        ret = "<h4>" + examQuestions.exam.questions[examQuestions.exam.pos].id + " - " + examQuestions.exam.questions[examQuestions.exam.pos].text + "</h4>";

        // TODO: create code for multiple images
        if (examQuestions.exam.questions[examQuestions.exam.pos].image != "") {
            ret += "<img src='./media/" + examQuestions.exam.questions[examQuestions.exam.pos].image + "' alt='Question #" + examQuestions.exam.questions[examQuestions.exam.pos].id + "'><br><br>";
        } else {
            ret += "<br><br><br><br>";
        }

        // if (examQuestions.exam.questions[examQuestions.exam.pos].id == 5) {
        //     ret += "<br><br><img src='./media/A5.png' height='624' width='367' alt='Question #" + examQuestions.exam.questions[examQuestions.exam.pos].id + "'><br><br>";
        // }

        ret += "<div id='answers'></div>";
    }

    var x = setInterval(function () {
        $("#answers").html(getSelfEfficacyQuestionssHTML());
        clearInterval(x);
    }, SELF_EFFICACY_ANSWERS_DELAY * 1000);

    return ret;
}

function getSelfEfficacyQuestionssHTML() {

    var ret = "<br><p>How confident are you that you can correctly answer this question?</p><br>";

    ret += '<table id="table" class="table table-bordered" width="100%">\
            <tr>\
                <th style="text-align:center">1</th><th style="text-align:center">2</th>\
                <th style="text-align:center">3</th><th style="text-align:center">4</th>\
                <th style="text-align:center">5</th><th style="text-align:center">6</th>\
                <th style="text-align:center">7</th><th style="text-align:center">8</th>\
                <th style="text-align:center">9</th><th style="text-align:center">10</th>\
            </tr>\
            <tbody>\
            <tr align="center">\
                <td width="10%"><input style="width: 100%;" type="radio" name="confidence" value="1"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="confidence" value="2"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="confidence" value="3"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="confidence" value="4"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="confidence" value="5"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="confidence" value="6"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="confidence" value="7"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="confidence" value="8"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="confidence" value="9"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="confidence" value="10"></td>\
            </tr>\
            <tr align="center">\
                <td>Not at all confident</td>\
                <td> </td><td> </td><td> </td>\
                <td>Somewhat confident</td>\
                <td> </td><td> </td><td> </td><td> </td>\
                <td>Completely confident</td>\
            </tr>\
            </tbody>\
        </table>';

    ret += "<br><p>How nervous are you?</p><br>";
    ret += '<table id="table" class="table table-bordered" width="100%">\
            <tr>\
                <th style="text-align:center">1</th><th style="text-align:center">2</th>\
                <th style="text-align:center">3</th><th style="text-align:center">4</th>\
                <th style="text-align:center">5</th><th style="text-align:center">6</th>\
                <th style="text-align:center">7</th><th style="text-align:center">8</th>\
                <th style="text-align:center">9</th><th style="text-align:center">10</th>\
            </tr>\
            <tbody>\
            <tr align="center">\
                <td width="10%"><input style="width: 100%;" type="radio" name="nervousness" value="1"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="nervousness" value="2"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="nervousness" value="3"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="nervousness" value="4"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="nervousness" value="5"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="nervousness" value="6"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="nervousness" value="7"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="nervousness" value="8"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="nervousness" value="9"></td>\
                <td width="10%"><input style="width: 100%;" type="radio" name="nervousness" value="10"></td>\
            </tr>\
            <tr align="center">\
                <td>Not at all nervous</td>\
                <td> </td><td> </td><td> </td>\
                <td>Somewhat nervous</td>\
                <td> </td><td> </td><td> </td><td> </td>\
                <td>Very nervous</td>\
            </tr>\
            </tbody>\
        </table>';

    ret += "<br><br><p><a id='play_submit_button' class='btn btn-lg btn-success submit-resp' href='#' role='button' onclick='submitSelfEfficacy(event)'>Next</a></p>";

    return ret;
}

function getExamAnswersHTML() {

    var ret = "";

    for (var index in examQuestions.exam.questions[examQuestions.exam.pos].answers) {
        var answer = examQuestions.exam.questions[examQuestions.exam.pos].answers[index];
        var char = String.fromCharCode(65 + parseInt(index));
        ret += "<input type='radio' onclick='answerSelected(event)' id='a" + index + "' name='answer' value='EA_" + (examQuestions.exam.pos + 1) + "_" + (parseInt(index) + 1) + "_" + char + "'/>";
        ret += "<label for='a" + index + "'><span></span>" + answer + "</label><br>";
    }

    ret += "<br><br><p><a id='play_submit_button' class='btn btn-lg btn-success submit-resp' href='#' role='button' onclick='moveToNextQuestion()'>Next</a></p>";

    if (examQuestions.exam.pos < examQuestions.exam.total) {
        examQuestions.exam.pos += 1;
    }

    return ret;
}

function getGameHTML() {

    var ret = "<h4>" + examQuestions.games.questions[examQuestions.games.pos].id + " - " + examQuestions.games.questions[examQuestions.games.pos].text + "</h4>";
    if (examQuestions.games.questions[examQuestions.games.pos].image != "") {
        ret += "<img src='./media/games/" + examQuestions.games.questions[examQuestions.games.pos].image + "' alt='Mountain View' ><br><br>";
    } else {
        ret += "<br><br><br><br>";
    }

    for (var index in examQuestions.games.questions[examQuestions.games.pos].answers) {
        var answer = examQuestions.games.questions[examQuestions.games.pos].answers[index];
        var char = String.fromCharCode(65 + parseInt(index));
        ret += "<input type='radio' onclick='answerSelected(event)' id='a" + index + "' name='answer' value='GA_" + (examQuestions.games.pos + 1) + "_" + (parseInt(index) + 1) + "_" + char + "'/>";
        ret += "<label for='a" + index + "'><span></span>" + answer + "</label><br>";
    }

    // ret += "<br><br><p><a id='play_submit_button' class='btn btn-lg btn-success submit-resp' href='#' role='button' onclick='submitGameEvent(event)'>Next</a></p>";

    if (examQuestions.games.pos < examQuestions.games.total) {
        examQuestions.games.pos += 1;

        timeCounter = 0;
        var gameTimer = setInterval(function () {
            var percent = 100.0 * (timeCounter / GAME_TIME);
            updateProgress(percent);
            if (timeCounter == GAME_TIME + 1) {
                clearInterval(gameTimer);
                updateProgress(0);
                if (examQuestions.games.pos >= examQuestions.games.total ||
                    examQuestions.exam.pos >= examQuestions.exam.total) {
                    $(".test").html("<h2>DO NOT CLOSE this window. Please wait 10 minutes for the next saliva collection.</h2>");
                    showMessage(getSurveyMessageHTML());
                } else {
                    $(".test").html(getExamQuestionHTML());
                }
                submitGameEvent(gameQuestionEvent.RETURN_FROM_GAME_QUESTION);
                submitExamQuestionEvent(examQuestionEvent.GO_TO_EXAM_QUESTION);
            }
            timeCounter++;
        }, 1000);

    }

    return ret;
}

function getEmailMessageHTML() {

    var table = getAnswersKeyHTMLTable(answers_key);
    var study_id = getStudyID();

    var html = 'Hi,<br><br>Here is the answer key of your practice exam.<br><br>' + table + '<br><br>';

    html += "Your ID was: <b>" + study_id + ".</b><br><br>";
    html += "Thank you for your participation.<br><br>";
    html += "<b>Feelings and Emotions in Engineering Learning Laboratory (FEEL Lab)</b>";
    html += '<br>Department of Engineering Education';
    html += '<br>Utah State University';

    return html;
}

function getFinalMessage() {

    var html = '<h2>Thank you, you have completed this test.</h2><br><p>Here is the Answer Key</p><br>';
    html += getAnswersKeyHTMLTable(answers_key);

    // TODO: add input for email
    html += '<br><br><div class="form-group">';
    html += '<label for="email">If you want to recive these results, please insert your Email</label>';
    html += '<input type="text" class="form-control" id="email"><br>';
    html += '<a id="send_email" onclick="sendEmailClicked(event)" class="btn btn-primary">Send Results to Email</a>';
    html += '</div>';
    return html;
}

function sendEmailClicked(event) {

    var email = $('#email').val();
    var subject = 'ENGR 2010 (Statics) Practice Exam Results';
    var body = getEmailMessageHTML();
    var ccmail = '';

    sendEMail(email, subject, body, ccmail);
    showMessage(getEmailPopMessageHTML());
}

function updateProgress(percent) {
    // Set progress bar
    // var percent = 100 * (test.index / test.exam.totalToShow);
    $(".progress-bar").css("width", percent + "%");
}

function showMessage(message) {
    $('#message-modal').modal({
        backdrop: 'static',
        keyboard: false
    });
    $("#message").html("");
    $("#message").html(message);
    $('#message-modal').modal('show');
}

function showTimer(message, time) {
    $('#timer-modal').modal({
        backdrop: 'static',
        keyboard: false
    });
    $("#timer_message").html(message);
    $('#timer-modal').modal('show');
}

function getEmailPopMessageHTML() {

    var ret = '<div class="modal-header">\
                <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->\
                <h3 class="modal-title">ENGR 2010 - Statics</h3>\
            </div>\
            <div class="modal-body">\
                <div id="msg">\
                    <h4>Please wait while your email is sent.</h4>\
                </div>\
            </div>\
            <div id="msg_button" class="modal-footer"></div>';
    return ret;
}

function getSurveyMessageHTML() {

    var href = getSurveyLink();

    var ret = '<div class="modal-header">\
                <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->\
                <h3 class="modal-title">Survey</h3>\
            </div>\
            <div class="modal-body">\
                <div id="msg">\
                    <h4>Please complete the following survey.</h4>\
                </div>\
            </div>\
            <div id="msg_button" class="modal-footer">\
                <br><br><a id="go_survey" onclick="goSurvey(event)" target="_blank" class="btn btn-lg btn-primary" href="' + href + '">Go to Survey</a>\
            </div>';
    return ret;
}

function getSalivaMessageHTML() {

    var order = getSalivaSampleOrder();

    var ret = '<div class="modal-header">\
                <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->\
                <h3 class="modal-title">Saliva Collection</h3>\
            </div>\
            <div class="modal-body">\
                <div id="msg">\
                <h4>\
                    Now is time to take the saliva sample. Please take the swab labeled <b>' + order + '</b>\
                    and put it in your mouth and then click OK</h4>\
                </div>\
            </div>\
            <div id="msg_button" class="modal-footer">\
                <br><br><a id="go_saliva" onclick="goSalivaSample(event)" class="btn btn-lg btn-primary">OK</a>\
            </div>';
    return ret;
}

// function getTimerMessageHTML() {

//     var order = getSalivaSampleOrder();
//     var ret = '<div class="modal-header">\
//                 <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->\
//                 <h3 class="modal-title">Test</h3>\
//             </div>\
//             <div class="modal-body">\
//             <div id="timer" class="timer">1:00</div>\
//             </div>\
//             <div class="modal-footer">\
//                 <br><br><a id="go_survey" onclick="goSalivaSample(event)" class="btn btn-lg btn-primary">OK</a>\
//             </div>';
//     return ret;
// }

function getSalivaSampleOrder() {

    switch (currentSalivaSample) {
        case salivaSample.SAMPLE_A:
            currentSalivaSample = salivaSample.SAMPLE_B;
            return "A";
        case salivaSample.SAMPLE_B:
            currentSalivaSample = salivaSample.SAMPLE_C;
            return "B";
        case salivaSample.SAMPLE_C:
            currentSalivaSample = salivaSample.SAMPLE_D;
            return "C";
        case salivaSample.SAMPLE_D:
            currentSalivaSample = salivaSample.SAMPLE_E;
            return "D";
        case salivaSample.SAMPLE_E:
            currentSalivaSample = salivaSample.END;
            return "E";
        default:
            break;
    }
}

function getStudyIntroMessageHTML() {

    var href = YOUTUBE_INTRO_VIDEO_LINK;
    var ret = '<div class="modal-header">\
                <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->\
                <h3 class="modal-title">ENGR 2010 - Statics</h3>\
            </div>\
            <div class="modal-body">\
                <div id="msg">\
                    <h4><b>Welcome to the practice exam for ENGR 2010 - Statics!</b></h4>\
                    <br><h4>Below you will find the link to a short introduction video. Before you begin, make sure you have put on your sensor, gotten out all materials (calculator, pen, pencil, etc.), and silenced any electronic device before beginning.</h4>\
                    <br><h4>Click on the button below to watch the video:</h4>\
                </div>\
            </div>\
            <div class="modal-footer">\
                <br><br><a id="go_video" onclick="goToIntroVideo(event)" target="_blank" class="btn btn-lg btn-primary" href="' + href + '">Go to introductory video</a>\
            </div>';
    return ret;
}

// function getPromptQuestionHTML() {

//     promptQuestion = promptMessage[Math.floor(Math.random() * promptMessage.length)];

//     var ret = '<div class="modal-header">\
//                 <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->\
//                 <h3 class="modal-title">ENGR 2010 - Statics</h3>\
//             </div>\
//             <div class="modal-body">\
//                 <h4><b>' + promptQuestion + '</b></h4>\
//                 <textarea id="prompt_answer" class="form-control" rows="8" style="min-width: 100%"></textarea>\
//             </div>\
//             <div class="modal-footer">\
//                 <a id="save_prompt_answer" onclick="savePromptAnswer(event)" class="btn btn-lg btn-primary">OK</a>\
//             </div>';
//     return ret;
// }

function savePromptAnswer(event) {

    var study_id = getStudyID();
    var answer = $('#prompt_answer').val();

    savePromptQuestionAnswer(study_id, promptQuestion, answer);

    // Show Study intro message
    showMessage(getStudyIntroMessageHTML());
}

function getSurveyLink() {

    var id = getUserID();
    var study_id = getStudyID();

    var params = "?participant_id=" + id + "&study_id=" + study_id;

    switch (currentSurvey) {
        case Survey.PRIOR_EXAM:
            currentSurvey = Survey.PROMPT_ESSAY;
            return SURVEY_PRE_EXAM_LINK + params;
        case Survey.PROMPT_ESSAY:
            currentSurvey = Survey.HALF_EXAM;
            return SURVEY_PROMPT_LINK + params;
        case Survey.HALF_EXAM:
            currentSurvey = Survey.INMEDIATELY_END;
            return SURVEY_40_MIN_LINK + params;
        case Survey.INMEDIATELY_END:
            currentSurvey = Survey.AFTER_20_MINUNTES_END;
            return SURVEY_AT_END_TEST_LINK + params;
        case Survey.AFTER_20_MINUNTES_END:
            currentSurvey = Survey.END;
            return SURVEY_AFTER_20_MIN_LINK + params;
        default:
            break;
    }
}

function coolDownTime() {

    var introMsg = 'Please look at the dot located in front.';
    var closingMsg = 'You can now proceed with the test.';
    var title = 'ENGR 2010 - Statics';

    pauseScreen(introMsg, closingMsg, title, BEFORE_TEST_PAUSE_TIME, false);
}

function pauseScreen(introMsg, closingMsg, title, time, showTimer) {
    timer = time;

    $('#timer-modal').modal({
        backdrop: 'static',
        keyboard: false
    });

    $('#timer-modal').modal('show');

    $("#timer_message").html('<br><h3>' + introMsg + '</h3>');
    $("#timer_title").html(title);
    $("#timer_button").html("");
    $("#timer_display").html("");

    var x = setInterval(function () {

        timer--;

        if (showTimer) {
            $("#timer_display").html("<div class='timer'>00:" + pad(timer, 2) + "</div>");
        }

        if (timer <= 0) {
            clearInterval(x);
            $("#timer_message").html('<br><h3>' + closingMsg + '</h3>');
            $("#timer_button").html('<br><br><a id="timer_ok" class="btn btn-lg btn-primary" data-dismiss="modal">OK</a>');
        }
    }, ONE_SECOND * 1000);
}

function goSalivaSample(event) {

    // $('#message-modal').modal('hide');
    $("#msg_button").html("");
    timer = SALIVA_SAMPLE_TIME;
    var x = setInterval(function () {

        $("#msg").html("<div class='timer'>00:" + pad(--timer, 2) + "</div>");

        if (timer < 0) {
            clearInterval(x);
            $("#msg").html('');
            $("#msg").html('<h4>Please click OK to continue.</h4>');
            $("#msg_button").html('<a id="timer_ok" onclick="returnFromSaliva()" class="btn btn-lg btn-primary" data-dismiss="modal">OK</a>');
            submitSalivaEvent(salivaEvent.RETURN_FROM_SAMPLE);
        }
    }, ONE_SECOND * 1000);

    submitSalivaEvent(salivaEvent.GO_TO_SAMPLE);
}

function returnFromSaliva() {

    switch (currentSalivaSample) {
        case salivaSample.SAMPLE_B:
            coolDownTime();
            break;
        case salivaSample.SAMPLE_D:
            // set timer for Survey Link after 10 minutes
            var x = setInterval(function () {
                showMessage(getSalivaMessageHTML());
                clearInterval(x);
                $(".test").html('<h2>DO NOT CLOSE this window. Please wait 10 minutes for the final survey and saliva collection.</h2>');
            }, AFTER_10_MIN_TIME * 1000);
            break;
        case salivaSample.SAMPLE_E:
            // set timer for Survey Link after 10 minutes
            var x = setInterval(function () {
                showMessage(getSurveyMessageHTML());
                clearInterval(x);
                $(".test").html('');
            }, AFTER_10_MIN_TIME * 1000);
            break;
    }
}

function goSurvey(event) {

    // event.preventDefault();
    if ($("#go_survey").html() == "OK") {
        event.preventDefault();
        // $('#message-modal').modal('hide');

        submitSurveyEvent(surveyEvent.RETURN_FROM_SURVEY);

        if (currentSurvey == Survey.PROMPT_ESSAY) {
            showMessage(getSurveyMessageHTML());
        } else {
            switch (currentSalivaSample) {
                case salivaSample.SAMPLE_A:
                case salivaSample.SAMPLE_B:
                case salivaSample.SAMPLE_C:
                case salivaSample.SAMPLE_E:
                    showMessage(getSalivaMessageHTML());
                    break;
            }
        }

        if (currentSurvey == Survey.END) {
            $(".test").html(getFinalMessage());
        }

    } else {
        // Save event for returning from saliva sample
        // submitSalivaEvent(salivaEvent.RETURN_FROM_SAMPLE);
        $("#go_survey").html("OK");
        $("#go_survey").removeClass("btn-primary");
        $("#go_survey").addClass("btn-success");
        $("#msg").html("<h4>If you have completed the survey, please click OK to continue.</h4>");
        submitSurveyEvent(surveyEvent.GO_TO_SURVEY);
    }
}

function goToIntroVideo(event) {

    // event.preventDefault();
    if ($("#go_video").html() == "OK") {
        event.preventDefault();
        // $('#message-modal').modal('hide');
        showMessage(getSurveyMessageHTML());
        submitIntroVideoEvent(videoEvent.RETURN_FROM_VIDEO);
    } else {
        $("#go_video").html("OK");
        $("#go_video").removeClass("btn-primary");
        $("#go_video").addClass("btn-success");
        $("#msg").html("<h4>If you have watched the video, please click OK to continue.</h4>");
        submitIntroVideoEvent(videoEvent.GO_TO_VIDEO);
    }
}

//#region Submitting data to the server

function submitIntroVideoEvent(event) {
    var date = new Date();
    var str_date = date.toISOString().substring(0, 19).replace('T', ' ');
    var unixtime = (date.getTime() / 1000).toFixed(0);

    var strEvent = unixtime + "_" + str_date + "_0_0__";
    // console.log(strEvent);

    var id = getUserID();
    var study_id = getStudyID();

    switch (event) {
        case videoEvent.GO_TO_VIDEO:
            strEvent += "GV_Going to intro video";
            break;
        case videoEvent.RETURN_FROM_VIDEO:
            strEvent += "RV_Returning from intro video ";
            break;
        default:
            strEvent += "UV_Unknown video event";
            break;
    }

    var data = strEvent.split("_");

    var buttonEvent = {
        unixtime: data[0],
        date: data[1],
        study_id: study_id,
        id: id,
        type: data[5],
        question: data[2],
        answer_num: data[3],
        answer_alpha: data[4],
        description: data[6]
    };

    saveEventToCSV(buttonEvent);
}

function submitSalivaEvent(event) {
    var date = new Date();
    var str_date = date.toISOString().substring(0, 19).replace('T', ' ');
    var unixtime = (date.getTime() / 1000).toFixed(0);

    var strEvent = unixtime + "_" + str_date + "_0_0__";

    var id = getUserID();
    var study_id = getStudyID();

    switch (event) {
        case salivaEvent.GO_TO_SAMPLE:
            strEvent += "GS_Going to saliva sample # " + currentSalivaSample;
            break;
        case salivaEvent.RETURN_FROM_SAMPLE:
            strEvent += "RS_Returning from saliva sample # " + currentSalivaSample;
            break;
        default:
            strEvent += "US_Unknown saliva event in sample # " + currentSalivaSample;
            break;
    }

    var data = strEvent.split("_");

    var buttonEvent = {
        unixtime: data[0],
        date: data[1],
        study_id: study_id,
        id: id,
        type: data[5],
        question: data[2],
        answer_num: data[3],
        answer_alpha: data[4],
        description: data[6]
    };

    saveEventToCSV(buttonEvent);
}

function submitSurveyEvent(event) {
    var date = new Date();
    var str_date = date.toISOString().substring(0, 19).replace('T', ' ');
    var unixtime = (date.getTime() / 1000).toFixed(0);

    var strEvent = unixtime + "_" + str_date + "_" + (currentSurvey) + "_0__";

    var id = getUserID();
    var study_id = getStudyID();

    switch (event) {
        case surveyEvent.GO_TO_SURVEY:
            strEvent += "GQ_Going to survey # " + currentSurvey;
            break;
        case surveyEvent.RETURN_FROM_SURVEY:
            strEvent += "RQ_Returning from survey # " + currentSurvey;
            break;
        default:
            strEvent += "UQ_Unknown survey event # " + currentSurvey;
            break;
    }

    var data = strEvent.split("_");

    var buttonEvent = {
        unixtime: data[0],
        date: data[1],
        study_id: study_id,
        id: id,
        type: data[5],
        question: data[2],
        answer_num: data[3],
        answer_alpha: data[4],
        description: data[6]
    };

    saveEventToCSV(buttonEvent);
}

function submitSelfEfficacy(event) {

    var confidence = $("input[name=confidence]:checked").val();
    var nervousness = $("input[name=nervousness]:checked").val();

    if ((typeof (confidence) != 'undefined' && confidence != "") && (typeof (nervousness) != 'undefined' && nervousness != "")) {
        var date = new Date();
        var str_date = date.toISOString().substring(0, 19).replace('T', ' ');
        var unixtime = (date.getTime() / 1000).toFixed(0);

        var question = examQuestions.exam.pos + 1;

        var id = getUserID();
        var study_id = getStudyID();

        var self_efficacy = {
            unixtime: unixtime,
            date: str_date,
            study_id: study_id,
            id: id,
            question: question,
            confidence: confidence,
            nervousness: nervousness
        };

        saveSelfEfficacyToCSV(self_efficacy);

        $("#answers").html(getExamAnswersHTML());
    } else {
        alert("Please complete both questions.");
    }
}

function moveToNextQuestion() {

    var res = $('input[name=answer]:checked').val();
    if (typeof (res) != 'undefined' && res != "") {
        $(".test").html(getGameHTML());
        submitExamQuestionEvent(examQuestionEvent.RETURN_FROM_EXAM_QUESTION);
        submitGameEvent(gameQuestionEvent.GO_TO_GAME_QUESTION);
    } else {
        alert("Please select an answer");
    }
}

function submitExamQuestionEvent(event) {
    // event.preventDefault();

    if (examQuestions.exam.pos >= examQuestions.exam.total) {
        return;
    }

    var date = new Date();
    var str_date = date.toISOString().substring(0, 19).replace('T', ' ');
    var unixtime = (date.getTime() / 1000).toFixed(0);

    var strEvent = unixtime + "_" + str_date + "_0__";

    switch (event) {
        case examQuestionEvent.GO_TO_EXAM_QUESTION:
            strEvent += (examQuestions.exam.pos + 1);
            strEvent += "_GE_Presenting Exam question # " + (examQuestions.exam.pos + 1);
            break;
        case examQuestionEvent.RETURN_FROM_EXAM_QUESTION:
            strEvent += (examQuestions.exam.pos);
            strEvent += "_RE_Exit from exam question # " + examQuestions.exam.pos;
            break;
        default:
            strEvent += "_UE_Unknown exam question # " + examQuestions.exam.pos;
            break;
    }

    var id = getUserID();
    var study_id = getStudyID();
    var correct = examQuestions.exam.questions[examQuestions.exam.pos].correct;

    var data = strEvent.split("_");

    var buttonEvent = {
        unixtime: data[0],
        date: data[1],
        study_id: study_id,
        id: id,
        type: data[5],
        question: data[4],
        answer_num: data[2],
        answer_alpha: data[3],
        description: data[6]
    };

    saveEventToCSV(buttonEvent);
}

function submitGameEvent(event) {

    var date = new Date();
    var str_date = date.toISOString().substring(0, 19).replace('T', ' ');
    var unixtime = (date.getTime() / 1000).toFixed(0);

    var strEvent = unixtime + "_" + str_date + "_0__";

    switch (event) {
        case gameQuestionEvent.GO_TO_GAME_QUESTION:
            strEvent += (examQuestions.games.pos + 1);
            strEvent += "_GG_Presenting Game question # " + (examQuestions.games.pos);
            break;
        case gameQuestionEvent.RETURN_FROM_GAME_QUESTION:
            strEvent += (examQuestions.games.pos);
            strEvent += "_RG_Exit from Game question # " + examQuestions.games.pos;
            break;
        default:
            strEvent += "_UG_Unknown Game question # " + examQuestions.games.pos;
            break;
    }

    var id = getUserID();
    var study_id = getStudyID();

    var data = strEvent.split("_");

    var buttonEvent = {
        unixtime: data[0],
        date: data[1],
        study_id: study_id,
        id: id,
        type: data[5],
        question: data[4],
        answer_num: data[2],
        answer_alpha: data[3],
        description: data[6]
    };

    saveEventToCSV(buttonEvent);
}

function answerSelected(event) {
    // event.preventDefault();

    var date = new Date();
    var str_date = date.toISOString().substring(0, 19).replace('T', ' ');
    var unixtime = (date.getTime() / 1000).toFixed(0);

    var strEvent = unixtime + "_" + str_date + "_" + event.target.value;

    var correct;
    var questionText;

    if (event.target.value.startsWith("E")) {
        correct = examQuestions.exam.questions[examQuestions.exam.pos - 1].correct;
        questionText = examQuestions.exam.questions[examQuestions.exam.pos - 1].text
        strEvent += "_Response for exam question # " + (examQuestions.exam.pos);
    } else {
        correct = "";
        strEvent += "_Response for game question # " + (examQuestions.games.pos);
    }

    var id = getUserID();
    var study_id = getStudyID();

    var data = strEvent.split("_");

    // Fill the answer key
    if (event.target.value.startsWith("E")) {
        var correctString = data[5] == correct ? "Correct" : "Incorrect";

        answers_key[parseInt(data[3])] = {
            question: data[3],
            answer: data[5],
            text: questionText,
            correct: correctString
        };
    }

    var answerEvent = {
        unixtime: data[0],
        date: data[1],
        study_id: study_id,
        id: id,
        type: data[2],
        question: data[3],
        answer_num: data[4],
        answer_alpha: data[5],
        description: data[6],
        correct: correct
    };

    saveEventToCSV(answerEvent);
}
//#endregion

$(document).ready(function () {

    $.ajax({
        type: 'POST',
        url: './db/get_links.php',
        dataType: 'json',
        data: {
        },
        success: function (data) {
            links = data.links
            return true;
        },
        error: function (msg) {
            console.log("AJAX Error");
            console.log(msg);
            return false;
        }
    });


    $.ajax({
        type: 'POST',
        url: './db/get_study_ids.php',
        dataType: 'html',
        data: {
        },
        success: function (data) {
            document.getElementById('login-modal').innerHTML += data
            $(".participant_id").on('input', function () {
                var study_id = $('#study_id').val();
                var dob = $('#dob').val();
                var a_number = $('#a_number').val();

                if ((typeof study_id != 'undefined' && study_id != "") &&
                    (typeof dob != 'undefined' && dob != "") &&
                    (typeof a_number != 'undefined' && a_number != "" && a_number.length > 3)) {

                    $('#login').show();
                } else {
                    $('#login').hide();
                }
            });

            $("#login").click(function (event) {
                event.preventDefault();

                // read input from user and create ID
                var study_id = $('#study_id').val().toUpperCase();
                var dob = pad($('#dob').val(), 2);
                var a_number = pad($('#a_number').val(), 4);
                var id = dob + a_number;

                // save the User ID in a cookie
                setUserID(id);
                setStudyID(study_id);

                $('#login-modal').modal('hide');

                // Show Study intro message
                showMessage(getStudyIntroMessageHTML());

                // hide prompt question button
                $('#save_prompt_answer').hide();

                // check if there is and answer
                $("#prompt_answer").on('input', function () {
                    var answer = $('#prompt_answer').val();

                    if (typeof answer != 'undefined' && answer != "" && answer.length > 0) {
                        $('#save_prompt_answer').show();
                    } else {
                        $('#save_prompt_answer').hide();
                    }
                });
            });
            return true;
        },
        error: function (msg) {
            console.log("AJAX Error");
            console.log(msg);
            return false;
        }
    });

    $.when(getQuestions()).done(function (a1, a2, a3, a4) {
        // the code here will be executed when all four ajax requests resolve.
        // a1, a2, a3 and a4 are lists of length 3 containing the response text,
        // status, and jqXHR object for each of the four ajax calls respectively.
        // console.log(examQuestions.exam.pos);

        if (typeof examQuestions.exam === 'undefined' || examQuestions.exam.pos === 0) {
            // Ask for participant ID
            $('#login-modal').modal('show');
            $('#login').hide();
        }
    });

    $(".begin").click(function (event) {
        event.preventDefault();
        // Hide Instructions
        $('.instructions').hide();
        // Show first
        current_mode = Modes.EXAM;
        $(".test").html(getHTML());

        // TEST: reducing the number of questions
        if (NUM_TEST_QUESTIONS != 0) {
            examQuestions.exam.total = NUM_TEST_QUESTIONS;
            examQuestions.games.total = NUM_TEST_QUESTIONS;
        }

        submitExamQuestionEvent(examQuestionEvent.GO_TO_EXAM_QUESTION);

        // set the half time timer for second Survey Link
        var x = setInterval(function () {
            showMessage(getSurveyMessageHTML());
            clearInterval(x);
        }, HALFTIME_BREAK_TIME * 1000);
    });



    // Make sure only numbers accepted
    $(".number_text").on('keypress', function (event) {
        return event.charCode >= 48 && event.charCode <= 57;
    });



});
