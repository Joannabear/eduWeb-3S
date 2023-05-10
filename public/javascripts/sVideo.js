var id = 0;
var num = [];

window.onload = function(){
    var submit_btn = document.getElementById("submit_btn");
    submit_btn.onclick = getList;
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