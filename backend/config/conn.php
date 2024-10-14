<?php
require_once 'config.php';

$tpc_dbs = 'tpc_dbs';
$cwp_dbs = 'tpc_cwp_dbs';
$tpc_prod_dbs = 'tpc_prod_dbs';
$sid_documentcontrol_db = 'sid_documentcontrol_db';
$std_main = 'ccp_management_database';
$ccp_swp = 'ccp_swp';
$ccp_management_database = 'ccp_management_database';


$conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
if (!$conn) {
    $_SESSION['error'] = mysqli_connect_error();
} else {
    return $conn;
}
