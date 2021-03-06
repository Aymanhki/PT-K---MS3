/*meant to read the data from the data generator csv then place into each day*/

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

const file = new XMLHttpRequest();

function csvToArray(str, delimiter = ",") {
    //creates an array of the data
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    const rows = str.slice(str.indexOf("\n")+1).split("\n");

    const arr = rows.map(function(row){
        //when delimiting, only oin commas not in quotes
        const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        const el = headers.reduce(function (object, header, index) {
            object[header] =  values[index];
            return object;
        }, {});
        return el
    });
    return arr;
}

var text;
var purchaseData;
file.onload = function() {
    //loading in the data from data generator
    text = this.responseText;
    //fixes instances where \r is used instead of \n
    text = text.replace(/(?:\r\n|\r|\n)/g, '\n');
    purchaseData = csvToArray(text);
    purchaseData.forEach(element => {
        element.Day = parseInt(element.Day);
        element.Month = parseInt(element.Month);
        element.Year = parseInt(element.Year);
        element.Amount = parseFloat(element.Amount);

    });
}
file.open("GET", "FakeData.csv");
file.send();

