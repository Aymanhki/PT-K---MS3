'use strict'

let object = {
    table: []
}

//Moved to globalVariables
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

    categories.sort()




    for(let i=0; i<categories.length; i++)
    {
        let color = ["rgb(29, 116, 3)", "rgb(121, 72, 255)", "rgb(240, 154, 26)", "rgb(255, 0, 0)", "rgb(0, 67, 252)", "rgb(109, 83, 49)"];
        categories[i].push(color[i]);
        categories[i].push(RGB_Linear_Shade( 0.3, color[i]));
    }
    
}
