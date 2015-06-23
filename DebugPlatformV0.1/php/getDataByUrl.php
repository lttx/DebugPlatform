<?php
    $opts = array(
        'http'=>array(
    	'method'=>"GET",
    	'header'=>"Accept-language: en\r\n"
        )
    );
    $context = stream_context_create($opts);

    function requestStreamRes($url,$context){
    	return file_get_contents($url, false, $context);
    }
    $deviceID = $_POST["deviceID"];
    $url = "http://atlas.coilabs.com:10005/test/server_config/device_id/$deviceID/key/123"; 
    $data = requestStreamRes($url,$context);
    die($data);
?>
