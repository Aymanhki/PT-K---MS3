
$(document).ready(function(){
    var ctx = $("#doughnut").get(0).getContext("2d");

    var data = [
        {
            value: 270,
            color: "cornflowerblue",
            highlight: "lightskyblue",
            label: "JavaScript"
        },
        {
            value: 50,
            color: "lightgreen",
            highlight: "yellowgreen",
            label: "HTML"
        },
        {
            value: 40,
            color: "orange",
            highlight: "darkorange",
            label: "CSS"
        }
    ];


    //Can some one explain to me while the code below does not work with
    //the ready function?

    //var fs = require('fs');
    // var csv = fs.readFileSync("Fake Data.csv", "utf-8");
    // var csvLine = csv.split("\n");
    // var data = []
    //
    //
    // for(let i = 1; i<csvLine.length; i++)
    // {
    //
    //     data.push( csvLine[i].split(","));
    //
    // }

    var chart = new Chart(ctx).Doughnut(data);

});
