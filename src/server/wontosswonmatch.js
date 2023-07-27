let matches=require("../csv_parsed_data/matches.js");
let fs=require('fs')
let result=matches.filter(x => x.toss_winner===x.winner)
            .reduce(function(accumulator,current){  
                accumulator[current.winner]=(accumulator[current.winner] || 0)+1;
                return accumulator;
            },{});
console.log(result);
const jsonString = JSON.stringify(result);
    fs.writeFile('./src/public/wontosswonmatch.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file ')
        }
    })