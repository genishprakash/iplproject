var fs = require('fs');
var path=require("path");
var arr = [];
var bufferString;
const jsonObj = [];
csv= fs.readFileSync(path.resolve(__dirname,"../data/matches.csv"));
    bufferString = csv.toString();
    arr = bufferString.split('\n');
    var headers = arr[0].split(',');
    for (var i = 1; i < arr.length; i++) {
        var data = arr[i].split(',');
        var obj = {};
        for (var j = 0; j < data.length; j++) {
            obj[headers[j]] = data[j].trim();
        }
        jsonObj.push(obj);
    }
    module.exports=jsonObj;
    const jsonString = JSON.stringify(jsonObj)
    fs.writeFile('./src/public/matches.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file ')
        }
    })