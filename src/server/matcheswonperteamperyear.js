let matches=require("../csv_parsed_data/matches.js");
let fs=require('fs')
let teams=matches.reduce(function(accumulator,current){
    if(current.winner!='')
        accumulator[current.winner]=0;
    return accumulator;
},{});
let obj=matches.reduce(function(accumulator,current){
    if(accumulator.hasOwnProperty(current.season)){
        if(current.winner!=''){
            accumulator[current.season][current.winner]+=1;
        }
    }
    else{
        //Deep cloning 
        let team=JSON.stringify(teams);
        accumulator[current.season]=JSON.parse(team);
    }
    return accumulator;
},{});

console.log(obj);
const jsonString=JSON.stringify(obj);
fs.writeFile('./src/public/matcheswonperteamperyear.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file ')
    }
})
// Solved using Java script native for loop
// console.log(obj);
// for(let i=0;i<matches.length;i++){
//     if(!teams.hasOwnProperty(matches[i].team1.toString()) && matches[i].team1!=null){
//         teams[matches[i].team1]=0;
//         continue;
//     }
// }
// console.log(teams);
// for(let i=0;i<matches.length;i++){
//     if(!obj.hasOwnProperty(matches[i].season.toString()) && matches[i].season!=null){
//         let temp=JSON.stringify(teams);
//         obj[matches[i].season]=JSON.parse(temp);
//         //obj[matches[i].season]=teams;
//     }
// }
// obj[matches[0].season][matches[0].winner]+=1;
// console.log(obj);
// for(let i=0;i<matches.length;i++){
//     let nestedObj1=matches[i].season.toString();
//     let nestedObj2=matches[i].winner.toString();
//     //console.log(matches[i].season+" "+matches[i].winner);
// }
