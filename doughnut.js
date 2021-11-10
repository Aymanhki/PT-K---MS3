$(document).ready(function(){

    var ctx1 = $("#doughnut").get(0).getContext('2d');


    var data1 = {
        labels : ["match1", "match2", "match3", "match4", "match5"],
        data : [10, 50, 25, 70, 40],
        backgroundColor : ["#DEB887", "#A9A9A9", "#DC143C", "#F4A460", "#2E8B57"],
        borderColor : ["#CDA776", "#989898", "#CB252B", "#E39371", "#1D7A46"],
        borderWidth : [1, 1, 1, 1, 1]
    };

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

    var options1 = {
        title : {
            display : true,
            position : "top",
            text : "Doughnut Chart - TeamA Score",
            fontSize : 18,
            fontColor : "#111"
        },
        legend : {
            display : true,
            position : "bottom"
        }
    };

    var chart1 = new Chart(ctx1).Doughnut(data);

});