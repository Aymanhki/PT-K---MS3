/*meant to read the data from the data generator csv then place into each day*/

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

const file = new XMLHttpRequest();

file.onload = function() {
    const text = this.responseText;
    const data = csvToArray(text);
    
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

