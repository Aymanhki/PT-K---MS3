// this is for the add transaction and category pop-ups

let funcOpenTransac = function () {
    document.getElementById('addTransac').style.display = 'block';
    document.getElementById('directory').style.display = 'none';
    document.getElementById('editor').style.display = 'none';
}

let funcCloseTransac = function () {
    document.getElementById('addTransac').style.display = 'none';
    document.getElementById("transacAmt").value = "";
    document.getElementById("transacName").value = "";
    document.getElementById("transacDate").value = "";
}

let funcOpenCat = function () {
    document.getElementById('addCateg').style.display = 'block';
}

let funcCloseCat = function () {
    document.getElementById('addCateg').style.display = 'none';
    document.getElementById('catName').value = "";
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
        icon.selectedIndex = 0;

        let catNew = document.createElement("div");
        catNew.setAttribute("class", "cat7");
        let newButton = document.createElement("button");
        newButton.setAttribute("class", `category new`);
        newButton.setAttribute("onclick", `funcOpenTransac()`);
        let sign = document.createElement("i");
        sign.style.color = color;
        let pullOut = document.createElement("div");
        pullOut.setAttribute("class", "cat-pop");
        pullOut.setAttribute("id", "catt7")
        pullOut.innerText = name;
        pullOut.style.color = color;
        sign.setAttribute("class", `${iconVal}`);
        newButton.setAttribute("style", `border-color: ${color};`);

        var css = `new:hover{background-color: ${color};}`;
        var style = document.createElement('style');

        style.appendChild(document.createTextNode(css));

        newButton.appendChild(style);

        newButton.appendChild(sign);
        catNew.appendChild(newButton);
        catNew.appendChild(pullOut);

        let left = document.getElementById('left_panel');
        let add = document.getElementById("add_button");
        left.insertBefore(catNew, add);


        let newData = {
            Amount: 10,
            Category: name,
            Day: 1,
            Income: {Expense: 'Income'},
            Month: 1,
            Title: "random added",
            Year: 2019
        };
        data.push(newData);
        console.log(data[data.length-1]);

        let newCat = [name,
            0.00,
            color,
            color];
        doughnutLabels.push(name);
        categories.push(newCat);
        getCategoryTotals();
        getCatPopTotals();
        doughnutChart.destroy();
        lineChart.destroy();
        drawDoughnut();
        drawLine();
    }
}

let deletCategory = function(){

}

let submitEdit = function() {

}
