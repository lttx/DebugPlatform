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
require_once __DIR__."/Database/mysql_crud.php";
require_once __DIR__."/Database/DeviceSQL.class.php";


$deviceSQL = new DeviceSQL($con);
$userName = null;
if(isset($_POST['username'])){
    $userName =$_POST['username'];
}

$res = $deviceSQL->getUserDevices($userName);
echo(json_encode($res));
?>
