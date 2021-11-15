'use strict'

let object = {
    table: []
}

let categories = [];
function getTotals()
{




    for(let i=0; i<data.length; i++)
    {
        if(!categories.includes(data[i].Category) && data[i].Category !== undefined)
        {
            categories.push(data[i].Category);
        }
    }

    for(let i=0; i<categories.length; i++)
    {

        let total = 0;
        for(let j=0; j<data.length; j++)
        {
            if(data[j].Category === categories[i])
            {
                total += data[j].Amount;
            }
        }
        categories[i] = [categories[i], total];

    }

    function getRandomColor() {

        let color = 'rgb('+Math.random()*255+', '+Math.random()*255+', '+Math.random()*255+')';
        return color;
    }

    const RGB_Linear_Shade=(p,c)=>{
        var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
        return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
    }

    for(let i=0; i<categories.length; i++)
    {
        let color = getRandomColor();
        categories[i].push(color);
        categories[i].push(RGB_Linear_Shade( 0.5, color));
    }
}
