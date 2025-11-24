const apiUrl = "http://localhost:8000/todo.server/api.php";

function renderTodo(data) {
	let result = "";

	for (const item of data) {
		result += `<li>${item}</li>`;
	}

	document.getElementById("result").innerHTML = result;
}

axios.get(apiUrl).then(response => {
	renderTodo(response.data);
});

document.getElementById("addBtn").addEventListener("click", function () {

	const newTodoText = document.getElementById("newTodo").value;
	const requestData = { payload: newTodoText };
	const requestConfig = {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	};

	axios.post(apiUrl, requestData, requestConfig).then(response => {

		renderTodo(response.data);
		document.getElementById("newTodo").value = "";

	});
	// inviare dati al server
	// ricarichiamo i nuovi dati

})