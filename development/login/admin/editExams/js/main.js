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

    jQuery.ajax({
        type: "POST",
        url: './php/editExamsConnect.php',
        dataType: 'html',
        data: {functionname: 'loadExams'},

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
  var csvInput = document.getElementById('newImport'); /* finds the input */

  function changeLabelText() {
      var value = input.value; /* gets the filepath and filename from the input */
      var fileNameStart = value.lastIndexOf('\\'); /* finds the end of the filepath */
      value = value.substr(fileNameStart + 1); /* isolates the filename */
      var profilePicLabelText = document.getElementById('label'); /* finds the label text */
      if (value !== '') {
          profilePicLabelText.textContent = value;
      }
  }
  function changeCsvLabel() {
    var value = csvInput.value; /* gets the filepath and filename from the input */
    var fileNameStart = value.lastIndexOf('\\'); /* finds the end of the filepath */
    value = value.substr(fileNameStart + 1); /* isolates the filename */
    var profilePicLabelText = document.getElementById('csvlabel'); /* finds the label text */
    if (value !== '') {
      profilePicLabelText.textContent = value;
    }
  }

  input.addEventListener('change',changeLabelText,false);
  csvInput.addEventListener('change',changeCsvLabel,false);

});


function saveId(){
  // document.getElementById('idInput').style = "display:block;"
  let id = document.getElementById('newID').value
  let bday = document.getElementById('bday').value
  let anum = document.getElementById('a-num').value
  let json = {exam: mainExam,newId:id,bday:bday,anum:anum}
  if(id != '' && bday != '' && anum != ''){
    $.ajax({
      type: 'POST',
      url: './php/add-id.php',
      dataType: 'json',
      data: json,
      success: function (data) {
        if(data.result){

          $('#idInput').modal('hide')
          document.getElementById('newID').value = ''
          document.getElementById('a-num').value = ''
          document.getElementById('bday').value = ''
          switchTabs('ids')
          // console.log(examQuestions);
          return true;
        }
        else{
          alert("Could not add id")
        }
      },
      error: function (msg) {
        console.log("AJAX Error");
        console.log(msg);
        return false;
      }
    });
  }
  else{
    alert("You need to type an ID, a birthdate and an A-number")
  }

}


function saveLink(){
  let linkName = document.getElementById('linkName').value
  let link = document.getElementById('newLink').value
  let time = document.getElementById('time').value
  let json = {exam: mainExam,newLink:link,name:linkName,time:time}
  if(linkName != '' && link != '' && time != ''){
    $.ajax({
      type: 'POST',
      url: './php/add-link.php',
      dataType: 'json',
      data: json,
      success: function (data) {
        $('#addLink').modal('hide')
        document.getElementById('linkName').value = ''
        document.getElementById('newLink').value = ''
        switchTabs('links')
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
  else{
    alert("You need to fill all three boxes")
  }
}

function deleteLink(link){
  let json = {exam:mainExam,link:link}
  if(confirm("Are you sure you want to delete this link?")){
    $.ajax({
      type: 'POST',
      url: './php/delete-link.php',
      dataType: 'json',
      data: json,
      success: function (data) {
        switchTabs('links')
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

function deleteQuestion(id){
  let json = {exam:mainExam,id:id}
  if(confirm("Are you sure you want to delete this question?")){
    $.ajax({
      type: 'POST',
      url: './php/delete-question.php',
      dataType: 'json',
      data: json,
      success: function (data) {
        editExam(mainExam)
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

function deleteId(id){
  let json = {exam:mainExam,id:id}
  if(confirm("Are you sure you want to delete this ID?")){
    $.ajax({
      type: 'POST',
      url: './php/delete-id.php',
      dataType: 'json',
      data: json,
      success: function (data) {
        switchTabs('ids')
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

function importIds(){
  let csv = document.getElementById('newImport')
  let properties = csv.files[0]
  let formData = new FormData();
  formData.append('file',properties)
  formData.append('exam',mainExam)
  $.ajax({
      type: 'POST',
      url: './php/import-ids.php',
      dataType: 'json',
      data: formData,
      contentType: false,
      cache: false,
      processData: false,
      success: function (data) {
          $('#importModal').modal('hide')
          switchTabs('ids')
          document.getElementById('csvlabel').textContent = 'Choose file'
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

function switchTabs(tab){
  if(tab == 'questions'){
    tab1 = document.getElementById('tab1')
    tab1.style = "background-color:green; color:white"

    tab2 = document.getElementById('tab2')
    tab2.style = "border-style:solid;border-color:green; border-width:1px;color:green;"

    tab3 = document.getElementById('tab3')
    tab3.style = "border-style:solid;border-color:green; border-width:1px;color:green;"

    document.getElementById('exam').style = "display:block;"
    document.getElementById('study_ids').style = "display:none;"
    document.getElementById('links').style = "display:none;"


  }
  else if(tab == 'ids'){


    jQuery.ajax({
        type: "POST",
        url: './php/editExamsConnect.php',
        dataType: 'html',
        data: {functionname: 'loadExamIds', parameters: { 'exam': mainExam }},
        success: function (data) {
            document.getElementById('exam').style = "display:none;"
            document.getElementById('links').style = "display:none;"
            document.getElementById('study_ids').style = "display:block;"
            document.getElementById('study_ids').innerHTML = data;
            // console.log(examQuestions);
            return true;
        },
        error: function (msg) {
            console.log("AJAX Error");
            console.log(msg);
            return false;
        }
    });
    tab1 = document.getElementById('tab1')
    tab1.style = "border-style:solid;border-color:green; border-width:1px;color:green;"

    tab2 = document.getElementById('tab2')
    tab2.style = "background-color:green; color:white"
    tab3 = document.getElementById('tab3')
    tab3.style = "border-style:solid;border-color:green; border-width:1px;color:green;"
  }

  else if(tab == 'links'){
    jQuery.ajax({
        type: "POST",
        url: './php/editExamsConnect.php',
        dataType: 'html',
        data: {functionname: 'loadExamLinks', parameters: { 'exam': mainExam }},
        success: function (data) {
            document.getElementById('exam').style = "display:none;"
            document.getElementById('links').style = "display:block;"
            document.getElementById('study_ids').style = "display:none;"
            document.getElementById('links').innerHTML = data;
            return true;
        },
        error: function (msg) {
            console.log("AJAX Error");
            console.log(msg);
            return false;
        }
    });
    tab1 = document.getElementById('tab1')
    tab1.style = "border-style:solid;border-color:green; border-width:1px;color:green;"

    tab2 = document.getElementById('tab2')
    tab2.style = "border-style:solid;border-color:green; border-width:1px;color:green;"

    tab3 = document.getElementById('tab3')
    tab3.style = "background-color:green; color:white"
  }
}


function goBack(){

    jQuery.ajax({
        type: "POST",
        url: './php/editExamsConnect.php',
        dataType: 'html',
        data: {functionname: 'loadExams'},

        success: function (data) {
          document.getElementById('table').innerHTML = data;
          document.getElementById('table').style.display = 'block';
          document.getElementById('exam').style.display = 'none';
          document.getElementById('study_ids').style.display = 'none';
          document.getElementById('links').style.display = 'none';


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


    jQuery.ajax({
        type: "POST",
        url: './php/editExamsConnect.php',
        dataType: 'html',
        data: {functionname: 'loadExams'},

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

    jQuery.ajax({
        type: "POST",
        url: './php/editExamsConnect.php',
        dataType: 'json',
        data: {functionname: 'copyExams', parameters: {copy: exam, new: name}},
        success: function (data) {
        jQuery.ajax({
            type: "POST",
            url: './php/editExamsConnect.php',
            dataType: 'html',
            data: {functionname: 'loadExams'},
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

    jQuery.ajax({
        type: "POST",
        url: './php/editExamsConnect.php',
        dataType: 'html',
        data: {functionname: 'loadExamQuestions', parameters: { 'exam': exam }},
        success: function (data) {
          document.getElementById('exam').innerHTML = data;
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
              $('#add').modal('hide')
              document.getElementById('table').style.display = 'none';
              document.getElementById('exam').style.display = 'none';
              document.getElementById('questions').style.display = 'block';
              document.getElementById('name').value = ''
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

}
