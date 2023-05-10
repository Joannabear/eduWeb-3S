var id = 0;
var num = [];

window.onload = function(){
    var submit_btn = document.getElementById("submit_btn");
    submit_btn.onclick = getList;
}

function getList(){
    var date = document.getElementById("date").value;
    var e = document.getElementById("grade");
    var grade = e.options[e.selectedIndex].value;
    var x = document.getElementById("subject");
    var subject = x.options[x.selectedIndex].value;

    $("#socre_win").html(
        `<div class="socre_win_title">
            <p class="word_style">姓名</p>
        </div>
        <div class="socre_win_title">
            <p class="word_style">分數</p>
        </div>`
    );

	var api="http://localhost:3000/api/getList";
	$.get(api, function(data, status){
		for(var i = 0; i < data.length; i++){
            if(data[i].date == date && data[i].grade == grade && data[i].subject == subject)
            {
                num[i] = data[i]._id;
                newList(data[i]);
            }
            id++;
		}
    })

    var renew_btn = document.getElementById("renew_btn");
    var ok_btn = document.getElementById("ok_btn");
    renew_btn.onclick = editList;
    ok_btn.onclick = updateList;
}

function updateList(){
    for(var i = 0; i < id; i++){
        var score = $("#score"+i).val();
        var API = "http://localhost:3000/api/updateList";
        var data = {"id":num[i], "score":score};
        $.post(API, data, function(res){});
        $('#score'+i).attr("readonly", true);
    }
}

function newList(data){
	let content =
        `<div class="input-group" id="${id}">
            <div class="socre_win_content">
                <input type="text" class="box_style" id="name${id}" value="${data.name}" readonly>
            </div>
            <div class="socre_win_content">
                <input type="text" class="box_style" id="score${id}" value="${data.score}" readonly>
            </div>
        </div>`
	$('#socre_win').append(content);
}

function editList(){
    for(var i = 0; i < id; i++){
        $('#score'+i).attr("readonly", false);
    }
}