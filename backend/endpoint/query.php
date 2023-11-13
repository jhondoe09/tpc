<?php

   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
   header("Access-Control-Allow-Headers: Content-Type, Authorization");


   function handleCloseSubProcess($postData)
   {
        require '../config/conn.php';
        $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
        $assignment_id = $postData['assignment_id'];
        $sql = "SELECT * FROM tpc_main_tbl t1 LEFT JOIN $tpc_dbs.setup_sub_process_tbl t2 ON t1.SubPid = t2.SubPid WHERE t1.assignment_id = '$assignment_id' AND t1.tpc_sub_status = 'Close' ORDER BY t1.sequence_number ASC";
        $result = mysqli_query($tpc_dbs_connection, $sql);
        if(!$result)
        {
            die('Unable to execute query: ' .mysqli_error($tpc_dbs_connection));
        }
        else
        {
            if(mysqli_num_rows($result) > 0) {
                $data = array();
                while($row = mysqli_fetch_array($result))
                {  
                    $data[] = $row; 
                }
                return $data;
            } 
            else 
            {
                $data[] = 0; 
                return $data;
            }
        }
    }
    function handleSubProcess($postData)
    {
        require '../config/conn.php';
        $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
        $id_number = $postData['id_number'];
        $query = "SELECT * FROM `temp_operator_masterlist_tbl` WHERE `id_number` = '$id_number' AND `role_open_process` = '1' ";
        $result = mysqli_query($tpc_dbs_connection, $query);
        if(!$result)
        {
            die('Unable to execute query' .mysqli_error($tpc_dbs_connection));
        }
        else
        {
            if(mysqli_num_rows($result) > 0)
            {
                $data = array();
                while($row = mysqli_fetch_assoc($result))
                {
                    $data[] = $row;
                }
                return $data;
            }
            else
            {
                $data[] = 0;
                return $data;
            }
        }
    }

    function handleOpenSubProcess($postData)
    {
        require '../config/conn.php';
        $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
        $main_prd_id = $postData['main_prd_id'];
        $query = "UPDATE `tpc_main_tbl` SET `tpc_sub_status`= 'Open' WHERE `main_prd_id` = '$main_prd_id'";
        $result = mysqli_query($tpc_dbs_connection, $query);
        if(!$result)
        {
            $response = array(
                'success' => false,
                'message' => 'ERROR!' .mysqli_error($tpc_dbs_connection)
            );
        }
        else
        {
            $response = array(
                'success' => true,
                'message' => 'Sub-Process is now Opened!'
              );
        }
        return $response;
    }
   if($_SERVER['REQUEST_METHOD'] === 'POST')
   {
        if(isset($_POST['closeSubProcessBtn']))
        {
            $postData = $_POST;
            $result = handleCloseSubProcess($postData);
            header('Content-Type: application/json');
            echo json_encode($result); 
        }
        else if(isset($_POST['closedSubProcess']))
        {
            $postData = $_POST;
            $result = handleSubProcess($postData);
            header('Content-Type: application/json');
            echo json_encode($result); 
        }
        else if(isset($_POST['openSubProcess']))
        {
            $postData = $_POST;
            $result = handleOpenSubProcess($postData);
            header('Content-Type: application/json');
            echo json_encode($result); 
        }
   }
?>