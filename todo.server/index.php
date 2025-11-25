<?php

$listJSON = file_get_contents("todo.json");

// Stampa la lista
header("Content-Type: application/json");

echo $listJSON;