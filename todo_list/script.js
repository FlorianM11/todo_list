class Todo {

	constructor(){
		this.list = [];
	}

	init(){
		var storedNames = JSON.parse(localStorage.getItem("liste"));

		if (storedNames !== null) {
			for (var i = 0; i < storedNames.length; i++) {

				this.list.push(storedNames[i]);

				this.#model(storedNames[i]);

			}
		}
	}

	createTodo(label_){

		this.#model(label_);

		document.getElementById('input').value = "";

		this.list.push(label_);

		localStorage.setItem("liste", JSON.stringify(this.list));
  	}

  	deleteTodo(){
  		var element = document.getElementsByClassName("element");

    	for (var i = 0; i < element.length; i++) {
		  element[i].onclick = function() {
			var item = this.childNodes[1].innerHTML;

			this.parentNode.removeChild(this);

			var storedNames = JSON.parse(localStorage.getItem("liste"));
			var index = storedNames.indexOf(item.substring(0, item.length - 1));
			storedNames.splice(index, 1);

			localStorage.setItem("liste", JSON.stringify(storedNames));
		  }
		}
  	}

  	editTodo(newItem, index_class){
		var element = document.getElementsByClassName("element");
		console.log(element[index_class], index_class);

		var item = element[index_class].childNodes[1].innerHTML;

		var storedNames = JSON.parse(localStorage.getItem("liste"));
		var index = storedNames.indexOf(item.substring(0, item.length - 1));

		if (index !== -1) {
			storedNames[index] = newItem;
		}

		localStorage.setItem("liste", JSON.stringify(storedNames));

		element[index_class].childNodes[2].value = newItem;
		element[index_class].childNodes[2].style.display = "none";
		element[index_class].childNodes[1].style.display = "block";

		element[index_class].childNodes[1].innerHTML = newItem;

	}

	#model(element){
		document.getElementById('body-list').innerHTML +=
		'<div class="element">'+
			'<input type="checkbox" class="checkBox">'+
			'<p>'+element+' </p>'+
			'<input type="text" class="forUpdate" value="'+element+'" style="display: none;">'+
				'<div class="btn-group" role="group" aria-label="Button group with nested dropdown">'+
					'<div class="btn-group" role="group">'+
						'<button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
						'Action'+
						'</button>'+
						'<div class="dropdown-menu" aria-labelledby="btnGroupDrop1">'+
							'<button class="dropdown-item delete" onclick="deleteTodo()">Supprimer</button>'+
							'<button class="dropdown-item edit" href="#">Modifier</button>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';
	}
}

const todo = new Todo();

todo.init();

function addTodo(){
	label = document.getElementById("input").value;
	todo.createTodo(label);
}

function deleteTodo(){
	const todo = new Todo();

	todo.deleteTodo();
}

function editTodo(newItem, index_class){
	const todo = new Todo();
	todo.editTodo(newItem, index_class);
}

$('.edit').click(function(){
	$(this).parent().parent().parent().prev().css("display", "block");
	$(this).parent().parent().parent().prev().prev().css("display", "none");

});

$(".forUpdate").on('keyup', function (e) {
	if (e.key === 'Enter') {
		let newItem = this.value;
		let index_class = $(this).parent().index();
		editTodo(newItem, index_class);
	}
});

$('.checkBox').click(function(){
	if($(this).prop("checked") == true) {
		$(this).next().css('text-decoration', 'line-through');
	} else {
		$(this).next().css('text-decoration', 'none');
	}
});

