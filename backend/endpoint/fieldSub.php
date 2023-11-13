<?php

   require '../config/conn.php';
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
   header("Access-Control-Allow-Headers: Content-Type, Authorization");
   
   $sql = "SELECT * FROM `field_sub_tbl` WHERE `field_id` = '{$_POST['field_id']}'";
   $result = mysqli_query($conn, $sql);
   if(mysqli_num_rows($result) > 0) {
      $data = array();
      while($row = mysqli_fetch_array($result))
      {  
         $data[] = $row; 
      }
      mysqli_close($conn);
      echo json_encode($data);
   } else {
      $data[] = 0; 
      echo json_encode($data);
   }
   
?>