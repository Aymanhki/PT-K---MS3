// this is for the add transaction and category pop-ups

let funcOpenTransac = function () {
    document.getElementById('addTransac').style.display = 'block';
    document.getElementById('directory').style.display = 'none';
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

let funcOpenDir = function () {
    document.getElementById('directory').style.display = 'block';
}

let funcCloseDir = function () {
    document.getElementById('directory').style.display = 'none';
}

let funcOpenEdit = function () {
    document.getElementById('editor').style.display = 'block';
    document.getElementById('directory').style.display = 'none';
}

let funcCloseEdit = function () {
    document.getElementById('editor').style.display = 'none';
}

let new_transac = function() {
    let amt = document.getElementById("transacAmt").value;
    let type = document.getElementById("transacType");
    var typeVal = type.options[type.selectedIndex].value;
    let category = document.getElementById("transacCat");
    var catVal = category.options[category.selectedIndex].value;
    let name = document.getElementById("transacName").value;

    let newTransac = {
        amt: amt,
        type: typeVal,
        category: catVal,
        name: name
    }

    console.log(newTransac);
    if(amt!= "" && name != "") {
        funcCloseTransac();
    }



}