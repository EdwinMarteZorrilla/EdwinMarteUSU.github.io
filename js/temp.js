let introTitle = 'this is a test title'
let introMessage = 'This is a test intro message'
let answers_key = []
var timeCounter;
var studyID = "FA18M01W01ES"; // Fall - 2018 - Midterm 1 -Wednesday Session- Seat 1- EDA & Saliva
var currentSurvey = '';
var currentSaliva = 1
let ids = []
let links = []
let variables = []
let queue = []
let salivaFlag = false
let samples = [{sample:'A',done:false},
               {sample:'B',done:false},
                {sample:'C',done:false},
                {sample:'D',done:false},
                {sample:'E',done:false}]


var NUM_TEST_QUESTIONS = 0; // 0 for all
var GAME_TIME = 3.0;   // 30 seconds
var SELF_EFFICACY_ANSWERS_DELAY = (1.0 / 60) * 60; // 1 seconds
var SALIVA_SAMPLE_TIME = (6.0 / 60) * 60;; // seconds
var ONE_SECOND = (1.0 / 60) * 60; // 1 second




var salivaSample = {
    SAMPLE_A: 0,
    SAMPLE_B: 1,
    SAMPLE_C: 2,
    SAMPLE_D: 3,
    SAMPLE_E: 4,
    END: 5
};

var currentSalivaSample = salivaSample.SAMPLE_A;
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

function updateProgress(percent) {
    // Set progress bar
    // var percent = 100 * (test.index / test.exam.totalToShow);
    $(".progress-bar").css("width", percent + "%");
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

function submitSelfEfficacy(event) {

    var confidence = $("input[name=confidence]:checked").val();
    var nervousness = $("input[name=nervousness]:checked").val();

    if ((typeof (confidence) != 'undefined' && confidence != "") && (typeof (nervousness) != 'undefined' && nervousness != "")) {

        for(let i = 0;i<links.length;i++){
          if(links[i].on_question == examQuestions.exam.pos + 1){
            document.getElementById('go_survey').href = links[i].link
            document.getElementById('go_survey').onclick = (event) => goSurvey(event)
            document.getElementById('msg-title').innerHTML = 'Survey'
            document.getElementById('msg').innerHTML = '<h4>Please complete the following survey.</h4>'
            $("#go_survey").html("Go to Survey");
            $("#go_survey").addClass("btn-primary");
            $("#go_survey").removeClass("btn-success");
            $("#msg").html("<h4>Please complete the following survey.</h4>");
            currentSurvey = links[i].name
            $('#message-modal').modal('show')
          }
        }
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

        $("#test").html(getExamAnswersHTML());
    } else {
        alert("Please complete both questions.");
    }
}

// =================================
function submitSalivaEvent(event) {
    var date = new Date();
    var str_date = date.toISOString().substring(0, 19).replace('T', ' ');
    var unixtime = (date.getTime() / 1000).toFixed(0);

    var strEvent = unixtime + "_" + str_date + "_0_0__";

    var id = getUserID();
    var study_id = getStudyID();

    switch (event) {
        case salivaEvent.GO_TO_SAMPLE:
            strEvent += "GS_Going to saliva sample # " + samples[currentSaliva-1].sample;
            break;
        case salivaEvent.RETURN_FROM_SAMPLE:
            strEvent += "RS_Returning from saliva sample # " + samples[currentSaliva-1].sample;
            break;
        default:
            strEvent += "US_Unknown saliva event in sample # " + samples[currentSaliva-1].sample
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
// ==================================

function moveToNextQuestion() {

    var res = $('input[name=answer]:checked').val();
    if (typeof (res) != 'undefined' && res != "") {
        $("#test").html(getGameHTML());
        submitExamQuestionEvent(examQuestionEvent.RETURN_FROM_EXAM_QUESTION);
        submitGameEvent(gameQuestionEvent.GO_TO_GAME_QUESTION);
    } else {
        alert("Please select an answer");
    }
}

function goSalivaSample(event) {

    // $('#message-modal').modal('hide');
    $("#msg_button").html("");
    timer = SALIVA_SAMPLE_TIME;
    var x = setInterval(function () {

        $("#saliva-msg").html("<div class='timer'>00:" + pad(--timer, 2) + "</div>");

        if (timer < 0) {
            clearInterval(x);
            $("#saliva-msg").html('');
            $("#saliva-msg").html('<h4>Please click OK to continue.</h4>');
            $("#msg_button").html('<a id="timer_ok" onclick="returnFromSaliva()" class="btn btn-lg btn-primary" data-dismiss="modal">OK</a>');
            submitSalivaEvent(salivaEvent.RETURN_FROM_SAMPLE);
        }
    }, ONE_SECOND * 1000);

    submitSalivaEvent(salivaEvent.GO_TO_SAMPLE);
}

function returnFromSaliva() {

    switch (currentSaliva) {
        case 1:
            coolDownTime();
            break;
        case 3:
            // set timer for Survey Link after 10 minutes
            var x = setInterval(function () {
                showMessage(getSalivaMessageHTML());
                clearInterval(x);
                $("#test").html('<h2>DO NOT CLOSE this window. Please wait 10 minutes for the final survey and saliva collection.</h2>');
            }, AFTER_10_MIN_TIME * 1000);
            break;
        case 4:
            // set timer for Survey Link after 10 minutes
            var x = setInterval(function () {
                showMessage(getSurveyMessageHTML());
                clearInterval(x);
                $("#test").html('');
            }, AFTER_10_MIN_TIME * 1000);
            break;
    }
}

function coolDownTime() {

    var introMsg = 'Please look at the dot located in front.';
    var closingMsg = 'You can now proceed with the test.';
    var title = 'ENGR 2010 - Statics';

    pauseScreen(introMsg, closingMsg, title, 10, false);
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


function goSurvey(event) {

    // event.preventDefault();
    if ($("#go_survey").html() == "OK") {
        event.preventDefault();
        // $('#message-modal').modal('hide');

        submitSurveyEvent(surveyEvent.RETURN_FROM_SURVEY);
        $("#message-modal").modal('hide')
        checkBeggingSurveys()

        // if (currentSurvey == Survey.END) {
        //     $("#test").html(getFinalMessage());
        // }

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

function getSurveyMessageHTML() {

    var href = currentSurvey;

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

function checkBeggingSurveys(){
  let flag = false
  for(let i = 0;i<links.length;i++){
    if(links[i].on_question == 0 && !links[i].done){
      links[i].done = true
      flag = true
      document.getElementById('go_survey').href = links[i].link
      document.getElementById('go_survey').onclick = (event) => goSurvey(event)
      document.getElementById('msg-title').innerHTML = 'Survey'
      document.getElementById('msg').innerHTML = '<h4>Please complete the following survey.</h4>'
      $("#go_survey").html("Go to Survey");
      $("#go_survey").addClass("btn-primary");
      $("#go_survey").removeClass("btn-success");
      $("#msg").html("<h4>Please complete the following survey.</h4>");
      currentSurvey = links[i].name
      $('#message-modal').modal('show')
    }
  }
  if(!flag && !salivaFlag){
    salivaFlag = true
  }
  if(salivaFlag && variables[0].value == 'Yes'){
    salivaFlag = false
    getSalivaMessageHTML()
  }
}

function goToIntroVideo(event) {

    // event.preventDefault();
    if ($("#go_survey").html() == "OK") {
        event.preventDefault();
        $('#message-modal').modal('hide')
        submitIntroVideoEvent(videoEvent.RETURN_FROM_VIDEO);
        checkBeggingSurveys()

    } else {
        $("#go_survey").html("OK");
        $("#go_survey").removeClass("btn-primary");
        $("#go_survey").addClass("btn-success");
        $("#msg").html("<h4>If you have watched the video, please click OK to continue.</h4>");
        submitIntroVideoEvent(videoEvent.GO_TO_VIDEO);

    }
}

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

function getSelfEfficacyQuestionsHTML() {


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
        $("#answers").html(getSelfEfficacyQuestionsHTML());
        clearInterval(x);
    }, SELF_EFFICACY_ANSWERS_DELAY * 1000);

    return ret;
}

function getExamAnswersHTML() {

    var ret = "";
    ret += '<h4>' + examQuestions.games.questions[examQuestions.games.pos].id + " - " + examQuestions.exam.questions[examQuestions.exam.pos].text + '</h4><br>'
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
                    $("#test").html("<h2>DO NOT CLOSE this window. Please wait 10 minutes for the next saliva collection.</h2>");
                    // showMessage(getSurveyMessageHTML());
                } else {
                    $("#test").html(getExamQuestionHTML());
                }
                submitGameEvent(gameQuestionEvent.RETURN_FROM_GAME_QUESTION);
                submitExamQuestionEvent(examQuestionEvent.GO_TO_EXAM_QUESTION);
            }
            timeCounter++;
        }, 1000);

    }

    return ret;
}

function getSalivaMessageHTML() {
    $('#saliva-modal').modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#msg_button').html('<br><br><a id="go_saliva" onclick="goSalivaSample(event)" class="btn btn-lg btn-primary">OK</a>')
    $('#saliva-msg').html('<h4>Now is time to take the saliva sample. Please take the swab labeled <b>' + samples[currentSaliva - 1].sample + '</b> and put it in your mouth and then click OK</h4>')
    $('#saliva-modal').modal('show')
}

function showMessage(message){
  $('#message-modal').modal({
      backdrop: 'static',
      keyboard: false
  });
  $("#message").html("");
  $("#message").html(message);
  $('#message-modal').modal('show');
}

function getIdsOptionsHtml(){
  let html = '<datalist id="ids">'
  for(let i = 0;i<ids.length;i++){
    html += '<option value="' + ids[i].study_id + '">'
  }
  html += '</datalist>'
  return html
}



function setBeginButton(){
  $(".begin").click(function (event) {
      event.preventDefault();
      // Hide Instructions
      $('.instructions').hide();
      // Show first
      $("#test").html(getExamQuestionHTML());

      if(variables[0].value == 'Yes'){
        let x = setInterval(function(){
          queue.push(samples[currentSaliva])
          samples[currentSaliva].done = true
          currentSaliva += 1
          if(currentSaliva == samples.length){
            clearInterval(x)
          }
        },1000*60*parseInt(variables[1].value))

        let y = setInterval(function(){
          if(samples[samples.length - 1].done){
            clearInterval(y)
          }
          if(!$('#message-modal').hasClass('in') && queue.length != 0 && !$('#saliva-modal').hasClass('in')){   //Checks if the message-modal (survey modal) is shown or not
            queue.splice(0,1)
            getSalivaMessageHTML()
          }

        },1000*5)
      }
      // TEST: reducing the number of questions
      if (NUM_TEST_QUESTIONS != 0) {
          examQuestions.exam.total = NUM_TEST_QUESTIONS;
          examQuestions.games.total = NUM_TEST_QUESTIONS;
      }

      submitExamQuestionEvent(examQuestionEvent.GO_TO_EXAM_QUESTION);

  });

}

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
        url: './db/get_variables.php',
        dataType: 'json',
        data: {
        },
        success: function (data) {
            variables = data.variables
            document.getElementById('instructions').innerHTML = '<p>' + data.variables[5].value + '</p>'
            document.getElementById('instructions').innerHTML += '<a id="submit_button" class="btn btn-lg btn-success begin" href="#" role="button">Begin</a>'
            setBeginButton()
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
        dataType: 'json',
        data: {
        },
        success: function (data) {
            ids = data.ids
            document.getElementById('login-modal').innerHTML += getIdsOptionsHtml()
            $(".participant_id").on('input', function () {
                var study_id = $('#study_id').val();
                for(let i = 0;i<ids.length;i++){
                  if(study_id == ids[i].study_id){
                    document.getElementById('dob').value = ids[i].bday.substring(8,10)
                    document.getElementById('a_number').value = ids[i].aNum.substring(ids[i].aNum.length-4,ids[i].aNum.length)
                  }
                }
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
                document.getElementById('msg-title').innerHTML = '<b>' + variables[2].value + '</b>'
                document.getElementById('msg').innerHTML = '<h4>' + variables[3].value + '</h4>'
                document.getElementById('go_survey').href = variables[4].value
                document.getElementById('go_survey').onclick = (event) => goToIntroVideo(event)
                document.getElementById('go_survey').innerHTML = 'Go to introductory video'
                $('#message-modal').modal('show')
                // Show Study intro message
                // showMessage(getIntroHTML());

                // hide prompt question button


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

    // Make sure only numbers accepted
    $(".number_text").on('keypress', function (event) {
        return event.charCode >= 48 && event.charCode <= 57;
    });



});
