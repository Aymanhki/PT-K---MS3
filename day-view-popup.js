
function openDayView( day,  month,  year)
{
    document.getElementById("day-popup").classList.toggle("active");
    let dateFormat = MONTHS[month-1]+" "+day+", "+year;
    let closeBtn = "<div class='day-view-close-button' onclick=closeDayView()>&times;</div>";
    let prevBtn = "<button class='last-day'>&#10094;</button>"
    let nextBtn = "<button class='next-day'>&#10095;</button>"
    let dateDiv = "<div class='grid-panel right-panel day-view-date'>"+dateFormat+"</div>";
    let dateSliderGrid = "<grid class='day-view-date-list'>"+prevBtn+dateDiv+nextBtn+"</grid>"
    document.getElementById("day-Transactions-Content").innerHTML = closeBtn + dateSliderGrid;
}

function closeDayView()
{
    document.getElementById("day-popup").classList.remove("active");
}