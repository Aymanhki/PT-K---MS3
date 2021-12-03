let thisDay;
let thisMonth;
let thisYear;
let MAX_TITLE_LENGTH = 60;

let transactions_dayView = [];


function openDayView(day, month, year)
{
    document.getElementById("day-popup").classList.toggle("active");
    document.getElementById("day-popup-overlay").classList.toggle("active");
    thisDay = day;
    thisMonth = month-1;
    thisYear = year;
    loadDayView();
}

function closeDayView()
{
    document.getElementById("day-popup").classList.remove("active");
    if(doughnutChartButBigger)
    {
        swapDoughnutBack();
    }

    if(lineChartButBigger)
    {
        swapLineGraphBack();
    }

    document.getElementById("day-popup-overlay").classList.remove("active");

}

function loadDayView()
{

    transactions_dayView = [];
    for(let i=0; i<data.length; i++)
    {
        if(data[i].Day === thisDay && data[i].Month === thisMonth && data[i].Year === thisYear)
        {
            transactions_dayView.push(data[i]);
        }
    }

    let dateFormat = MONTHS[thisMonth]+" "+thisDay+", "+thisYear;
    let closeBtn = "<div class='day-view-close-button' onclick=closeDayView()>&times;</div>";

    let prevBtn = "<button class='last-day' onclick=lastDay()>&#10094;</button>";
    let nextBtn = "<button class='next-day' onclick=nextDay()>&#10095;</button>";
    let dateDiv = "<div class='grid-panel right-panel day-view-date'>"+dateFormat+"</div>";
    let transactionsDiv = viewDayTransactions();
    let editBtn = "<button class='day-view-edit-button' onclick='editMode()'>Edit</button>";
    let cancelEdit = "<button class='day-view-cancel-mode-buttons' onclick='closeEditMode()'>Exit</button>";
    let addTransaction = "<button class='day-view-add-mode-buttons' onclick='funcOpenTransac()'>Add +</button>";
    let editPopUp = "<div class='day-view-buttons' id='edit-button-popup'>"+cancelEdit+addTransaction+"</div>";
    let totalSection = getDayTotal();
    let gridItems = closeBtn + prevBtn + dateDiv + nextBtn + transactionsDiv + editBtn + editPopUp + totalSection
    let dateSliderGrid = "<grid class='day-view-date-list'>" + gridItems +"</grid>"
    document.getElementById("day-Transactions-Content").innerHTML =  dateSliderGrid;
}

function editMode()
{
    document.getElementById("edit-button-popup").classList.toggle("active");


    for(let i=0; i<document.getElementsByTagName("delete").length; i++)
    {
        document.getElementsByTagName("delete")[i].classList.toggle("active");
        
    }

}

function closeEditMode()
{
    document.getElementById("edit-button-popup").classList.remove("active");

    for(let i=0; i<document.getElementsByTagName("delete").length; i++)
    {
        document.getElementsByTagName("delete")[i].classList.remove("active");
    }

}

function deleteTransaction(index)
{
    let toRemove = null;

    for(let i=0; i<data.length; i++)
    {
        if(data[i].Day === transactions_dayView[index].Day &&
            data[i].Month === transactions_dayView[index].Month &&
            data[i].Year === transactions_dayView[index].Year &&
            data[i].Amount === transactions_dayView[index].Amount &&
            data[i].Category === transactions_dayView[index].Category)
        {
            toRemove = data[i];
        }
    }
    let indexToRemove = data.indexOf(toRemove);
    data.splice(indexToRemove, 1);
    loadDayView();
    getCategoryTotals();
    reloadCalendar();
    editMode();
}

function getDayTotal()
{
    let dayTotal = 0;

    for(let i=0; i<transactions_dayView.length; i++)
    {

        dayTotal += transactions_dayView[i].Amount;

    }
    let totalSection = "";

    if(dayTotal > 0)
    {
        totalSection = "<div class='day-view-totals-section' style='color: green;'>Day Total: +$"+Math.abs(dayTotal.toFixed(2))+"</div>";
    }
    else if(dayTotal < 0)
    {
        totalSection = "<div class='day-view-totals-section' style='color: red;'>Day Total: -$"+Math.abs(dayTotal.toFixed(2))+"</div>";
    }
    else
    {
        totalSection = "<div class='day-view-totals-section' style='color: black;'>Day Total: $"+Math.abs(dayTotal.toFixed(2))+"</div>";
    }
    return totalSection;
}


function viewDayTransactions()
{
    let dayTransactions = "<div class='day-view-transactions-section'>";


    for(let i=0; i<transactions_dayView.length; i++)
    {
        let color = getCategoryColor(transactions_dayView[i]);
        let colorArr = color.slice(color.indexOf("(")+1, color.indexOf(")")).split(",");
        color = "rgba("+colorArr[0]+","+ colorArr[1]+","+ colorArr[2]+","+ 0.3+")";
        let shadowColor = "rgba("+colorArr[0]+","+ colorArr[1]+","+ colorArr[2]+","+ 1+")";
        let categoryName = "<div class = day-view-transaction-category>"+transactions_dayView[i].Category+"</div>";
        let amount = "";

        let deleteBtn = "<delete class='day-view-delete-button'  id='delete-transaction-btn' onclick=deleteTransaction("+i+")>-</delete>";
        if(transactions_dayView[i].Income.Expense === "Income")
        {
            amount = "<div class = day-view-transaction-amount style='color: green;'>$+"+transactions_dayView[i].Amount+"</div>";
        }
        else
        {
            amount = "<div class = day-view-transaction-amount style='color: red;'>$"+transactions_dayView[i].Amount+"</div>";
        }
        let titleShortened = "";
        let titleString = transactions_dayView[i].Title;
        for(let i=0; i<titleString.length && i<MAX_TITLE_LENGTH; i++)
        {
            titleShortened += titleString.charAt(i);
        }
        if(titleString.length > MAX_TITLE_LENGTH)
        {
            titleShortened += "...";
        }
        let title = "<div class = day-view-transaction-title>"+titleShortened+"</div>"
        let style = "style='background-color:"+color+";  box-shadow: 1px 1px 5px 1px "+shadowColor+", -1px -1px 5px 1px "+shadowColor+";'"
        dayTransactions += "<div class='day-transactions-grid' "+style+">"+categoryName+title+amount+deleteBtn+"</div>";
    }
    dayTransactions += "</div>";
    return dayTransactions
}

function getCategoryColor(transaction)
{
    let toReturn = 'rgba(0,0,0,0.5)';

    for(let i=0; i<doughnutLabels.length; i++)
    {
        if(doughnutLabels[i] === transaction.Category)
        {
            toReturn = doughnutColors[i];
        }
    }

    return toReturn
}

function lastDay()
{

    if(thisMonth === MONTH_START  && thisDay === 1)
    {
        thisMonth = MONTH_END;
        thisDay = daysInMonth(thisMonth, thisYear);
        thisYear--;
    }
    else if(thisDay === 1)
    {
        thisMonth--;
        thisDay = daysInMonth(thisMonth, thisYear);
    }
    else
    {
        thisDay--;
    }

    loadDayView()
}

function nextDay()
{
    if(thisMonth === MONTH_END && thisDay ===  daysInMonth(thisMonth, thisYear))
    {
        thisMonth = MONTH_START;
        thisDay = 1;
        thisYear++;
    }
    else if(thisDay === daysInMonth(thisMonth, thisYear))
    {
        thisDay = 1;
        thisMonth++;
    }
    else
    {
        thisDay++;
    }

    loadDayView()
}


