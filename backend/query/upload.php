<?php
error_reporting();
session_start();
require '../config/config.php';
require '../config/conn.php';
$tpc_dbs_connection = mysqli_connect($development['server'], $development['username'], $development['password'], $tpc_dbs);

if (isset($_POST['uploadFileBtn'])) {
    if (($_FILES['selectFile']['name'] != "")) {
        // $target_dir = "//172.16.2.61/Data/4haloween/";
        $assignment_id = $_POST['assignment_id_file'];
        $lot_number = $_POST['lot_number_file'];
        $parts_number = $_POST['parts_number_file'];
        $item_code = $_POST['item_code_file'];
        $revision_number = $_POST['revision_number_file'];
        $operator_id = $_POST['operatorId'];
        $file_name = $_POST['file_name'];
        $SubPid = $_POST['subProcess'];
        $remarks = $_POST['remarks'];
        $target_dir = "//172.16.2.13/htdocs/TPC-endpoint/uploads/";
        $file = $_FILES['selectFile']['name'];
        $path = pathinfo($file);
        $filename = $path['filename'];
        $ext = $path['extension'];
        $temp_name = $_FILES['selectFile']['tmp_name'];
        $path_filename_ext = $target_dir . $file_name . "." . $ext;
        $file_direc = "https://172.16.2.13/TPC-endpoint/uploads/" . $file_name . "." . $ext;
        $sql = "INSERT INTO `form_attachment_tbl` (`SubPid`, `assignment_id`, `lot_number`, `item_parts_number`, `item_code`, `revision_number`, `assignment_status`, `card_number`, `actual_file_directory`, `file_name`, `attachment_remarks`, `id_number`) VALUES ('$SubPid','$assignment_id', '$lot_number', '$parts_number', '$item_code', '$revision_number', 'Posted', '0', '$file_direc', '$file_name', '$remarks', '$operator_id')";
        $res = mysqli_query($tpc_dbs_connection, $sql);
        if (!$res) {
            die('Unable to execute query') . mysqli_error($tpc_dbs_connection);
        } else {
            if (file_exists($path_filename_ext)) {
                $_SESSION['upload_info'] = "Sorry, file already exists!";
                header("Location: https://172.16.2.61/tpc_ver2/main.php");
                exit();
            } else {
                if (move_uploaded_file($temp_name, $path_filename_ext)) {
                    $_SESSION['upload_info'] = "Congratulations! File Uploaded Successfully.";
                    header("Location: https://172.16.2.61/tpc_ver2/main.php");
                    exit();
                } else {
                    $_SESSION['upload_info'] = "Unable to upload file!";
                    header("Location: https://172.16.2.61/tpc_ver2/main.php");
                    exit();
                }
            }
        }
    }
}

// $homepage = file_get_contents('//172.16.2.13/htdocs/TPC-endpoint/uploads/sample_file.xlsx');
// echo $homepage;

// $filename = 'example.xlsx';
// $filepath = '//172.16.2.13/htdocs/TPC-endpoint/uploads/sample_file.xlsx';

// // Open the file in a new window
// echo '<script>window.open("' . $filepath . '", "_blank");</script>';

// exit;

// $filename = 'example.xlsx';
// $filepath = '\\172.16.2.13\htdocs\TPC-endpoint\uploads\sample_file.xlsx';

// // Redirect to the file
// header('Location: ' . $filepath);
// exit;


// Set the filename and path
// $filename = 'sample_file2.xlsx';
// $filepath = '\\172.16.2.13\htdocs\TPC-endpoint\uploads\sample_file.xlsx';

// // Open the file for reading
// $file = fopen($filepath, 'rb');

// // Output the file contents to the browser
// header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
// header('Content-Disposition: attachment;filename="' . $filename . '"');
// header('Cache-Control: max-age=0');

// while (!feof($file)) {
//     echo fread($file, 8192);
// }

// //   // Close the file
// //   fclose($file);

// //   // Delete the file
// //   unlink($filepath);

// exit;
