window.onload = function(){
    var update_btn = document.getElementById("teacher-check");
    update_btn.onclick = updateList;
}

function updateList(){
    for(var i=0; i<5; i++){
        var date = document.getElementById("date").value;
        var question_title = document.getElementById("question-title"+i).value;
        var title_chooseA = document.getElementById("title-chooseA"+i).value;
        var title_chooseB = document.getElementById("title-chooseB"+i).value;
        var title_chooseC = document.getElementById("title-chooseC"+i).value;
        var title_chooseD = document.getElementById("title-chooseD"+i).value;
        var choose_item = document.getElementById("choose-item"+i).value;
        var teacher_tell = document.getElementById("teacher-tell"+i).value;

        var API="http://localhost:3000/api/queupdateList";
        var data = {"date":date, "question_title":question_title, "title_chooseA":title_chooseA, "title_chooseB":title_chooseB, "title_chooseC":title_chooseC, "title_chooseD":title_chooseD, "choose_item":choose_item, "teacher_tell":teacher_tell};
        $.post(API, data, function(res){})
    }
}