'use strict'


$(document).ready(function(){

    let ctx = $("#doughnut").get(0).getContext('2d');

    let data = [
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
    let categoriesFile = require('category_totals.js');
    data = categoriesFile.object.table;
    let chart = new Chart(ctx).Doughnut(data);


});