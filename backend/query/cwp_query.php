<?php 

    require_once '../config/config.php';

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials","true");
    
    // $lot_number = $postData['lot_number'];


    // $sampleId = 122;
    // $db = 'tpc_cwp_dbs';
    // $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $db);
    // $sql = "SELECT * FROM `tpc_cwp_main_tbl` WHERE `SubPid` = '$lot_number'";
    // $result = mysqli_query($conn, $sql);
    // if ($result === false) {
    //     echo "Error: " . mysqli_error($conn);
    // } else if(mysqli_num_rows($result) > 0) {
    //     $data = array();
    //     while($row = mysqli_fetch_array($result))
    //     {  
    //     $data[] = $row; 
    //     }
        
    //     return $data;
    // } else {
        
    //     $data[] = 0; 
    //     return $data;
    // }

    
    // header('Content-Type: application/json');
    // echo json_encode($data);
    //     $db = 'tpc_cwp_dbs';
    //     $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $db);
    //     $subPid = $_POST['subPid'];
    //     $sql = "SELECT * FROM `tpc_cwp_main_tbl` WHERE `SubPid` = '$subPid'";
    //     $result = mysqli_query($conn, $sql);
    //     if(mysqli_num_rows($result) > 0) {
    //       $data = array();
    //       while($row = mysqli_fetch_array($result))
    //       {  
    //         $data[] = $row; 
    //       }
    //       $conn->close();
    //       return $data;
    //     } 
    //     else 
    //     {
    //       $data[] = 0; 
    //       return $data;
    //       exit;
    //     }

    // header('Content-Type: application/json');
    // echo json_encode($data);

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/tpc_sample/backend/query/cwp_query.php') {
        $subPid = $_POST['subPid']; // get the subPid value from the POST request
        // handle the subPid value
        $db = 'tpc_cwp_dbs';
        $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $db);
        $sql = "SELECT * FROM `tpc_cwp_main_tbl` WHERE `SubPid` = '$subPid'";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result) > 0) {
          $data = array();
          while($row = mysqli_fetch_array($result))
          {  
            $data[] = $row; 
          }
            $conn->close();
            $response = $data; // create a response object
            header('Content-Type: application/json');
            echo json_encode($response); // return the response as JSON
        } 
        else 
        {
            $data = array('success' => false); 
            $response = $data; // create a response object
            header('Content-Type: application/json');
            echo json_encode($response); // return the response as JSON
        }
      }
?>