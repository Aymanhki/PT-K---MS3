'use strict'

let object = {
    table: []
}

//let categories = [];

function getRandomColor()
{
    return 'rgb('+Math.random()*255+', '+Math.random()*255+', '+Math.random()*255+')';
}

function RGB_Linear_Shade(p,c) {
    var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
    return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
}

function getCategoryTotals()
{
        categories = [];
        if(isMonthView)
        {
            for(let i=0; i<data.length; i++)
            {
                if(!categories.includes(data[i].Category) && data[i].Category !== undefined && data[i].Month == month && data[i].Year == year)
                {
                    categories.push(data[i].Category);
                }
            }

        }
        else
        {
            for(let i=0; i<data.length; i++)
            {
                if(!categories.includes(data[i].Category) && data[i].Category !== undefined && data[i].Year == year)
                {
                    categories.push(data[i].Category);
                }
            }
        }

        for(let i=0; i<categories.length; i++)
        {
            let total = 0;
            if(isMonthView)
            {
                for(let j=0; j<data.length; j++)
                {
                    if(data[j].Category === categories[i] && data[j].Month == month && data[j].Year == year)
                    {
                        total += data[j].Amount;
                    }
                }
            }
            else
            {
                for(let j=0; j<data.length; j++)
                {
                    if(data[j].Category === categories[i] && data[j].Year == year)
                    {
                        total += data[j].Amount;
                    }
                }
            }

            categories[i] = [categories[i], total];
        }


        let colors = ['rgba(26,134,147)', 'rgba(212,185,94)', 'rgba(78,162,162)', 'rgba(116,26,51)', 'rgba(210,143,52)', 'rgba(179,66,50)']

        categories = categories.sort();
        for(let i=0; i<categories.length; i++)
        {
            categories[i].push(colors[i]);
            categories[i].push(RGB_Linear_Shade( 0.3, colors[i]));
        }
}
