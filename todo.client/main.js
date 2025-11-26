const apiUrl = "http://localhost:8000/todo.server/";
const apiEndpoints = {
	index: "index.php",
	create: "create.php",
	// read: "read.php",
	update: "update.php",
	delete: "delete.php"
};
const authHeaders = {
	headers: {
		"Authorization-Token": "A9L4BY^6i&N4b!qJ#AeMgriQ#JeSMiQVq^Gk!3wv26kwnyoU"
	}
};

//Renderizza i todo in base all'argomento ricevuto
function renderTodo(data) {
	let result = "";

	for (let i = 0; i < data.length; i++) {
		const item = data[i];

		const classe = item.done ? "done" : "";

		result += `<li class="${classe}">${item.name} <button class="action-done" data-index="${i}">DONE</button><button class="action-delete" data-index="${i}">DELETE</button></li>`;
	}

	document.getElementById("result").innerHTML = result;
}

//All'avvio della pagina recupera la lista dei dati
axios.get(apiUrl + apiEndpoints.index, authHeaders).then(response => {
	renderTodo(response.data);
});

//Gestisce l'aggiunta di nuovi todo (senza validazioni)
document.getElementById("addBtn").addEventListener("click", function () {

	const newTodoObj = {
		name: document.getElementById("newTodo").value,
		done: false
	};
	const requestData = { payload: newTodoObj };

	//se non si vuole dover usare lettura body raw (php://input) bisogna convertire
	// in form-data passando requestConfig come terzo argomento ad axios: 
	// const requestConfig = {
	// 	headers: {
	// 		"Content-Type": "multipart/form-data"
	// 	}
	// };

	axios.post(apiUrl + apiEndpoints.create, requestData, authHeaders).then(response => {

		renderTodo(response.data);
		document.getElementById("newTodo").value = "";

	});

});

//Gestisce eventi update/detele per singolo item (event delegation)
document.querySelector("ul").addEventListener("click", function (e) {

	const clickedEl = e.target;
	const clickedIndex = clickedEl.dataset.index;

	if (clickedEl.classList.contains("action-done")) {

		const requestData = { index: clickedIndex };
		axios.post(apiUrl + apiEndpoints.update, requestData, authHeaders).then(response => {
			renderTodo(response.data);
		});

	} else if (clickedEl.classList.contains("action-delete")) {

		const requestData = { index: clickedIndex };
		axios.post(apiUrl + apiEndpoints.delete, requestData, authHeaders).then(response => {
			renderTodo(response.data);
		});

	}

})