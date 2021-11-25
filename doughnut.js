

let doughnutColors = [];

function drawDoughnut() {
    $(document).ready(function () {
        let ctx = $("#doughnut").get(0).getContext('2d');

        let doughnutData = []
        for (let i = 0; i < categories.length; i++) {
            doughnutData.push(categories[i][1])
        }

        let dataSum = 0;
        for (let i = 0; i < categories.length; i++) {
            dataSum += doughnutData[i];
        }

        doughnutColors = [];
        for (let i = 0; i < categories.length; i++) {
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

function recreateNode(el, withChildren) {
    if (withChildren) {
      el.parentNode.replaceChild(el.cloneNode(true), el);
    }
    else {
      var newEl = el.cloneNode(false);
      while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
      el.parentNode.replaceChild(newEl, el);
    }
  }
  

function swapDoughnut() {

    document.getElementById("big-dough").classList.toggle("active");
    document.getElementById("DCC").classList.toggle("active");
    document.getElementById("day-popup-overlay").classList.toggle("active");

    //Draw small calendar
    document.getElementById("DCC").innerHTML = "";

    document.getElementById("DCC").style.gridTemplateColumns = "repeat(1, 1fr)";

    let fourFinal = document.createElement("ol")
    let fourMonths = document.createElement("li")
    let monthTitle = document.createElement("li")
    monthTitle.innerText = `${MONTHS[month]}`
    monthTitle.setAttribute("class", value = "monthTitleYearView")
    fourMonths.appendChild(monthTitle)
    monthGrid = createOneMonthGrid(month, year)
    fourMonths.appendChild(monthGrid)
    fourFinal.appendChild(fourMonths)
    fourMonths.setAttribute("class", value = "whole-month")
    document.getElementById("DCC").appendChild(fourMonths)

    recreateNode(monthGrid, true)

    fourMonths.addEventListener('click', swapDoughnutBack)

    //Draw big dougnut
    let ctx = $("#doughnut-but-bigger").get(0).getContext('2d');

    let doughnutData = []
    for (let i = 0; i < categories.length; i++) {
        doughnutData.push(categories[i][1])
    }

    let dataSum = 0;
    for (let i = 0; i < categories.length; i++) {
        dataSum += doughnutData[i];
    }

    doughnutColors = [];
    for (let i = 0; i < categories.length; i++) {
        doughnutColors.push(categories[i][2])
    }

    let doughnutHighlights = []
    for (let i = 0; i < categories.length; i++) {
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
// Show tooltips always even the stats are zero

    Chart.pluginService.register({
        beforeRender: function(chart) {
            if (chart.config.options.showAllTooltips) {
                // create an array of tooltips
                // we can't use the chart tooltip because there is only one tooltip per chart
                chart.pluginTooltips = [];
                chart.config.data.datasets.forEach(function(dataset, i) {
                    chart.getDatasetMeta(i).data.forEach(function(sector, j) {
                        chart.pluginTooltips.push(new Chart.Tooltip({
                            _chart: chart.chart,
                            _chartInstance: chart,
                            _data: chart.data,
                            _options: chart.options.tooltips,
                            _active: [sector]
                        }, chart));
                    });
                });

                // turn off normal tooltips
                chart.options.tooltips.enabled = false;
            }
        },
        afterDraw: function(chart, easing) {
            if (chart.config.options.showAllTooltips) {
                // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
                if (!chart.allTooltipsOnce) {
                    if (easing !== 1)
                        return;
                    chart.allTooltipsOnce = true;
                }

                // turn on tooltips
                chart.options.tooltips.enabled = true;
                Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
                    tooltip.initialize();
                    tooltip.update();
                    // we don't actually need this since we are not animating tooltips
                    tooltip.pivot();
                    tooltip.transition(easing).draw();
                });
                chart.options.tooltips.enabled = false;
            }
        }
    });

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

                    return " " + data.labels[tooltipItem.index] + ": " + percentage + "%, $" + dataset.data[tooltipItem.index].toFixed(2);
                }
            }
        },
        showAllTooltips: true,

    };

    const config = {
        type: 'doughnut',
        data: data,
        options: options
    };

    doughnutChartButBigger = new Chart(ctx, config);

}

function swapDoughnutBack() {
    document.getElementById("big-dough").classList.remove("active");
    document.getElementById("DCC").classList.remove("active");
    document.getElementById("day-popup-overlay").classList.remove("active");
    doughnutChartButBigger.destroy();
}

