<?php

//$SERVER_ENVIRONMENT = 'develop';
// $SERVER_ENVIRONMENT = 'test';
$SERVER_ENVIRONMENT = 'production';
$RESOURCE_REFERENCE = array();
$RESOURCE_REFERENCE['cityPMDatePrefix'] = "http://localhost:9000/api/gps_air/city_all/";
$RESOURCE_REFERENCE['uuidCurrentValue'] = "http://localhost:9000/api/prev/uuid/";
$RESOURCE_REFERENCE['uuidValueRange'] = "http://localhost:8079/api/data/uuid/";
$RESOURCE_REFERENCE['deviceDataSite'] = "http://localhost:8079";
$RESOURCE_REFERENCE['positionDataSite'] = "http://localhost:9000";
$RESOURCE_REFERENCE['deviceDetailDB'] = "new_pam";
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
    $USERNAME = "ssa";
    $PASSWORD = "ssa2015&";
    $serverOrigin = 'coilabs.com';
}else if($SERVER_ENVIRONMENT == 'test'){
    // Test Server
    $HOST = "10.110.0.20";
    $USERNAME = "admin";
    $PASSWORD = "as123*";
    $serverOrigin = '10.110.0.20';
}
?>
