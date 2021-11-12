// calendar.js

const CALENDAR_DAY_GRID_ID = "days-of-week";
const CALENDAR_HEADER_YEAR_ID = "calendar-header-year";
const CALENDAR_HEADER_MONTH_ID = "calendar-header-month";

const CALENDAR_HEADER_PREV_ID = "calendar-prev";
const CALENDAR_HEADER_NEXT_ID = "calendar-next";

const MONTH_START = 0;
const MONTH_END = 11;

//Global variables for controlling calendar
let year;
let month;
let isMonthView = true;



const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function daysInMonth(month, year) {
    let d = new Date(year, month + 1, 0)
    return d.getDate();
}

function loadCalendarDays(month, year) {
    //Draw day grid
    let daysGrid = document.getElementById(CALENDAR_DAY_GRID_ID);
    clearCalendar();

    let tmpDate = new Date(year, month, 0)
    let numDays = daysInMonth(month, year)
    console.log(numDays)
    let dayOfWeek = (tmpDate.getDay()+1)%7
    console.log(dayOfWeek)
    for (let i = 1; i <= dayOfWeek; i++) {
        let nonMonthDate = createNonMonthDay(0, 0, 0)
        daysGrid.appendChild(nonMonthDate)
    }

    for (let i = 1; i <= numDays; i++) {
        let currentMonthDate = createCurrentMonthDay(i, month + 1, year)
        daysGrid.appendChild(currentMonthDate)
    }


    for (let i = 0; i < 42 - (dayOfWeek) - numDays; i++) {
        let nonMonthDate = createNonMonthDay(0, 0, 0)
        daysGrid.appendChild(nonMonthDate)
    }
}

function clearCalendar() {
    document.getElementById(CALENDAR_DAY_GRID_ID).innerHTML = "";
}

function createNonMonthDay(date, month, year) {
    let dateElement = createDate(date, month, year)
    dateElement.innerHTML = ""

    return dateElement
}

function createCurrentMonthDay(date, month, year) {
    let dateElement = createDate(date, month, year)
    dateElement.innerHTML = `<span>${date}</span>`;
    dateElement.onclick = clickOnDate(date, month, year);
    return dateElement
}

function clickOnDate (date, month, year) {
    return () => {
        alert(`Open day view of ${date}-${month}-${year}`)
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

function setHeaderArrowListener () {
    if (isMonthView) {
        let prevBtn = $(`#${CALENDAR_HEADER_PREV_ID}`);
        let nextBtn = $(`#${CALENDAR_HEADER_NEXT_ID}`);

        prevBtn.on("click", prevMonth)
        nextBtn.on("click", nextMonth)
    }
}

function nextMonth () {
    if (month == MONTH_END) {
        month = MONTH_START;
        year ++;
    } else {
        month ++;
    }
    reloadCalendar();
}

function prevMonth () {
    if (month == MONTH_START) {
        month = MONTH_END;
        year --;
    } else {
        month --;
    }
    reloadCalendar();
}

function reloadCalendar () {
    setCalendarMonthViewHeader (month, year)
    loadCalendarDays(month, year);
}

$(document).ready(function () {
    let currentDay = new Date();

    year = currentDay.getFullYear();
    month = currentDay.getMonth();

    console.info(currentDay.toLocaleDateString())

    
    setHeaderArrowListener();
    reloadCalendar ();
})
