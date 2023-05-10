var id = 0;
var num = [];

getList();
function getList(){
    var myName = "小明";
    var many = 0;
    var average = 0;
    var myDate;
    var myGrade;
    var mySubject;

    var api="http://localhost:3000/api/getList";
	$.get(api, function(data, status){
		for(var i = 0; i < data.length; i++){
            if(data[i].name == myName)
            {
                myDate = data[i].date;
                myGrade = data[i].grade;
                mySubject = data[i].subject;
            
                for(var j = 0; j < data.length; j++){
                    if(data[j].date == myDate && data[j].grade == myGrade && data[j].subject == mySubject)
                    {
                        average += data[j].score;
                        many++;
                    }
                }

                newList(data[i]);
                $("#score_box"+id).css("width", data[i].score * 2.4);
                $("#average_box"+id).css("width", (average/many) * 2.4);
                $("#average_text"+id).text((average/many).toFixed(2));

                id++;
                many = 0;
                average = 0;
            }
        }
    })
}

function newList(data){
	let content =
        `<div class="input-group" id="${id}">
            <div class="socre_win_content">
                <input type="text" class="box_style" id="date${id}" value="${data.date}" readonly>
            </div>
            <div class="socre_win_content">
                <input type="text" class="box_style" id="subject${id}" value="${data.subject}" readonly>
            </div>
            <div class="socre_win_content">
                <input type="text" class="box_style" id="score${id}" value="${data.score}" readonly>
            </div>
            <div class="socre_win_content">
                <div class="score_box" id="score_box${id}">
                    <p class="score_text">分數：<span>${data.score}</span></p>
                </div>
                <div class="average_box" id="average_box${id}">
                    <p class="average_text">平均：<span id="average_text${id}"></span></p>
                </div>
            </div>
        </div>`
	$('#socre_win').append(content);
}