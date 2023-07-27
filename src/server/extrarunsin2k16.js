let matches=require("../csv_parsed_data/matches.js")
let fs=require('fs')
let deliveries=require("../csv_parsed_data/deliveries.js")
let arr=matches.filter((x,index) => x.season ==="2016").map(x=>x.id);
let obj=deliveries.filter(x => parseInt(x.match_id)>=arr[0] && parseInt(x.match_id)<=arr[arr.length-1])
    .reduce(function(accumulator,current){
        accumulator[current.bowling_team]=(accumulator[current.bowling_team] || 0)+parseInt(current.extra_runs);
        return accumulator;
    },{});
//console.log(obj);
const jsonString = JSON.stringify(obj)
fs.writeFile('./src/public/extraruns2k16.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})