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

	var api="http://localhost:3000/api/rollgetList";
	$.get(api, function(data, status){
		for(var i = 0; i < data.length; i++){
            if(data[i].date == date && data[i].grade == grade && data[i].subject == subject)
            {
                num[i] = data[i]._id;
                newList(data[i]);
                if(data[i].roll == 0)
                {
                    $("#here"+i).prop("checked", false);
                    $("#not"+i).prop("checked", false);
                    $("#sick"+i).prop("checked", false);
                    $("#personal"+i).prop("checked", false);
                }
                else if(data[i].roll == 1)
                {
                    $("#here"+i).prop("checked", true);
                }
                else if(data[i].roll == 2)
                {
                    $("#not"+i).prop("checked", true);
                }
                else if(data[i].roll == 3)
                {
                    $("#sick"+i).prop("checked", true);
                }
                else if(data[i].roll == 4)
                {
                    $("#personal"+i).prop("checked", true);
                }
            }
            id++;
		}
    })

    var ok_btn = document.getElementById("ok_btn");
    ok_btn.onclick = updateList;
}

function updateList(){
    for(var i = 0; i < id; i++){
        if($("#here"+i).val())
        {
            var roll = 1;
        }
        else if($("#not"+i).val())
        {
            var roll = 2;
        }
        else if($("#sick"+i).val())
        {
            var roll = 3;
        }
        else if($("#personal"+i).val())
        {
            var roll = 4;
        }
        else
        {
            var roll = 0;
        }
        var API = "http://localhost:3000/api/rollupdateList";
        var data = {"id":num[i], "roll":roll};
        $.post(API, data, function(res){});
    }
}

function newList(data){
	let content =
        `<p class="list" id="list${id}">
            <label class="name" id="name${id}">${data.name}</label>
            <input type="radio" name="ro${id}" value="here" class="here" id="here${id}"><label for="here${id}">已到</label>
            <input type="radio" name="ro${id}" value="not" id="not${id}"><label for="not${id}">未到</label><br>
            <input type="radio" name="ro${id}" value="sick" class="sick" id="sick${id}"><label for="sick${id}">病假</label>
            <input type="radio" name="ro${id}" value="personal" id="personal${id}"><label for="personal${id}">事假</label><br>
            <hr>
        </p>`
	$('#student_win').append(content);
}