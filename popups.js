// this is for the add transaction and category pop-ups

let pop_up_transaction = $(".pop-up");

let transaction_open = $(".category");

let transaction_close = $(".close");

let funcOpenTransac = function () {
    pop_up_transaction.open();
}

let funcCloseTransac = function () {
    pop_up_transaction.hide();
}

transaction_open.on("click", funcOpenTransac);
transaction_close.on("click", funcCloseTransac);