<?php
function post($url, $data){
    $postdata = $data;
    $opts = array('http' =>
                array(
                    'method'  => 'POST',
                    'header'  => 'Content-type: application/x-www-form-urlencoded',
                    'content' => json_encode($postdata)
                )
    );
    $context = stream_context_create($opts);
    $result = file_get_contents($url, false, $context);
    return $result;
}
$command = $_POST['command'];
$deviceID = $_POST['deviceID'];
$postData = Array("status"=>1,"command"=>$command);
$url = "http://atlas.coilabs.com:10005/test/server_command/device_id/$deviceID/key/123";
$req = post($url,$postData);
die($req);
?>
