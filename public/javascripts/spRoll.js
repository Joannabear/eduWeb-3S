var id = 0;
var num = [];

getList();
function getList(){
    var myName = "小明";

	var api="http://localhost:3000/api/rollgetList";
	$.get(api, function(data, status){
		for(var i = 0; i < data.length; i++){
            if(data[i].name == myName)
            {
                newList(data[i]);
                $("#day"+id).text(data[i].date);
                $("#subject"+id).text(data[i].subject);
                if(data[i].roll == 1)
                    $("#r"+id).text("已到");
                else if(data[i].roll == 2)
                    $("#r"+id).text("未到");
                else if(data[i].roll == 3)
                    $("#r"+id).text("病假");
                else if(data[i].roll == 4)
                    $("#r"+id).text("事假");
            }
            id++;
		}
    })
}

function newList(data){
	let content =
        `<p id="list${id}">
            <div class="day" id="day${id}"></div>
            <div class="subject" id="subject${id}"></div>
            <div class="r" id="r${id}"></div>
            <br>
            <hr>
        </p>`
	$('#student_win').append(content);
}