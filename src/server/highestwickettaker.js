let deliveries=require("../csv_parsed_data/deliveries.js");
let fs=require('fs')
let max=0
let result={};
let obj=deliveries.filter(x=> x.player_dismissed!='')
.reduce(function(acc,curr){
    let a= curr.dismissal_kind=='run out' ? curr.fielder : curr.bowler;
    if(!acc.hasOwnProperty(a)){
        acc[a]={};
    }
    if(!acc[a].hasOwnProperty(curr.player_dismissed)){
        acc[a][curr.player_dismissed]=1;
    }
    else{
        acc[a][curr.player_dismissed]+=1;
    }
    if(acc[a][curr.player_dismissed]>max){

        let temp={}
        temp[curr.player_dismissed]=acc[a][curr.player_dismissed];
        result={}
        result[a]=temp;
        max=acc[a][curr.player_dismissed];
    }
    return acc;
},{})
console.log(result);
const jsonString = JSON.stringify(result)
fs.writeFile('./src/public/highestwickettaker.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file ')
    }
})