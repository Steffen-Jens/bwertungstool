<?php
$mysql_host = 'localhost';
$mysql_user = 'root';
$mysql_pass = '';
$mysql_db = 'bewertungstool';

$mysqli = new mysqli($mysql_host, $mysql_user, $mysql_pass, $mysql_db);

if($mysqli -> connect_error){
    die();
}


?>
