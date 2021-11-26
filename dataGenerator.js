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

// function readTextFile(file, callback) {
//     // var rawFile = new XMLHttpRequest();
//     // rawFile.overrideMimeType("application/json");
//     // rawFile.open("GET", file, true);
//     // rawFile.onreadystatechange = function() {
//     //     if (rawFile.readyState === 4 && rawFile.status == "200") {
//     //         callback(rawFile.responseText);
//     //     }
//     // }
//     // rawFile.send();

//     callback();

// }

$(document).ready(()=> {

    //data = JSON.parse(text);
    data = fakeData;
    sanitize (data);
    initCalendar();
    drawAllTransactions();
    getCategoryTotals();
    getCatPopTotals();
    drawDoughnut();
    drawLine();

})

//-------------------------------
// Sanitize data 

//-------------------------------

function sanitize (data) {
    
    extractCategoryList(data)
}

function extractCategoryList (data) {
    for(let i=0; i<data.length; i++)
    {
        if(!categories.includes(data[i].Category) && data[i].Category !== undefined && data[i].Month === month)
        {
            categories.push(data[i].Category);
        }
    }
}