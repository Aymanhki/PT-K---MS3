
$( window ).on( "load", function() {
    let category = data.find(data => data.Month === month);
    let cats = categories.length ;
    for (let i = 0; i < cats; i++) {
        let cat_pop = document.getElementById(`catt${i+1}`);
        cat_pop.innerText = `${categories[i][0]}\n${categories[i][1].toFixed(2)}`
    }

    
    
});