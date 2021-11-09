// calendar.js

$(document).ready(function() {

    const d = new Date();
    const month = new Array(["January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"]);
    const day = new Array(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);

    var current = new Array(31);
    current[d.getDate() - 1] = d.getDay();
    for (var i = d.getDate() - 2; i >= 0; i--) {
        if (current[i + 1] == 0) {
            current[i] = 6;
        }
        else {
            current[i] = current[i + 1] - 1;
        }
    }
    for (var i = d.getDate(); i < 31; i++) {
        if (current[i - 1] == 6) {
            current[i] = 0;
        }
        else {
            current[i] = current[i - 1] + 1;
        }
    }

    var monthLength = 31;
    if (d.getMonth() == 3 || d.getMonth() == 5 || d.getMonth() == 8 || d.getMonth() == 10) {
        monthLength--;
    }
    else if (d.getMonth() == 1) {
        monthLength = 28;
        if (d.getFullYear() % 4 == 0) {
            monthLength++;
        }
    }
});