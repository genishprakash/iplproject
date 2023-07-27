let deliveries=require("../csv_parsed_data/deliveries.js")
let fs=require('fs')
let result=deliveries.filter(x=> x.is_super_over==='1')
    .reduce(function(acc,curr){
        if(!acc.hasOwnProperty(curr.bowler)){
            acc[curr.bowler]=[0,0];
        }
        acc[curr.bowler][0]=acc[curr.bowler][0]+parseInt(curr.total_runs);
        if(curr.wide_runs=='0' && curr.noball_runs=='0'){
            acc[curr.bowler][1]+=1;
        }
        return acc;
    },[]);
let keys=Object.keys(result);
let obj=keys.reduce((acc,curr)=>{
        let overs=Math.floor((result[curr][1])/6) +((result[curr][1]%6))/6 ;
        acc[curr]=result[curr][0]/overs;
        return acc;
    },{})
    const jsonString = JSON.stringify(result)
fs.writeFile('./src/public/besteconomyinsuperover.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file ')
    }
})