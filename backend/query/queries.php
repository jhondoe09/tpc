<?php
$GLOBALS['conn'] =  require_once '../config/conn.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

function handleScanQRRequest($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $item_code = $postData['item_code'];
  $parts_number = $postData['parts_number'];
  $lot_number = $postData['lot_number'];
  $date_issued = $postData['date_issued'];
  $revision_number = $postData['revision_number'];
  $assignment_id = $postData['assignment_id'];

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

function handleAttachments($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $SubPid = $postData['subPid'];
  $assID = $postData['assignment_id'];
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $sql = "SELECT * FROM `form_attachment_tbl` WHERE `SubPid` = '$SubPid' AND `assignment_id` = '$assID'";
  $result = mysqli_query($tpc_dbs_connection, $sql);
  if (!$result) {
    $error = mysqli_error($tpc_dbs_connection);
    $response = array(
      'success' => false,
      'message' => "Query failed: '$error'"
    );
    return $response;
    mysqli_close($tpc_dbs_connection);
    exit;
  }
  // Fetch the resultsnote
  if (mysqli_num_rows($result) > 0) {
    $attachData = array();
    while ($row = mysqli_fetch_assoc($result)) {
      // Do something with the results
      $attachData[] = $row;
    }
  } else {
    $attachData[] = 0;
  }
  return $attachData;
  // Close the connections
  // mysqli_close($cwp_dbs_connection);
  mysqli_close($tpc_dbs_connection);
}

function handleSideBarRequest($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_prod_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $subPid = $postData['subPid'];
  $itemPartsNumber = $postData['itemPartsNumber'];
  $itemCode = $postData['itemCode'];
  $revisionNumber = $postData['revisionNumber'];
  $lotNumber = $postData['lotNumber'];
  $assignId = $postData['assignId'];
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


function handleTableClicked($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $tpc_prod_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $id_number = $postData['idNumber'];
  $sub_pid = $postData['subPid'];
  $item_parts_number = $postData['itemPartsNumber'];
  $item_code = $postData['itemCode'];
  $revision_number = $postData['revisionNumber'];
  $lot_number = $postData['lotNumber'];
  $assign_id = $postData['assignId'];
  $operator_number = $postData['operator_number'];
  $batch_number = $postData['batch_number'];
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
              $execute = "INSERT INTO `tpc_condition_tbl` (`assignment_id`, `section_id`, `SubPid`, `item_parts_number`, `item_code`, `revision_number`, `lot_number`, `id_number`, `operator_number`, `sequence_number`, `field_type`, `wafer_start`, `wafer_end`, `condition_description`, `actual_value`, `target_value`, `minimum_value`, `maximum_value`, `option_value`, `with_judgement`, `condition_judgement`, `batch_id`) VALUES ('$assignment_id', '$section_id' , '$sub_pid', '$parts_number', '$item_code', '$revision_number', '$lot_number', '$id_no', '$batch_operator_number', '$sequence_no', '$field_type', '$wafer_start', '$wafer_end', '$condition', '$actual_value', '$target_value', '$min_value', '$max_value', '$option_value', '$with_judgement', '$judgement', '$batch_number')";
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

function handleGetYield($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $sub_pid = $postData['SubPid'];
  $assignment_id = $postData['assignment_id'];
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

function handleGetHeader($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $assignment_id = $postData['assignment_id'];
  $section = $postData['section'];

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

function handleGetBatch($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $SubPid = $postData['SubPid'];
  $batch_number = $postData['batch_number'];
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

function handleGetBatchProcess($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $SubPid = $postData['SubPid'];
  $assignment_id = $postData['assignment_id'];
  if (!$conn) {
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

function handleGetConditions($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $conn2 = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $assignment_id = $postData['assignment_id'];
  $SubPid = $postData['SubPid'];
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

function handleGetOtherConditions($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_prod_dbs);
  $assignment_id = $postData['assignment_id'];
  $SubPid = $postData['SubPid'];
  $operator_number = $postData['operator_number'];
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
}

function handleGetOperators($postData)
{
  require '../config/config.php';
  require '../config/conn.php';
  $conn = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);
  $SubPid = $postData['SubPid'];
  $assignment_id = $postData['assignment_id'];
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



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_POST['btn_process'])) {
    $postData = $_POST;
    $result = handleSideBarRequest($postData);
    header('Content-Type: application/json');
    echo json_encode($result);
  } else if (isset($_POST['QrSubmitBtn'])) {
    $postData = $_POST;
    $responseData = handleScanQRRequest($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['saveItems'])) {
    $postItemsData = $_POST;
    $responseData = saveItemConditionsData($postItemsData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['doneProcess'])) {
    $postData = $_POST;
    $responseData = doneProcess($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['attached'])) {
    $postData = $_POST;
    $responseData = handleAttachments($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['tableClicked'])) {
    $postData = $_POST;
    $responseData = handleTableClicked($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['saveButtonClicked'])) {
    $postData = $_POST;
    $responseData = handlesaveButton($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['getYield'])) {
    $postData = $_POST;
    $responseData = handleGetYield($postData);
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
  else if (isset($_POST['getHeader'])) {
    $postData = $_POST;
    $responseData = handleGetHeader($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['get_batched'])) {
    $postData = $_POST;
    $responseData = handleGetBatch($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['get_batched_process'])) {
    $postData = $_POST;
    $responseData = handleGetBatchProcess($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['get_conditions'])) {
    $postData = $_POST;
    $responseData = handleGetConditions($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['get_other_conditions'])) {
    $postData = $_POST;
    $responseData = handleGetOtherConditions($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  } else if (isset($_POST['get_operators'])) {
    $postData = $_POST;
    $responseData = handleGetOperators($postData);
    header('Content-Type: application/json');
    echo json_encode($responseData);
  }
}
