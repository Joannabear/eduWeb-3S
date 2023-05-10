var id = 0;
var num = [];
var flag;

window.onload = function(){
    var submit_btn = document.getElementById("submit_btn");
    submit_btn.onclick = getList;

    var student_btn = document.getElementById("student");
    var teacher_btn = document.getElementById("teacher");
    var family_btn = document.getElementById("family");
    student_btn.onclick = who_student;
    teacher_btn.onclick = who_teacher;
    family_btn.onclick = who_family;
}

function getList(){
    var account = document.getElementById("account").value;
    var password = document.getElementById("password").value;

	var api="http://localhost:3000/api/accountgetList";
	$.get(api, function(data, status){
		for(var i = 0; i < data.length; i++){
            if(data[i].account == account && data[i].password == password)
            {
                if(flag == 0 && data[i].who == "teacher")
                    window.location.href='tBoard.html';
                else if(flag == 1 && data[i].who == "student")
                    window.location.href='sBoard.html';
                else if(flag == 2 && data[i].who == "family")
                    window.location.href='pBoard.html';
            }
            id++;
		}
    })
}

function who_teacher()
{
    flag = 0;
}

function who_student()
{
    flag = 1;
}

function who_family()
{
    flag = 2;
}