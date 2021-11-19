let lineChart;
function drawLine()
{
    $(document).ready(function ()
    {
        let ctx = $("#line").get(0).getContext('2d');

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



        const monthData = {
            labels: labels,
            datasets:
                [
                    {
                        label: "This Month",
                        data: monthTransactions,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        tension: 0.5
                    },
                    {
                        label: "Last Month",
                        data: lastMonthTransactions,
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


    });
}