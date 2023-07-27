let matches=require("../csv_parsed_data/matches.js");
let deliveries=require("../csv_parsed_data/deliveries.js");
let fs=require('fs');
let arr=matches.filter((x,index) => x.season ==="2015").map(x=>x.id);
let overs=deliveries.filter(x => parseInt(x.match_id)>=parseInt(arr[0]) && parseInt(x.match_id)<=parseInt(arr[arr.length-1]))
    .reduce(function(accumulator,current){
        if(current.ball==='1'){
            accumulator[current.bowler]=(accumulator[current.bowler] || 0) +1;
        }
            return accumulator;
    },{})
let obj=deliveries.filter(x => parseInt(x.match_id)>=parseInt(arr[0]) && parseInt(x.match_id)<=parseInt(arr[arr.length-1]))
        .reduce(function(accumulator,current){
            accumulator[current.bowler]=(accumulator[current.bowler] || 0)+parseInt(current.total_runs);
            return accumulator;
        },{});
const names=Object.keys(obj);
const economicalbowlers=names.reduce(function(accumulator,current){
    accumulator[current]=obj[current]/overs[current];
    return accumulator;
},{})
let result=Object.entries(economicalbowlers).sort((x,y) => x[1]-y[1])
    .filter((x,index) => index<10);
let obj_result=Object.fromEntries(result);
const jsonString=JSON.stringify(obj_result);
fs.writeFile('./src/public/economicalbowlersin2k15.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})
