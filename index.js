//This JS file is for interaction between sections in HTML files.

let pop_ups = $(".pop-up");

let funcClosePopUps = function () {
    pop_ups.hide();
}

let pop_up_close_btn = $(".pop-up-close");

pop_up_close_btn.on("click", funcClosePopUps);


