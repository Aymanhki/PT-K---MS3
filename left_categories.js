getCatPopTotals = function() {
    $(document).ready(function () {
        // getCategoryTotals();
        let cats = categories.length ;
        for (let i = 0; i < cats; i++) {
            let cat_pop = document.getElementById(`catt${i+1}`);
            cat_pop.innerText = "";
            cat_pop.innerText = `${categories[i][0]}\n\$${categories[i][1].toFixed(2)}`
        }
        
        
    });
};
