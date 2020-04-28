var entriesData;
var entryInterval = 50;
var firstEntryToShow = 0;
var lastEntryToShow = firstEntryToShow + entryInterval;

function loadJournal() {
    jQuery.ajax({
        type: "POST",
        url: 'journalConnect.php',
        dataType: 'json',
        data: {functionname: 'loadJournalData'},
    
        success: function (obj, textstatus) {
                      if( !('error' in obj) ) {
                          entriesData = obj.data;
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
        row.classList.add("entryRow");
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
    showFirstGroup();
}

function showFirstGroup() {
    var entriesAll = document.getElementsByClassName("entryRow");
    for (i = 0; i < entriesAll.length; i++) {
        if (i > lastEntryToShow-1) {
            entriesAll[i].style.display = "none";
        }
    }
}

function loadPrevious() {
    var entriesAll = document.getElementsByClassName("entryRow");
    if (firstEntryToShow > 0) {
        firstEntryToShow -= entryInterval;
        lastEntryToShow -= entryInterval;
    }
    for (i = 0; i < entriesAll.length; i++) {
        if (i < firstEntryToShow) {
            entriesAll[i].style.display = "none";
        } else if (i < lastEntryToShow) {
            entriesAll[i].style.display = "";
        } else {
            entriesAll[i].style.display = "none";
        }
    }
}

function loadNext() {
    var entriesAll = document.getElementsByClassName("entryRow");
    if (lastEntryToShow < entriesAll.length) {
        firstEntryToShow += entryInterval;
        lastEntryToShow += entryInterval;
    }
    for (i = 0; i < entriesAll.length; i++) {
        if (i < firstEntryToShow) {
            entriesAll[i].style.display = "none";
        } else if (i < lastEntryToShow) {
            entriesAll[i].style.display = "";
        } else {
            entriesAll[i].style.display = "none";
        }
    }
}

$(document).ready(function() {
    loadJournal();
});
