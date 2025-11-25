<?php

$listJSON = file_get_contents("todo.json");

$requestBody = file_get_contents("php://input"); //lettura diretta body per JSON puro (no formdata)
$requestJson = json_decode( $requestBody, true );
$todoIndex = $requestJson["index"];
$listArray = json_decode($listJSON, true);

if( $todoIndex !== null && isset($listArray[$todoIndex]) ) {

	$listArray[$todoIndex]["done"] = !$listArray[$todoIndex]["done"]; //inverte il flag
	$listJSON = json_encode($listArray);
	file_put_contents("todo.json", $listJSON);
}

//ToDo: else return 500

// Restituisce la lista aggiornata
header("Content-Type: application/json");

echo $listJSON;