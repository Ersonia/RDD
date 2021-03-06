<?php
/*
App JSON data load
*/
require("mysqltable_lite.php");

$query="select * from app_roots";
$data['app_roots']=new MySQLTable("rdd","app_roots","","","",$query);


$query="select * from app_dealers";
$data['app_dealers']=new MySQLTable("rdd","app_dealers","","","",$query);
$i=0;
foreach ($data[app_dealers]->Data as $aD)
{
	$data[app_dealers]->Data[$i][APP_DEALER_BODY_1]=utf8_encode($data[app_dealers]->Data[$i][APP_DEALER_BODY_1]);
	$i++;
}



$query="select * from app_products";
$data['app_products']=new MySQLTable("rdd","app_products","","","",$query);

$query="select * from app_product_groups";
$data['app_product_groups']=new MySQLTable("rdd","app_product_groups","","","",$query);

$query="select * from app_features";
$data['app_features']=new MySQLTable("rdd","app_features","","","",$query);

$query="select SPEC_ID,APP_SERIES_ID,SERIES_ID,MODEL,N_1_5 from specifications order by N_1_5,MODEL";
$data['specifications']=new MySQLTable("eud","specifications","","","",$query);


$JSONobj='jsonData='.json_encode($data,JSON_HEX_APOS);
$file = fopen('app_data.js','w+');
fwrite($file, $JSONobj);
fclose($file);
echo "Done: ".date('H:i:s d-m-Y ',time());
?>