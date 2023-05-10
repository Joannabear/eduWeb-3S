var id = 0;
var num = [];
var goal = 0;

getList();
function getList(){
    var api="http://localhost:3000/api/ansgetList";
	$.get(api, function(data, status){
		for(var i = 0; i < 5; i++){
            var teacher_corrent = document.getElementById("teacher-corrent"+id);
            var teacher_know = document.getElementById("teacher-know"+id);
            var goal_text = document.getElementById("goal");
            
            num[i] = data[i]._id;
            var answer = data[i].choose_item;
            if(answer == "A")
            {
                teacher_corrent.value = data[i].title_chooseA;
            }
            else if(answer == "B")
            {
                teacher_corrent.value = data[i].title_chooseB;
            }
            else if(answer == "C")
            {
                teacher_corrent.value = data[i].title_chooseC;
            }
            else if(answer == "D")
            {
                teacher_corrent.value = data[i].title_chooseD;
            }
            teacher_know.value = data[i].teacher_tell;
            
            if(answer == data[i].student_answer)
            {
                goal += 20;
            }

            $(goal_text).text(goal + "%");

            id++;
		}
    })
}