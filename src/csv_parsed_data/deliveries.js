var fs = require('fs');
var path=require("path");
var arr = [];
var bufferString;
const jsonObj = [];
csv= fs.readFileSync(path.resolve(__dirname,"../data/deliveries.csv"));
    bufferString = csv.toString();
    arr = bufferString.split('\n');
    var headers = arr[0].split(',');
    for (var i = 1; i < arr.length; i++) {
        var data = arr[i].split(',');
        var obj = {};
        for (var j = 0; j < data.length; j++) {
            obj[headers[j].trim()] = data[j].trim();
        }
        jsonObj.push(obj);
    }
    JSON.stringify(jsonObj);
//console.log(jsonObj);
module.exports=jsonObj;

