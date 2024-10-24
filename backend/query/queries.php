<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
$GLOBALS['conn'] =  require_once '../config/conn.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

function handleScanQRRequest($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $item_code = $getData['item_code'];
  $parts_number = $getData['parts_number'];
  $lot_number = $getData['lot_number'];
  $date_issued = $getData['date_issued'];
  $revision_number = $getData['revision_number'];
  $assignment_id = $getData['assignment_id'];

  $sql = "SELECT t1.assignment_id,
      t1.assignment_status,
      t1.po_number,
      t1.order_pn,
      t1.wafer_number_from,
      t1.wafer_number_to,
      t1.date_issued as date2,
      t1.delivery_date,
      t2.main_prd_id,
      t2.assignment_id,
      t2.section_id,
      t2.SubPid,
      t2.item_parts_number,
      t2.item_code,
      t2.revision_number,
      t2.lot_number,
      t2.tpc_sub_status,
      t2.tpc_sub_sampling, 
      t2.tpc_sub_uncontrolled, 
      t2.quantity,
      t2.sequence_number,
      t2.tpc_sub_batching_type,
      t2.tpc_sub_result_type,
      t2.date_issued,
      t2.status,
      t3.hadan,
      t3.Pid,
      t3.SubPname,
      t4.section_code,
      t4.section_description,
      t5.Pid,
      t5.Pname,
      t5.key_code
      FROM form_assignment_tbl t1 LEFT JOIN $tpc_prod_dbs.tpc_main_tbl t2 ON t1.assignment_id = t2.assignment_id LEFT JOIN setup_sub_process_tbl t3 ON t2.SubPid = t3.SubPid LEFT JOIN setup_section_tbl t4 ON t1.section_id = t4.section_id LEFT JOIN `setup_key_process_tbl` t5 ON t3.Pid = t5.Pid WHERE t1.item_code = '$item_code' AND t1.item_parts_number = '$parts_number' AND t1.lot_number = '$lot_number' AND t1.date_issued = '$date_issued' AND t1.revision_number = '$revision_number' AND t1.assignment_id = '$assignment_id' ORDER BY t2.sequence_number ASC";
  $result = mysqli_query($tpc_dbs_connection, $sql);
  if (!$result) {
    $response = array(
      'success' => false,
      'message' => 'Error' . mysqli_error($tpc_dbs_connection)
    );
    return $response;
    $tpc_dbs_connection->close();
  }
  if (mysqli_num_rows($result) > 0) {
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
      $data[] = $row;
    }
    $tpc_dbs_connection->close();
    return $data;
  } else {
    $tpc_dbs_connection->close();
    $data[] = 0;
    return $data;
    exit;
  }
}

// function handleAttachments($postData)
// {
//   require '../config/config.php';
//   require '../config/conn.php';
//   $SubPid = $postData['subPid'];
//   $assID = $postData['assignment_id'];
//   $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
//   $sql = "SELECT * FROM `form_attachment_tbl` WHERE `SubPid` = '$SubPid' AND `assignment_id` = '$assID'";
//   $result = mysqli_query($tpc_dbs_connection, $sql);
//   if (!$result) {
//     $error = mysqli_error($tpc_dbs_connection);
//     $response = array(
//       'success' => false,
//       'message' => "Query failed: '$error'"
//     );
//     return $response;
//     mysqli_close($tpc_dbs_connection);
//     exit;
//   }
//   if (mysqli_num_rows($result) > 0) {
//     $attachData = array();
//     while ($row = mysqli_fetch_assoc($result)) {
//       $filePath = '//172.16.2.61/Data/3.xlsx';
//       try {
//         if (chmod($filePath, 0755)) {
//           // substr(sprintf("%o", fileperms($filePath)), -4),
//           $attachData[] = $row;
//           $response = array(
//             'success' => true,
//             'file_perms' => substr(sprintf("%o", fileperms($filePath)), -4),
//             'data' => $attachData,
//             'path' => $filePath,
//             'chmod' => chmod($filePath, 0755)
//           );
//         } else {
//           echo "Error changing permissions.";
//         }
//       } catch (Exception $e) {
//         echo "Exception: " . $e->getMessage();
//       }
//     }
//     return $response;
//     $tpc_dbs_connection->close();
//   } else {
//     $attachData[] = 0;
//     $response = array(
//       'success' => false,
//       'data' => $attachData
//     );
//   }
//   return $response;
//   // Close the connections
//   // mysqli_close($cwp_dbs_connection);
//   mysqli_close($tpc_dbs_connection);
// }

function handleAttachments($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $SubPid = $getData['subPid'];
  $assignment_id = $getData['assignment_id'];
  if (!$tpc_dbs_connection) {
    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the server, please contact IT/SD for more information.'
    );
    return $response;
  } else {
    $sql = "SELECT * FROM `form_attachment_tbl` WHERE `SubPid` = '$SubPid' AND `assignment_id` = '$assignment_id'";
    $result = mysqli_query($tpc_dbs_connection, $sql);
    if (!$result) {
      $response = array(
        'success' => false,
        'message' => 'Unable to fetch data using the current parameters error: ' . mysqli_error($tpc_dbs_connection)
      );
      return $response;
      $tpc_dbs_connection->close();
    } else {
      if (mysqli_num_rows($result) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
          $data[] = $row;
          $response = array(
            'success' => true,
            'data' => $data,
            'param' => $sql
          );
        }
        return $response;
        $tpc_dbs_connection->close();
      } else {
        $data[] = 0;
        $response = array(
          'success' => false,
          'message' => 'Theres no data being fetched using the current parameters',
          'param' => $sql
        );
        return $response;
        $tpc_dbs_connection->close();
      }
    }
  }
}

function handleSideBarRequest($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_prod_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $subPid = $getData['subPid'];
  $itemPartsNumber = $getData['itemPartsNumber'];
  $itemCode = $getData['itemCode'];
  $revisionNumber = $getData['revisionNumber'];
  $lotNumber = $getData['lotNumber'];
  $assignId = $getData['assignId'];
  $query = "SELECT * FROM batch_process_operator_tbl WHERE SubPid = '$subPid' AND assignment_id = '$assignId' AND `parts_number` = '$itemPartsNumber' AND `revision_number` = '$revisionNumber' AND `lot_number` = '$lotNumber'";
  $result = mysqli_query($tpc_dbs_connection, $query);
  if (!$result) {
    die('Failed to execute query: ' . mysqli_error($tpc_dbs_connection));
  } else {
    if (mysqli_num_rows($result) > 0) {
      $data = array();
      while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
      }
      return $data;
      $tpc_dbs_connection->close();
    } else {
      $sql = "SELECT t1.batch_id,
        t1.SubPid, t1.item_parts_number, t1.item_code, t1.revision_number, t1.lot_number,
        t2.id_number,
        t2.batch_operator_id,
        t2.operator_name, 
        t2.operator_number, 
        t2.batch_number, 
        t2.time_start, 
        t2.time_end, 
        t2.total_time, 
        t2.line_number, 
        t2.checked_by FROM tpc_main_tbl t1 RIGHT JOIN $tpc_dbs.batch_process_operator_tbl t2 ON t1.SubPid = t2.SubPid AND t1.item_parts_number = t2.parts_number AND t1.revision_number = t2.revision_number AND t1.lot_number = t2.lot_number WHERE t1.assignment_id = '$assignId' AND t1.SubPid = '$subPid' AND t1.item_parts_number = '$itemPartsNumber' AND t1.item_code = '$itemCode' AND t1.revision_number = '$revisionNumber' AND t1.lot_number = '$lotNumber'";
      $res = mysqli_query($tpc_prod_dbs_connection, $sql);
      if (!$res) {
        die('Unable to execute query: ' . mysqli_error($tpc_prod_dbs_connection));
      } else {
        if (mysqli_num_rows($res) > 0) {
          while ($rows = mysqli_fetch_assoc($res)) {
            $data[] = $rows;
          }
          return $data;
          $tpc_prod_dbs_connection->close();
        } else {
          $data[] = 0;
          return $data;
          $tpc_prod_dbs_connection->close();
          exit;
        }
      }
    }
  }
}


function handleTableClicked($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], 'tpc_dbs');
  $tpc_prod_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $id_number = $getData['idNumber'];
  $sub_pid = $getData['subPid'];
  $item_parts_number = $getData['itemPartsNumber'];
  $item_code = $getData['itemCode'];
  $revision_number = $getData['revisionNumber'];
  $lot_number = $getData['lotNumber'];
  $assign_id = $getData['assignId'];
  $operator_number = $getData['operator_number'];
  $batch_number = $getData['batch_number'];
  if (!$tpc_dbs_connection || !$tpc_prod_dbs_connection) {
    $response = array(
      'success' => false,
      'message' => 'Unable to connect to the server, please contact IT/SD for more information.'
    );
    return $response;
  } else {
    $query = "SELECT t1.*, t2.*, t3.tpc_sub_remarks, t3.SubPid, t3.assignment_id FROM `tpc_condition_tbl` t1 LEFT JOIN $tpc_dbs.field_main_tbl t2 ON t1.field_type = t2.field_type_description INNER JOIN tpc_main_tbl t3 ON t1.assignment_id = t3.assignment_id AND t1.SubPid = t3.SubPid  WHERE t1.`SubPid` = '$sub_pid' AND t1.`item_parts_number` = '$item_parts_number' AND t1.`item_code` = '$item_code' AND t1.`revision_number` = '$revision_number' AND t1.`lot_number` = '$lot_number' AND t1.`id_number` = '$id_number' AND t1.`operator_number`= '$operator_number' AND t1.`batch_id` = '$batch_number' AND t1.`assignment_id` = '$assign_id' ORDER BY t1.`sequence_number` ASC";
    $result = mysqli_query($tpc_prod_dbs_connection, $query);
    if (!$result) {
      $response = array(
        'message' => 'Unable to get data error=>' . mysqli_error($tpc_prod_dbs_connection)
      );
      return $response;
      $tpc_prod_dbs_connection->close();
    } else {
      if (mysqli_num_rows($result) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
          $data[] = $row;
        }
        return $data;
        $tpc_prod_dbs_connection->close();
      } else {
        $sql = "SELECT t1.*, t2.*, t3.tpc_sub_remarks, t3.SubPid, t3.assignment_id  FROM form_item_conditions_tbl t1 LEFT JOIN field_main_tbl t2 ON t1.field_type = t2.field_type_description INNER JOIN tpc_prod_dbs.tpc_main_tbl t3 ON t1.assignment_id = t3.assignment_id AND t1.SubPid = t3.SubPid WHERE t1.`SubPid` = '$sub_pid' AND t1.`assignment_id` = '$assign_id' AND t1.`condition_status` = 'Active' ORDER BY t1.`sequence_number` ASC";
        // $sql = "SELECT t1.*, t2.*, t3.tpc_sub_remarks, t3.SubPid, t3.assignment_id, t4.SubPid, t4.database_name, t4.table_name, 
        // t4.fieldname_1, t4.fieldname_2, t4.fieldname_3, t4.fetching_eng, t4.new_detail, t4.eng_server, t4.eng_db_username, t4.eng_db_password
        // FROM form_item_conditions_tbl t1 LEFT JOIN field_main_tbl t2 ON t1.field_type = t2.field_type_description 
        // INNER JOIN tpc_prod_dbs.tpc_main_tbl t3 ON t1.assignment_id = t3.assignment_id AND t1.SubPid = t3.SubPid 
        // LEFT JOIN (SELECT t4.SubPid, t4.database_name, t4.table_name, t4.fieldname_1, t4.fieldname_2, t4.fieldname_3, t4.fetching_eng, t4.detail_description as new_detail, t4.eng_server, t4.eng_db_username, t4.eng_db_password FROM setup_process_detail_items_tbl t4 ORDER BY t4.item_id DESC LIMIT 1) 
        // t4 ON t1.SubPid = t4.SubPid WHERE t1.`SubPid` = '$sub_pid' AND t1.`assignment_id` = '$assign_id' AND t1.`condition_status` = 'Active' ORDER BY t1.`sequence_number` ASC";

        // $sql = "SELECT t1.*, t2.field_type_description, t2.field_type_selection, t3.with_judgement, t3.SubPid, t3.detail_description, t3.option_value
        // FROM form_item_conditions_tbl t1
        // LEFT JOIN field_main_tbl t2 ON t1.field_type = t2.field_type_description
        // LEFT JOIN (SELECT t3.option_value, t3.with_judgement, t3.SubPid, t3.detail_description FROM setup_process_detail_items_tbl t3) t3 ON t1.SubPid = t3.SubPid AND t1.detail_description = t3.detail_description
        // WHERE t1.SubPid = '$sub_pid' AND t1.assignment_id = '$assign_id' AND t1.condition_status = 'Active'
        // ORDER BY t1.sequence_number ASC";
        $res = mysqli_query($tpc_dbs_connection, $sql);
        if (!$res) {
          die('Unable to fetch data from DB: ERROR=> ' . mysqli_error($tpc_dbs_connection));
        } else {
          if (mysqli_num_rows($res) > 0) {
            $data = array();
            while ($rows = mysqli_fetch_assoc($res)) {
              $data[] = $rows;
            }
            return $data;
            $tpc_dbs_connection->close();
          } else {
            $data[] = 0;
            return $data;
            $tpc_dbs_connection->close();
          }
        }
      }
    }
  }
}

function handlesaveButton($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $id_number = $postData['id_number'];
  $batch_number = $postData['batch_number'];
  $batch_operator_number = $postData['batch_operator_number'];
  $query = "SELECT assignment_id, parts_number, revision_number, lot_number FROM `batch_process_operator_tbl` WHERE `batch_number` = '$batch_number' AND `operator_number` = '$batch_operator_number' AND `id_number` = '$id_number'";
  $result = mysqli_query($tpc_dbs_connection, $query);
  if (!$result) {
    die('Unable to execute query: ERROR=>' . mysqli_error($tpc_dbs_connection));
  } else {
    if (mysqli_num_rows($result) > 0) {
      $data = array();
      while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
      }
      return $data;
      $tpc_dbs_connection->close();
    } else {
      $data[] = 0;
      return $data;
      $tpc_dbs_connection->close();
    }
  }
}

function saveItemConditionsData($postItemsData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_dbs_prod_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);

  if (isset($postItemsData)) {
    foreach ($postItemsData as $key => $value) {
      if (strpos($key, 'condition_item_id_') === 0) {
        $index = substr($key, strlen('condition_item_id_'));
        $item_code = isset($_POST["item_code_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["item_code_" . $index]) : NULL;
        $section_id = isset($_POST["section_id_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["section_id_" . $index]) : NULL;
        $sub_pid = isset($_POST["sub_pid_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["sub_pid_" . $index]) : NULL;
        $id_number = isset($_POST["id_number_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["id_number_" . $index]) : NULL;
        $batch_number = isset($_POST["batch_number_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["batch_number_" . $index]) : NULL;
        $batch_operator_number = isset($_POST["batch_operator_number_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["batch_operator_number_" . $index]) : NULL;
        $assignment_id = isset($_POST["assignment_id_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["assignment_id_" . $index]) : NULL;
        $lot_number = isset($_POST["lot_number_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["lot_number_" . $index]) : NULL;
        $parts_number = isset($_POST["parts_number_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["parts_number_" . $index]) : NULL;
        $revision_number = isset($_POST["revision_number_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["revision_number_" . $index]) : NULL;
        $field_type = isset($_POST["field_type_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["field_type_" . $index]) : NULL;
        $condition_item_id = mysqli_real_escape_string($tpc_dbs_connection, $value);
        $id_no = isset($_POST["id_no_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["id_no_" . $index]) : NULL;
        $sequence_no = isset($_POST["sequence_no_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["sequence_no_" . $index]) : NULL;
        $wafer_start = isset($_POST["wafer_start_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["wafer_start_" . $index]) : NULL;
        $wafer_end = mysqli_real_escape_string($tpc_dbs_connection, isset($_POST["wafer_end_" . $index]) ? $_POST["wafer_end_" . $index] : NULL);
        $condition = isset($_POST["condition_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["condition_" . $index]) : NULL;
        $actual_value = mysqli_real_escape_string($tpc_dbs_connection, isset($_POST["actual_value_" . $index]) ? $_POST["actual_value_" . $index] : NULL);
        $target_value = isset($_POST["target_value_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["target_value_" . $index]) : NULL;
        $min_value = isset($_POST["min_value_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["min_value_" . $index]) : NULL;
        $max_value = isset($_POST["max_value" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["max_value" . $index]) : NULL;
        $option_value = isset($_POST["option_value_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["option_value_" . $index]) : NULL;
        $with_judgement = isset($_POST["with_judgement_" . $index]) ? mysqli_real_escape_string($tpc_dbs_connection, $_POST["with_judgement_" . $index]) : NULL;
        $judgement = mysqli_real_escape_string($tpc_dbs_connection, isset($_POST["judgement_" . $index]) ? $_POST["judgement_" . $index] : NULL);
        $special_instruction = mysqli_real_escape_string($tpc_dbs_connection, isset($_POST["special_instruction_" . $index]) ? $_POST["special_instruction_" . $index] : NULL);

        if ($sub_pid > 0) {
          $sql = "SELECT * FROM `tpc_condition_tbl` WHERE `condition_prd_id` = '$condition_item_id' AND `id_number` = '$id_number' AND `operator_number` = '$batch_operator_number' AND `batch_id` = '$batch_number'";
          $result = mysqli_query($tpc_dbs_prod_connection, $sql);
          if (!$result) {
            $response = array(
              'success' => false,
              'message' => "Unable to execute sql: ERROR=> " . mysqli_error($tpc_dbs_prod_connection)
            );
          } else {
            if (mysqli_num_rows($result) > 0) {
              while (mysqli_fetch_assoc($result)) {
                $query = "UPDATE `tpc_condition_tbl` SET `wafer_start` = '$wafer_start', `wafer_end` = '$wafer_end', `actual_value` = '$actual_value', `condition_judgement` = '$judgement' WHERE `condition_prd_id` = '$condition_item_id' AND `id_number` = '$id_number' AND `operator_number` = '$batch_operator_number'";
                $res = mysqli_query($tpc_dbs_prod_connection, $query);
                if (!$res) {
                  die('Unable to execute query: ERROR=>' . mysqli_error($tpc_dbs_prod_connection));
                } else {
                  $response = array(
                    'success' => true,
                    'message' => "The [tpc_condition_tbl] Data has been successfuly updated!",
                    'condition_item_id' => $condition_item_id
                  );
                }
              }
            } else {
              $execute = "INSERT INTO `tpc_condition_tbl` (`assignment_id`, `section_id`, `SubPid`, `item_parts_number`, `item_code`, `revision_number`, `lot_number`, `id_number`, `operator_number`, `sequence_number`, `field_type`, `wafer_start`, `wafer_end`, `condition_description`, `actual_value`, `target_value`, `minimum_value`, `maximum_value`, `option_value`, `with_judgement`, `condition_judgement`, `batch_id`, `special_instruction`) VALUES ('$assignment_id', '$section_id' , '$sub_pid', '$parts_number', '$item_code', '$revision_number', '$lot_number', '$id_no', '$batch_operator_number', '$sequence_no', '$field_type', '$wafer_start', '$wafer_end', '$condition', '$actual_value', '$target_value', '$min_value', '$max_value', '$option_value', '$with_judgement', '$judgement', '$batch_number', '$special_instruction')";
              $exec_res = mysqli_query($tpc_dbs_prod_connection, $execute);
              if ($exec_res) {
                $response = array(
                  'success' => true,
                  'message' => "Inserting data from [tpc_condition_tbl] is successfull!"
                );
              } else {
                $response = array(
                  'success' => false,
                  'message' => "Inserting data from [tpc_condition_tbl] is a no go!" . mysqli_error($tpc_dbs_prod_connection)
                );
              }
            }
          }
        }
      }
    }
    return $response;
    $tpc_dbs_prod_connection->close();
  } else {
    $response = array(
      'success' => false,
      'message' => "An error occured while fetching data!" . mysqli_error($tpc_dbs_prod_connection)
    );
    return $response;
    $tpc_dbs_prod_connection->close();
  }
}

function doneProcess($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_prod_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $section_id = $postData['section_id'];
  $assignment_id = $postData['assignment_id'];
  $main_prod_id = $postData['main_prod_id'];
  $sequence_number = $postData['sequence_number'];
  $sql = "UPDATE `tpc_main_tbl` SET `tpc_sub_status` = 'Done' WHERE `main_prd_id` = '$main_prod_id'";
  $result = mysqli_query($tpc_prod_dbs_connection, $sql);
  if (!$result) {
    $error = mysqli_error($tpc_prod_dbs_connection);
    $response = array(
      'success' => false,
      'message' => "SQL query failed: '$error'"
    );
    return $response;
    $tpc_prod_dbs_connection->close();
  } else {
    $query = "SELECT * FROM `tpc_main_tbl` WHERE `assignment_id` = '$assignment_id' AND `section_id` = '$section_id' AND `sequence_number` > '$sequence_number' AND `status` = 'Active' ORDER BY `sequence_number` ASC LIMIT 1";
    $res = mysqli_query($tpc_prod_dbs_connection, $query);
    if (!$res) {
      $error = mysqli_error($tpc_prod_dbs_connection);
      $response = array(
        'success' => false,
        'message' => "Query failed: '$error'"
      );
      return $response;
      $tpc_prod_dbs_connection->close();
    } else {
      if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
          $id = $row['main_prd_id'];
          $status = $row['tpc_sub_status'];
          if ($status == 'Open') {
            $response = array(
              'success' => true,
              'message' => 'Sub-Process is already opened!'
            );
            return $response;
          } else if ($status == 'Done') {
            $response = array(
              'success' => true,
              'message' => 'Sub-Process is already done!'
            );
          } else {
            $exec = "UPDATE `tpc_main_tbl` SET `tpc_sub_status` = 'Open' WHERE `main_prd_id` = '$id' AND `status` = 'Active' ";
            $exec_res = mysqli_query($tpc_prod_dbs_connection, $exec);
            if (!$exec_res) {
              $error = mysqli_error($tpc_prod_dbs_connection);
              $response = array(
                'success' => false,
                'message' => "Exec Query Failed: '$error'"
              );
            } else {
              $response = array(
                'success' => true,
                'message' => 'Sub-Process is now Closed!'
              );
              return $response;
            }
          }
        }
        return $response;
        $tpc_prod_dbs_connection->close();
      } else {
        $response = array(
          'success' => false,
          'message' => "All Sub-Process has been successfully Closed!"
        );
        return $response;
        $tpc_prod_dbs_connection->close();
      }
    }
  }
}

function handleGetYield($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $sub_pid = $getData['SubPid'];
  $assignment_id = $getData['assignment_id'];
  $query = "SELECT SUM(quantity_in) quantity_in, SUM(quantity_out) quantity_out FROM `batch_process_operator_tbl` WHERE `SubPid` = '$sub_pid' AND `assignment_id` = '$assignment_id' ORDER BY `batch_operator_id` ASC LIMIT 1";
  $res = mysqli_query($tpc_dbs_connection, $query);
  if (!$res) {
    $response = array(
      'success' => false,
      'message' => mysqli_error($tpc_dbs_connection)
    );
    return $response;
  } else {
    if (mysqli_num_rows($res) > 0) {
      $data = array();
      while ($row = mysqli_fetch_assoc($res)) {
        $data[] = $row;
      }
      return $data;
    } else {
      $data[] = 0;
      return $data;
    }
  }
}

function handleUpdateRemarks($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_prod_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $remarks = $postData['remarks'];
  $assignment_id = $postData['assignment_id'];
  $SubPid = $postData['SubPid'];
  $sql = "UPDATE `tpc_main_tbl` SET `tpc_sub_remarks`= '$remarks' WHERE `assignment_id` = '$assignment_id' AND `SubPid` = '$SubPid'";
  $res = mysqli_query($tpc_prod_dbs_connection, $sql);
  if (!$res) {
    $response = array(
      'success' => false,
      'message' => 'Unable to update remarks on [tpc_main_tbl] error=>' . mysqli_error($tpc_prod_dbs_connection)
    );
    return $response;
  } else {
    $response = array(
      'success' => true,
      'message' => 'tpc_sub_remarks has been updated successfully!'
    );
    return $response;
  }
}

function handleGetSubProcess($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $assignment_id = $postData['assignment_id'];
  $sql = "SELECT t1.*, t2.section_id, t2.Pid, t2.SubPname, t2.process_type, t2.sub_code FROM tpc_main_tbl t1 LEFT JOIN $tpc_dbs.setup_sub_process_tbl t2 ON t1.SubPid = t2.SubPid WHERE t1.assignment_id = '$assignment_id' ORDER BY t1.sequence_number ASC";
  $result = mysqli_query($tpc_dbs_connection, $sql);
  if (!$result) {
    $response = array(
      'success' => false,
      'message' => 'Unable to fetch sub process data error =>' . mysqli_error($tpc_dbs_connection)
    );
    return $response;
    $tpc_dbs_connection->close();
  } else {
    if (mysqli_num_rows($result) > 0) {
      $data = array();
      while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
        $response = array(
          'success' => true,
          'data' => $data
        );
      }
      return $response;
      $tpc_dbs_connection->close();
    } else {
      $data[] = 0;
      $response = array(
        'success' => false,
        'data' => $data,
        'message' => 'No data found!'
      );
      return $response;
      $tpc_dbs_connection->close();
    }
  }
}

// function handleUploadFile($postData)
// {
//   error_reporting(1);

//   $operator_id = $postData['operator_id'];
//   $file_name = $postData['file_name'];
//   $SubPid = $postData['SubPid'];
//   $file = $postData['file'];
//   $remarks = $postData['remarks'];
//   $source_file = basename($file);
//   $target_dir = "//172.16.2.13/htdocs/TPC-endpoint/uploads/";
//   $target_file = $target_dir . basename($file);

//   if (move_uploaded_file($source_file, $target_file)) {
//     $response = array(
//       'success' => true,
//       'target_file' => $target_file,
//       'message' => "The file " . htmlspecialchars(basename($file)) . " has been copied to the directory."
//     );
//     return $response;
//   } else {
//     $response = array(
//       'success' => false,
//       'file' => $target_file,
//       'message' => "Sorry, there was an error copying the file."
//     );
//     return $response;
//   }
//   // if (($_FILES['my_file']['name'] != "")) {
//   //   // $target_dir = "//172.16.2.61/Data/4haloween/";
//   //   $target_dir = "//172.16.2.13/htdocs/TPC-endpoint/uploads/";
//   //   $file = $_FILES['my_file']['name'];
//   //   $path = pathinfo($file);
//   //   $filename = $path['filename'];
//   //   $ext = $path['extension'];
//   //   $temp_name = $_FILES['my_file']['tmp_name'];
//   //   $path_filename_ext = $target_dir . $filename . "." . $ext;

//   //   // Check if file already exists
//   //   if (file_exists($path_filename_ext)) {
//   //     echo "Sorry, file already exists .." . $path_filename_ext;
//   //   } else {
//   //     if (move_uploaded_file($temp_name, $path_filename_ext)) {
//   //       echo "Congratulations! File Uploaded Successfully." . $path_filename_ext;
//   //     } else {
//   //       echo "Unable to upload file." . $path_filename_ext;
//   //     }
//   //   }
//   // }
// }

function handleGetHeader($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $assignment_id = $getData['assignment_id'];
  $section = $getData['section'];

  if (!$conn) {
    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the server, please contact IT/SD for more information.'
    );
    return $response;
  } else {
    $sql = "SELECT * FROM `ccp_" . $section . "_input_main` WHERE `assignment_id` = '$assignment_id'";
    $res = mysqli_query($conn, $sql);
    if (!$res) {
      $response = array(
        'success' => false,
        'message' => 'Unable to fetch data from [' . $section . '], error => ' . mysqli_error($conn)
      );
      return $response;
      $conn->close();
    } else {
      if (mysqli_num_rows($res) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($res)) {
          $data[] = $row;
          $response = array(
            'success' => true,
            'data' => $data
          );
        }
        return $response;
        $conn->close();
      }
    }
  }
}

function handleGetBatch($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $SubPid = $getData['SubPid'];
  $batch_number = $getData['batch_number'];
  if (!$conn) {
    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the server, please contact IT/SD for more information.'
    );
    return $response;
  } else {
    $sql = "SELECT assignment_id FROM `batch_process_operator_tbl` WHERE `SubPid` = '$SubPid' AND `batch_number` = '$batch_number'";
    $res = mysqli_query($conn, $sql);
    if (!$res) {
      $response = array(
        'success' => false,
        'message' => 'Unable to fetch data from [batch_process_operator_tbl] => Func (handleGetBatch). Error => ' . mysqli_error($conn)
      );
      return $response;
      $conn->close();
    } else {
      if (mysqli_num_rows($res) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($res)) {
          $data[] = $row;
          $response = array(
            'success' => true,
            'data' => $data
          );
        }
        return $response;
        $conn->close();
      } else {
        $response = array(
          'success' => false,
          'message' => 'No data found using the current parameters being passed! ' . $SubPid . '&' . $batch_number
        );
        return $response;
        $conn->close();
      }
    }
  }
}

function handleGetBatchProcess($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $rf_conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $SubPid = $getData['SubPid'];
  $assignment_id = $getData['assignment_id'];
  if (!$conn || !$rf_conn) {
    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the server, please contact IT/SD for more information.'
    );
    return $response;
  } else {
    $sql = "SELECT * FROM `tpc_main_tbl` WHERE `assignment_id` = '$assignment_id' AND `SubPid` = '$SubPid'";
    $res = mysqli_query($conn, $sql);
    if (!$res) {
      $response = array(
        'success' => false,
        'message' => 'Unable to fetch data from [tpc_main_tbl] func(handleGetBatchProcess). query => $sql. Error => ' . mysqli_error($conn)
      );
      return $response;
      $conn->close();
    } else {
      if (mysqli_num_rows($res) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($res)) {
          $data[] = $row;
          $update = "UPDATE `tpc_main_tbl` SET `tpc_sub_status` = 'Done' WHERE `assignment_id` = '{$row['assignment_id']}' AND `SubPid` = '{$row['SubPid']}'";
          $result = mysqli_query($conn, $update);
          if (!$result) {
            $response = array(
              'success' => false,
              'message' => 'Unable to fetch data from [tpc_main_tbl] func(handleGetBatchProcess). query => $update Error => ' . mysqli_error($conn)
            );
            return $response;
            $conn->close();
          } else {
            $select = "SELECT * FROM `tpc_main_tbl` WHERE `assignment_id` = '{$row['assignment_id']}' AND `sequence_number` > '{$row['sequence_number']}' AND `status` = 'Active' ORDER BY `sequence_number` ASC LIMIT 1";
            $res2 = mysqli_query($conn, $select);
            if (!$res2) {
              $response = array(
                'success' => false,
                'message' => 'Unable to fetch data from [tpc_main_tbl] func(handleGetBachProcess), query => $select. Error :' . mysqli_error($conn)
              );
              return $response;
            } else {
              if (mysqli_num_rows($res2) > 0) {
                while ($row2 = mysqli_fetch_assoc($res2)) {
                  $status = $row2['tpc_sub_status'];
                  if ($status == 'Open') {
                    $response = array(
                      'success' => true,
                      'message' => 'Sub-Process is already Open!'
                    );
                    return $response;
                  } else if ($status == 'Done') {
                    $response = array(
                      'success' => true,
                      'message' => 'Sub-Process is already Done!'
                    );
                    return $response;
                  } else {
                      // CHECK IF THE PROCESS IS RF_MEASUREMENT
                      $get_rf = "SELECT * FROM `rf_measurement` WHERE `SubPid` = '{$row2['SubPid']}'";
                      $get_rf_result = mysqli_query($rf_conn, $get_rf);
                      if(!$get_rf_result){
                        $response = array(
                          'success' => false,
                          'message' => 'Unable to fetch data due to an error: ' .mysqli_error($rf_conn),
                          'sql' => $get_rf
                        );
                        return $response;
                        $rf_conn->close();
                      } else {
                        if(mysqli_num_rows($get_rf_result) > 0){
                            $get_rf_2 = "SELECT * FROM `rf_measurement` WHERE `SubPid` = '{$row2['SubPid']}' AND `lot_number` LIKE '{$row2['lot_number']}%'";
                            $get_rf_result_2 = mysqli_query($rf_conn, $get_rf_2);
                            if(!$get_rf_result_2){
                              $response = array(
                                'success' => false,
                                'message' => 'Unable to fetch data due to an error: ' .mysqli_error($rf_conn),
                                'sql' => $get_rf_2
                              );
                              return $response;
                              $rf_conn->close();
                            } else {
                              if(mysqli_num_rows($get_rf_result_2) > 0){
                                // $response = array(
                                //   'success' => true,
                                //   'sql' => $get_rf_2
                                // );
                                // return $response;
                                // $conn->close();
                                  $update_rf = "UPDATE `tpc_main_tbl` SET `tpc_sub_status` = 'Open' WHERE `assignment_id` = '{$row2['assignment_id']}' AND `sequence_number` > '{$row['sequence_number']}' AND `status` = 'Active' ORDER BY `sequence_number` ASC LIMIT 1";
                                  $update_rf_rs = mysqli_query($conn, $update_rf);
                                  if(!$update_rf_rs){
                                    $response = array(
                                      'success' => false,
                                      'message' => 'Unable to update data due to an error: ' .mysqli_error($conn),
                                      'sql' => $update_rf
                                    );
                                    return $response;
                                    $rf_conn->close();
                                  }else{
                                    $response = array(
                                      'success' => true,
                                      'data' => $data,
                                      'message' => 'Sub-Process is already opened!',
                                      'sql' => $update_rf,
                                      'update_rf' => true
                                    );
                                    return $response;
                                    $conn->close();
                                  }
                              }else{
                                    $exec = "UPDATE `tpc_main_tbl` SET `tpc_sub_status` = 'Open' WHERE `assignment_id` = '{$row['assignment_id']}' AND `sequence_number` > '{$row2['sequence_number']}' AND `status` = 'Active' ORDER BY `sequence_number` ASC LIMIT 1";
                                    $exec_res = mysqli_query($conn, $exec);
                                    if (!$exec_res) {
                                      $response = array(
                                        'success' => false,
                                        'message' => 'Unable to fetch data from [tpc_main_tbl] func(handleGetBatchProcess). Error => ' . mysqli_error($conn)
                                      );
                                      return $response;
                                      $conn->close();
                                    } else {
                                      $response = array(
                                        'success' => true,
                                        'data' => $data,
                                        'message' => 'Sub-Process is already opened!',
                                        'sql' => $exec,
                                        'exec' => true
                                      );
                                      return $response;
                                      $conn->close();
                                    }
                                    // $response = array(
                                    //   'success' => false,
                                    //   'sql' => $get_rf_2
                                    // );
                                    // return $response;
                                    // $conn->close();
                              }
                            }
                        } else {
                          $exec = "UPDATE `tpc_main_tbl` SET `tpc_sub_status` = 'Open' WHERE `assignment_id` = '{$row['assignment_id']}' AND `sequence_number` > '{$row['sequence_number']}' AND `status` = 'Active' ORDER BY `sequence_number` ASC LIMIT 1";
                          $exec_res = mysqli_query($conn, $exec);
                          if (!$exec_res) {
                            $response = array(
                              'success' => false,
                              'message' => 'Unable to fetch data from [tpc_main_tbl] func(handleGetBatchProcess). Error => ' . mysqli_error($conn)
                            );
                            return $response;
                            $conn->close();
                          } else {
                            $response = array(
                              'success' => true,
                              'data' => $data,
                              'message' => 'Sub-Process is already opened!'
                            );
                            return $response;
                            $conn->close();
                          }
                        }
                      }


                    // $exec = "UPDATE `tpc_main_tbl` SET `tpc_sub_status` = 'Open' WHERE `assignment_id` = '{$row['assignment_id']}' AND `sequence_number` > '{$row['sequence_number']}' AND `status` = 'Active' ORDER BY `sequence_number` ASC LIMIT 1";
                    // $exec_res = mysqli_query($conn, $exec);
                    // if (!$exec_res) {
                    //   $response = array(
                    //     'success' => false,
                    //     'message' => 'Unable to fetch data from [tpc_main_tbl] func(handleGetBatchProcess). Error => ' . mysqli_error($conn)
                    //   );
                    //   return $response;
                    //   $conn->close();
                    // } else {
                    //   $response = array(
                    //     'success' => true,
                    //     'data' => $data,
                    //     'message' => 'Sub-Process is already opened!'
                    //   );
                    //   return $response;
                    //   $conn->close();
                    // }
                  }
                }
              } else {
                $response = array(
                  'success' => true,
                  'message' => 'You are all good!'
                );
                return $response;
              }
            }
          }
        }
      } else {
        $response = array(
          'success' => false,
          'message' => 'No data found using the current parameters SubPid' . $SubPid . ' & assignment_id ' . $assignment_id
        );
        return $response;
        $conn->close();
      }
    }
  }
}

function handleGetConditions($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $conn2 = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $assignment_id = $getData['assignment_id'];
  $SubPid = $getData['SubPid'];
  if (!$conn && !$conn2) {
    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the server, please contact IT/SD for more information. Error => '
    );
    return $response;
  } else {
    $sql = "SELECT t1.assignment_id, t1.SubPid, t1.tpc_sub_status, t2.SubPname FROM `tpc_main_tbl` t1 INNER JOIN tpc_dbs.`setup_sub_process_tbl` t2 ON t1.SubPid = t2.SubPid WHERE t1.assignment_id = '$assignment_id' AND t1.tpc_sub_status = 'Done'";
    $res = mysqli_query($conn2, $sql);
    if (!$res) {
      $response = array(
        'success' => false,
        'message' => 'Unable to fetch data [handleGetConditions] func($sql). Error => ' . mysqli_error($conn2)
      );
      return $response;
      $conn2->close();
    } else {
      if (mysqli_num_rows($res) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($res)) {
          $data[] = $row;
          $response = array(
            'success' => true,
            'data' => $data
          );
        }
        return $response;
        $conn2->close();
      }
    }
  }
}

function handleGetOtherConditions($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $assignment_id = $getData['assignment_id'];
  $SubPid = $getData['SubPid'];
  $operator_number = $getData['operator_number'];
  if (!$conn) {
    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the server, please contact IT/SD for more information. Error => '
    );
    return $response;
  } else {
    $sql = "SELECT * FROM `tpc_condition_tbl` WHERE `assignment_id` = '$assignment_id' AND `SubPid` = '$SubPid' AND `operator_number` = '$operator_number' ORDER BY `tpc_condition_tbl`.`sequence_number` ASC";
    $res = mysqli_query($conn, $sql);
    if (!$res) {
      $response = array(
        'success' => false,
        'message' => 'Unable to fetch data [handleGetOtherConditions] func($sql). Error => ' . mysqli_error($conn)
      );
      return $response;
      $conn->close();
    } else {
      if (mysqli_num_rows($res) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($res)) {
          $data[] = $row;
          $response = array(
            'success' => true,
            'data' => $data
          );
        }
        return $response;
        $conn->close();
      }
    }
  }
};
function handleGetOperators($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $SubPid = $getData['SubPid'];
  $assignment_id = $getData['assignment_id'];
  if (!$conn) {
    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the server, please contact IT/SD for more information.'
    );
    return $response;
  } else {
    $sql = "SELECT operator_number FROM `batch_process_operator_tbl` WHERE `SubPid` = '$SubPid' AND `assignment_id` = '$assignment_id'";
    $res = mysqli_query($conn, $sql);
    if (!$res) {
      $response = array(
        'success' => false,
        'message' => 'Unable to fech data [handleGetConditions] func($sql). Error => ' . mysqli_error($conn)
      );
      return $response;
      $conn->close();
    } else {
      if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
          $response = array(
            'success' => true,
            'operator_number' => $row['operator_number']
          );
        }
        return $response;
        $conn2->close();
      }
    }
  }
}

function  handleSpecialInstruction($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $SubPid = $getData['SubPid'];
  $parts_number = $getData['parts_number'];
  $item_code = $getData['item_code'];
  $revision_number = $getData['revision_number'];
  $lot_number = $getData['lot_number'];
  $sql = "SELECT * FROM `form_special_instruction_tbl` WHERE `SubPid` = '$SubPid' AND `lot_number` = '$lot_number' AND `item_parts_number` = '$parts_number' AND `item_code` = '$item_code' AND `revision_number` = '$revision_number'";
  $res = mysqli_query($conn, $sql);
  if (!$conn) {
    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the server, please contact IT/SD for more information.'
    );
    return $response;
  } else {
    if (!$res) {
      $response = array(
        'success' => false,
        'message' => 'Unable to fetch data from `form_special_instruction_tbl` [handleSpecialInstruction], error => ' . mysqli_error($conn)
      );
      return $response;
      $conn->close();
    } else {
      if (mysqli_num_rows($res) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($res)) {
          $data[] = $row;
          $response = array(
            'success' => true,
            'data' => $data
          );
        }
        return $response;
        $conn->close();
      } else {
        $data[] = 0;
        $response = array(
          'success' => false,
          'data' => $data,
          'message' => 'Theres no data found using the current parameters being fetched!',
          'params' => "SELECT * FROM `form_special_instruction_tbl` WHERE `SubPid` = '$SubPid' AND `lot_number` = '$lot_number' AND `item_parts_number` = '$parts_number' AND `item_code` = '$item_code' AND `revision_number` = '$revision_number'"
        );
        return $response;
        $conn->close();
      }
    }
  }
}

function handleGetIotData($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $SubPid = $getData['SubPid'];
  $sql = "SELECT * FROM `setup_process_detail_items_tbl` WHERE `SubPid` = '$SubPid' ORDER BY `item_id` DESC";
  $res = mysqli_query($conn, $sql);
  if (!$conn) {
    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the server, please contact IT/SD for more information!'
    );
    return $response;
  } else {
    if (!$res) {
      $response = array(
        'success' => false,
        'message' => 'An error occured while fetching data from the database. Error ' . mysqli_error($conn)
      );
      return $response;
      $conn->close();
    } else {
      if (mysqli_num_rows($res) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($res)) {
          $data[] = $row;
          $response = array(
            'success' => true,
            'data' => $data
          );
        }
        return $response;
        $conn->close();
      } else {
        $response = array(
          'success' => false,
          'message' => 'Theres no data found using the current parameters',
          'params' => $sql
        );
        return $response;
        $conn->close();
      }
    }
  }
}

function handleGetIOT($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($postData['server'], $postData['username'], $postData['password'], $postData['database_name']);
  $table_name = $postData['table_name'];
  $fieldname_1 = $postData['fieldname_1'];
  $fieldname_2 = $postData['fieldname_2'];
  $fieldname_3 = $postData['fieldname_3'];
  $fieldname_4 = $postData['fieldname_4'];
  $fieldname_5 = $postData['fieldname_5'];
  $output_fieldname = $postData['output_fieldname'];

  $field_1 = explode("|", $fieldname_1);
  $field_2 = explode("|", $fieldname_2);
  $field_3 = explode("|", $fieldname_3);
  $field_4 = explode("|", $fieldname_4);
  $field_5 = explode("|", $fieldname_5);


  // foreach ($postData as $key => $value) {
  //   $pattern = '/' . $key . '/';

  //   if ($field_1[0] === 'PotNo') {
  //     $response = array(
  //       'success' => true,
  //       'data' => $field_1[1]
  //     );
  //     return $response;
  //   }
  //   if ($field_2[0] === 'PotNo') {
  //     $response = array(
  //       'success' => true,
  //       'data' => $field_2[1]
  //     );
  //     return $response;
  //   }
  //   if ($field_3[0] === 'PotNo') {
  //     $response = array(
  //       'success' => true,
  //       'data' => $field_3[1]
  //     );
  //     return $response;
  //   }
  //   if ($field_4[0] === 'PotNo') {
  //     $response = array(
  //       'success' => true,
  //       'data' => $field_4[1]
  //     );
  //     return $response;
  //   }
  //   if ($field_5[0] === 'PotNo') {
  //     $response = array(
  //       'success' => true,
  //       'data' => $field_5[1]
  //     );
  //     return $response;
  //   }
  // }

  if (!$conn) {
    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the server, please contact IT/SD for more information!'
    );
    return $response;
  } else {
    // $sql = "SELECT `$output_fieldname` FROM `$table_name` WHERE `$field_1[0]` = '$field_1[1]' AND   `$field_2[0]` = '$field_2[1]' AND `$field_3[0]` = '$field_3[1]' AND `$field_4[0]` = '$field_4[1]' AND `$field_5[0]` = '$field_5[1]' ORDER BY `No` DESC LIMIT 1";
    // $sql = "SELECT `$output_fieldname` FROM `$table_name` WHERE `$field_1[0]` = '$param_1' AND `$field_2[0]` = '$param_2' ORDER BY `No` DESC LIMIT 1";
    $sql = "SELECT `$output_fieldname` FROM `$table_name` WHERE 1";
    foreach ($postData as $key => $value) {
      $pattern = '/' . $value  . '/';
      // if ($field_1[0] == 'PartsNo') {
      //   $response = array(
      //     '$field_1[0]' => $field_1[0],
      //     'value' => $value,
      //     'postData' => $postData,
      //     'partsno' => 'HKTWC50000-6 (' . $postData['k_value_level'] . ')'
      //   );
      // } else {
      //   $response = array(
      //     '$field_1[0]' => $field_1[0],
      //     'value' => false,
      //     'postData' => $postData
      //   );
      // }

      // $pattern = '/' . $key . '/';
      if (!empty($fieldname_1) || $fieldname_1 !== "") {
        if (preg_match($pattern, $field_1[1])) {
          if ($field_1[1] === 'item_parts_number' && $postData['k_value_level']) {
            $param_1 = $postData[$field_1[1]] . ' (' . $postData['k_value_level'] . ')';
          } else {
            $param_1 = $postData[$field_1[1]];
          }
          $sql .= " AND `$field_1[0]` = '$param_1'";
        } else {
          if ($param_1[0] === 'PotNo' && !empty($field_1[1])) {
            $param_1 = $param_1[1];
          } else {
            $param_1 = $postData[$field_1[1]];
          }
          if ($field_1[1] === 'item_parts_number' && $postData['k_value_level']) {
            $param_1 = $postData[$field_1[1]] . ' (' . $postData['k_value_level'] . ')';
          }
          $sql .= " AND `$field_1[0]` = '$param_1'";
          $response = array(
            'success' => true,
            'field_name' => $fieldname_1,
            'PotNo' => $param_1,
            'param' => '$param_1',
            'postData' => $postData,
            'params' => $sql
          );
        }
      }
      if (!empty($fieldname_2) || $fieldname_2 !== "") {
        if (preg_match($pattern, $field_2[1])) {
          if ($field_2[1] === 'item_parts_number' && $postData['k_value_level']) {
            $param_2 = $postData[$field_2[1]] . ' (' . $postData['k_value_level'] . ')';
          } else {
            $param_2 = $postData[$field_2[1]];
          }
          $sql .= " AND `$field_2[0]` = '$param_2'";
        } else {
          if ($field_2[0] === 'PotNo' && !empty($field_2[1])) {
            $param_2 = $field_2[1];
          } else {
            $param_2 = $postData[$field_2[1]];
          }
          if ($field_2[1] === 'item_parts_number' && $postData['k_value_level']) {
            $param_2 = $postData[$field_2[1]] . ' (' . $postData['k_value_level'] . ')';
          }
          $sql .= " AND `$field_2[0]` = '$param_2'";
          $response = array(
            'success' => true,
            'field_name' => $fieldname_2,
            'PotNo' => $param_2,
            'param' => '$param_2',
            'postData' => $postData,
            'params' => $sql
          );
        }
      }
      if (!empty($fieldname_3) || $fieldname_3 !== "") {
        if (preg_match($pattern, $field_3[1])) {
          if ($field_3[1] === 'item_parts_number' && $postData['k_value_level']) {
            $param_3 = $postData[$field_3[1]] . ' (' . $postData['k_value_level'] . ')';
          } else {
            $param_3 = $postData[$field_3[1]];
          }
          $sql .= " AND `$field_3[0]` = '$param_3'";
          $response = array(
            'success' => true,
            'param' => $sql
          );
        } else {
          if ($field_3[0] === 'PotNo' && !empty($field_3[1])) {
            $param_3 = $field_3[1];
          } else if ($field_3[1] === 'item_parts_number' && $postData['k_value_level']) {
            $param_3 = $postData[$field_3[1]] . ' (' . $postData['k_value_level'] . ')';
          } else {
            $param_3 = $postData[$field_3[1]];
          }
          $sql .= " AND `$field_3[0]` = '$param_3'";
          $response = array(
            'success' => true,
            'field_name' => $fieldname_3,
            'PotNo' => $param_3,
            'param' => '$param_3',
            'postData' => $postData,
            'params' => $sql
          );
          // return $response;
        }
      }
      if (!empty($fieldname_4) || $fieldname_4 !== "") {
        if (preg_match($pattern, $field_4[1])) {
          if ($field_4[1] === 'item_parts_number' && $postData['k_value_level']) {
            $param_4 = $postData[$field_4[1]] . ' (' . $postData['k_value_level'] . ')';
          } else {
            $param_4 = $postData[$field_4[1]];
          }
          $sql .= " AND `$field_4[0]` = '$param_4'";
        } else {
          if ($field_4[0] === 'PotNo' && !empty($field_4[1])) {
            $param_4 = $field_4[1];
          } else if ($field_4[1] === 'item_parts_number' && $postData['k_value_level']) {
            $param_4 = $postData[$field_4[1]] . ' (' . $postData['k_value_level'] . ')';
          } else {
            $param_4 = $postData[$field_4[1]];
          }
          $sql .= " AND `$field_4[0]` = '$param_4'";
          $response = array(
            'success' => true,
            'field_name' => $fieldname_4,
            'PotNo' => $param_4,
            'param' => '$param_4',
            'postData' => $postData,
            'params' => $sql
          );
        }
      }
      if (!empty($fieldname_5) || $fieldname_5 !== "") {
        if (preg_match($pattern, $field_5[1])) {
          if ($field_5[1] === 'item_parts_number' && $postData['k_value_level']) {
            $param_5 = $postData[$field_5[1]] . ' (' . $postData['k_value_level'] . ')';
          } else {
            $param_5 = $postData[$field_5[1]];
          }
          $sql .= " AND `$field_5[0]` = '$param_5'";
        } else {
          if ($field_5[0] === 'PotNo' && !empty($field_5[1])) {
            $param_5 = $field_5[1];
          } else if ($field_5[1] === 'item_parts_number' && $postData['k_value_level']) {
            $param_5 = $postData[$field_5[1]] . ' (' . $postData['k_value_level'] . ')';
          } else {
            $param_5 = $postData[$field_5[1]];
          }
          $sql .= " AND `$field_5[0]` = '$param_5'";
          $response = array(
            'success' => true,
            'field_name' => $fieldname_5,
            'PotNo' => $param_5,
            'param' => '$param_5',
            'postData' => $postData,
            'params' => $sql
          );
        }
      }
      $sql .= " ORDER BY `No` DESC LIMIT 1";
      $res = mysqli_query($conn, $sql);
      if (!$res) {
        $response = array(
          'success' => false,
          'message' => 'An error occured while fetching data from the database, error =>' . mysqli_error($conn),
          'params' => $sql
        );
        return $response;
        $conn->close();
      } else {
        if (mysqli_num_rows($res) > 0) {
          $data = array();
          while ($row = mysqli_fetch_assoc($res)) {
            $data[] = $row;
            $response = array(
              'success' => true,
              'data' => $data,
              'params' => $sql,
              'description' => $postData['detail_description'],
              '$field_1' => $field_1,
              '$field_2' => $field_2,
              '$field_3' => $field_3,
              '$field_4' => $field_4,
              '$field_5' => $field_5,
              'k_value_lvl' => $postData['k_value_level'],
              'pattern' => $pattern,
              'field_type' => $field_3[1]
            );
          }
          return $response;
          $conn->close();
        } else {
          $response = array(
            'success' => false,
            'message' => 'Theres no data found using the current parameters!',
            'param' => $sql,
            'description' => $postData['detail_description'],
            '$field_1' => $field_1,
            '$field_2' => $field_2,
            '$field_3' => $field_3,
            '$field_4' => $field_4,
            '$field_5' => $field_5,
            'k_value_lvl' => $postData['k_value_level'],
            'pattern' => $pattern,
            'field' => $field_3[1]
          );
          return $response;
          $conn->close();
        }
      }
    }
  }
}

function handleGetIcData($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development2['server'], $development2['username'], $development2['password'], $sid_documentcontrol_db);
  $parts_number = $getData['parts_number'];
  if (!$conn) {
    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the server, please contact Michael Villanueva IT/SD for more information Local Number:[222]'
    );
    return $response;
  } else {
    $sql = "SELECT t1.doc_drir_number, t1.doc_document_number, t2.doc_actual_directory_distribution, t3.doc_drir_number, t3.doc_document_title FROM `doc_external_document_details` t1 LEFT JOIN `doc_external_document_primary_file` t2 ON t1.doc_drir_number = t2.doc_drir_number LEFT JOIN `doc_external_document` t3 ON t1.doc_drir_number = t3.doc_drir_number WHERE t1.doc_parts_number = '$parts_number' AND t3.doc_inspection_criteria = '1' ";
    $res = mysqli_query($conn, $sql);
    if (!$res) {
      $response = array(
        'success' => false,
        'message' => 'Unable to fetch data due to an error: ' . mysqli_error($conn)
      );
      return $response;
      $conn->close();
    } else {
      if (mysqli_num_rows($res) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($res)) {
          $data[] = $row;
          $response = array(
            'success' => true,
            'data' => $data
          );
        }
        return $response;
        $conn->close();
      } else {
        $response = array(
          'success' => false,
          'message' => 'Theres no data being fetched using the current parameters',
          'param' => $sql
        );
        return $response;
        $conn->close();
      }
    }
  }
}

function handleGetHeader2($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development3['server'], $development3['username'], $development3['password'], $std_main);
  $auLotNumber = $getData['auLotNumber'];
  $wafer_number_from = $getData['wafer_number_from'];
  $wafer_number_to = $getData['wafer_number_to'];
  $results = array();
  $foundData = false;
  for ($x = $wafer_number_from; $x <= $wafer_number_to; $x++) {
    $formattedX = str_pad($x, 2, '0', STR_PAD_LEFT);

    $sql = "SELECT std_main.std_pc_inputDate, std_main_sub.main_id, std_main_sub.main_sub_id, std_main.std_k_value, 
                   std_main.std_material_lot_number, std_main_sub.std_lotnumber, 
                   std_main.std_actual_kvalue, std_main_sub.std_applied_order, 
                   std_main_sub.std_polishing_lot_number, std_main_sub.std_actual_thickness, 
                   std_main_sub.std_surface, std_main_sub.std_swp_metallized_lot_number, 
                   std_main_sub.std_swp_metallized_partsnumber, 
                   std_main_sub.std_polishing_swr_sli_ref_number, 
                   std_main_sub.std_actual_thickness_tolerance 
            FROM std_main 
            INNER JOIN std_main_sub ON std_main.main_id = std_main_sub.main_id 
            WHERE std_main_sub.std_swp_metallized_lot_number = ? 
            ORDER BY std_main_sub.std_swp_metallized_lot_number ASC 
            LIMIT 10";

    if ($stmt = $conn->prepare($sql)) {
      $param = $auLotNumber . '-' . $formattedX;
      $stmt->bind_param('s', $param);

      $stmt->execute();

      $result = $stmt->get_result();

      if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
          $results[] = $row;
        }
        $foundData = true;
      }

      $stmt->close();
    }
  }

  if ($foundData) {
    $response = array(
      'success' => true,
      'data' => $results,
      'param' => $auLotNumber
    );
  } else {
    $response = array(
      'success' => false,
      'message' => 'There\'s no data fetched using the current parameters',
      'param' => $sql
    );
  }

  $conn->close();
  return $response;
}

function handleGetTanLot($getData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development3['server'], $development3['username'], $development3['password'], $ccp_swp);
  if (!$conn) {
    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the database, please contact IT/SD for more information.'
    );
    return $response;
  } else {
    $parts_number = $getData['parts_number'];
    $pcard_lot_number = $getData['pcard_lot_number'];
    $sql = "SELECT t2.tan_lot_number FROM `swp_pcard_main` t1 LEFT JOIN `swp_wip_input_plan` t2 ON t1.pcard_id_main = t2.pcard_id WHERE t1.`pcard_partsnumber` = '$parts_number' AND t1.`pcard_lot_number` = '$pcard_lot_number' ORDER BY t1.pcard_id_main DESC LIMIT 1";
    $res = mysqli_query($conn, $sql);

    if (mysqli_num_rows($res) > 0) {
      $data = array();
      while ($row = mysqli_fetch_assoc($res)) {
        $data[] = $row;
        $response = array(
          'success' => true,
          'data' => $data
        );
      }
      return $response;
      $conn->close();
    } else {
      $response = array(
        'success' => false,
        'message' => 'Unable to get data, error =>' . mysqli_error($conn)
      );
      return $response;
      $conn->close();
    }
  }
}


function handleUpdateGoogleDriveID($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $goole_drive_id = $postData['goole_drive_id'];
  $form_attachment_id = $postData['form_attachment_id'];

  $sql = "UPDATE `form_attachment_tbl` SET `google_drive_id` = '$goole_drive_id' WHERE `form_attachment_id` = '$form_attachment_id'";
  $res = mysqli_query($conn, $sql);
  if (!$res) {
    $response = array(
      'success' => false,
      'message' => 'Unable to update data due to an error: ' . mysqli_error($conn)
    );
    return $response;
    $conn->close();
  } else {
    $response = array(
      'success' => true,
      'message' => 'Updating google_drive_id has been successfully executed!'
    );
    return $response;
    $conn->close();
  }
}

function handleGetSKHeader($getData)
{
  require '../config/config.php';
  require '../config/conn.php';

  $conn = mysqli_connect($development3['server'], $development3['username'], $development3['password'], $ccp_management_database);

  if (!$conn) {

    $response = array(
      'success' => false,
      'message' => 'An error occured while connecting to the server, please contact IT/SD for more information.'
    );
    return $response;
  } else {

    $sk_ln = $getData['sk_ln'];
    $sk_pn = $getData['sk_pn'];
    $wafer_number_to = $getData['wafer_number_to'];
    $wafer_number_from = $getData['wafer_number_from'];
    $success = false;
    $data = array();

    for ($x = $wafer_number_from; $x <= $wafer_number_to; $x++) {
      $formattedX = str_pad($x, 2, '0', STR_PAD_LEFT);

      $new_sk_ln = $sk_ln . "-" . $formattedX;

      $sql = "SELECT t1.`metallized_ln`, t1.`sk_ln`, t1.`sk_pn`, t3.`k_val` FROM `management_main` t1 
      LEFT JOIN `mw_information` t2 ON ( t2.`management_id` = t1.`management_id` )
      LEFT JOIN `mw_information_first_wafer_measurement_data` t3 ON (t3.`mw_information_id` = t2.`mw_information_id` )
      WHERE t1.`sk_ln` LIKE '$new_sk_ln%' AND t1.`sk_pn` LIKE '$sk_pn%' AND t1.`mils` = '6' ORDER BY t1.`sk_ln` ASC";

      $result = mysqli_query($conn, $sql);
      if (!$result) {
        $response = array(
          'success' => false,
          'message' => 'Unable to fetch data due to an error: ' . mysqli_error($conn)
        );
        return $response;
        $conn->close();
      } else {
        if (mysqli_num_rows($result) > 0) {
          while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
          }
          $success = true;
        } else {
          $success = false;
        }
      }
    }
    if ($success) {
      $response = array(
        'success' => true,
        'data' => $data,
        'param' => $sql
      );
    } else {
      $response = array(
        'success' => false,
        'message' => 'No data found! ',
        'data' => $data,
        'param' => $sql
      );
    }
    return $response;
    $conn->close();
  }
}


// GET CONNECTION
function getCurrentTimestamp() {
  return date('Y-m-d H:i:s'); 
}
// // Deploy
// $connection = array(
//   'server' => '172.16.2.16',
//   'username' => 'sdroot',
//   'password' => 'cmisd032018',
//   'tpc_dbs' => 'tpc_dbs'
// );

// local
$connection = array(
    'server' => 'localhost',
    'username' => 'root',
    'password' => '',
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
    
    $main_conn->close();
    return $response;
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_POST['saveItems'])) {
    $postItemsData = $_POST;
    $responseData = saveItemConditionsData($postItemsData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['doneProcess'])) {
    $postData = $_POST;
    $responseData = doneProcess($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['saveButtonClicked'])) {
    $postData = $_POST;
    $responseData = handlesaveButton($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['updateRemarks'])) {
    $postData = $_POST;
    $responseData = handleUpdateRemarks($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['getSubProcess'])) {
    $postData = $_POST;
    $responseData = handleGetSubProcess($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  }
  // else if (isset($_POST['upload'])) {
  //   $postData = $_POST;
  //   $responseData = handleUploadFile($postData);
  //   header('Content-Type: application/json');
  //   echo json_encode($responseData);
  // }
  else if (isset($_POST['get_iot'])) {
    $postData = $_POST;
    $responseData = handleGetIOT($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['updateData'])) {
    $postData = $_POST;
    $responseData = handleUpdateGoogleDriveID($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  }
}





if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (isset($_GET['getHeader2'])) {
    $getData = $_GET;
    $responseData = handleGetHeader2($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['QrSubmitBtn'])) {
    $getData = $_GET;
    $responseData = handleScanQRRequest($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['btn_process'])) {
    $getData = $_GET;
    $result = handleSideBarRequest($getData);
    header('Content-Type: application/json');
    echo json_encode($result);
  } else if (isset($_GET['tableClicked'])) {
    $getData = $_GET;
    $responseData = handleTableClicked($getData);
    header('Content-Type: application/json');
    $json = json_encode($responseData);
    if ($json === false) {
      // Encoding failed
      // echo $error_code = json_last_error();
      // echo $error_msg = json_last_error_msg();
      $utf8_encoded_data = mb_convert_encoding($responseData, 'UTF-8', 'UTF-8');
      // Handle the error
      echo json_encode($utf8_encoded_data);
    } else {
      echo json_encode($responseData);
    }
  } else if (isset($_GET['attached'])) {
    $getData = $_GET;
    $responseData = handleAttachments($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['getYield'])) {
    $getData = $_GET;
    $responseData = handleGetYield($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['get_batched'])) {
    $getData = $_GET;
    $responseData = handleGetBatch($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['get_batched_process'])) {
    $getData = $_GET;
    $responseData = handleGetBatchProcess($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['get_conditions'])) {
    $getData = $_GET;
    $responseData = handleGetConditions($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['get_other_conditions'])) {
    $getData = $_GET;
    $responseData = handleGetOtherConditions($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['get_operators'])) {
    $getData = $_GET;
    $responseData = handleGetOperators($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['get_special_instruction'])) {
    $getData = $_GET;
    $responseData = handleSpecialInstruction($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['get_iot_data'])) {
    $getData = $_GET;
    $responseData = handleGetIotData($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['get_ic_data'])) {
    $getData = $_GET;
    $responseData = handleGetIcData($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['getHeader'])) {
    $getData = $_GET;
    $responseData = handleGetHeader($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['get_tan_lot'])) {
    $getData = $_GET;
    $responseData = handleGetTanLot($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_GET['getSKHeader'])) {
    $getData = $_GET;
    $responseData = handleGetSKHeader($getData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  }

  // GET CONNECTION
    if(isset($_GET['reconnect'])){
      $getData = $_GET;
      $responseData = createConnection($getData, $connection);
      header('Content-Type: application/json');
      echo json_encode($responseData);
  }
}
