/*meant to read the data from the data generator csv then place into each day*/

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

const file = new XMLHttpRequest();

function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    const rows = str.slice(str.indexOf("\n")+1).split("\n");

    const arr = rows.map(function(row){
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
            object[header] =  values[index];
            return object;
        }, {});
        return el
    });
    return arr;
}

file.onload = function() {
    const text = this.responseText;
    const data = csvToArray(text);
    data.forEach(element => {
        element.Day = parseInt(element.Day);
        element.Month = parseInt(element.Month);
        element.Year = parseInt(element.Year);
        element.Amount = parseFloat(element.Amount);
        let purchase_day = document.getElementById(`${element.Day}-${element.Month}-${element.Year}`);
        if (purchase_day) {
            console.log(`purchase logged ${element.Day}-${element.Month}-${element.Year}`)
            let purchase = document.createElement("li");
            purchase.innerText = `purchase`;
            purchase_day.appendChild(purchase);
        }
        

    });
    console.log(data[0])
}
file.open("GET", "FakeData.csv");
file.send();



// myForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const input = csvFile.files[0];
//     const reader = new FileReader();

//     reader.onload = function (e) {
//       const text = e.target.result;
//       const data = csvToArray(text);
//       document.write(JSON.stringify(data));
//     };
    
//     reader.readAsText(input);
//   });

