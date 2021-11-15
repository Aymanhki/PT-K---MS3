'use strict'

function drawDoughnut()
{
    $(document).ready(function(){
        let ctx = $("#doughnut").get(0).getContext('2d');

        for(let i=0; i<categories.length; i++)
        {
            object.table.push
            ({
                label: categories[i][0],
                data: categories[i][1],
                backgroundColor: categories[i][2],
                highlight: categories[i][3]
            });
        }

        let doughnutLabels = []
        for(let i=0; i<categories.length; i++)
        {
            doughnutLabels.push(categories[i][0])
        }

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

        let doughnutDataPercentage = []
        for(let i=0; i<categories.length; i++)
        {
            doughnutDataPercentage.push((doughnutData[i]*100/dataSum) + "%")
        }

        let doughnutColors = []
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
                        var dataset = data.datasets[0];
                        //calculate the total of this data set
                        var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                            return previousValue + currentValue;
                        });
                        //get the current items value
                        var currentValue = dataset.data[tooltipItem.index];
                        //calculate the percentage based on the total and current item, also this does a rough rounding to give a whole number
                        var percentage = Math.floor(((currentValue / total) * 100) + 0.5);

                        return " " + data.labels[tooltipItem.index]+": " + percentage + "%";
                    }
                }
            },

        };

        const config = {
            type: 'doughnut',
            data: data,
            options: options
        };

        let chart = new Chart(ctx, config);


    });
}
