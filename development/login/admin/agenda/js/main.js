function scheduleExam(){
  let exam = document.getElementById('exam').value
  let date = document.getElementById('time').value
  let json = {exam:exam,date:date}
  $.ajax({
      type: 'POST',
      url: './php/add-date.php',
      dataType: 'json',
      data: json,
      success: function (data) {
          exam = document.getElementById('exam').value = ''
          date = document.getElementById('time').value = ''
          $('#schedule').modal('hide');
          getData()
          return true;
      },
      error: function (msg) {
          console.log("AJAX Error");
          console.log(msg);
          return false;
      }
  });
}


function getData(){
  $.ajax({
      type: 'POST',
      url: './php/get-dates.php',
      dataType: 'html',
      data: {
      },
      success: function (data) {
          document.getElementById('datesTable').innerHTML = data
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
  getData()

  $.ajax({
      type: 'POST',
      url: './php/get-exams.php',
      dataType: 'html',
      data: {
      },
      success: function (data) {
          document.getElementById('exam').innerHTML = data
          return true;
      },
      error: function (msg) {
          console.log("AJAX Error");
          console.log(msg);
          return false;
      }
  });

})
