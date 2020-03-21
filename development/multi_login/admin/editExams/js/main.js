let mainExam = '';



$(document).ready(function () {
  $.ajax({
      type: 'GET',
      url: './php/load-exams.php',
      dataType: 'html',
      data: {
      },
      success: function (data) {
          exams = data;
          document.getElementById('table').innerHTML = data;
          // console.log(examQuestions);
          return true;
      },
      error: function (msg) {
          console.log("AJAX Error");
          console.log(msg);
          return false;
      }
  });

  var input = document.getElementById('image'); /* finds the input */

  function changeLabelText() {
      var value = input.value; /* gets the filepath and filename from the input */
      var fileNameStart = value.lastIndexOf('\\'); /* finds the end of the filepath */
      value = value.substr(fileNameStart + 1); /* isolates the filename */
      var profilePicLabelText = document.getElementById('label'); /* finds the label text */
      if (value !== '') {
          profilePicLabelText.textContent = value;
      }
  }

  input.addEventListener('change',changeLabelText,false);
});


function goBack(){
  $.ajax({
      type: 'GET',
      url: './php/load-exams.php',
      dataType: 'html',
      data: {
      },
      success: function (data) {
          document.getElementById('table').innerHTML = data;
          document.getElementById('table').style.display = 'block';
          document.getElementById('exam').style.display = 'none';
          // console.log(examQuestions);
          return true;
      },
      error: function (msg) {
          console.log("AJAX Error");
          console.log(msg);
          return false;
      }
  });
  document.getElementById('exam').innerHTML = '';


}

function addExam(){
  document.getElementById('add').style.display = 'block';
  document.getElementById('table').style.display = 'none';
  document.getElementById('exam').style.display = 'none';



}

function backToExams(){
  document.getElementById('exam').style.display = 'block';
  document.getElementById('questions').style.display = 'none';
}

function limitInput(event) {
  var key = event.keyCode;
  return ((key >= 65 && key <= 69) || key == 8 || (key>=97 && key<=101));
};

function newQuestion(){
  let question = document.getElementById('question').value
  let a = document.getElementById('A').value
  let b = document.getElementById('B').value
  let c = document.getElementById('C').value
  let d = document.getElementById('D').value
  let e = document.getElementById('E').value
  let correct = document.getElementById('correct').value.toUpperCase()
  var input = document.getElementById('image');

  var value = input.value;
  var fileNameStart = value.lastIndexOf('\\');
  value = value.substr(fileNameStart + 1);
  let json = {question: question,a: a,b: b, c: c,d: d,e: e,correct: correct,exam: mainExam,image:value}
  console.log(json)

  if(confirm("Add question")){
    $.ajax({
        type: 'POST',
        url: './php/add-question.php',
        dataType: 'json',
        data: json,
        success: function (data) {
            if(data.result){
              editExam(mainExam)
              return true;
            }
            else{
              alert("Could not add question")
              return false;
            }
        },
        error: function (msg) {
            console.log("AJAX Error");
            console.log(msg);
            return false;
        }
    });
  }

}


function modify(){
  document.getElementById('exam').style.display = 'none'
  document.getElementById('questions').style.display = "block";
  document.getElementById('question').value = ''
  document.getElementById('A').value = ''
  document.getElementById('B').value = ''
  document.getElementById('C').value = ''
  document.getElementById('D').value = ''
  document.getElementById('E').value = ''
  document.getElementById('correct').value = ''
}


function editExam(exam){
  mainExam = exam
  $.ajax({
      type: 'POST',
      url: './php/load-exam-questions.php',
      dataType: 'html',
      data: { 'exam': exam
      },
      success: function (data) {
          document.getElementById('exam').innerHTML = data;
          // console.log(examQuestions);
          return true;
      },
      error: function (msg) {
          console.log("AJAX Error");
          console.log(msg);
          return false;
      }
  });

  document.getElementById('table').style.display = 'none';
  document.getElementById('exam').style.display = 'block';
  document.getElementById('add').style.display = 'none';
  document.getElementById('questions').style.display = 'none';


}


function createExam(){
  let name = document.getElementById('name').value
  mainExam = name
  if(confirm("You are about to create a new exam. Is " + name + "correct?")){
    $.ajax({
        type: 'POST',
        url: './php/create-exam.php',
        dataType: 'json',
        data: { 'name': name
        },
        success: function (data) {
            if(data.result){
              return true;
            }
            else{
              alert("Could not create exam")
              return false;
            }
        },
        error: function (msg) {
            console.log("AJAX Error");
            console.log(msg);
            return false;
        }
    });
  }
  document.getElementById('add').style.display = 'none';
  document.getElementById('questions').style.display = 'block';
}
