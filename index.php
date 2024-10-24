<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
    <title>TPC</title>
    <!-- <script src="https://cdn.tailwindcss.com"></script> -->
    <?php include 'frontend/layouts/links.php' ?>
    <style>
        #main {
            background-image: linear-gradient(to right, #a5f3fc, #60a5fa);
        }

        #qr-video {
            position: relative;
            height: 400px;
            width: 465px;
        }
    </style>
</head>
<!-- <body id="main" style="background-color: #7dd3fc; font-family: 'Roboto Condensed', sans-serif;"> -->

<body id="main" class="bg-gradient-to-r from-cyan-200 to-blue-400" style="font-family: 'Roboto Condensed', sans-serif;">
    <div class="col-md-12">
        <div class="col-md-6 " style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">
            <div class="alert alert-warning text-center d-none" id="errorDiv" role="alert">
                <p class="" id="errorP"></p>
            </div>
            <div class="bg-body rounded-3 shadow-sm p-2" style="background-color: white;" id="main_content">
                <div class="mx-auto" id="reader"></div>
                <div class="container text-left">
                    <div class="row gx-5">
                        <form action="#" method="POST">
                            <div class="row">
                                <div class="col-md-1 col-sm-12">
                                    <p></p>
                                    <p>
                                        <button type="button" class="btn btn-outline-none position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="What's new?" id="get_patch">
                                            <span class="material-symbols-outlined align-bottom">question_mark </span>
                                            <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                                <span class="visually-hidden">New alerts</span>
                                            </span>
                                        </button>

                                    </p>
                                </div>
                                <div class="col-md-2 col-sm-12">
                                    <div class="form-group">
                                        <label for="sectionId" class="form-label">Section</label>
                                        <select class="form-select" aria-label="Default select example" id="sectionId" name="sectionId">

                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-5 col-sm-12">
                                    <div class="form-group">
                                        <label for="qrCode" class="form-label">Scan QR Code</label>
                                        <input type="text" class="form-control" id="qrCode" name="qrCode" placeholder="Item Code + Parts Number + Lot Number + Date Issued + Revision Number" autocomplete="off" required>
                                    </div>
                                </div>
                                <div class="col-md-2 col-sm-12">
                                    <div class="form-group">
                                        <label for="QrSubmitBtn" class="form-label">Camera</label>
                                        <button type="button" id="showModal" data-bs-toggle="modal" data-bs-target="#myModal" class="form-control btn btn-sm"><img src="frontend\assets\images\qr_code_scanner_FILL0_wght200_GRAD0_opsz24.png" alt=""></button>
                                    </div>
                                </div>
                                <div class="col-md-2 col-sm-12">
                                    <div class="form-group">
                                        <label for="QrSubmitBtn" class="form-label">Scan</label>
                                        <button type="submit" id="QrSubmitBtn" name="QrSubmitBtn" class="form-control btn btn-sm"><img src="frontend\assets\images\frame_inspect_FILL0_wght200_GRAD0_opsz24.png" alt=""></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="container-fluid col-md-12 pt-2 overflow-auto" style="margin-top: 5px; max-height: 250px;">
                <ul class="list-group  list-group-flush" id="patch_list">
                </ul>
            </div>
        </div>
    </div>
    <div class="fixed-bottom text-center shadow-sm " style="background-color: white;">MADE WITH ♥ © TECDIA-SD 2023</div>

    <script src="./config/config.js"></script>
    <script>
        contentType("index");
    </script>
    <!-- <script src="./frontend/js/index.js"></script> -->
</body>
<script src="./frontend/js/html5-qrcode.min.js"></script>
<script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
<!-- <script>
    // Get the input field and the QR scanner placeholder
    var inputField = document.getElementById('qrCode');
    var qrPlaceholder = document.getElementById('reader');

    document.getElementById('showModal').addEventListener('click', function() {
        // Initialize the QR scanner
        let config = {
            fps: 10,
            qrbox: 250,
            rememberLastUsedCamera: true,
            // Only support camera scan type.
            supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            facingMode: {
                exact: "environment"
            }
        };
        var html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", config, /* verbose= */ false);
        // Define what happens when a QR code is scanned
        html5QrcodeScanner.render(onScanSuccess);

        function onScanSuccess(decodedText, decodedResult) {
            // Put the scanned data into the input field
            inputField.value = decodedText;
            document.getElementById("QrSubmitBtn").click();
        }
    });
</script> -->
<!-- <script>
    var inputField = document.getElementById('qrCode');
    var qrPlaceholder = document.getElementById('reader');

    document.getElementById('showModal').addEventListener('click', function() {
        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            inputField.value = decodedText;
            document.getElementById("QrSubmitBtn").click();
        };
        if (!("BarcodeDetector" in globalThis)) {
            console.log("Barcode Detector is not supported by this browser.");
        } else {
            console.log("Barcode Detector supported!");

            // create new detector
            const barcodeDetector = new BarcodeDetector({
                formats: ["code_39", "codabar", "ean_13"],
            });
        }
        const config = {
            fps: 10,
            qrbox: {
                width: 250,
                height: 250
            },
            supportedScanTypes: [
                Html5QrcodeScanType.SCAN_TYPE_FILE,
                Html5QrcodeScanType.SCAN_TYPE_CAMERA
            ],
            showTorchButtonIfSupported: true
        };
        html5QrCode.start({
            facingMode: "environment"
        }, config, qrCodeSuccessCallback);
    });
</script> -->

<script type="module">
    import QrScanner from "./frontend/js/qr-scanner.min.js";
    QrScanner.WORKER_PATH = './frontend/js/qr-scanner-worker.min.js';

    document.getElementById('showModal').addEventListener('click', DoThis);

    // $(document).ready(function() {
    //     $("#myModal").click('hide', function() {
    //         location.reload();
    //     });
    // });

    function DoThis() {
        const video = document.getElementById('qr-video');
        const camQrResult = document.getElementById('qrCode');
        const scanner = new QrScanner(video, result => setResult(camQrResult, result));
        scanner.start();
    }

    function setResult(label, result) {
        document.getElementById('qrCode').value = result;
        document.getElementById('QrSubmitBtn').click();
        qrScanner.destroy();
        qrScanner = null;
    }
</script>

</html>

<div class="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            </div>
            <div class="modal-body">
                <video id="qr-video"></video>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="close_modal_qr_btn" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- <div class="modal fade" id="myModal" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body">
                <video id="qr-video"></video>
            </div>
        </div>

    </div>
</div> -->