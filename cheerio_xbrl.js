
var fs = require("fs");
var client = require("cheerio-httpcli");
var csv = require("csv");

const params = {};


const root_url = "http://resource.ufocatch.com/atom/edinetx/query/"
var edinet_code = "E00004";
var url = root_url + edinet_code;


client.fetch(url,params,function(err,$,response){
    //エラーだったらメッセージを出す
    if(err){
        console.log("err:"+err);
        return;
    };

    //エラー以外の場合

    var accum_txt = "";
    $("link").each(function(idx){
        var text = $(this).attr("href");
        if(text.indexOf("Public") !== -1 && text.indexOf(".xbrl") !== -1 ){
            accum_txt += text + "\n";
        };
    });
    accum_txt=accum_txt.split("\n");
    accum_txt.pop(accum_txt[accum_txt.length]);

    data_set = data_set(accum_txt);
    console.log(accum_txt);
    console.log(data_set);
});



function data_set(accum_txt){
    var data_list={
        company:"",
        q1r:[],
        q2r:[],
        q3r:[],
        asr:[],
        icr:[],
        esr:[]
    };
    
    
    for(var i =0; i<accum_txt.length;i++){
        var data_split = accum_txt[i].split("-").join("/");
        data_split = data_split.split("_").join("/");
        data_split = data_split.split("/");
        var company = data_split[10];
        var term = data_split[8];
        var closing_date = data_split[12]+"-"+data_split[13]+"-"+data_split[14];
        // console.log(data_split);
        // console.log(term);
        // console.log(closing_date);
    
        data_list.company = company;
        
        if(term==="q1r"){
            var closing_date_list = data_list.q1r;
            closing_date_list.push(new Date(closing_date));
            closing_date_list.sort;
            data_list.q1r=closing_date_list;
        };
    
        if(term==="q2r"){
            var closing_date_list = data_list.q2r;
            closing_date_list.push(new Date(closing_date));
            closing_date_list.sort;
            data_list.q2r=closing_date_list;
        };
    
        if(term==="q3r"){
            var closing_date_list = data_list.q3r;
            closing_date_list.push(new Date(closing_date));
            closing_date_list.sort;
            data_list.q3r=closing_date_list;
        };
    
        if(term==="asr"){
            var closing_date_list = data_list.asr;
            closing_date_list.push(new Date(closing_date));
            closing_date_list.sort;
            data_list.asr=closing_date_list;
        };
    
        if(term==="icr"){
            var closing_date_list = data_list.icr;
            closing_date_list.push(new Date(closing_date));
            closing_date_list.sort;
            data_list.icr=closing_date_list;
        };
    
        if(term==="esr"){
            var closing_date_list = data_list.esr;
            closing_date_list.push(new Date(closing_date));
            closing_date_list.sort;
            data_list.esr=closing_date_list;
        };
    };

    return data_list;

};