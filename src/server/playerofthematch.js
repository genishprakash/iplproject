let matches=require("../csv_parsed_data/matches.js");
let fs=require('fs')
let teams={};
let obj=matches.reduce(function(accumulator,current){
    accumulator[current.season]=matches.reduce(function(acc,curr){
        if(curr.season==current.season){
            acc[curr.player_of_match]=(acc[curr.player_of_match] || 0)+1;
        }
        return acc;
    },{});
    let sorted=Object.entries(accumulator[current.season]).sort((x,y)=>  y[1]-x[1]).filter( (x,index) => index<1);
    accumulator[current.season]=Object.fromEntries(sorted);
    return accumulator;
},{})
console.log(obj);
const jsonString = JSON.stringify(obj)
    fs.writeFile('./src/public/playerofthematch.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file ')
        }
    })