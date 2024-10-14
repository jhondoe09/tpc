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
    if (!$result) {
        die('Unable to execute query: ' . mysqli_error($tpc_dbs_connection));
    } else {
        if (mysqli_num_rows($result) > 0) {
            $data = array();
            while ($row = mysqli_fetch_array($result)) {
                $data[] = $row;
            }
            return $data;
        } else {
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
    $query = "SELECT * FROM `temp_operator_masterlist_tbl` WHERE `id_number` = '$id_number' AND `role_open_process` = '1'";
    $result = mysqli_query($tpc_dbs_connection, $query);
    if (!$result) {
        die('Unable to execute query' . mysqli_error($tpc_dbs_connection));
    } else {
        if (mysqli_num_rows($result) > 0) {
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            return $data;
        } else {
            $data[] = 0;
            return $data;
        }
    }
}

function handleOpenSubProcess($postData)
{
    require '../config/conn.php';
    $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
    $tpc_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
    $main_prd_id = $postData['main_prd_id'];
    $assignment_id = $postData['assignment_id'];
    $SubPid = $postData['SubPid'];
    $query = "UPDATE `tpc_main_tbl` SET `tpc_sub_status`= 'Open' WHERE `main_prd_id` = '$main_prd_id'";
    $result = mysqli_query($tpc_dbs_connection, $query);
    if (!$result) {
        $response = array(
            'success' => false,
            'message' => 'Unable to update data due to an error => ' . mysqli_error($tpc_dbs_connection)
        );
    } else {
        $select = "SELECT * FROM `form_item_conditions_tbl` WHERE `assignment_id` = '$assignment_id' AND `SubPid` = '$SubPid' AND `condition_status` = 'Inactive'";
        $result1 = mysqli_query($tpc_connection, $select);
        if (!$result1) {
            $response = array(
                'success' => false,
                'message' => 'Unable to fetch any data due to an error => ' . mysqli_error($tpc_connection)
            );
        } else {
            if (mysqli_num_rows($result1) > 0) {
                while ($row = mysqli_fetch_assoc($result1)) {
                    $sql = "UPDATE `form_item_conditions_tbl` SET `condition_status`= 'Active' WHERE `assignment_id` = '{$row['assignment_id']}' AND `SubPid` = '{$row['SubPid']}'";
                    $res = mysqli_query($tpc_connection, $sql);
                    if (!$res) {
                        $response = array(
                            'success' => false,
                            'message' => 'An error occured while updating data, please contact IT/SD for more information error=>' . mysqli_error($tpc_connection)
                        );
                    } else {
                        $response = array(
                            'success' => true,
                            'message' => 'Sub process and conditions has been updated successfully!'
                        );
                    }
                }
            } else {
                $response = array(
                    'success' => true,
                    'message' => 'The subprocess has been initiated; however, the associated item conditions are not detected or available.'
                );
            }
        }
        return $response;
        $tpc_connection->close();
        $tpc_dbs_connection->close();
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['closeSubProcessBtn'])) {
        $postData = $_POST;
        $result = handleCloseSubProcess($postData);
        header('Content-Type: application/json');
        echo json_encode($result);
    } else if (isset($_POST['closedSubProcess'])) {
        $postData = $_POST;
        $result = handleSubProcess($postData);
        header('Content-Type: application/json');
        echo json_encode($result);
    } else if (isset($_POST['openSubProcess'])) {
        $postData = $_POST;
        $result = handleOpenSubProcess($postData);
        header('Content-Type: application/json');
        echo json_encode($result);
    }
}
