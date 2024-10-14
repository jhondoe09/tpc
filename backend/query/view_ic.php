<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// $pdf_path = '\\\172.16.2.16\SID_Documents\Document Control\Distribution\External\DISTR_RO-TCI-WSDC-0001AJFI-0-Sample External Document - 121623- For Deletion.pdf';

// header("Content-type: application/pdf");
// header("Content-Disposition: inline; filename='document.pdf'");
// header("Content-Length: " . filesize($pdf_path));


// readfile($pdf_path);


// function handleGetIc($postData)
// {
//     session_start();
//     $pdf_path = '\\\172.16.2.16\SID_Documents\Document Control\Distribution\External\DISTR_RO-TCI-WSDC-0001AJFI-0-Sample External Document - 121623- For Deletion.pdf';
//     $mod_path = $pdf_path;
//     $_SESSION['pdf_path'] = $mod_path;

//     header("Content-type: application/pdf");
//     header("Content-Disposition: inline; filename='document.pdf'");
//     header("Content-Length: " . filesize($pdf_path));

//     readfile($mod_path);

//     $response = array(
//         'success' => true,
//         'path' => readfile($mod_path)
//     );
//     return $response;
// }


// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     if (isset($_POST['view_ic_button'])) {
//         $postData = $_POST;
//         $result = handleGetIc($postData);
//         header('Content-Type: application/json');
//         echo json_encode($result);
//     }
// }


// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     if (isset($_POST['view_ic_button'])) {
//         $pdf_path = $_POST['path'];

//         header("Content-type: application/pdf");
//         header("Content-Disposition: inline; filename='document.pdf'");
//         header("Content-Length: " . filesize($pdf_path));


//         readfile($pdf_path);
//         echo $pdf_path;
//     }
// }


// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     if (isset($_POST['view_ic_button'])) {
//         $pdf_path = $_POST['path'];
//         $file_path = 'frontend\attachments\files';
//         // Check if the file exists and is readable
//         if (file_exists($pdf_path) && is_readable($pdf_path)) {
//             // Set appropriate headers
//             header("Content-type: application/pdf");
//             header("Content-Disposition: inline; filename='document.pdf'");
//             header("Content-Length: " . filesize($pdf_path));
//             // Output the PDF file
//             readfile($pdf_path);
//         } else {
//             // Error handling if the file doesn't exist or is not readable
//             echo "Error: PDF file not found or inaccessible.";
//         }
//     }
// }

function copyFile($postData)
{
    $pdf_path = str_replace('/', '\\', $postData['path']);
    // $pdf_path = '\\\172.16.2.16\SID_Documents\Document Control\Distribution\External\\DISTR-TCI-WSDC-0001AJFI-0-Sample External Document - 121623- For Deletion.pdf';
    // $file_path = 'C:/xampp/htdocs/debug/New folder/';

    // Debug
    $file_path = 'C:/xampp/htdocs/TPC_VER2/frontend/attachments/files/';
    // Deploy
    // $file_path = '//172.16.2.13/htdocs/TPC_VER2/frontend/attachments/files/';

    // $file_path = "//172.16.2.61/Data/4haloween/";
    // Check if the file exists and is readable
    if (file_exists($pdf_path)) {
        $pdf = explode("\\", $pdf_path);
        if (copy($pdf_path, $file_path .  $pdf[8])) {
            $response = array(
                'success' => true,
                'message' => $pdf_path . ' has been moved successfully!',
                '$pdf' => $pdf,
                'path' => $file_path . $pdf[8]
            );
            return $response;
        } else {
            $response = array(
                'success' => false,
                'message' => $pdf_path . ' has not been moved!',
                '$pdf' => $pdf,
                'path' => $file_path . $pdf[8],
            );
            return $response;
        }
    } else {
        $response = array(
            'success' => false,
            'message' => $pdf_path . ' has not been found!'
        );
        return $response;
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['view_ic_button'])) {
        $postData = $_POST;
        $responseData = copyFile($postData);
        header('Content-Type: application/json');
        echo json_encode($responseData);
    }
}
