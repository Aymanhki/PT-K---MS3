
$( window ).on( "load", function() {
    let cats = categories.length ;
    console.log(cats);
    for (let i = 0; i < cats; i++) {
        let cat_pop = document.getElementById(`catt${i+1}`);
        cat_pop.innerText = `${categories[i][0]}\n${categories[i][1].toFixed(2)}`

        console.log(`${cat_pop.innerText}`);
    }

    
    
});