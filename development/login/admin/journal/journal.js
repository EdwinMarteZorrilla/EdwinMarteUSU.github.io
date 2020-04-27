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
        if (i%2 == 1) {
            row.className = "oddRow";
        }
        for (j = 0; j < 7; j++) {
            var rowData = document.createElement("td");
            var text = document.createTextNode(journalData[i][j]);
            rowData.appendChild(text);
            row.appendChild(rowData);
        }
        var rowData = document.createElement("td");
        var deleteForm = document.createElement("FORM");
        deleteForm.method = "post";
        deleteForm.action = "journalFunctions.php";
        var deleteButton = document.createElement("BUTTON");   // Create a <button> element
        deleteButton.className = "deleteEntry";
        deleteButton.innerHTML = "Delete Entry";                   // Insert text
        deleteButton.setAttribute("type", "submit");
        deleteButton.name = "delete_entry_btn[" + journalData[i][7] + "]";
        deleteForm.appendChild(deleteButton);
        rowData.appendChild(deleteForm);
        row.appendChild(rowData);
        journalTable.appendChild(row);
    }
}

$(document).ready(function() {
    loadJournal();
});
