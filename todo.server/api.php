<?php

// Nel caso i dati siano in memory e non da un file JSON
// bisognerà usare json_encode prima di restituirli
// $list = [
// 	"Creare client",
// 	"Creare server",
// 	"Consumare web-api",
// 	"Testare il tutto",
// 	"Deploy"
// ];

$listJSON = file_get_contents("todo.json");

//POST: per INSERT
if( isset($_POST["payload"]) ) {

	$newTodo = $_POST["payload"];

	$listArray = json_decode($listJSON);
	$listArray[] = $newTodo;
	$listJSON = json_encode($listArray);
	file_put_contents("todo.json", $listJSON);

}

//Stampa la lista (che sia una GET o una POST)
header("Content-Type: application/json");

echo $listJSON;