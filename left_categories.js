getCatPopTotals = function() {
    $(document).ready(function () {
        getCategoryTotals();
        let cats = categories.length ;
        for (let i = 0; i < cats; i++) {
            
            for (let j = 0; j <cats; j++) {
                let cat_pop = document.getElementById(`catt${j+1}`);
                if( $(`#catt${j+1}`).length )
                    if(cat_pop.innerText.includes(`${categories[i][0]}`)) {
                        cat_pop.innerText = "";
                        cat_pop.innerText += `${categories[i][0]}\n\$${categories[i][1].toFixed(2)}`
                    }
            }
            
            
        }
        
        
    });
};
