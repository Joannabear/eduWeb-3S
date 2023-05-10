const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/final";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}); 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() {
    console.log("連線成功"); 
});
const listSchema = new mongoose.Schema({
    date: String,
    video: String
});
listSchema.set('collection', 'video');
const model = mongoose.model('video', listSchema);
module.exports = model;