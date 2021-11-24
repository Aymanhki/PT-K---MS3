// this is for the add transaction and category pop-ups

let funcOpenTransac = function () {
    document.getElementById('addTransac').style.display = 'block';
    document.getElementById('directory').style.display = 'none';
    document.getElementById('editor').style.display = 'none';
}

let funcCloseTransac = function () {
    document.getElementById('addTransac').style.display = 'none';
}

let funcOpenCat = function () {
    document.getElementById('addCateg').style.display = 'block';
}

let funcCloseCat = function () {
    document.getElementById('addCateg').style.display = 'none';
}

let funcOpenDir = function (valueToSelect) {
    // document.getElementById('directory').style.display = 'block';
    document.getElementById("transacCat").value = valueToSelect;
    document.getElementById('addTransac').style.display = 'block';
    document.getElementById('directory').style.display = 'none';

}

let funcCloseDir = function () {
    document.getElementById('directory').style.display = 'none';
}

let funcOpenEdit = function () {
    document.getElementById('editor').style.display = 'block';
    document.getElementById('directory').style.display = 'none';
    document.getElementById('addTransac').style.display = 'none';
}

let funcCloseEdit = function () {
    document.getElementById('editor').style.display = 'none';
}

let new_transac = function() {
    let amt = document.getElementById("transacAmt").value;
    let num = parseFloat(amt);
    let type = document.getElementById("transacType");
    var typeVal = type.options[type.selectedIndex].value;
    let category = document.getElementById("transacCat");
    var catVal = category.options[category.selectedIndex].value;
    let name = document.getElementById("transacName").value;
    let date = new Date(document.getElementById("transacDate").value);
    let day = date.getDate()+1;
    let month = date.getMonth();
    let year = date.getFullYear();

    let newTransac = {
        Amount: num,
        Category: catVal,
        Day: day,
        Income: {Expense: typeVal},
        Month: month,
        Title: name,
        Year: year
    }

    console.log(newTransac);
    if(amt.trim()!= "" && name.trim() != "") {
        funcCloseTransac();
        document.getElementById("transacAmt").value = "";
        document.getElementById("transacName").value = "";
        document.getElementById("transacDate").value = "";

        data.push(newTransac);
        console.log(data[data.length-2]);
        console.log(data[data.length-1]);
        
    }
    else {
        if( amt === "" ) {
            document.getElementById("transacAmt").className = 'error';
        }
        if(  name.trim() === "" ) {
            document.getElementById("transacName").className = 'error';
        }
        setTimeout(function() {
            document.getElementById("transacAmt").className = '';
            document.getElementById("transacName").className = '';
        }, 500);
    }

    reloadCalendar();

}


