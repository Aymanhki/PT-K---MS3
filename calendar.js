// calendar.js

//calendar element ids
const CALENDAR_DAY_GRID_ID = "days-of-week";
const CALENDAR_HEADER_YEAR_ID = "calendar-header-year";
const CALENDAR_HEADER_MONTH_ID = "calendar-header-month";
const CALENDAR_WEEK_HEADER = "week-labels";

//calendar next and prev button ids
const CALENDAR_HEADER_PREV_ID = "calendar-prev";
const CALENDAR_HEADER_NEXT_ID = "calendar-next";

const MONTH_START = 0;
const MONTH_END = 11;


//yearly and month view switch id
const SWITCH_YM = "tog";


//Moved to global variables
//Global variables for controlling calendar
// let year;
// let month;
// let isMonthView = true;

let dates = [];



const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_HEADER = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function daysInMonth(month, year) {
    let d = new Date(year, month + 1, 0)
    return d.getDate();
}

function loadCalendarDays(month, year) {
    //Draw day grid
    let daysGrid = document.getElementById(CALENDAR_DAY_GRID_ID);
    daysGrid.style.gridTemplateColumns = "repeat(7, 1fr)";
    clearCalendar();

    let tmpDate = new Date(year, month, 0)
    let numDays = daysInMonth(month, year)

    let dayOfWeek = (tmpDate.getDay()+1)%7

    let prevMonthDays = daysInMonth(month-1, year)
    let nextMonthDays = daysInMonth(month+1, year)

    setWeekHeaders();

    for (let i = 1; i <= dayOfWeek; i++) {
        let nonMonthDate = createNonMonthDay(prevMonthDays-dayOfWeek+i, month, year)
        daysGrid.appendChild(nonMonthDate)
    }

    for (let i = 1; i <= numDays; i++) {
        let currentMonthDate = createCurrentMonthDay(i, month + 1, year)
        daysGrid.appendChild(currentMonthDate)
    }


    for (let i = 1; i <= 42 - (dayOfWeek) - numDays; i++) {
        let nonMonthDate = createNonMonthDay(i, month + 2, year)
        daysGrid.appendChild(nonMonthDate)
    }
}

function clearCalendar() {
    document.getElementById(CALENDAR_DAY_GRID_ID).innerHTML = "";
    document.getElementById(CALENDAR_WEEK_HEADER).innerHTML = "";
}

function createNonMonthDay(date, month, year) {
    let dateElement = createDate(date, month, year)
    dateElement.innerHTML = `<span style="color:rgb(180, 180, 180)">${date}</span>`;
    dates.push({
        //pushing a new date element in the date array
        //will hold the transactions later on
        day: date,
        month: month,
        year: year,
        spot: dateElement,
        curr: false
    });
    dateElement.onclick = clickOnDate(date, month, year);
    dateElement.setAttribute("id", value = `${date}-${month}-${year}`);
    return dateElement
}

function createCurrentMonthDay(date, month, year) {
    let dateElement = createDate(date, month, year)
    dates.push({
        //pushing a new date element in the date array
        //used to hold transactions later on
        day: date,
        month: month,
        year: year,
        spot: dateElement,
        curr: true
    });
    dateElement.innerHTML = `<span>${date}</span>`;
    dateElement.onclick = clickOnDate(date, month, year);
    dateElement.setAttribute("id", value = `${date}-${month}-${year}`);
    return dateElement
}

function clickOnDate (clicked_date, clicked_month, clicked_year) {
    let sw_ym = document.getElementById(SWITCH_YM);
    if(sw_ym.checked) {
        return () => {
            month = clicked_month-1
            date = clicked_date
            year = clicked_year
            sw_ym.checked = false;
            checkState()
            reloadCalendar()
        }

    }
    else {
        return () => {

            let purchases = document.getElementById(`${clicked_date}-${clicked_month}-${clicked_year}`);
            if(purchases) {
                console.log("purchase found");
                alert(`Open day view of ${clicked_date}-${clicked_month}-${clicked_year}\n ${purchases.innerHTML}`)
            }
            else{
                openDayView(clicked_date, clicked_month, clicked_year);

                //alert(`Open day view of ${clicked_date}-${clicked_month}-${clicked_year}\n`)
            }
            
        }
    }
    
}

function createDate(date, month, year) {
    var dateElement = document.createElement("li");
    var purchases = document.createElement("ol");
    
    dateElement.appendChild(purchases);
    dateElement.classList.add("days");

    return dateElement
}

function setCalendarMonthViewHeader (month, year) {
    let yearView = document.getElementById(CALENDAR_HEADER_YEAR_ID);
    let monthView = document.getElementById(CALENDAR_HEADER_MONTH_ID);

    yearView.innerText = `${year}`;
    monthView.innerText = `${MONTHS[month]}`;
}

//added year view header
function setCalendarYearViewHeader (month, year) {
    let yearView = document.getElementById(CALENDAR_HEADER_YEAR_ID);
    let monthView = document.getElementById(CALENDAR_HEADER_MONTH_ID);

    yearView.innerText = `${year}`;
    monthView.innerText = "";
}

function clearCalendarHeaders () {
    let yearView = document.getElementById(CALENDAR_HEADER_YEAR_ID);
    let monthView = document.getElementById(CALENDAR_HEADER_MONTH_ID);

    yearView.innerText = "";
    monthView.innerText = "";
}

function setHeaderArrowListener () {
    if (isMonthView) {
        let prevBtn = $(`#${CALENDAR_HEADER_PREV_ID}`);
        let nextBtn = $(`#${CALENDAR_HEADER_NEXT_ID}`);

        prevBtn.on("click", prevMonth)
        nextBtn.on("click", nextMonth)
    }
}

function nextMonth () {
    let sw_ym = document.getElementById(SWITCH_YM);
    //changes behaviour if in year or month view
    if(sw_ym.checked) {
        clearCalendar()
        year ++;
        clearCalendarHeaders();
        setCalendarYearViewHeader(month, year);
        createMonthlyForYearView (year);
        //--------------------- these will need to be adjusted for yearly view change (go by year change rather than month) -------
        getCategoryTotals();
        doughnutChart.destroy();
        lineChart.destroy();
        drawDoughnut();
        drawLine();
        //---------------------------------------------------------------------------------------------
    }
    else {
        if (month == MONTH_END) {
            month = MONTH_START;
            year ++;
        } else {
            month ++;
        }
        reloadCalendar();
        getCategoryTotals();
        doughnutChart.destroy();
        lineChart.destroy();
        drawDoughnut();
        drawLine();
    }

    
}

function prevMonth () {
    //changes behaviour if in year or month view
    let sw_ym = document.getElementById(SWITCH_YM);
    if(sw_ym.checked) {
        clearCalendar()
        year --;
        clearCalendarHeaders();
        setCalendarYearViewHeader(month, year);
        createMonthlyForYearView (year);
        //--------------------- these will need to be adjusted for yearly view change (go by year change rather than month) -------
        getCategoryTotals();
        doughnutChart.destroy();
        lineChart.destroy();
        drawDoughnut();
        drawLine();
        //---------------------------------------------------------------------------------------------
    }
    else {
        if (month == MONTH_START) {
            month = MONTH_END;
            year --;
        } else {
            month --;
        }
        reloadCalendar();
        getCategoryTotals();
        doughnutChart.destroy();
        lineChart.destroy();
        drawDoughnut();
        drawLine();
    }

    
}

function reloadCalendar () {
    dates = [];
    setCalendarMonthViewHeader (month, year)
    loadCalendarDays(month, year);
    for(let i = 0; i < dates.length; i++) {
        lookForTransactions(dates[i]);
    }


}

function setWeekHeaders () {
    //sets the weekly mon-sun headers
    let week_grid = document.getElementById(CALENDAR_WEEK_HEADER);
    for (let i = 0; i < 7; i++) {
        var day = document.createElement("li")
        let day_lab = DAY_HEADER[i];
        day.innerHTML = `<span>${day_lab}</span>`
        week_grid.appendChild(day)
    }//for
}//setWeekHeaders

$(document).ready(function () {
    let currentDay = new Date();

    year = currentDay.getFullYear();
    month = currentDay.getMonth();

    console.info(currentDay.toLocaleDateString())

    
    setHeaderArrowListener();
    reloadCalendar ();
})

/* -------------------------------------------- the switch for the month and yearly view ---------------------------------- */
function checkState() {
    //handles when the toggle button is pressed
    let sw_ym = document.getElementById(SWITCH_YM);
    //clears the month/year headers
    clearCalendarHeaders();

    if(sw_ym.checked) {
        //creates the yearly view
        clearCalendar();
        setCalendarYearViewHeader(month, year);
        createMonthlyForYearView(year);
    }
    else {
        //returns to monthly view
        reloadCalendar();
        setCalendarMonthViewHeader(month, year);
    }
    file.onload();
}//checkState

/* -------------------------------------------- the year view ---------------------------------- */
function createMonthlyForYearView (year) {
    //creates the whole one month view

    //grabs the day-grid element in the calendar
    let daysGrid = document.getElementById(CALENDAR_DAY_GRID_ID);
    //changes the grid layout from 7 - 4 (to display 4 months per row)
    daysGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
    var mon = 0

    //loops through all 12 months to make the grid
    for( let i = 0; i < 12; i++ ) {
        let fourFinal = document.createElement("ol")
        let fourMonths = document.createElement("li")
        let monthTitle = document.createElement("li")
        monthTitle.innerText = `${MONTHS[mon]}`
        monthTitle.setAttribute("class", value = "monthTitleYearView")
        fourMonths.appendChild(monthTitle)
        fourMonths.appendChild(createOneMonthGrid(mon, year))
        mon ++;
        fourFinal.appendChild(fourMonths)
        fourMonths.setAttribute("class", value = "whole-month")
        daysGrid.appendChild(fourMonths)
    }
    
    
}//createMonthlyForYearView

function createOneMonthGrid (month, year) {
    //creates one month for the whole year view

    //place the one month first into an "ol" element then into an "li" that the days-grid accepts
    let monthFinal = document.createElement("li")
    var monthGrid = document.createElement("ol")
    monthGrid.setAttribute("class", value = "month-days-grid")
    monthFinal.setAttribute("class", value = "month-grid")

    //same process as load calendar days
    let tmpDate = new Date(year, month, 0)
    let numDays = daysInMonth(month, year)

    let dayOfWeek = (tmpDate.getDay()+1)%7

    let prevMonthDays = daysInMonth(month-1, year)
    let nextMonthDays = daysInMonth(month+1, year)

    // Remove comment if you want to show dates of previous month in year view
    for (let i = 1; i <= dayOfWeek; i++) {
        let nonMonthDate = createNonMonthDay(prevMonthDays-dayOfWeek+i, month, year)
        nonMonthDate.innerHTML = ""

        monthGrid.appendChild(nonMonthDate)
    }

    for (let i = 1; i <= numDays; i++) {
        let currentMonthDate = createCurrentMonthDay(i, month + 1, year)
        monthGrid.appendChild(currentMonthDate)
    }


    //Remove comment if you want to show dates of next month in year view
    for (let i = 1; i <= 42 - (dayOfWeek) - numDays; i++) {
        let nonMonthDate = createNonMonthDay(i, month + 2, year)
        nonMonthDate.innerHTML = ""
        monthGrid.appendChild(nonMonthDate)
    }

    //placing the "ol" element into the final "li" to be passed by the function
    monthFinal.appendChild(monthGrid)

    return monthFinal
}//createOneMonthGrid

//------------------------------------------------------------------------------------------------------------
//--------------------------------- create a days spendings --------------------------------------------------
//------------------------------------------------------------------------------------------------------------
lookForTransactions = function(day){

}

$( window ).on( "load", function() {
    //---------- drawing calendar events --------------------
    let currMonth = month;
    let currYear = year;
    drawTransaction = function(day, transaction) {
        //adding a transaction to a day element

        let newSpending = document.createElement("li");
        newSpending.setAttribute('class', "transaction-ind");
        
        // newSpending.innerText = `${transaction.Amount.toFixed(2)}`;
        let category = categories2.find(categories2 => categories2.categoryID === transaction.Category);
        newSpending.setAttribute("style", value = `background-color: ${category.color};`);
        return newSpending;

    }

    lookForTransactions = function(day) {
        let date = document.getElementById(`${day.day}-${day.month}-${day.year}`);
        let transactions_all = document.createElement("ol");
        transactions_all.setAttribute("class", "transaction");
        let transactions = data.filter(data => data.Day === day.day);
        transactionsFinal = transactions.filter(transactions => transactions.Month === day.month);
        transactionsFinal.forEach(element => {
            let transaction_ind = drawTransaction(day, element);
            transactions_all.appendChild(transaction_ind);
        });
        date.appendChild(transactions_all);
    }

    categories2 = categories.map(item => {
        return {
            categoryID: item[0],
            amount: item[1],
            color: item[2],
            color2: item[3]
        };
    });

    for(let i = 0; i < dates.length; i++) {
        lookForTransactions(dates[i]);
    }
});