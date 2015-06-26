<?php

//$SERVER_ENVIRONMENT = 'develop';
// $SERVER_ENVIRONMENT = 'test';
$SERVER_ENVIRONMENT = 'test';
$RESOURCE_REFERENCE = array();
$DBNAME ="debugplatform";
if($SERVER_ENVIRONMENT=='develop'){
    //oyyd-pc db
    $HOST = "127.0.0.1";
    $USERNAME = "root";
    $PASSWORD = "";
    $serverOrigin = 'localhost';    
}else if($SERVER_ENVIRONMENT=='production'){
    // Online db
    $HOST = "localhost:3306";
    $USERNAME = "ssa";
    $PASSWORD = "ssa2015&";
    $serverOrigin = 'coilabs.com';
}else if($SERVER_ENVIRONMENT == 'test'){
    // Test Server
    $HOST = 'localhost:3306';
    $USERNAME ="root";
    $PASSWORD = "";
    $serverOrigin = 'localhost';
}
?>
