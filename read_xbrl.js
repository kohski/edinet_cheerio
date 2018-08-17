var client = require("cheerio-httpcli");
var csv = require("csv");
var  fs = require("fs");

var url = "http://resource.ufocatch.com/xbrl/edinet/ED2018080900614/PublicDoc/jpcrp040300-q2r-001_E01086-000_2018-06-30_01_2018-08-09.xbrl";
var param = {};
const stringifier = csv.stringify();

var answer = extract_data(url);
var term = answer.term;
var closing_date = answer.closing_date;
var edinet_code = answer.edinet_code;
var record_list = [];

/*
-----------------------------------------------------------
                データのスクレイピング部分
-----------------------------------------------------------
*/
(async ()=>{
    const {$} = await client.fetch(url,param);

    //エラーだったらメッセージを出す
    // if(err){
    //     console.log("err:"+err);
    //     return;
    // };

    $('*').each(function(){
        var record  = {};    //最終的なレコード1件分
        var tagname = $(this).get(0).tagName;   //タグ名。:より右側が勘定科目
        var attr    = $(this).attr("contextRef");
        

        if(tagname.indexOf("jppfs_cor")===0 && attr.indexOf("Current")!==-1){
            var subject = tagname.split(":")[1];
            var contextRef = $(this).attr("contextRef");    //contextRef取得
            var contestRedSplit = context_split(contextRef);    //context_split関数で分解
            var is_cons = contestRedSplit.cons;     //contextRefから連結か否かを読み取り
            var ins_dur = contestRedSplit.ins_dur;      //残高か期間損益か取得
            var unitRef = $(this).attr("unitRef");  //金額単位。JPYを想定
            var decimals = $(this).attr("decimals");    //小数点以下の定義。3桁目or6桁目でまるめている
            var amount = Number($(this).text());
    
            //連想配列に代入
            record["edinet_code"] = edinet_code;
            record["term"] = term;
            record["closing_date"] = closing_date;
            record["subject"]=subject;
            record["is_cons"]=is_cons;
            record["ins_dur"]=ins_dur;
            record["unitRef"]=unitRef;
            record["decimal"]=decimals;
            record["amount_type"]="current";
            record["amount"]= amount;

            record_list.push(record);
        };
    });
    //console.log(record_list);
    // const writeableStream = fs.createWriteStream("read_result_xbrl.csv",{encoding:"utf-8"});
    // stringifier.pipe(writeableStream);

    // for(let i = 0; i<record_list.length;i++){
    //     stringifier.write(record_list[i]);
    // };



    /*
    ------------------------------------------------------------
                    データベースへの連結
    ------------------------------------------------------------
    */
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

    var edinet_test = new Schema({
        edinet_code:String,
        term:String,
        closing_date:Date,
        subject:String,
        is_cons:String,
        ins_dur:String,
        unitRef:String,
    //    decimal:Number,
        amount_type:String,
        amount:Number
    });

    //mongoose.model('edinet_test',edinet_test);
    mongoose.connect('mongodb://localhost:27017/edinet_test');

    var edinet_test = mongoose.model("edinet_test",edinet_test);


    console.log("record_listのlength:"+record_list.length);
    for(var i = 0;i < record_list.length;i++){
        var record = {};
        record.edinet_code = record_list[i].edinet_code;
        record.term = record_list[i].term;
        record.closing_date = record_list[i].closing_date;
        record.subject = record_list[i].subject;
        record.is_cons = record_list[i].is_cons;
        record.ins_dur = record_list[i].ins_dur;
        record.unitRef = record_list[i].unitRef;
    //    record.decimal = parseInt(record_list[i].decimal);
        record.amount_type = record_list[i].amount_type;
        record.amount = record_list[i].amount;

        // await new Promise((resolve)=>{
        //         console.log("promise");
        //         new edinet_test(record).save(function (err, record_list){
        //             console.log("ifの直前");            
        //             if(err) {
        //             console.log(err);
        //             } else {
        //             console.log('done');
        //             console.log(record_list);
        //             resolve();
        //             }
        //         });
        // });

        await new edinet_test(record).save();

        console.log("registered!!");
    };
    console.log("All Done");
    mongoose.disconnect();
})();





// function register(){
 
// };
/*
-------------------------------------------------------------
共通関数
-------------------------------------------------------------
*/

function extract_data(url){
var answer = {};

//正規表現 1.q1r~q3r/asrなどを想定
var Reterm =  /[aeiq][123sc]r/;
//2018-06-30や2019-12-31などを想定
var ReClosingDate = /20[0-9][1-9]\-[01][0-9]\-[0123][0-9]/;
//E00004-000などを想定
var ReEdinetCode = /E\d{5}\-\d{3}/;

answer["term"]=url.match(Reterm)[0];
answer["closing_date"]=url.match(ReClosingDate)[0];
answer["edinet_code"]=url.match(ReEdinetCode)[0].split("-")[0];

return answer;
};  

function context_split(contextRef){
var answer = {};

//consolidated or non_consolidated(連結or個別)
if(contextRef.match("NonConsolidated")===null){
answer["cons"]="Consolidated";
}else{
answer["cons"]="NonConsolidated";
};

//instant or duration(末日残高or期間損益)
if(contextRef.match("Instant")===null){
answer["ins_dur"]="Duration";
}else{
answer["ins_dur"]="Instant";
};

return answer;
};

