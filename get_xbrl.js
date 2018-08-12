/*
edine_code.csvからレコード1件ずつ抽出。
有報キャッチャーに代入して、publicの.xbrlを抽出
[  
    {"code":"E0004",
    "latest":"http://resource.ufocatch.com/xbrl/edinet/ED2016083100332/PublicDoc/jpcrp030000-asr-001_E00004-000_2016-05-31_01_2016-08-31.xbrl",
    "n-1":"",
    "n-2":"",
    "n-3":"",
    "n-4":"",}
]

*/

var http = require("http");
var DOMParser = require('xmldom').DOMParser;
//var parseString = require("xml2js").parseString;


const root_url = "http://resource.ufocatch.com/atom/edinetx/query/"
var edinet_code = "E00004";

function get_info(){
    return new Promise(function(resolve,reject){
        let body = {};
        http.get(root_url+edinet_code,(res)=>{
            res.setEncoding("utf-8");
            res.on("data",(chunk)=>{
                body+=chunk;
            });
            res.on("end",(res)=>{
                resolve(body);
            }).on("error",(res)=>{
                console.log(e.message);
            });
        });
    });
};

function analisys_info(body){
    let parser = new DOMParser();
    let doc = parser.parseFromString(body, "text/xml");

    var url = doc.getElementById("link").getAttribute("href");
    console.log(url)

    //objバージョン
    var index= 0;
    for(var item in doc){
        // var str = toString(item);
        // console.log(str);
        // if(str.indexOf("Public") !== -1 && str.indexOf(".xbrl") !== -1 ){
        //     console.log(item);
        // };
        
    //    var href_url = item.getElementsByTagName("link").getAttribute("href");
        //console.log(href_url);

    };

    // //文字列バージョン：
    // var arr = body.split("\n");
    // for(var i=0;i<arr.length;i++){
    //     if(arr[i].indexOf("Public") !== -1 && arr[i].indexOf(".xbrl") !== -1 ){
    //         console.log(arr[i].trim());
    //     };
    // };
};

get_info().then(
    function(body){
        analisys_info(body);
    }
).catch(
    function(error){
        console.log(error);
});