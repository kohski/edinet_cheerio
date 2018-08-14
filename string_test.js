var url = "http://resource.ufocatch.com/xbrl/edinet/ED2018080900614/PublicDoc/jpcrp040300-q2r-001_E01086-000_2018-06-30_01_2018-08-09.xbrl";

var myterm =  /[aeiq][123]r/;
var myClosingDate = /20[0-9][1-9]\-[01][0-9]\-[0123][0-9]/

console.log(url.match(myterm)[0]);
console.log(url.match(myClosingDate)[0]);


var test = 'NetSalesSummaryOfBusinessResults contextRef="Prior4YearDuration_NonConsolidatedMember" unitRef="JPY"decimals="-6"';

console.log(test.match("NonConsolidated"));
→合致しなければ null


test = "jpcrp_cor:BasicEarningsLossPerShareSummaryOfBusinessResults";
subject = test.split(":")[1];
console.log(subject);

var url = "http://resource.ufocatch.com/xbrl/edinet/ED2018080900614/PublicDoc/jpcrp040300-q2r-001_E01086-000_2018-06-30_01_2018-08-09.xbrl"
var myREG = /E\d{5}\-\d{3}/
console.log(url.match(myREG));