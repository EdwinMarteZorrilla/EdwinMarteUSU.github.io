function loadJournal() {
    jQuery.ajax({
        type: "POST",
        url: 'journalConnect.php',
        dataType: 'json',
        data: {functionname: 'loadJournalData'},
    
        success: function (obj, textstatus) {
                      if( !('error' in obj) ) {
                          generateJournalTable(obj.data);
                      }
                      else {
                          console.log(obj.error);
                      }
                }
    });
}

function generateJournalTable(journalData) {
    var journalTable = document.getElementById("journalTable");
    for (i = 0; i < journalData.length; i++) {
        var row = document.createElement("tr");
        for (j = 0; j < 7; j++) {
            var rowData = document.createElement("td");
            var text = document.createTextNode(journalData[i][j]);
            rowData.appendChild(text);
            row.appendChild(rowData);
        }
        journalTable.appendChild(row);
    }
}

$(document).ready(function() {
    loadJournal();
});
