getCatPopTotals = function() {
    $(document).ready(function () {
        // getCategoryTotals();
        let cats = categories.length ;
        let category = categories.sort();
        for (let i = 0; i < cats; i++) {
            let cat_pop = document.getElementById(`catt${i+1}`);
            cat_pop.innerText = "";
            cat_pop.innerText = `${category[i][0]}\n${category[i][1].toFixed(2)}`
        }
        console.log(categories);
        
        
    });
};
