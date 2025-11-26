<?php

function checkToken($tokenToCheck) {
	
	$tokenPath = __DIR__ . "/.token";
	$tokenFromFile = false;

	if( file_exists($tokenPath) ) {
		$tokenFromFile = file_get_contents($tokenPath);
	}

	if ( $tokenFromFile != false && $tokenToCheck == $tokenFromFile ) {
		return true;
	}

	http_response_code(401); //Unauthorized
	header("Content-Type: text/plain");
	echo "Non sei autorizzato";
	exit;
}

?>