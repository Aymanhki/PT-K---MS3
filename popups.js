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
    let num = parseFloat(parseFloat(amt).toFixed(2));
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

    if(amt.trim()!= "" && name.trim() != "") {
        funcCloseTransac();
        document.getElementById("transacAmt").value = "";
        document.getElementById("transacName").value = "";
        document.getElementById("transacDate").value = "";

        data.push(newTransac);
        reloadCalendar();
        doughnutChart.destroy();
        lineChart.destroy();
        drawDoughnut();
        drawLine();
        
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

    

}

let selectedIcon =  function(x) {
    let icon = document.getElementById('catIcon');
    icon.selectedIndex = x-1;
    let options = {
        1: "fas fa-baby-carriage fa-lg",
        2: "fas fa-bone fa-lg",
        3: "fas fa-car fa-lg",
        4: "fas fa-cat fa-lg",
        5: "fas fa-crow fa-lg",
        6: "fas fa-faucet fa-lg",
        7: "fas fa-gem fa-lg",
        8: "fas fa-guitar fa-lg",
        9: "fas fa-luggage-cart fa-lg",
        10: "fas fa-mug-hot fa-lg",
        11: "fas fa-plane fa-lg",
        12: "fas fa-piggy-bank fa-lg"
    };
    let selected = document.getElementById('selected_icon');
    selected.className = `selected-icon ${options[x]}`;

}

let submitCat = function() {
    let name = document.getElementById('catName').value;
    let color = document.getElementById('catColor').value;
    let icon = document.getElementById('catIcon');
    var iconVal = icon.options[icon.selectedIndex].value;

    if(name.trim() === ''){
        document.getElementById('catName').className = 'error';
        setTimeout(function() {
            document.getElementById("catName").className = '';
        }, 500);
    }
    else {
        funcCloseCat();
        document.getElementById('catName').value = "";
        icon.selectedIndex = 0;
        console.log({
            name: name,
            icon: iconVal,
            color: color
        });

        let catNew = document.createElement("div");
        catNew.setAttribute("class", "cat7");
        let newButton = document.createElement("button");
        newButton.setAttribute("class", `category ${name}`);
        let pullOut = document.createElement("i");
        pullOut.setAttribute("class", `${iconVal}`);
        newButton.setAttribute("style", `border-color: ${color};`);

        newButton.appendChild(pullOut);
        catNew.appendChild(newButton);

        let left = document.getElementById('left_panel');
        let add = document.getElementById("add_button");
        left.insertBefore(catNew, add);
    }
}

let deletCategory = function(){

}

let submitEdit = function() {

}
