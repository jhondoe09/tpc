<?php
$mysqli = new mysqli("172.16.2.16","sdroot","cmisd032018","tpc_dbs");

if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}

$sql = "SELECT * FROM `ccp_lwp_input_main`";
$res = mysqli_query($mysqli, $sql);
if(mysqli_num_rows($res) > 0){
    $data = array();
    while($row = mysqli_fetch_assoc($res)){
        $data[] = $row;
        print_r($data);
    }
    $mysqli->close();
}

?>