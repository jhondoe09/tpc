<?php

   require '../config/conn.php';
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
   header("Access-Control-Allow-Headers: Content-Type, Authorization");
   
   $sql = "SELECT * FROM `setup_section_tbl` WHERE `section_status` = 'Active'";
   $result = mysqli_query($conn, $sql);
   if ($result === false) {
      echo "Error: " . mysqli_error($conn);
   } else if(mysqli_num_rows($result) > 0) {
      $data = array();
      while($row = mysqli_fetch_array($result))
      {  
         $data[] = $row; 
      }
      echo json_encode($data);
   } else {
      $data[] = 0; 
      echo json_encode($data);
   }
?>