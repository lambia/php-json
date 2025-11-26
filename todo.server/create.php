<?php

require_once(__DIR__ . "/auth.php");
$token = $_SERVER["HTTP_AUTHORIZATION_TOKEN"] ?? "";
checkToken($token);

$listJSON = file_get_contents("todo.json");

//POST (richiede form-data)
// if( isset($_POST["payload"]) ) {
	// $newTodo = $_POST["payload"];

$requestBody = file_get_contents("php://input"); //lettura diretta body per JSON puro (no formdata)
$requestJson = json_decode( $requestBody, true );
$newTodo = $requestJson["payload"];
$listArray = json_decode($listJSON, true);

if( $newTodo !== null ) {
	
	$listArray[] = $newTodo;
	$listJSON = json_encode($listArray);
	file_put_contents("todo.json", $listJSON);
}

// Restituisce la lista aggiornata
header("Content-Type: application/json");

echo $listJSON;