let mainExam = '';
let saveData

function updateExam(value){
  let json = {new: value}
  $.ajax({
      type: 'POST',
      url: './php/changeCurrentExam.php',
      dataType: 'json',
      data: json,
      success: function (data) {
        alert("The exam will be changed to: " + value)
        return true;
      },
      error: function (msg) {
          console.log("AJAX Error");
          console.log(msg);
          return false;
      }
  });


}

$(document).ready(function () {
  saveData = (function () {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      return function (data, fileName) {
          const blob = new Blob([data], {type: "octet/stream"}),
              url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
      };
  }());
  $.ajax({
      type: 'GET',
      url: './php/load-exams.php',
      dataType: 'html',
      data: {
      },
      success: function (data) {
          exams = data;
          document.getElementById('table').innerHTML = data;
          var currentExam = document.getElementById('current');

          function changeCurrentExam() {
              var value = currentExam.value;
              if (value !== '') {
                updateExam(value)
              }
          }

          currentExam.addEventListener('change',changeCurrentExam,false);
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
          var currentExam = document.getElementById('current');

          function changeCurrentExam() {
              var value = currentExam.value;
              if (value !== '') {
                updateExam(value)
              }
          }

          currentExam.addEventListener('change',changeCurrentExam,false);
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


function deleteExam(exam){
  let json = {delete: exam}
  if(confirm("Are you sure you want to delete this exam?")){
    $.ajax({
      type: 'POST',
      url: './php/deleteExam.php',
      dataType: 'json',
      data: json,
      success: function (data) {
        $.ajax({
            type: 'GET',
            url: './php/load-exams.php',
            dataType: 'html',
            data: {
            },
            success: function (data) {
                exams = data;
                document.getElementById('table').innerHTML = data;
                var currentExam = document.getElementById('current');

                function changeCurrentExam() {
                    var value = currentExam.value;
                    if (value !== '') {
                      updateExam(value)
                    }
                }

                currentExam.addEventListener('change',changeCurrentExam,false);
                return true;
            },
            error: function (msg) {
                console.log("AJAX Error");
                console.log(msg);
                return false;
            }
        });
        return true;
      },
      error: function (msg) {
        console.log("AJAX Error");
        console.log(msg);
        return false;
      }
    });
  }
}


function copyExam(exam){
  let name = prompt("Enter the name for the new exam")
  let json = {copy: exam, new: name}
  if(name != null || name != ""){
    $.ajax({
      type: 'POST',
      url: './php/copyExam.php',
      dataType: 'json',
      data: json,
      success: function (data) {
        $.ajax({
            type: 'GET',
            url: './php/load-exams.php',
            dataType: 'html',
            data: {
            },
            success: function (data) {
                exams = data;
                document.getElementById('table').innerHTML = data;
                var currentExam = document.getElementById('current');

                function changeCurrentExam() {
                    var value = currentExam.value;
                    if (value !== '') {
                      updateExam(value)
                    }
                }

                currentExam.addEventListener('change',changeCurrentExam,false);
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
        return true;
      },
      error: function (msg) {
        console.log("AJAX Error");
        console.log(msg);
        return false;
      }
    });
  }
}



function exportCSV(exam){
  let json = {name: exam}
  let name = exam + '.csv'
  $.ajax({
    type: 'POST',
    url: './php/exportCSV.php',
    dataType: 'text',
    data: json,
    success: function (data) {
      saveData(data,name)
      return true;
    },
    error: function (msg) {
      console.log("AJAX Error");
      console.log(msg);
      return false;
    }
  });
}


function limitInput(event) {
  var key = event.keyCode;
  let limit1 = 64
  let limit2 = 96
  let a = document.getElementById('A').value
  let b = document.getElementById('B').value
  let c = document.getElementById('C').value
  let d = document.getElementById('D').value
  let e = document.getElementById('E').value

  if(a !=''){
    limit1 +=1
    limit2 +=1
  }
  if(b !=''){
    limit1 +=1
    limit2 +=1
  }
  if(c !=''){
    limit1 +=1
    limit2 +=1
  }
  if(d !=''){
    limit1 +=1
    limit2 +=1
  }
  if(e !=''){
    limit1 +=1
    limit2 +=1
  }

  return ((key >= 65 && key <= limit1) || key == 8 || (key>=97 && key<=limit2));
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
  let properties = input.files[0]
  // properties['question'] = question
  // properties = JSON.stringify(prop?erties)
  let formData = new FormData();
  var value = input.value;
  var fileNameStart = value.lastIndexOf('\\');
  value = value.substr(fileNameStart + 1);
  const json = {question: question,a: a,b: b, c: c,d: d,e: e,correct: correct,exam: mainExam,image:value}
  formData.append("file", properties)
  for (var key in json){
    formData.append(key,json[key])
  }



  if(a != '' && b != '' && correct != ''){
    if(confirm("Add question?")){
      $.ajax({
        type: 'POST',
        url: './php/add-question.php',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
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
  else{
    alert("Please enter at least answers A and B and the correct answer")
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
  if(confirm("You are about to create a new exam. Is " + name + " correct?")){
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
