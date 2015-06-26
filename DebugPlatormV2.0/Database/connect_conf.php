<?php

//$SERVER_ENVIRONMENT = 'develop';
// $SERVER_ENVIRONMENT = 'test';
$SERVER_ENVIRONMENT = 'test';
$RESOURCE_REFERENCE = array();
$DBNAME ="debugplatform";
if($SERVER_ENVIRONMENT=='develop'){
    $HOST = "127.0.0.1";
    $USERNAME = "root";
    $PASSWORD = "";
    $serverOrigin = 'localhost';    
}else if($SERVER_ENVIRONMENT=='production'){
    // Online db
    $HOST = "localhost:3306";
    $USERNAME = "root";
    $PASSWORD = "";
    $serverOrigin = '';
}else if($SERVER_ENVIRONMENT == 'test'){
    // Test Server
    $HOST = 'localhost:3306';
    $USERNAME ="root";
    $PASSWORD = "";
    $serverOrigin = 'localhost';
}
?>
