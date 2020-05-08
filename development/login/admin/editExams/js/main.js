let mainExam = '';
let question = {}
let links = {}
let variables = {}

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

function showLinkModal(){
  $('#addLink').modal('show')
  document.getElementById('linkName').value = ''
  document.getElementById('newLink').value = ''
  document.getElementById('time').value = ''
  document.getElementById('linkBtn').textContent = 'Add Link'
  document.getElementById('linkBtn').onclick = () => saveLink()
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
        document.getElementById('time').value = ''
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

function modifyLink(id){
  let linkName = document.getElementById('linkName').value
  let link = document.getElementById('newLink').value
  let on = document.getElementById('time').value
  let json = {exam: mainExam,newLink:link,name:linkName,on_question:on,id:id}
  if(linkName != '' && link != '' && time != ''){
    $.ajax({
      type: 'POST',
      url: './php/edit-link.php',
      dataType: 'json',
      data: json,
      success: function (data) {
        $('#addLink').modal('hide')
        document.getElementById('linkName').value = ''
        document.getElementById('newLink').value = ''
        document.getElementById('time').value = ''
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

function editLink(id){
  document.getElementById('linkName').value = links.links[id].name
  document.getElementById('newLink').value = links.links[id].link
  document.getElementById('time').value = links.links[id].on_question
  document.getElementById('linkBtn').textContent = 'Update Link'
  document.getElementById('linkBtn').onclick = () => modifyLink(links.links[id].id)

  $('#addLink').modal('show')
}

function modifyVariable(id){
  let value = document.getElementById('variable-select').value
  let json = {exam:mainExam,value:value,id:id}
  $.ajax({
    type: 'POST',
    url: './php/edit-variable.php',
    dataType: 'json',
    data: json,
    success: function (data) {
      if(data.result){
        $('#variableModal').modal('hide')
        switchTabs('variables')
        // console.log(examQuestions);
        return true;
      }
      else{
        alert(data.error)
        $('#variableModal').modal('hide')
        switchTabs('variables')
        return false
      }
    },
    error: function (msg) {
      console.log("AJAX Error");
      console.log(msg);
      return false;
    }
  });

}

function spaces(event){
  if(event.keyCode == 13){
    let cursor = $('#variable-select').prop('selectionStart')
    if(cursor == document.getElementById('variable-select').value.length){
      document.getElementById('variable-select').value += '<br><br>'
    }
    else{
      let text = document.getElementById('variable-select').value
      document.getElementById('variable-select').value = [text.slice(0,cursor),'<br>' , text.slice(cursor)].join("")
      document.getElementById('variable-select').selectionEnd = cursor + 4
    }
    return false
  }
}

function editVariable(id){
  if(id == 1){
    let html = '<label for="variable-select" class="col-form-label">Do you want saliva samples on the experiment?</label>'
    html += '<select class="form-control" id="variable-select"><option value="Yes">Yes</option><option value="No">No</option></select>'
    document.getElementById('varsInputs').innerHTML = html
    document.getElementById('varsBtn').onclick = () => modifyVariable(1)
    $('#variableModal').modal('show')
  }
  else if(id == 2){
    let html2 = '<label for="variable-select" class="col-form-label">How much time do you want between saliva samples?</label>'
    html2 += '<input type="number" class="form-control" id="variable-select" value="' + variables.variables[1].value + '"></input>'
    document.getElementById('varsInputs').innerHTML = html2
    document.getElementById('varsBtn').onclick = () => modifyVariable(2)
    $('#variableModal').modal('show')
  }
  else if(id == 3){
    let html3 = '<label for="variable-select" class="col-form-label">Please enter a title for the intro</label>'
    html3 += '<input type="text" class="form-control" id="variable-select" value="' + variables.variables[2].value + '"></input>'
    document.getElementById('varsInputs').innerHTML = html3
    document.getElementById('varsBtn').onclick = () => modifyVariable(3)
    $('#variableModal').modal('show')
  }
  else if(id == 4){
    let html4 = '<label for="variable-select" class="col-form-label">Please enter the intro message</label>'
    html4 += '<textarea type="text" class="form-control" id="variable-select" onkeypress="return spaces(event)">' + variables.variables[3].value + '</textarea>'
    document.getElementById('varsInputs').innerHTML = html4
    document.getElementById('varsBtn').onclick = () => modifyVariable(4)
    $('#variableModal').modal('show')
  }
  else if(id == 5){
    let html5 = '<label for="variable-select" class="col-form-label">Please select the intro video</label>'
    html5 += '<input type="text" class="form-control" id="variable-select" value="' + variables.variables[4].value + '"></input>'
    document.getElementById('varsInputs').innerHTML = html5
    document.getElementById('varsBtn').onclick = () => modifyVariable(5)
    $('#variableModal').modal('show')
  }
  else if(id == 6){
    let html6 = '<label for="variable-select" class="col-form-label">Please enter the main screen message</label>'
    html6 += '<textarea type="text" class="form-control" id="variable-select" onkeypress="return spaces(event)">' + variables.variables[5].value + '</textarea>'
    document.getElementById('varsInputs').innerHTML = html6
    document.getElementById('varsBtn').onclick = () => modifyVariable(6)
    $('#variableModal').modal('show')

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

//This function call the ajax with all the information when the update button is clicked. Updates questions
function modifyQuestion(id,number){
  let question = document.getElementById('question').value
  let a = document.getElementById('A').value
  let b = document.getElementById('B').value
  let c = document.getElementById('C').value
  let d = document.getElementById('D').value
  let e = document.getElementById('E').value
  let correct = document.getElementById('correct').value.toUpperCase()
  var input = document.getElementById('image');
  let properties = input.files[0]

  let formData = new FormData();
  var value = input.value;
  var fileNameStart = value.lastIndexOf('\\');
  value = value.substr(fileNameStart + 1);
  const json = {question: question,a: a,b: b, c: c,d: d,e: e,correct: correct,exam: mainExam,image:value,id:id,number:number}
  formData.append("file", properties)
  for (var key in json){
    formData.append(key,json[key])
  }
  if(a != '' && b != '' && correct != ''){
    if(confirm("Update Question?")){
      $.ajax({
        type: 'POST',
        url: './php/edit-question.php',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
          if(data.result){
            document.getElementById('addBtn').onclick = () => newQuestion()
            document.getElementById('addBtn').textContent = "Add Question"
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

// Modifies the onclick attribute of a button to change functionality and passes attributes to modifyQuestion
function editQuestion(id){
  btn = document.getElementById('addBtn')
  btn.onclick = () => modifyQuestion(question[id].id,id+1)
  btn.textContent = "Update Question"
  let ans = ['A','B','C','D','E']
  document.getElementById('question').value = question[id].question
  for(let i = 0; i<question[id].answers.length;i++){
    document.getElementById(ans[i]).value = question[id].answers[i]
  }
  document.getElementById('correct').value = question[id].correct
  if(!question[id].image == ''){
    document.getElementById('label').textContent = question[id].image
  }
  document.getElementById('exam').style.display = 'none'
  document.getElementById('questions').style.display = 'block'

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

function switchTabs(tab){
  if(tab == 'questions'){
    tab1 = document.getElementById('tab1')
    tab1.style = "background-color:green; color:white"

    tab2 = document.getElementById('tab2')
    tab2.style = "border-style:solid;border-color:green; border-width:1px;color:green;"

    tab3 = document.getElementById('tab3')
    tab3.style = "border-style:solid;border-color:green; border-width:1px;color:green;"

    tab4 = document.getElementById('tab4')
    tab4.style = "border-style:solid;border-color:green; border-width:1px;color:green;"

    document.getElementById('exam').style = "display:block;"
    document.getElementById('study_ids').style = "display:none;"
    document.getElementById('links').style = "display:none;"
    document.getElementById('variables').style = "display:none;"



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
            document.getElementById('variables').style = "display:none;"
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
    tab4 = document.getElementById('tab4')
    tab4.style = "border-style:solid;border-color:green; border-width:1px;color:green;"
  }

  else if(tab == 'links'){
    jQuery.ajax({
        type: "POST",
        url: './php/editExamsConnect.php',
        dataType: 'json',
        data: {functionname: 'loadExamLinks', parameters: { 'exam': mainExam }},
        success: function (data) {
            links = data
            document.getElementById('links').innerHTML = getLinksHtml();
            document.getElementById('exam').style = "display:none;"
            document.getElementById('links').style = "display:block;"
            document.getElementById('study_ids').style = "display:none;"
            document.getElementById('variables').style = "display:none;"
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

    tab4 = document.getElementById('tab4')
    tab4.style = "border-style:solid;border-color:green; border-width:1px;color:green;"
  }
  else if(tab == 'variables'){
    jQuery.ajax({
        type: "POST",
        url: './php/editExamsConnect.php',
        dataType: 'json',
        data: {functionname: 'loadExamVariables', parameters: { 'exam': mainExam }},
        success: function (data) {
            variables = data
            document.getElementById('variables').innerHTML = getVariablesHtml()
            document.getElementById('exam').style = "display:none;"
            document.getElementById('links').style = "display:none;"
            document.getElementById('study_ids').style = "display:none;"
            document.getElementById('variables').style = "display:block;"

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
    tab3.style = "border-style:solid;border-color:green; border-width:1px;color:green;"

    tab4 = document.getElementById('tab4')
    tab4.style = "background-color:green; color:white"
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
          document.getElementById('questions').style.display = 'none';
          document.getElementById('types').style.display = 'none';
          document.getElementById('variables').style.display = 'none';



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
  editExam(mainExam)
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

function newQuestion(type){
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
  const json = {question: question,a: a,b: b, c: c,d: d,e: e,correct: correct,exam: mainExam,image:value,type:type}
  formData.append("file", properties)
  for (var key in json){
    formData.append(key,json[key])
  }
  if(type == 'mulchoice'){
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
              alert(data.error)
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
  else if(type == 'textbox'){
    if(question != ''){
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
              alert(data.error)
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
      alert("You need to add a question")
    }
  }
}

function modify(){
  document.getElementById('exam').style.display = 'none'
  document.getElementById('types').style.display = 'flex'
  // document.getElementById('questions').style.display = "block";
  // document.getElementById('question').value = ''
  // document.getElementById('A').value = ''
  // document.getElementById('B').value = ''
  // document.getElementById('C').value = ''
  // document.getElementById('D').value = ''
  // document.getElementById('E').value = ''
  // document.getElementById('correct').value = ''
}

function questionType(){
  let group = document.getElementsByName('quesType')
  let selected = ''
  let flag = false
  for(let i = 0; i<group.length;i++){
    if(group[i].checked){
      selected = group[i].value
      flag = true
      break;
    }
  }

  if(!flag){
    alert("You must select an option")
  }
  else if(flag){
    switch(selected){
      case 'mulchoice':
        document.getElementById('A').removeAttribute('disabled')
        document.getElementById('B').removeAttribute('disabled')
        document.getElementById('C').removeAttribute('disabled')
        document.getElementById('D').removeAttribute('disabled')
        document.getElementById('E').removeAttribute('disabled')
        document.getElementById('correct').removeAttribute('disabled')
        document.getElementById('addBtn').onclick = (value) => newQuestion('mulchoice')
        break;

      case 'textbox':
        document.getElementById('A').setAttribute('disabled','true')
        document.getElementById('B').setAttribute('disabled','true')
        document.getElementById('C').setAttribute('disabled','true')
        document.getElementById('D').setAttribute('disabled','true')
        document.getElementById('E').setAttribute('disabled','true')
        document.getElementById('correct').setAttribute('disabled','true')
        document.getElementById('addBtn').onclick = (value) => newQuestion('textbox')
        break;

    }
    document.getElementById('types').style.display = 'none'
    document.getElementById('questions').style.display = 'block'
  }

}

function getExamHtml(data){
  if(data.questions == undefined){data.questions = []}
  let html = '<h1 style="text-align:center">' + data.name + '</h1>';
  html += '<div style="display:flex; justify-content:center"><div style="width:85vw"><nav class="nav nav-pills nav-fill"><a id="tab1" style="background-color:green; color:white" onclick="switchTabs(\'questions\')" class="nav-item nav-link" href="#">Questions</a><a id="tab2" onclick="switchTabs(\'ids\')" style="border-style:solid;border-color:green; border-width:1px;color:green" class="nav-item nav-link" href="#">Study IDs</a>';
  html += '<a id="tab3" onclick="switchTabs(\'links\')" style="border-style:solid;border-color:green; border-width:1px;color:green" class="nav-item nav-link" href="#">Links</a>';
  html += '<a id="tab4" onclick="switchTabs(\'variables\')" style="border-style:solid;border-color:green; border-width:1px;color:green" class="nav-item nav-link" href="#">Variables</a></nav>';
  html += '<div style="display:flex; justify-content:space-between; padding:15px;"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
  if(data.editable){
    html += '<button class="btn btn-lg btn-success" onclick="modify()" disabled>Add Question</button></div>';
    html += '<table class="table table-striped table-bordered"><tr><th>Question</th><th>Text</th><th>Image</th><th>Answer</th></tr>';
  }
  else{
    html += '<button class="btn btn-lg btn-success" onclick="modify()">Add Question</button></div>';
    html += '<table class="table table-striped table-bordered"><tr><th>Question</th><th>Text</th><th>Image</th><th>Answer</th><th></th></tr>';
  }
  for(let i = 0; i<data.questions.length;i++){
    html += '<tr><td>' + data.questions[i].number +  '</td><td>' + data.questions[i].question + '</td><td>' + data.questions[i].image + '</td><td>' + data.questions[i].correct + '</td>';
    if(!data.editable){
      html += '<td style="width:200px;"><button style="margin-right:10px; margin-left:10px" class="btn btn-outline-danger btn-sm" onclick="deleteQuestion(\'' + data.questions[i].id + '\')">Delete</button>';
      html += '<button style="margin-right:10px; margin-left:10px" class="btn btn-outline-success btn-sm" onclick="editQuestion(' + i + ')">Edit</button></td>';
    }
    html += '</tr>';
    html += '<tr><td>Answers</td><td colspan=4><b>' + data.questions[i].type + '</b><ol>';
    for(let j = 0; j<data.questions[i].answers.length;j++){
      html += "<li = type='A'>" + data.questions[i].answers[j] + "</li>";
    }
    html += '</ol></td></tr>';
  }
  html += '</table>';
  html += '<div style="display:flex; justify-content:space-between; padding:15px"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
  if(data.editable){
    html += '<button class="btn btn-lg btn-success" onclick="modify()" disabled>Add Question</button></div></div></div>';
  }
  else{
    html += '<button class="btn btn-lg btn-success" onclick="modify()">Add Question</button></div></div></div>';
  }
  if(data.questions.length == 0){
    html = '<h1 style="text-align:center">' + data.name + '</h1>';
    html += '<div style="display:flex; justify-content:center"><div style="width:85vw"><nav class="nav nav-pills nav-fill"><a id="tab1" style="background-color:green; color:white" onclick="switchTabs(\'questions\')" class="nav-item nav-link" href="#">Questions</a><a id="tab2" onclick="switchTabs(\'ids\')" style="border-style:solid;border-color:green; border-width:1px;color:green" class="nav-item nav-link" href="#">Study IDs</a>';
    html += '<a id="tab3" onclick="switchTabs(\'links\')" style="border-style:solid;border-color:green; border-width:1px;color:green" class="nav-item nav-link" href="#">Links</a>';
    html += '<a id="tab4" onclick="switchTabs(\'variables\')" style="border-style:solid;border-color:green; border-width:1px;color:green" class="nav-item nav-link" href="#">Variables</a></nav>';
    html += '<div style="display:flex; justify-content:space-between; padding:15px;"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
    if(data.editable){
      html += '<button class="btn btn-lg btn-success" onclick="modify()" disabled>Add Question</button></div>';
    }
    else{
      html += '<button class="btn btn-lg btn-success" onclick="modify()">Add Question</button></div>';
    }
    html += '<h4 style="text-align:center">No Questions</h4>';
  }
  return html
}

function getLinksHtml(){
  if(links.links == undefined){links.links = []}
  let html = '<h1 style="text-align:center">' + links.name +  '</h1>';
  html += '<div style="display:flex; justify-content:center"><div style="width:85vw"><nav class="nav nav-pills nav-fill"><a id="tab1" style="border-style:solid;border-color:green; border-width:1px;color:green;" onclick="switchTabs(\'questions\')" class="nav-item nav-link" href="#">Questions</a><a id="tab2" onclick="switchTabs(\'ids\')" style="border-style:solid;border-color:green; border-width:1px; color:green" class="nav-item nav-link" href="#">Study IDs</a>';
  html += '<a id="tab3" onclick="switchTabs(\'links\')" style="color:white; background-color:green" class="nav-item nav-link" href="#">Links</a>';
  html += '<a id="tab4" onclick="switchTabs(\'variables\')" style="border-style:solid;border-color:green; border-width:1px;color:green" class="nav-item nav-link" href="#">Variables</a></nav>';
  html += '<div style="display:flex; justify-content:space-between; padding:15px;"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
  if(links.editable){
    html += '<button class="btn btn-lg btn-success" onclick="showLinkModal()" disabled>Add new Link</button></div>';
    html += '<table class="table table-striped table-bordered"><tr><th>#</th><th>Name</th><th>Link</th><th>On question</th></tr>';
  }
  else{
    html += '<button class="btn btn-lg btn-success" onclick="showLinkModal()">Add new Link</button></div>';
    html += '<table class="table table-striped table-bordered"><tr><th>#</th><th>Name</th><th>Link</th><th>On question</th><th></th></tr>';
  }

  for(let i = 0;i<links.links.length;i++){
    html += '<tr><td>' + (i+1).toString() + '</td><td>' + links.links[i].name + '</td><td>' + links.links[i].link + '</td><td>' + links.links[i].on_question +'</td>';
    if(!links.editable){
      html += '<td style="width:200px"><button style="margin-right:10px; margin-left:10px" class="btn btn-outline-danger btn-sm" onclick="deleteLink(\'' + links.links[i].link + '\')">Delete</button>';
      html += '<button style="margin-right:10px; margin-left:10px" class="btn btn-outline-success btn-sm" onclick="editLink(' + i + ')">Edit</button></td>';
    }
    html += '</tr>';
  }
  html += '</table>';
  html += '<div style="display:flex; justify-content:space-between; padding:15px"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
  if(links.editable){
    html += '<button class="btn btn-lg btn-success" onclick="showLinkModal()" disabled>Add new Link</button></div></div></div>';
  }
  else{
    html += '<button class="btn btn-lg btn-success" onclick="showLinkModal()">Add new Link</button></div></div></div>';
  }

  if(links.links.length == 0){
    html = '<h1 style="text-align:center">' + links.name + '</h1>';
    html += '<div style="display:flex; justify-content:center"><div style="width:85vw"><nav class="nav nav-pills nav-fill"><a id="tab1" style="border-style:solid;border-color:green; border-width:1px;color:green;" onclick="switchTabs(\'questions\')" class="nav-item nav-link" href="#">Questions</a><a id="tab2" onclick="switchTabs(\'ids\')" style="border-style:solid;border-color:green; border-width:1px;color:green" class="nav-item nav-link" href="#">Study IDs</a>';
    html += '<a id="tab3" onclick="switchTabs(\'links\')" style="color:white; background-color:green" class="nav-item nav-link" href="#">Links</a>';
    html += '<a id="tab4" onclick="switchTabs(\'variables\')" style="border-style:solid;border-color:green; border-width:1px;color:green" class="nav-item nav-link" href="#">Variables</a></nav>';

    html += '<div style="display:flex; justify-content:space-between; padding:15px;"><button class="btn btn-outline-success" onclick="goBack()">Go Back</button>';
    if(links.editable){
      html += '<button class="btn btn-lg btn-success" onclick="showLinkModal()" disabled>Add new Link</button></div></div></div>';
      html += '<h4 style="text-align:center">No links</h4>';
    }
    else{
      html += '<button class="btn btn-lg btn-success" onclick="showLinkModal()">Add new Link</button></div></div></div>';
      html += '<h4 style="text-align:center">No links</h4>';
    }
  }
  return html
}

function getVariablesHtml(){
  let html = '<h1 style="text-align:center">' + variables.name +  '</h1>';
  html += '<div style="display:flex; justify-content:center"><div style="width:85vw"><nav class="nav nav-pills nav-fill"><a id="tab1" style="border-style:solid;border-color:green; border-width:1px;color:green;" onclick="switchTabs(\'questions\')" class="nav-item nav-link" href="#">Questions</a><a id="tab2" onclick="switchTabs(\'ids\')" style="border-style:solid;border-color:green; border-width:1px; color:green" class="nav-item nav-link" href="#">Study IDs</a>';
  html += '<a id="tab3" onclick="switchTabs(\'links\')" style="border-style:solid;border-color:green; border-width:1px;color:green;" class="nav-item nav-link" href="#">Links</a>';
  html += '<a id="tab4" onclick="switchTabs(\'variables\')" style="color:white; background-color:green"" class="nav-item nav-link" href="#">Variables</a></nav>';
  html += '<div style="display:flex; justify-content:start; padding:15px;"><button style="padding:12px" class="btn btn-outline-success" onclick="goBack()">Go Back</button></div>';

  if(variables.editable){
    html += '<table class="table table-striped table-bordered"><tr><th>Variable</th><th>Value</th></tr>'
  }
  else{
    html += '<table class="table table-striped table-bordered"><tr><th>Variable</th><th>Value</th><th></th></tr>'
  }
  for(let i = 0;i<variables.variables.length;i++){
    html += '<tr><td style="width:300px;">' + variables.variables[i].name + '</td><td>' + variables.variables[i].value + '</td>'
    if(!variables.editable){
      html += '<td><button style="margin-right:10px; margin-left:10px" class="btn btn-outline-success btn-sm" onclick="editVariable(' + variables.variables[i].id + ')">Edit</button></td>';
    }
    html +='</tr>'
  }
  html += '</table>'
  html += '</div></div>'

  return html
}

function editExam(exam){
  mainExam = exam
  document.getElementById('label').textContent = 'Choose file'

    jQuery.ajax({
        type: "POST",
        url: './php/editExamsConnect.php',
        dataType: 'json',
        data: {functionname: 'loadExamQuestions', parameters: { 'exam': exam }},
        success: function (json) {
          question = json.questions
          document.getElementById('exam').innerHTML = getExamHtml(json)
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
  document.getElementById('types').style.display = 'none';




}

function createExam(){
  let name = document.getElementById('name').value
  if(name != ''){
    if(confirm("You are about to create a new exam. Is " + name + " correct?")){
      mainExam = name
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
            document.getElementById('name').value = ''
            editExam(mainExam)
            return true;
          }
          else{
            document.getElementById('name').value = ''
            alert(data.error)
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
    alert("You need to give a name for the exam")
  }
}
