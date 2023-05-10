var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var listModel = require('../models/listModel.js');
var todolistModel = require('../models/todolistModel.js');
var accountModel = require('../models/accountModel.js');
var videoModel = require('../models/videoModel.js');
var queModel = require('../models/queModel.js');

router.get('/getList', function(req, res){
    listModel.find(function(err, data){
        if(err) console.log(err);
        res.json(data);
    });
});

router.post('/updateList', function(req, res){
    var id = req.body.id;
    listModel.findById(id, function(err, data){
        if(err){
            console.log(err);
            res.json({"status":1, "msg":"error"});
        } else {
            data.score = req.body.score;
            data.save(function(err){
                if(err){
                    console.log(err);
                    res.json({"status":1, "msg":"error"});
				} else {
					res.json({"status":0, "msg":"修改成功"});
				} 
			});
		}
	});
});

router.post('/todoaddList', function(req, res){
    var newTodo = new todolistModel({
		title: req.body.title, 
		msg: req.body.msg, 
		status: false
    });
    newTodo.save(function(err, data){
		if(err) {
			res.json({"status":1, "msg":"error"}); 
			console.log("新增失敗");
		} else {
			res.json({"status":0, "msg":"success", "data":data}); 
			console.log("新增成功");
		} 
	})
});

router.get('/todogetList', function(req, res){
    todolistModel.find(function(err, data){
		if(err) 
			console.log(err);
        res.json(data);
    });
});

router.post('/todoupdateList', function(req, res){
    var id = req.body.id;
    todolistModel.findById(id, function(err, data){
        if(err){
            console.log(err);
            res.json({"status":1, "msg":"error"});
        } else {
            data.title = req.body.title;
            data.msg = req.body.msg;
            data.save(function(err){
                if(err){
                    console.log(err);
                    res.json({"status":1, "msg":"error"});
				} else {
					res.json({"status":0, "msg":"修改成功"});
				} 
			});
		}
	});
});

router.post('/todoremoveList', function(req, res){
	var id = req.body.id; 
	todolistModel.remove({_id:id}, function(err, data){
		if(err){
			console.log(err);
			res.json({"status":1, "msg":"error"});
		} else {
			console.log("刪除成功"); 
			res.json({"status":0, "msg":"success"});
		} 
	});
});

router.get('/accountgetList', function(req, res){
    accountModel.find(function(err, data){
        if(err) console.log(err);
        res.json(data);
    });
});

router.get('/rollgetList', function(req, res){
    listModel.find(function(err, data){
        if(err) console.log(err);
        res.json(data);
    });
});

router.post('/rollupdateList', function(req, res){
    var id = req.body.id;
    listModel.findById(id, function(err, data){
        if(err){
            console.log(err);
            res.json({"status":1, "msg":"error"});
        } else {
            data.roll = req.body.roll;
            data.save(function(err){
                if(err){
                    console.log(err);
                    res.json({"status":1, "msg":"error"});
				} else {
					res.json({"status":0, "msg":"修改成功"});
				} 
			});
		}
	});
});

router.get('/videogetList', function(req, res){
    videoModel.find(function(err, data){
        if(err) console.log(err);
        res.json(data);
    });
});

router.post('/videoupdateList', function(req, res) {
    const url = "mongodb://localhost:27017/";
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
        if(err) throw err;
        const dbo = db.db("final");
        date = req.body.date;
        video_a = req.body.video;
        const video = [
                {date: date, video: video_a}
            ];

        dbo.collection("video").insertMany(video, function(err, res){
            if(err) throw err;
            console.log("Successfully Inserted");
            db.close();
        });
    });
});

router.post('/queupdateList', function(req, res) {
    const url = "mongodb://localhost:27017/";
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
        if(err) throw err;
        const dbo = db.db("final");
        date = req.body.date;
        question_title = req.body.question_title;
        title_chooseA = req.body.title_chooseA;
        title_chooseB = req.body.title_chooseB;
        title_chooseC = req.body.title_chooseC;
        title_chooseD = req.body.title_chooseD;
        choose_item = req.body.choose_item;
        teacher_tell = req.body.teacher_tell;
        const que = [
                {date: date, question_title:question_title, title_chooseA:title_chooseA, title_chooseB:title_chooseB, title_chooseC:title_chooseC, title_chooseD:title_chooseD, choose_item:choose_item, teacher_tell:teacher_tell, student_answer : "N"}
            ];

        dbo.collection("que").insertMany(que, function(err, res){
            if(err) throw err;
            console.log("Successfully Inserted");
            db.close();
        });
    });
});

router.get('/ansgetList', function(req, res){
    queModel.find(function(err, data){
        if(err) console.log(err);
        res.json(data);
    });
});

router.post('/ansupdateList', function(req, res){
    var id = req.body.id;
    queModel.findById(id, function(err, data){
        if(err){
            console.log(err);
            res.json({"status":1, "msg":"error"});
        } else {
            data.student_answer = req.body.student_answer;
            data.save(function(err){
                if(err){
                    console.log(err);
                    res.json({"status":1, "msg":"error"});
				} else {
					res.json({"status":0, "msg":"修改成功"});
				} 
			});
		}
	});
});

module.exports = router;