var test_data=[
    {title:"test1",content:"test1",amount:1000},
    {title:"test2",content:"test2",amount:1000},
    {title:"test3",content:"test3",amount:1000},
    {title:"test4",content:"test4",amount:1000},
    {title:"test5",content:"test5",amount:1000},
    {title:"test6",content:"test6",amount:1000},
    {title:"test7",content:"test7",amount:1000},
    {title:"test8",content:"test8",amount:1000},
    {title:"test9",content:"test9",amount:1000},
    {title:"test10",content:"test10",amount:1000},
    {title:"test11",content:"test11",amount:1000},
    {title:"test12",content:"test12",amount:1000},
    {title:"test13",content:"test13",amount:1000},
    {title:"test14",content:"test14",amount:1000},
    {title:"test15",content:"test15",amount:1000}
];

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var test_case = new Schema({
    title:String,
    content:String,
    amount:Number
});

mongoose.model('test_case',test_case);
mongoose.connect('mongodb://localhost:27017/test_case');

var test_case = mongoose.model("test_case");


for(var i = 0;test_data.length;i++){
    var record = {
        title:test_data[i].title,
        content:test_data[i].content,
        amount:test_data[i].amount
    };

    new test_case(record).save(function (err, test_data){
        if(err) {
        console.log(err);
        } else {
        console.log('done');
        console.log(test_data);
        }
    });
};
