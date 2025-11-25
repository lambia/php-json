const apiUrl = "http://localhost:8000/todo.server/";
const apiEndpoints = {
	index: "index.php",
	create: "create.php",
	// read: "read.php",
	// update: "update.php",
	// delete: "delete.php"
};

function renderTodo(data) {
	let result = "";

	for (const item of data) {
		const classe = item.done ? "done" : "";

		result += `<li class="${classe}">${item.name}</li>`;
	}

	document.getElementById("result").innerHTML = result;
}

axios.get(apiUrl + apiEndpoints.index).then(response => {
	renderTodo(response.data);
});

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

	axios.post(apiUrl + apiEndpoints.create, requestData).then(response => {

		renderTodo(response.data);
		document.getElementById("newTodo").value = "";

	});

})