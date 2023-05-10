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
    question_title: String,
    title_chooseA: String,
    title_chooseB: String,
    title_chooseA: String,
    title_chooseC: String,
    title_chooseD: String,
    choose_item: String,
    teacher_tell: String,
    student_answer: String
});
listSchema.set('collection', 'que');
const model = mongoose.model('que', listSchema);
module.exports = model;