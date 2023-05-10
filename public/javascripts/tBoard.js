var todolist = [];
var id = 1;

window.onload = function(){
	var btn = document.getElementById("myButton");
	btn.onclick = addList;
}

function addList(){
	var title = $('#title').val();
	var msg = $('#msg').val();
	if(title == "" || msg == "") {
		alert("請輸入標題和內容!");
	} else {
		var api = "http://localhost:3000/api/todoaddList";
		var data = {"title":title, "msg":msg};
		$.post(api, data, function(res){
			newList(res.data);
			$('#title').val('');
			$('#msg').val('');
		});
	}
}

getList();
function getList(){
	var api="http://localhost:3000/api/todogetList";
	$.get(api, function(data, status){
		for(var i=0; i<data.length; i++){
			newList(data[i]);
		}
	})
}

function updateList(id){
	var title = $("#title"+id).val();
	var msg = $("#msg"+id).val();
	var API = "http://localhost:3000/api/todoupdateList";
	var data = {"id":id, "title":title, "msg":msg};
	$.post(API, data, function(res){
		if(res.status ==0){
			$('#btnEdit'+id).removeClass("d-none");
			$('#btnRemove'+id).removeClass("d-none");
			$('#btnUpdate'+id).addClass("d-none");
			$('#title'+id).attr("readonly", true);
			$('#msg'+id).attr("readonly", true);
		}
	});
}

function removeList(id){
	var API = "http://localhost:3000/api/todoremoveList";
	var data = {"id":id};
	$.post(API, data, function(res){
		if(res.status == 0){
			$('#'+id).remove();
			alert("刪除成功!!!");
		}
	})
}

function newList(data){
	let status = (data.status)?"checked":"";
	let content =
		`<div class="input-group mb-3" id="${data._id}">
			<input type="text" class="form-control col-sm-3" id="title${data._id}" value="${data.title}" readonly>
			<input type="text" class="form-control col-sm-9" id="msg${data._id}" value="${data.msg}" readonly>
			<div class="input-group-append" id="button-addon4">
				<button class="btn btn-outline-secondary" type="button" id="btnEdit${data._id}" onclick="editList('${data._id}')">修改</button>
				<button class="btn btn-outline-secondary d-none" type="button" id="btnUpdate${data._id}" onclick="updateList('${data._id}')">更新</button>
				<button class="btn btn-outline-secondary" type="button" id="btnRemove${data._id}" onclick="removeList('${data._id}')">刪除</button>
			</div>
		</div>`
	$('#content').append(content);
}

function editList(id){
	$('#btnEdit'+id).addClass("d-none");
	$('#btnRemove'+id).addClass("d-none");
	$('#btnUpdate'+id).removeClass("d-none");
	$('#title'+id).attr("readonly", false);
	$('#msg'+id).attr("readonly", false);
}