

test_case=[
"http://resource.ufocatch.com/xbrl/edinet/ED2018041200123/PublicDoc/jpcrp040300-q3r-001_E00004-000_2018-02-28_01_2018-04-12.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2018011100171/PublicDoc/jpcrp040300-q2r-001_E00004-000_2017-11-30_01_2018-01-11.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2017101000222/PublicDoc/jpcrp040300-q1r-001_E00004-000_2017-08-31_01_2017-10-10.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2017090100139/PublicDoc/jpcrp050300-esr-001_E00004-000_2017-09-01_01_2017-09-01.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2017083000134/PublicDoc/jpctl010000-icr-001_E00004-000_2017-08-30_01_2017-08-30.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2017083000138/PublicDoc/jpcrp030000-asr-001_E00004-000_2017-05-31_01_2017-08-30.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2017041200077/PublicDoc/jpcrp040300-q3r-001_E00004-000_2017-02-28_01_2017-04-12.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2017011200202/PublicDoc/jpcrp040300-q2r-001_E00004-000_2016-11-30_01_2017-01-12.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2016101100146/PublicDoc/jpcrp040300-q1r-001_E00004-000_2016-08-31_01_2016-10-11.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2016090200152/PublicDoc/jpcrp050300-esr-001_E00004-000_2016-09-02_01_2016-09-02.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2016083100332/PublicDoc/jpcrp030000-asr-001_E00004-000_2016-05-31_01_2016-08-31.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2016083100333/PublicDoc/jpctl010000-icr-001_E00004-000_2016-08-31_01_2016-08-31.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2016040800236/PublicDoc/jpcrp040300-q3r-001_E00004-000_2016-02-29_01_2016-04-08.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2016040600070/PublicDoc/jpcrp030000-asr-001_E00004-000_2014-05-31_02_2016-04-06.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2016040600076/PublicDoc/jpcrp030000-asr-001_E00004-000_2015-05-31_02_2016-04-06.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2016010800240/PublicDoc/jpcrp040300-q2r-001_E00004-000_2015-11-30_01_2016-01-08.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2015100900238/PublicDoc/jpcrp040300-q1r-001_E00004-000_2015-08-31_01_2015-10-09.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2015090300093/PublicDoc/jpcrp050300-esr-001_E00004-000_2015-09-03_01_2015-09-03.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2015083100266/PublicDoc/jpcrp030000-asr-001_E00004-000_2015-05-31_01_2015-08-31.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2015083100267/PublicDoc/jpctl010000-icr-001_E00004-000_2015-08-31_01_2015-08-31.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2015041000234/PublicDoc/jpcrp040300-q3r-001_E00004-000_2015-02-28_01_2015-04-10.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2015010900333/PublicDoc/jpcrp040300-q2r-001_E00004-000_2014-11-30_01_2015-01-09.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2014101000323/PublicDoc/jpcrp040300-q1r-001_E00004-000_2014-08-31_01_2014-10-10.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2014090500141/PublicDoc/jpcrp050300-esr-001_E00004-000_2014-09-05_01_2014-09-05.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2014082900416/PublicDoc/jpcrp030000-asr-001_E00004-000_2014-05-31_01_2014-08-29.xbrl",
"http://resource.ufocatch.com/xbrl/edinet/ED2014082900417/PublicDoc/jpctl010000-icr-001_E00004-000_2014-08-29_01_2014-08-29.xbrl"];

var test = "http://resource.ufocatch.com/xbrl/edinet/ED2017101000222/PublicDoc/jpcrp040300-q1r-001_E00004-000_2017-08-31_01_2017-10-10.xbrl"
var data_list={
    company:"",
    q1r:[],
    q2r:[],
    q3r:[],
    asr:[],
    icr:[],
    esr:[]
};


for(var i =0; i<test_case.length;i++){
    var data_split = test_case[i].split("-").join("/");
    data_split = data_split.split("_").join("/");
    data_split = data_split.split("/");
    var company = data_split[10];
    var term = data_split[8];
    var closing_date = data_split[12]+"-"+data_split[13]+"-"+data_split[14];
    // console.log(data_split);
    // console.log(term);
    // console.log(closing_date);

    console.log(closing_date);
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

console.log(data_list);