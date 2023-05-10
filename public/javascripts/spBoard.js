getList();
function getList(){
	var api="http://localhost:3000/api/todogetList";
	$.get(api, function(data, status){
		for(var i=0; i<data.length; i++){
			newList(data[i]);
		}
	})
}

function newList(data){
	let status = (data.status)?"checked":"";
	let content =
		`<div class="input-group mb-3" id="${data._id}">
			<input type="text" class="form-control col-sm-3" id="title${data._id}" value="${data.title}" readonly>
			<input type="text" class="form-control col-sm-9" id="msg${data._id}" value="${data.msg}" readonly>
		</div>`
	$('#content').append(content);
}