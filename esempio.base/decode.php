<?php
	
$string = file_get_contents('studenti.json');
	
$students = json_decode($string, true);

var_dump($students);