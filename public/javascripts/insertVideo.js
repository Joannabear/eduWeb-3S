var date = document.getElementById("date").value;
var video_a = document.getElementById("video_a").value;

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
    if(err) throw err;
    const dbo = db.db("final");
    const score = [
            {date: date, video: video_a}
        ];

    dbo.collection("video").insertMany(score, function(err, res){
        if(err) throw err;
        console.log("Successfully Inserted");
        db.close();
    });
});