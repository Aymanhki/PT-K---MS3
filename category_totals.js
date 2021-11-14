'use strict'
let fs = require('fs');
let dataFile = fs.readFileSync('FakeData.csv', "utf-8");
let dataLines = dataFile.split('\n');
let data = [];
let categories = [];
let CATEGORY_INDEX = 4;
let AMOUNT_INDEX = 6;
for(let i=1; i<dataLines.length; i++)
{
    data.push(dataLines[i].split(','));
}

for(let i=0; i<data.length; i++)
{
    if(!categories.includes(data[i][CATEGORY_INDEX]) && data[i][CATEGORY_INDEX] !== undefined)
    {
        categories.push(data[i][CATEGORY_INDEX]);
    }
}

for(let i=0; i<categories.length; i++)
{

    let total = 0;
    for(let j=0; j<data.length; j++)
    {
        if(data[j][CATEGORY_INDEX] === categories[i])
        {
            total += parseFloat(data[j][AMOUNT_INDEX]);
        }
    }
    categories[i] = [categories[i], total];

}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

for(let i=0; i<categories.length; i++)
{
    categories[i].push(getRandomColor());
    categories[i].push(getRandomColor());
}

let object = {
    table: []
}

for(let i=0; i<categories.length; i++)
{
    object.table.push
    ({
        label: categories[i][0],
        value: categories[i][1],
        color: categories[i][2],
        highlight: categories[i][3]
    });
}

exports.object = object;

