function drawLine()
{
    $(document).ready(function ()
    {
        let ctx = $("#line").get(0).getContext('2d');

        const days = daysInMonth(new Date().getMonth(), new Date().getFullYear());
        const labels = [];

        for(let i=0; i<days; i++)
        {
            labels.push(i+1)
        }

        let monthTransactions = [];

        for(let i=0; i<data.length; i++)
        {
            if(data[i].Month === month)
            {
                monthTransactions.push(data[i]);
            }
        }
        let lastMonthTransactions = [];

        for(let i=0; i<data.length; i++)
        {
            let lastMonth = 0;
            if(month-1 === 0)
            {
                lastMonth = 12;
            }
            else
            {
                lastMonth = month-1;
            }
            if(data[i].Month === lastMonth)
            {
                lastMonthTransactions.push(data[i]);
            }
        }

        let amounts = []

        for(let i=0; i<monthTransactions.length; i++)
        {
            amounts.push(monthTransactions[i].Amount);
        }

        let lastMonthAmounts = []

        for(let i=0; i<lastMonthTransactions.length; i++)
        {
            lastMonthAmounts.push(lastMonthTransactions[i].Amount);
        }
        //
        // let foodAmounts = [];
        //
        // for(let i=0; i<monthTransactions.length; i++)
        // {
        //     if(monthTransactions[i].Category === doughnutLabels[0])
        //     {
        //         foodAmounts.push(monthTransactions[i].Amount);
        //     }
        //
        // }
        //
        // let personalAmounts = [];
        //
        // for(let i=0; i<monthTransactions.length; i++)
        // {
        //     if(monthTransactions[i].Category === doughnutLabels[1])
        //     {
        //         personalAmounts.push(monthTransactions[i].Amount);
        //     }
        //
        // }
        //
        // let utilitiesAmounts = [];
        //
        // for(let i=0; i<monthTransactions.length; i++)
        // {
        //     if(monthTransactions[i].Category === doughnutLabels[2])
        //     {
        //         utilitiesAmounts.push(monthTransactions[i].Amount);
        //     }
        //
        // }
        //
        // let entertainmentAmounts = [];
        //
        // for(let i=0; i<monthTransactions.length; i++)
        // {
        //     if(monthTransactions[i].Category === doughnutLabels[3])
        //     {
        //         entertainmentAmounts.push(monthTransactions[i].Amount);
        //     }
        //
        // }
        //
        // let healthAmount = [];
        //
        // for(let i=0; i<monthTransactions.length; i++)
        // {
        //     if(monthTransactions[i].Category === doughnutLabels[4])
        //     {
        //         healthAmount.push(monthTransactions[i].Amount);
        //     }
        //
        // }
        //
        // let accommodationAmounts = [];
        //
        // for(let i=0; i<monthTransactions.length; i++)
        // {
        //     if(monthTransactions[i].Category === doughnutLabels[5])
        //     {
        //         accommodationAmounts.push(monthTransactions[i].Amount);
        //     }
        //
        // }

        const monthData = {
            labels: labels,
            datasets:
                [
                // {
                //     label: doughnutLabels[0],
                //     data: foodAmounts,
                //     borderColor: doughnutColors[0],
                //     backgroundColor: doughnutColors[0],
                //     fill: false
                // },
                // {
                //     label: doughnutLabels[1],
                //     data: personalAmounts,
                //     borderColor: doughnutColors[1],
                //     backgroundColor: doughnutColors[1],
                //     fill: false
                // },
                // {
                //     label: doughnutLabels[2],
                //     data: utilitiesAmounts,
                //     borderColor: doughnutColors[2],
                //     backgroundColor: doughnutColors[2],
                //     fill: false
                // },
                // {
                //     label: doughnutLabels[3],
                //     data: entertainmentAmounts,
                //     borderColor: doughnutColors[3],
                //     backgroundColor: doughnutColors[3],
                //     fill: false
                // },
                // {
                //     label: doughnutLabels[4],
                //     data: healthAmount,
                //     borderColor: doughnutColors[4],
                //     backgroundColor: doughnutColors[4],
                //     fill: false
                // },
                // {
                //     label: doughnutLabels[5],
                //     data: accommodationAmounts,
                //     borderColor: doughnutColors[5],
                //     backgroundColor: doughnutColors[5],
                //     fill: false
                // }

                    {
                        label: "Last Month",
                        data: lastMonthAmounts,
                        backgroundColor: RGB_Linear_Shade(0.7, getRandomColor())
                    },
                    {
                        label: "This Month",
                        data: amounts,
                        backgroundColor: RGB_Linear_Shade(0.7, getRandomColor())

                    },

                ]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,

            legend: {
                display: true
            }
        };

        const config = {
            type: 'line',
            data: monthData,
            options: options
        };

        let chart = new Chart(ctx, config);


    });
}