<?php
/**
 * Meaning:
 *     1. Get devices for a normal account.
 *         * Get all devices.
 *         * Get a specific device.
 *     2. Get devices allocated to a underling.
 *         * Get all devices.
 *         * Get a specific device.
 * Type: POST
 * Input:
 *     need session info.
 *     Get devices:
 *     req = {
 *         
 *     }
 *     Get specific device:
 *     req = {
 *         device_id:''
 *     }
 * Output:
 *     res = {
 *         success:true,
 *         devices:[
 *             {
 *                 //all info about a device from db.
 *             }, ...
 *         ],
 *         reason:''
 *     }
 */

require_once "../Database/mysql_crud.php";
require_once "../Database/DeviceSQL.class.php";

$deviceSQL = new DeviceSQL($con);
$userName = null;
$commandRes = null;
$commandList = null;
if(isset($_POST['username'])){
    $userName =$_POST['username'];
    $res = $deviceSQL->getUserDevices($userName);
    echo json_encode($res);
}
if(isset($_POST['command'])){
    $commandList =$_POST['command'];
    if($commandList=="time_sync") {
        $commandRes = "设备时间已经同步成功！";
    };
    if($commandList=="check") {
        $commandRes = "设备检查完毕！";
    };
    if($commandList=="self_test") {
        $commandRes = "设备自我测试成功！";
    };
    if($commandList=="upgrade") {
        $commandRes = "设备正在升级，请稍后！";
    };
    //”应用设置“按钮
    if($commandList=="applyconfig") {
        //需要进行配置的设备id
        $configID = $_POST['configid'];
        $configstr = explode(" ",$configID);
        foreach($configstr as $singledevice)
        {
//            配置设备的代码，$singledevice里是每一个设备的ID，通过他进行配置。
//            echo($singledevice."  ");
        }
        $commandRes ="设备 ".$configID."配置成功";
    };
    echo($commandRes);
}
?>
