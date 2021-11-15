//--------------------------------
// Data variables
//--------------------------------
let data;

//--------------------------------
// Models
// Functions for creating objects
//--------------------------------


function makeTransaction (transactionID, day, month, year, categoryID, amount, notes) {
    return {
        transactionID,
        day,
        month,
        year,
        categoryID,
        amount,
        notes
    }
}

function makeCategory (categoryID, name, icon, color, notes) {
    return {
        categoryID,
        name,
        icon,
        color,
        notes
    }
}

//--------------------------------
// Load data from files
//--------------------------------

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send();

}

readTextFile("./FakeData.json", function(text)
{
    data = JSON.parse(text);
    getCategoryTotals();
    drawDoughnut();
    drawLine();
});



//-------------------------------
// Sanitize data 
// TODO: creating category list from data
// TODO: add transactionID to each transaction
//-------------------------------

