<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

function getCurrentTimestamp() {
    return date('Y-m-d H:i:s'); 
}


// Local 
// $connection = array(
//     'server' => 'localhost',
//     'username' => 'root',
//     'password' => '',
//     'tpc_dbs' => 'tpc_dbs'
//   );
// Deploy
$connection = array(
  'server' => '172.16.2.16',
  'username' => 'sdroot',
  'password' => 'cmisd032018',
  'tpc_dbs' => 'tpc_dbs'
);
function createConnection($getData, $conn){
  $main_conn = mysqli_connect($conn['server'], $conn['username'], $conn['password'], $conn['tpc_dbs']);
  if(!$main_conn){
    $response = array(
        'success' => false,
        'message' => "[" . getCurrentTimestamp() . "] Failed to connect: " . mysqli_connect_error() . "Attempting to reconnect...\n"
    );
    return $response;
      sleep(5);
      createConnection($getData, $conn);
  }else{
      $response = array(
        'success' => true,
        'message' => "[" . getCurrentTimestamp() . "] Connection is alive.\n"
    );
    return $response;
    $main_conn->close();
  }
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(isset($_GET['reconnect'])){
        $getData = $_GET;
        $responseData = createConnection($getData, $connection);
        header('Content-Type: application/json');
        echo json_encode($responseData);
    }
}