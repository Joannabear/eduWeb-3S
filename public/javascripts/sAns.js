var id = 0;
var num = [];

window.onload = function(){
    var submit_btn = document.getElementById("submit_btn");
    submit_btn.onclick = checkList;
    var check_btn = document.getElementById("check_btn");
    check_btn.onclick = getList;
}

function getList(){
    var date = document.getElementById("date").value;

	var api="http://localhost:3000/api/ansgetList";
	$.get(api, function(data, status){
		for(var i = 0; i < data.length; i++){
            var question_title = document.getElementById("title-question"+id);
            var title_chooseA = document.getElementById("title-answerA"+id);
            var title_chooseB = document.getElementById("title-answerB"+id);
            var title_chooseC = document.getElementById("title-answerC"+id);
            var title_chooseD = document.getElementById("title-answerD"+id);
            if(data[i].date == date)
            {
                num[i] = data[i]._id;
                question_title.value = data[i].question_title;
                title_chooseA.value = data[i].title_chooseA;
                title_chooseB.value = data[i].title_chooseB;
                title_chooseC.value = data[i].title_chooseC;
                title_chooseD.value = data[i].title_chooseD;
            }
            id++;
		}
    })
}

function checkList(){
    for(var i = 0; i < id; i++){
        var answer = document.getElementById("answer"+i).value;
        
        var API = "http://localhost:3000/api/ansupdateList";
        var data = {"id":num[i], "student_answer":answer};
        $.post(API, data, function(res){});
        window.location.href = "../sResult.html";
    }
}