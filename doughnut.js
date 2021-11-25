

let doughnutColors = [];
let doughnutChart;
function drawDoughnut()
{
    $(document).ready(function(){
        let ctx = $("#doughnut").get(0).getContext('2d');

        let doughnutData = []
        for(let i=0; i<categories.length; i++)
        {
            doughnutData.push(categories[i][1])
        }

        let dataSum = 0;
        for(let i=0; i<categories.length; i++)
        {
            dataSum += doughnutData[i];
        }

        doughnutColors = [];
        for(let i=0; i<categories.length; i++)
        {
            doughnutColors.push(categories[i][2])
        }

        const data = {
            labels: doughnutLabels,
            datasets: [{
                data: doughnutData,
                backgroundColor: doughnutColors,
                hoverOffset: 5
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                enabled: false
            },


        };

        const config = {
            type: 'doughnut',
            data: data,
            options: options
        };

        doughnutChart = new Chart(ctx, config);

    });
}

function swapDoughnut()
{
    document.getElementById("big-dough").classList.toggle("active");
    document.getElementById("DCC").classList.toggle("active");
    document.getElementById("DCC").innerHTML = "";
    let fourFinal = document.createElement("ol")
    let fourMonths = document.createElement("li")
    let monthTitle = document.createElement("li")
    monthTitle.innerText = `${MONTHS[month]}`
    monthTitle.setAttribute("class", value = "monthTitleYearView")
    fourMonths.appendChild(monthTitle)
    fourMonths.appendChild(createOneMonthGrid(month, year))
    fourFinal.appendChild(fourMonths)
    fourMonths.setAttribute("class", value = "whole-month")
    document.getElementById("DCC").appendChild(fourMonths)

    $(document).ready(function() {
        let ctx = $("#doughnut-but-bigger").get(0).getContext('2d');

        let doughnutData = []
        for(let i=0; i<categories.length; i++)
        {
            doughnutData.push(categories[i][1])
        }

        let dataSum = 0;
        for(let i=0; i<categories.length; i++)
        {
            dataSum += doughnutData[i];
        }

        doughnutColors = [];
        for(let i=0; i<categories.length; i++)
        {
            doughnutColors.push(categories[i][2])
        }

        let doughnutHighlights = []
        for(let i=0; i<categories.length; i++)
        {
            doughnutHighlights.push(categories[i][3])
        }

        const data = {
            labels: doughnutLabels,
            datasets: [{
                data: doughnutData,
                backgroundColor: doughnutColors,
                hoverBackgroundColor: doughnutHighlights,
                hoverOffset: 5
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        //get the concerned dataset
                        let dataset = data.datasets[0];
                        //calculate the total of this data set
                        let total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                            return previousValue + currentValue;
                        });
                        //get the current items value
                        let currentValue = dataset.data[tooltipItem.index];
                        //calculate the percentage based on the total and current item, also this does a rough rounding to give a whole number
                        let i = 1;
                        if (total < 0)
                            i = -1;
                        let percentage = Math.floor(((currentValue / total) * 100 * i) + 0.5);

                        return " " + data.labels[tooltipItem.index]+": " + percentage + "%, $" + dataset.data[tooltipItem.index].toFixed(2);
                    }
                }
            },

        };

        const config = {
            type: 'doughnut',
            data: data,
            options: options
        };

        let doughnutChartButBigger = new Chart(ctx, config);
    });
}

function swapDoughnutBack()
{
    document.getElementById("big-dough").classList.remove("active");
    document.getElementById("DCC").classList.remove("active");
}

