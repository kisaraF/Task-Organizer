//Selecting Elements
let addBtn= document.getElementById('addBtn');
let displayArea= document.querySelector('.container');
let input = document.getElementById('inputBox');
let checker = document.querySelector('.checker');
let empty = document.querySelector('.empy-container')

//Functions

const emptyTag= document.createElement('div');
const emptyIcon = document.createElement('div');
const emptyText = document.createElement('div');
emptyIcon.className= 'empty-icon';
emptyTag.className = "empty-tag";
emptyIcon.innerHTML = '<i class="fas fa-plus-circle fa-3x"></i>';
emptyTag.appendChild(emptyIcon);
emptyText.textContent= "No Items For You. Start Adding";
emptyIcon.style.marginBottom= '1em';
emptyTag.appendChild(emptyText);
empty.appendChild(emptyTag);
//emptyTag.style.display='none';

//When page loads
document.addEventListener('DOMContentLoaded', getTasks);

//Load the tasks saved before
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {//Checking whether there are any items
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks')); //If there's make it a string
	}

	tasks.forEach(function(task) {
		//Remove empty-tag
		//emptyTag.style.display = 'none';

		//Select Textbox Input
		let textBox = document.getElementById('inputBox').value;

		//Create 2 variables for the master div and text to add from input box
		let row = document.createElement('div');
		row.className = 'row'
		let rowData = document.createTextNode(task);

		//Creating another div for buttons
		let btnDiv = document.createElement('div');
		btnDiv.className = 'btns'; //Adding a class name

		//Creating Delete Button
		let delBtn = document.createElement('button');
		delBtn.id = 'del';
		delBtn.innerHTML = '<i class="fas fa-times"></i>'
		delBtn.setAttribute("onclick", "done(this)");//Setting event listener within function

		//Creating Done Button
		let finishBtn = document.createElement('button');
		finishBtn.id = 'done';
		finishBtn.innerHTML = '<i class="fas fa-check"></i>'
		finishBtn.setAttribute("onclick", "finish(this)");

		//Creating Undone Button
		let undoneBtn = document.createElement('button');
		undoneBtn.id = 'undone';
		undoneBtn.innerHTML = '<i class="fas fa-undo"></i>'
		undoneBtn.setAttribute("onclick", "undone(this)");

		//Appending Elements
		row.appendChild(rowData);
		row.appendChild(btnDiv);
		btnDiv.appendChild(delBtn);
		btnDiv.appendChild(finishBtn);
		btnDiv.appendChild(undoneBtn);
		displayArea.appendChild(row);
		console.log(row);

		//Styling for cleaner look
		row.style.display = "flex";
		btnDiv.style.marginLeft = "auto";

		input.value = '';

	});
}

//Check whether there are items
function init() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {//Checking whether there are any items
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks')); //If there's make it a string
	}

	if (localStorage.getItem('tasks')=== []) {//Checking whether there are any items
		emptyTag.style.display = 'block';
	} else {
		emptyTag.style.display = 'none';
	}
}

//Keycode Function
let altAdd= (e) => {
	console.log("works")
	if (e.keyCode === 13) {
		addNew();
}}

//Creating a Row
let addNew = () => {
	//Remove empty-tag
	//emptyTag.style.display = 'none';

	//Select Textbox Input
	let textBox= document.getElementById('inputBox').value;

	if(textBox === ''){
		alert("Please Enter a Task");
	}else{
		//Create 2 variables for the master div and text to add from input box
		let row = document.createElement('div');
		row.className = 'row'
		let rowData = document.createTextNode(textBox);

		//Creating another div for buttons
		let btnDiv = document.createElement('div');
		btnDiv.className = 'btns'; //Adding a class name

		//Creating Delete Button
		let delBtn = document.createElement('button');
		delBtn.id = 'del';
		delBtn.innerHTML = '<i class="fas fa-times"></i>'
		delBtn.setAttribute("onclick", "done(this)");//Setting event listener within function

		//Creating Done Button
		let finishBtn = document.createElement('button');
		finishBtn.id = 'done';
		finishBtn.innerHTML = '<i class="fas fa-check"></i>'
		finishBtn.setAttribute("onclick", "finish(this)");

		//Creating Undone Button
		let undoneBtn = document.createElement('button');
		undoneBtn.id = 'undone';
		undoneBtn.innerHTML = '<i class="fas fa-undo"></i>'
		undoneBtn.setAttribute("onclick", "undone(this)");

		//Appending Elements
		row.appendChild(rowData);
		row.appendChild(btnDiv);
		btnDiv.appendChild(delBtn);
		btnDiv.appendChild(finishBtn);
		btnDiv.appendChild(undoneBtn);
		displayArea.appendChild(row);
		console.log(row);

		//Styling for cleaner look
		row.style.display = "flex";
		btnDiv.style.marginLeft = "auto";

		input.value = '';

		//Add to Local Storage
		storeInLs(textBox);

		checked();
	}
	
}

//Local Storage
function storeInLs(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {//Checking whether there are any items
		tasks= [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks')); //If there's make it a string
	}

	tasks.push(task); //And add the task to array

	localStorage.setItem('tasks', JSON.stringify(tasks)); //Strigify makes objects into strings in order to 
  //communicate with servers. JSON is used to pass data from browser to server
}

function done(el){
	let li= el.parentNode;
	let par_li= li.parentNode;
	par_li.remove();

	//Remove from LS
	removeFromLs(par_li);	
}

//Remove from LS
function removeFromLs(taskItem){
	let tasks;
	if (localStorage.getItem('tasks') === null) {//Checking whether there are any items
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks')); //If there's make it a string
	}

	tasks.forEach(function (task, index){
    if(taskItem.textContent=== task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks' , JSON.stringify(tasks));
}

function finish(el){
	let sel = el.parentNode;
	let sel_par = sel.parentNode;
	
	sel_par.style.textDecoration = "line-through";
	
}

function undone(el) {
	let sel = el.parentNode;
	let sel_par = sel.parentNode;

	sel_par.style.textDecoration = "none";
}

//To indicate that a new item is added
function checked(){
	let checkRow = document.createElement('div');
	checkRow.className = 'check-row'
	let checkRowData = document.createTextNode("Added New Item");
	checkRow.appendChild(checkRowData);
	checker.appendChild(checkRow);

	setTimeout(function () {
		checkRow.remove();
	}, 1500);

}

//Event Lsiteners
addBtn.addEventListener('click' , addNew);
input.addEventListener('keydown', altAdd);