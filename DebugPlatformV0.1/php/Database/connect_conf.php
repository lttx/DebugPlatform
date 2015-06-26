<?php

//$SERVER_ENVIRONMENT = 'develop';
// $SERVER_ENVIRONMENT = 'test';
$SERVER_ENVIRONMENT = 'production';
$RESOURCE_REFERENCE = array();
$DBNAME ="DebugPlatform";
if($SERVER_ENVIRONMENT=='develop'){
    //oyyd-pc db
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
    $HOST = "10.110.0.20";
    $USERNAME = "root";
    $PASSWORD = "";
    $serverOrigin = '10.110.0.20';
}
?>
