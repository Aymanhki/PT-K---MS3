let lineChart;
function drawLine()
{
    function getTotal(array, index)
    {
        let total = 0;
        for(let i=0; i<index; i++)
        {
            total += array[i]
        }
        return total;
    }

    function getTotalByYear(array, monthNum)
    {
        let total = 0;
        for(let i=0; i<array.length; i++)
        {
            if(array[i].Month == monthNum)
            {
                total += array[i].Amount
            }
        }
        return total;
    }

    $(document).ready(function ()
    {
        let ctx = $("#line").get(0).getContext('2d');

        if(isMonthView)
        {
            const days = daysInMonth(month, year);
            const labels = [];
            for(let i=0; i<days; i++)
            {
                labels.push(i+1)
            }

            let monthTransactions = [];
            for(let i=0; i<data.length; i++)
            {
                if(data[i].Month === month && data[i].Year === year)
                {
                    monthTransactions.push(data[i].Amount);
                }
            }

            let thisMonthAmounts = [];
            for(let i=0; i<labels.length; i++)
            {
                thisMonthAmounts.push(getTotal(monthTransactions, labels[i]).toFixed(2));
            }

            let lastMonthTransactions = [];
            for(let i=0; i<data.length; i++)
            {
                let lastMonth = 0;
                let lastYear = 0;
                if (month === 0) {
                    lastMonth = 11;
                    lastYear = year -1;
                } else {
                    lastMonth = month-1;
                    lastYear = year;
                }

                if(data[i].Month === lastMonth && data[i].Year === lastYear)
                {
                    lastMonthTransactions.push(data[i].Amount);
                }
            }

            let lastMonthAmounts = []
            for(let i=0; i<lastMonthTransactions.length; i++)
            {
                lastMonthAmounts.push(getTotal(lastMonthTransactions, labels[i]).toFixed(2));
            }


            const monthData = {
                labels: labels,
                datasets:
                    [
                        {
                            label: "This Month",
                            data: thisMonthAmounts,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            tension: 0.5
                        },
                        {
                            label: "Last Month",
                            data: lastMonthAmounts,
                            backgroundColor: 'rgba(180, 180, 180, 0.5)',
                            tension: 0.5
                        },
                    ]
            };

            const options = {
                responsive: true,
                maintainAspectRatio: false,

                legend: {
                    display: true
                },

            };

            const config = {
                type: 'line',
                data: monthData,
                options: options
            };

            lineChart = new Chart(ctx, config);


        }
        else
        {
            const labels = [];
            for(let i=0; i<MONTHS.length; i++)
            {
                labels.push(MONTHS[i])
            }

            let yearTransactions = [];
            for(let i=0; i<data.length; i++)
            {
                if(data[i].Year === year)
                {
                    yearTransactions.push(data[i]);
                }
            }

            let thisYearAmounts = [];
            for(let i=0; i<labels.length; i++)
            {
                thisYearAmounts.push(getTotalByYear(yearTransactions, i).toFixed(2));
            }
            console.log(thisYearAmounts)

            let lastYearTransactions = [];
            for(let i=0; i<data.length; i++)
            {
                lastYear = year -1;
                if(data[i].Year === lastYear)
                {
                    lastYearTransactions.push(data[i]);
                }
            }

            let lastYearAmounts = []
            for(let i=0; i<labels.length; i++)
            {
                lastYearAmounts.push(getTotalByYear(lastYearTransactions, i).toFixed(2));
            }

            const yearData = {
                labels: labels,
                datasets:
                    [
                        {
                            label: "This Year",
                            data: thisYearAmounts,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            tension: 0.5
                        },
                        {
                            label: "Last Year",
                            data: lastYearAmounts,
                            backgroundColor: 'rgba(180, 180, 180, 0.5)',
                            tension: 0.5
                        },
                    ]
            };

            const options = {
                responsive: true,
                maintainAspectRatio: false,

                legend: {
                    display: true
                },

            };

            const config = {
                type: 'bar',
                data: yearData,
                options: options
            };

            lineChart = new Chart(ctx, config);
        }

    });

    let text = isMonthView ? "Total spent till That day" : "Total spent in that month";
    document.getElementById("graph-description-label").innerHTML = text;
}