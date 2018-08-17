var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://kosukekimura0528@gmail.com:romi10vers!@edinetscraping-srtwj.mongodb.net/test";
MongoClient.connect(uri, function(err, client) {
    if(err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    console.log('Connected...');
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
 });