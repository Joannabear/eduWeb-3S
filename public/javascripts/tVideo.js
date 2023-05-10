var id = 0;
var num = [];

window.onload = function(){
    var update_btn = document.getElementById("update_btn");
    update_btn.onclick = updateList;
    var check_btn = document.getElementById("check_btn");
    check_btn.onclick = getList;
}

function getList(){
    var date = document.getElementById("date").value;

	var api="http://localhost:3000/api/videogetList";
	$.get(api, function(data, status){
		for(var i = 0; i < data.length; i++){
            if(data[i].date == date)
            {
                num[i] = data[i]._id;
                $("#video_win").html(data[i].video);
            }
            id++;
		}
    })
}

function updateList(){
    var date = document.getElementById("date").value;
    var video_a = document.getElementById("video_a").value;
    document.getElementById("video_a").value = "";

    var API="http://localhost:3000/api/videoupdateList";
    var data = {"date":date, "video":video_a};
    $.post(API, data, function(res){})
}