var http = require("http");
var client = require("cheerio-httpcli");
var parser = require("parse-xbrl");

var url = "http://resource.ufocatch.com/xbrl/edinet/ED2018041200123/PublicDoc/jpcrp040300-q3r-001_E00004-000_2018-02-28_01_2018-04-12.xbrl";
var param = {};

/*
client.fetch(url,param,function(err,$,res){
    var result;
    //エラーだったらメッセージを出す
    if(err){
        console.log("err:"+err);
        return;
    };

    // test_value=$("jppfs_cor dc\\:OrdinaryIncome ppfs_cor[contextRef='Prior1YTDDuration']").val();
    // console.log(test_value);
    
    $("jppfs_cor").each(function(){
        console.log($(this).text());
    })

    parser.parse($).then(function(parsedDoc){
        console.log(parsedDoc);
    });

});
*/

function get_info(){
    return new Promise(function(resolve,reject){
        let body = {};
        http.get(url,(res)=>{
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


parser.parse(get_info).then(function(parsedDoc){
    console.log(parsedDoc);
});