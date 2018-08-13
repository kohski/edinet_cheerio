var http = require("http");
var client = require("cheerio-httpcli");
var ParseXbrl = require('parse-xbrl');
var request = require("request");
var DOMParser = require('xmldom').DOMParser;

var url = "http://resource.ufocatch.com/xbrl/edinet/ED2018080900614/PublicDoc/jpcrp040300-q2r-001_E01086-000_2018-06-30_01_2018-08-09.xbrl";
var param = {};

client.fetch(url,param,function(err,$,res){
    var result;
    //エラーだったらメッセージを出す
    if(err){
        console.log("err:"+err);
        return;
    };
    // test_value=$("jppfs_cor dc\\:OrdinaryIncome ppfs_cor[contextRef='Prior1YTDDuration']").val();
    // console.log(test_value);
    //console.log($);

    // var body = $.xml();
    // var split_body = body.split("\n");
    // console.log(split_body);
    
    // console.log(body);
    // console.log(typeof body);

    // body.each(function(){
    //     console.log($(this).val());
    // });

    var index = 0;
    //$('jppfs_cor\\:OrdinaryIncome').each(function(){
    $('*').each(function(){
        var record_amount = {};
        var tagname = $(this).prop("tagName");
        var attr    = $(this).attr("contextRef");
        var is_cons = "--------";
        var ins_dur = "--------";
        var decimal = "--------";
        var depth   = "--------";
        var amount  = "--------"; 

        if(tagname.indexOf("JPPFS_COR")===0 && attr.indexOf("Current")!==-1){
            console.log(tagname+":"+$(this).text());
            console.log("contextRef:"+attr);

            record_amount = "--------";
            
        };
    });

});



// function get_info(){
//     return new Promise(function(resolve,reject){
//         let body = {};
//         http.get(url,(res)=>{
//             res.setEncoding("utf-8");
//             res.on("data",(chunk)=>{
//                 body+=chunk;
//             });
//             res.on("end",(res)=>{
//                 resolve(body);
//             }).on("error",(res)=>{
//                 console.log(e.message);
//             });
//         });
//     });
// };
// parser.parse(get_info).then(function(parsedDoc){
//     console.log(parsedDoc);
// });



// var XML = "";
// request
// .get(url).on('response', function(response) {
//    response.on('data', function(chunk){
//        XML += chunk;
//    });
//    response.on('end',function(){
//        ParseXbrl.parseStr(XML).then(function(parsedDoc) {
//        console.log(parsedDoc);
//        });
//    });
// });



