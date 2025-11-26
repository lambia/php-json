<?php

// Commentato per rendere la index pubblicamente accessibile
// Le operazioni sotto auth saranno solo create/update/delete
// require_once(__DIR__ . "/auth.php");
// $token = $_SERVER["HTTP_AUTHORIZATION_TOKEN"] ?? "";
// checkToken($token);

$listJSON = file_get_contents("todo.json");

// Stampa la lista
header("Content-Type: application/json");

echo $listJSON;