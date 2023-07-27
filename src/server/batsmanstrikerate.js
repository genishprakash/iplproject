let deliveries=require("../csv_parsed_data/deliveries.js");
let matches=require("../csv_parsed_data/matches.js");
let fs=require('fs')
// Year_id object has the id with current season value.
let year_id=matches.reduce(function(accumulator,current){
    accumulator[current.id]=current.season
    return accumulator;
},{});
let strike_rate=deliveries.reduce(function(accumulator,current){
    let a=year_id[current.match_id];
    
    if(!accumulator.hasOwnProperty(a)){
        accumulator[a]={};
    }
    if(!accumulator[a].hasOwnProperty(current.batsman)){
        accumulator[a][current.batsman]=[parseInt(current.batsman_runs),1,0];
    }
    else{
        accumulator[a][current.batsman][0]+=parseInt(current.batsman_runs);
        accumulator[a][current.batsman][1]+=1;
        accumulator[a][current.batsman][2]=(accumulator[a][current.batsman][0]/accumulator[a][current.batsman][1])*100;
    }
    return accumulator;
},{})

const jsonString = JSON.stringify(strike_rate);
fs.writeFile('./src/public/batsmanstrikerate.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file ')
    }
})
console.log(strike_rate);

