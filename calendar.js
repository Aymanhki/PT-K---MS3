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


//Global variables for controlling calendar
let year;
let month;
let isMonthView = true;



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
    console.log(numDays)
    let dayOfWeek = (tmpDate.getDay()+1)%7
    console.log(dayOfWeek)

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
    dateElement.onclick = clickOnDate(date, month, year);
    return dateElement
}

function createCurrentMonthDay(date, month, year) {
    let dateElement = createDate(date, month, year)
    dateElement.innerHTML = `<span>${date}</span>`;
    dateElement.onclick = clickOnDate(date, month, year);
    return dateElement
}

function clickOnDate (clicked_date, clicked_month,clicked_year) {
    let sw_ym = document.getElementById(SWITCH_YM);
    if(sw_ym.checked) {
        return () => {
            month = clicked_month-1
            date = clicked_date
            year = clicked_year
            sw_ym.checked = false;
            checkState()
        }
    }
    else {
        return () => {
            alert(`Open day view of ${clicked_date}-${clicked_month}-${clicked_year}`)
        }
    }
    
}

function createDate(date, month, year) {
    var dateElement = document.createElement("li");
    dateElement.setAttribute("id", `${date}-${month}-${year}`)
    dateElement.classList.add("days")


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
    if(sw_ym.checked) {
        clearCalendar()
        year ++;
        clearCalendarHeaders();
        setCalendarYearViewHeader(month, year);
        createMonthlyForYearView (year)
    }
    else {
        if (month == MONTH_END) {
            month = MONTH_START;
            year ++;
        } else {
            month ++;
        }
        reloadCalendar();
    }
    
    
}

function prevMonth () {
    let sw_ym = document.getElementById(SWITCH_YM);
    if(sw_ym.checked) {
        clearCalendar()
        year --;
        clearCalendarHeaders();
        setCalendarYearViewHeader(month, year);
        createMonthlyForYearView (year)
    }
    else {
        if (month == MONTH_START) {
            month = MONTH_END;
            year --;
        } else {
            month --;
        }
        reloadCalendar();
    }
    
    
}

function reloadCalendar () {
    setCalendarMonthViewHeader (month, year)
    loadCalendarDays(month, year);
}

function setWeekHeaders () {
    let week_grid = document.getElementById(CALENDAR_WEEK_HEADER);
    for (let i = 0; i < 7; i++) {
        var day = document.createElement("li")
        let day_lab = DAY_HEADER[i];
        day.innerHTML = `<span>${day_lab}</span>`
        week_grid.appendChild(day)
    }//for
}
//setWeekHeaders
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
    let sw_ym = document.getElementById(SWITCH_YM);
    console.log(sw_ym.checked);
    clearCalendarHeaders();

    if(sw_ym.checked) {
        clearCalendar();
        setCalendarYearViewHeader(month, year);
        createMonthlyForYearView(year);
    }
    else {
        reloadCalendar();
        setCalendarMonthViewHeader(month, year);
    }
}

/* -------------------------------------------- the year view ---------------------------------- */
function createMonthlyForYearView (year) {
    let daysGrid = document.getElementById(CALENDAR_DAY_GRID_ID);
    daysGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
    var mon = 0
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
        daysGrid.appendChild(fourMonths)
    }
    
    
}

function createOneMonthGrid (month, year) {
    let monthFinal = document.createElement("li")
    var monthGrid = document.createElement("ol")
    monthGrid.setAttribute("class", value = "month-days-grid")
    monthFinal.setAttribute("class", value = "month-grid")

    let tmpDate = new Date(year, month, 0)
    let numDays = daysInMonth(month, year)
    console.log(numDays)
    let dayOfWeek = (tmpDate.getDay()+1)%7
    console.log(dayOfWeek)

    let prevMonthDays = daysInMonth(month-1, year)
    let nextMonthDays = daysInMonth(month+1, year)


    for (let i = 1; i <= dayOfWeek; i++) {
        let nonMonthDate = createNonMonthDay(prevMonthDays-dayOfWeek+i, month, year)
        monthGrid.appendChild(nonMonthDate)
    }

    for (let i = 1; i <= numDays; i++) {
        let currentMonthDate = createCurrentMonthDay(i, month + 1, year)
        monthGrid.appendChild(currentMonthDate)
    }


    for (let i = 1; i <= 42 - (dayOfWeek) - numDays; i++) {
        let nonMonthDate = createNonMonthDay(i, month + 2, year)
        monthGrid.appendChild(nonMonthDate)
    }

    monthFinal.appendChild(monthGrid)

    return monthFinal
}