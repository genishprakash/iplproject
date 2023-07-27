let fs=require('fs')
let matches=require("../csv_parsed_data/matches.js");
//let matches = import('../csv_parsed_data/matches.js');

let arr=matches.map((x) => x.season);
// Method mentioned on stackoverflow 
//let uniqueChars = [...new Set(arr)];
// const count = arr.reduce((accumulator, value) => {
//     return {...accumulator, [value]: (accumulator[value] || 0) + 1};
//   }, {});
var obj = arr.reduce(function(accumulator, current, index) {
        accumulator[current]=(accumulator[current] || 0) +1;
    return accumulator;
  }, {});

//arr=arr.filter((x,index) => arr.indexOf(x)===index);
// Solved using native javascript for loop
// for(let i=0;i<matches.length;i++){
//     if(!arr.hasOwnProperty(matches[i].season.toString())){
//         arr[matches[i].season]=1;
//     }
//     else{
//         arr[matches[i].season]+=1;
//     }
// }
const jsonObj=JSON.stringify(obj);
fs.writeFile('./src/public/matchesperyear.json',jsonObj,err=>{
  if(err){
    console.log("Error writing file",err);
  }
  else{
    console.log("Successfully wrote file");
  }
})
