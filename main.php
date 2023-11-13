<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./frontend/css/placeholder.css">
    <title>TPC</title>
    <?php include 'frontend/layouts/links.php' ?>
</head>

<!-- <body id="main" class="bg-gradient-to-r from-cyan-200 to-blue-400" style="font-family: 'Roboto Condensed', sans-serif;"> -->

<body id="main" style="background-color: #a5f3fc; font-family: 'Roboto Condensed', sans-serif;">
    <div class="px-2 py-3 mh-100 sidebar shadow-md" id="sidebar" style="background-color: #22d3ee;">
        <?php include './frontend/includes/sideBar.php'; ?>
    </div>
    <div class="col-md-12 row ">
        <div class="col-md-12">
            <div class="pt-3 pb-3">
                <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                <div class="p-3 bg-body rounded-3 shadow-sm" style="background-color: white;" id="main_content">
                    <?php
                    if (isset($_SESSION['QR'])) {
                    ?>
                        <div class="alert alert-info" role="alert">
                            This is the QR CODE = [<?php print_r($_SESSION['QR']); ?>]
                        </div>
                    <?php
                    }
                    ?>
                    <?php
                    include 'frontend/includes/navBar.php';
                    ?>
                    <hr>
                    <?php
                    include 'frontend/headers/cwp.php';
                    ?>
                    <hr>
                    <div class="col-md-12 mx-auto row">
                        <nav class="navbar navbar-expand-sm" style="background-color: white;">
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <div class="col-md-6">
                                    <div class="col-7">
                                        <p class="h5" id="subPname">Sub-Process Description</p>
                                    </div>
                                    <div class="col-5">
                                        <span class="badge rounded-pill text-bg-danger" id="dataYieldSpan">Yield: 0%</span>
                                    </div>
                                    <div class="col-md-12 row row-cols-auto row-cols-md-6">
                                        <div class="col">
                                            <p class="fw-bold">Status: </p>
                                        </div>
                                        <div class="col">
                                            <span class="badge rounded-pill" id="subProcessStatus"></span>
                                        </div>
                                        <div class="col">
                                            <p class="fw-bold">Sampling: </p>
                                        </div>
                                        <div class="col">
                                            <span class="badge rounded-pill" id="sampling">Test</span>
                                        </div>
                                        <div class="col">
                                            <p class="fw-bold">Uncontrolled: </p>
                                        </div>
                                        <div class="col">
                                            <span class="badge rounded-pill" id="uncontrolled_quantity"></span>
                                        </div>
                                        <div class="col">
                                            <p class="fw-bold">Batch: </p>
                                        </div>
                                        <div class="col">
                                            <span class="badge rounded-pill" id="batch_type"></span>
                                        </div>
                                        <div class="col">
                                            <p class="fw-bold">Result: </p>
                                        </div>
                                        <div class="col">
                                            <span class="badge rounded-pill" id="result_type"></span>
                                        </div>
                                    </div>
                                    <!-- <div class="col-md-4">
                                            <p id="subProcessStatus">Status: </p>
                                        </div>
                                        <div class="col-md-4">
                                            <p id="sampling">Sampling: Yes </p>
                                        </div>
                                        <div class="col-md-4">
                                            <p>Uncontrolled Quantity: Yes</p>
                                        </div> -->
                                </div>
                                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li class="nav-item p-1">
                                        <button type="button" id="batchProcessBtn" class="btn btn-info"><img src="frontend/assets/images/groups_FILL0_wght200_GRAD0_opsz24.png" alt="Batch Process">Batch Process</button>
                                    </li>
                                    <li class="nav-item p-1">
                                        <button type="button" class="btn btn-info position-relative" id="specialInstruction" disabled><img src="frontend/assets/images/quick_reference_FILL0_wght200_GRAD0_opsz24.png" alt="Special Instruction">Special Instruction
                                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger badger" id="badger"></span>
                                        </button>
                                    </li>
                                    <li class="nav-item p-1">
                                        <button type="button" class="btn btn-info" id="saveButton"><img src="frontend/assets/images/save_FILL0_wght200_GRAD0_opsz24.png" alt="Special Instruction">Save Condition</button>
                                    </li>
                                    <li class="nav-item p-1">
                                        <button type="button" class="btn btn-info" id="doneButton"><img src="frontend/assets/images/published_with_changes_FILL0_wght200_GRAD0_opsz24.png" alt="Done Process">Done Process</button>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <hr>
                    <div class="attachment-container" id="attachContainer" style="overflow: auto;" width="200%" height="500px">

                    </div>
                    <!-- MODAL -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="modalTitle">File Viewer</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div id="content">
                                        <iframe id="fileViewer" src="" width="100%" height="500px"></iframe>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <ul class="list-unstyled col-md-12 mx-auto"">
                                    <li>Remarks:
                                        <ul id=" remarksUL">

                                    </ul>
                                    </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- END OF MODAL -->
                    <hr>
                    <div class="col-md-12 table-responsive overflow-auto" id="operatorDiv" style="margin-top: 5px; max-height: 200px;">
                        <table class="table table-responsive table table-sm text-center">
                            <thead class="sticky-top">
                                <tr>
                                    <th>Actions</th>
                                    <th>Operator Number</th>
                                    <th>ID No</th>
                                    <th>Operator Name</th>
                                    <th>Quantity In</th>
                                    <th>Quantity Out</th>
                                    <th>Sampling In</th>
                                    <th>Sampling Out</th>
                                    <th>Date & Time Start</th>
                                    <th>Date & Time End</th>
                                </tr>
                            </thead>
                            <tbody id="divOperatorTbody">

                            </tbody>
                        </table>
                    </div>
                    <hr>
                    <!-- END OF BODY -->
                    <div class="tab-pane fade show active" id="nav-process" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                        <div class="overflow-auto" style="margin-top: 5px; max-height: 500px;">
                            <table id="main_table" class="table-responsive table table-hover table-sm align-middle text-center">
                                <thead class="sticky-top">
                                    <tr>
                                        <th>ID No.</th>
                                        <th>No.</th>
                                        <th>Wafer Start</th>
                                        <th>Wafer End</th>
                                        <th>Condition</th>
                                        <th>Actual</th>
                                        <th>Target Value</th>
                                        <th>Min Value</th>
                                        <th>Max Value</th>
                                        <th>Judgement</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="table">

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr>
                    Remarks:
                    <div class="form-floating" id="remarksDiv">

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="fixed-bottom text-center shadow-lg" style="background-color: #7dd3fc;">COPYRIGHT © TECDIA-SD 2023</div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>

<script src="frontend/assets/bootstrap-5.3.1-dist/js/jquery.min.js"></script>
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap5.min.js"></script>

<script id="jsTag" src="./frontend/js/main.js"></script>
<script src="./frontend/js/images.js"></script>
<!-- <script src="./frontend/js/dataTable.js"></script> -->
<script src="./frontend/js/navbar.js"></script>
<script src="./frontend/js/modal.js"></script>
<script src="./frontend/js/exit.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>



<!-- Scan Operator ID MODAL -->

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
            <div class="mx-auto" id="reader2"></div>
            <div class="modal-header">
                <h1 class="modal-title fs-5 text-center" id="staticBackdropLabel">Scan ID</h1>
                <button type="button" class="btn-close" id="closeModal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="input-group input-group mb-3">
                    <img src="frontend/assets/images/qr_code_scanner_FILL0_wght200_GRAD0_opsz24.png" width="30px" alt="qr_code_scanner">
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" autofocus="autofocus" id="scanId" autocomplete="off">
                </div>
                <div class="input-group input-group mb-2">
                    <button type="submit" id="onIdScan" name="onIdScan" class="form-control btn btn-sm" onclick="scanId()"><img src="frontend\assets\images\frame_inspect_FILL0_wght200_GRAD0_opsz24.png" alt=""></button>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Add row modal -->
<div class="modal fade" id="addRowModal" tabindex="-1" aria-labelledby="addRowModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="addRowTitle">Add Row</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row row-cols-4 align-items-center">
                        <div class="col">
                            <label for="addRowStart" class="col-form-label">Wafer Start</label>
                            <input type="number" id="addRowSequence" class="form-control d-none">
                            <input type="number" id="addRowWithJudgement" class="form-control d-none">
                        </div>
                        <div class="col">
                            <input type="number" id="addRowStart" class="form-control" required>
                        </div>
                        <div class="col">
                            <label for="addRowEnd" class="col-form-label">Wafer End</label>
                        </div>
                        <div class="col">
                            <input type="number" id="addRowEnd" class="form-control" required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="insert_row_btn">Insert Rows</button>
            </div>
        </div>
    </div>
</div>
<!-- End of add row modal -->

<!-- Spinner Modal -->
<div class="modal fade" id="spinnerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body">
                <!-- Spinners -->
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <div class="row">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div class="row">
                        <strong id="span_saving_data">Saving Data (0 %)</strong>
                    </div>
                </div>
                <!-- End of spinners -->
            </div>
        </div>
    </div>
</div>
<!-- End of spinner modal -->
<script>
    // Get the input field and the QR scanner placeholder
    var inputField = document.getElementById('scanId');
    var qrPlaceholder = document.getElementById('reader2');

    document.getElementById('scanId').addEventListener('click', function() {
        // Initialize the QR scanner
        var html5QrcodeScanner = new Html5QrcodeScanner(
            "reader2", {
                fps: 30,
                qrbox: 250
            });

        // Define what happens when a QR code is scanned
        html5QrcodeScanner.render(onScanSuccess);

        function onScanSuccess(decodedText, decodedResult) {
            // Put the scanned data into the input field
            inputField.value = decodedText;
            document.getElementById('onIdScan').click();
        }
    });
</script>

</html>