<?php
    class DeviceSQL{
        var $con = null;
        public function __construct($connect){
            $this->con = $connect;
        }
        public function isDeviceBelongTo($deviceId,$userPrivateId){
            $device = $this->getDevice($deviceId);
            if($device && $device['user_private_id']==$userPrivateId){
                return true;
            }else{
                return false;
            }
        }
        public function isDeviceAllocatedTo($deviceId,$userPrivateId){
            $device = $this->getDevice($deviceId);
            if($device){                
                $device_private_id = $device['private_id'];
                $query = "SELECT * FROM underling_device_allocation ".
                    "WHERE device_private_id='$device_private_id' ".
                    "AND underling_private_id='$userPrivateId'";
                $result = mysql_query($query);
                if($row = mysql_fetch_array($result)){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
        public function getDevice($deviceId){
            $query = "SELECT * FROM device WHERE device_id='$deviceId'";
            if($result = mysql_query($query)){
                if($device = mysql_fetch_array($result,MYSQL_ASSOC)){
                    return $device;
                }else{
                    return null;
                }
            }else{
                return false;
            }
        }
        public function deleteAllocation($deviceId){
            $device = $this->getDevice($deviceId);
            if(!$device){
                return false;
            }
            $device_private_id = $device['private_id'];
            $query = "DELETE FROM underling_device_allocation ".
                "WHERE device_private_id='$device_private_id'";
            if(mysql_query($query)){
                return true;
            }else{
                return false;
            }
        }
        public function getDeviceUuid($deviceId,$uuidName,$uuidDatabase){
            $database = $uuidDatabase;
            $query = "SELECT device_uuid FROM $database.device_uuid WHERE device_id='$deviceId' AND uuid_name='$uuidName'";
            if($result = mysql_query($query)){
                if($row = mysql_fetch_array($result)){
                    return $row['device_uuid'];
                }else{
                    return null;
                }
            }else{
                return false;
            }           
        }
        public function hasDevice($deviceId,$userPrivateId){
            $query = "SELECT device.private_id FROM user INNER JOIN device ".
                    "ON user.private_id = device.user_private_id ".
                    "WHERE device.device_id='$deviceId' AND user.private_id='$userPrivateId'";

            if($result = mysql_query($query)){
                if($row = mysql_fetch_array($result)){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }           
        }
        public function allocatedDevice($deviceId,$userPrivateId){
            $query = "SELECT * FROM underling_device_allocation AS uda INNER JOIN device ".
                    "ON uda.device_private_id = device.private_id ".
                    "WHERE device.device_id='$deviceId' AND uda.underling_private_id='$userPrivateId'";

            if($result = mysql_query($query)){
                if($row = mysql_fetch_array($result)){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }           

        }
        public function deviceAccessable($deviceId,$userPrivateId){
            if(!$this->hasDevice($deviceId,$userPrivateId)){
                if(!$this->allocatedDevice($deviceId,$userPrivateId)){
                    return false;
                }
            }
            return true;
        }
        public function getDeviceUuids($deviceId,$uuidDatabase){
            $database = $uuidDatabase;
            $query = "SELECT du.uuid_name,du.device_uuid ".
                    "FROM $database.device_uuid AS du ".
                    "WHERE du.device_id='$deviceId'";
            if($result = mysql_query($query)){
                $res = Array();                
                while($row = mysql_fetch_array($result,MYSQL_ASSOC)){
                    array_push($res,$row);
                }
                return $res;
            }else{
                return false;
            }           
        }
	public function getUserDevices($userName){
	    $query = "SELECT device_id FROM device AS d LEFT JOIN user AS u on d.user_private_id = u.private_id WHERE u.user_name = '$userName'";
	    $res = Array('success'=>false);
	    if(!$result = mysql_query($query)){
	        $res['reason'] = "Query failed! ".mysql_error();
		return $res;
	    }
	    $res['success'] = true;
	    $res['user'] = $userName;
	    $res['devices'] = array();
	    while($row = mysql_fetch_array($result, MYSQL_ASSOC)){
	    	array_push($res['devices'],$row);
	    }
	    return $res;
	}
        public function getAccountDevices($private_id,$isUnderling,$device_id){
            $query = "SELECT * FROM device ";

            //Get allocated devices if the user is
            //a underling account.
            if($isUnderling){
                $query = "SELECT * FROM device INNER JOIN underling_device_allocation AS uda ".
                    "ON device.private_id=uda.device_private_id ".
                    "WHERE uda.underling_private_id='$private_id' ";     
                if($device_id){
                    $query = $query."AND device.device_id = '$device_id'";
                }
            //Get devices for normal user.
            }else{
                if($device_id){
                    $query = $query."WHERE user_private_id = '$private_id' AND device_id = '$device_id'";
                }else{
                    $query = $query."WHERE user_private_id = '$private_id'";
                }
            }

            $res = Array('success'=>false);
            if(!$result = mysql_query($query)){
                $res['reason'] = "Query failed! ".mysql_error();
                return $res;
            }

            $res['success'] = true;
            $res['devices'] = array();
            $index = 0;
            while($row = mysql_fetch_array($result,MYSQL_ASSOC)){    
                array_push($res['devices'],$row);
            }
            return $res;
        }
    }
?>
