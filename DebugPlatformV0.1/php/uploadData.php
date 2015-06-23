<?php
function post($url, $data){
	$postdata = $data;
    //$postdata = http_build_query(
    //    $data
    //    );
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
$transData = $_POST['data'];
$deviceID = $_POST['deviceID'];
$postData = Array();
$postData["sensor_interval"] = (int)$transData["sensor_interval"];
$postData["check_interval"] = (int)$transData["check_interval"];
$postData["cloud_port"] = (int)$transData["cloud_port"];
$postData["cloud_server"] = $transData["cloud_server"];
$postData["duty_interval"] = (int)$transData["duty_interval"];
$postData["extend_port"] = (int)$transData["extend_port"];
$postData["extend_server"] = $transData["extend_server"];
$postData["fan_speed"] = (int)$transData["fan_speed"];
$postData["key"] = $transData["key"];
$postData["latest_change_time"] = $transData["latest_change_time"];
$postData["pt_type"] = $transData["pt_type"];
$postData["sensor_avg"] = (int)$transData["sensor_avg"];
$postData["sensor_interval"] = (int)$transData["sensor_interval"];
$postData["time_sync_interval"] = (int)$transData["time_sync_interval"];
$postData["upgrade_port"] = (int)$transData["upgrade_port"];
$postData["upgrade_server"] = $transData["upgrade_server"];
$url = "http://atlas.coilabs.com:10005/test/server_config/device_id/$deviceID/key/123";
$res = post($url,$postData);
echo $res;

?>
