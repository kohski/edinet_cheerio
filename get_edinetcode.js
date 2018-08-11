/*
https://disclosure.edinet-fsa.go.jp/E01EW/download?uji.verb=W1E62071EdinetCodeDownload&uji.bean=ee.bean.W1E62071.EEW1E62071Bean&TID=W1E62071&PID=W1E62071&SESSIONKEY=1533939918915&downloadFileName=&lgKbn=2&dflg=0&iflg=0&dispKbn=1
から落とせるedinetの企業マスターから2次元配列を生成して、E*****で始まるEDINETコードを抽出して、CSVに再度入れ直す。
*/

//var request = require("request");
//var csv = require("csv");
var fs = require("fs");
var rows = [];
var columns = [];
var edinet_info = [];
var temp_str = "";
var csv = require("csv");
var edinet_info=[];
var edinet_code = [];
//const csvSync = require('sync');

//var url = "https://disclosure.edinet-fsa.go.jp/E01EW/download?uji.verb=W1E62071EdinetCodeDownload&uji.bean=ee.bean.W1E62071.EEW1E62071Bean&TID=W1E62071&PID=W1E62071&SESSIONKEY=1533922723794&downloadFileName=&lgKbn=2&dflg=0&iflg=0&dispKbn=1";

//一列ずつ取り出して処理
rows = fs.readFileSync("./EdinetcodeDlInfo.csv","utf-8",function(err,text){
    if(err){
        console.log("error");
        return;        
    }; 
}).toString().split("\n");

//一行ずつ取り出して処理
for(var i = 0;i<rows.length;i++){
    if(rows[i]===''){
        break;
    }
    columns[i]=rows[i].split(",");
    edinet_info.push(columns[i])
};

//落としてきたcsvの最初の2行が無駄なので、2からカウントスタート
for(var i = 2;i<edinet_info.length;i++){
    //よくわからないけど、"が入ってきてしまうからreplace
    temp_str = edinet_info[i][0].replace('"',"")
    temp_str = temp_str.replace('"',"")
    edinet_code.push(temp_str);
}

var edinet_code_list= "";
for(var k = 0; k<edinet_code.length;k++){
    edinet_code_list += edinet_code[k]+",";
};

console.log(edinet_code);
console.log(edinet_code_list);

const stringfier = csv.stringify();
stringfier.write(edinet_code);
const writeableStream = fs.createWriteStream("edinet_code.csv",{encoding:"utf-8"});
stringfier.pipe(writeableStream);