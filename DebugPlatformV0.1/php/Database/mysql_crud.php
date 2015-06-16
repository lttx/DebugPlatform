<?php
require_once __DIR__."/connect_conf.php";

$con = mysql_connect($HOST,$USERNAME,$PASSWORD);

if (!$con){
    $res['reason']="Database connection failed! ".mysql_error();
    die("Database connection failed! ".mysql_error());
}

mysql_select_db($DBNAME, $con);
mysql_query("set names UTF8");

function injectChk($sql_str) { //防止注入
    $check = preg_match('/select|insert|update|delete|\'|\/\*|\*|\.\.\/|\.\/|union|into|load_file|outfile/i', $sql_str);
    if ($check) {
        echo('非法字符串');
        exit ();
    } else {
        return $sql_str;
    }    
}

?>
