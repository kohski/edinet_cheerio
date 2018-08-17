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


new test_case({
    title: 'test2',
    content: 'AccountPayable',
    amount:2500
}).save(function (err, test_case){
if(err) {
  console.log(err);
} else {
  console.log('done');
  console.log();
}
});