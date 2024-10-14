<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TPC</title>
    <!-- <script src="https://cdn.tailwindcss.com"></script> -->
    <?php include 'frontend/layouts/links.php' ?>
    <style>
        #main {
            background-image: linear-gradient(to right, #a5f3fc, #60a5fa);
        }
    </style>
</head>
<!-- <body id="main" style="background-color: #7dd3fc; font-family: 'Roboto Condensed', sans-serif;"> -->

<body id="main" class="bg-gradient-to-r from-cyan-200 to-blue-400" style="font-family: 'Roboto Condensed', sans-serif;">
    <div class="col-md-12">
        <div class="col-md-6 " style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">
            <div class="alert alert-warning text-center hidden" id="errorDiv" role="alert">
                <p class="" id="errorP"></p>
            </div>
            <div class="bg-body rounded-3 shadow-sm p-2" style="background-color: white;" id="main_content">
                <div class="mx-auto" id="reader"></div>
                <div class="container text-left">
                    <div class="row gx-5">
                        <form action="#" method="POST">
                            <div class="row">
                                <div class="col-md-2 col-sm-12">
                                    <div class="form-group">
                                        <label for="sectionId" class="form-label">Section</label>
                                        <select class="form-select" aria-label="Default select example" id="sectionId" name="sectionId">

                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label for="qrCode" class="form-label">Scan QR Code</label>
                                        <input type="text" class="form-control" id="qrCode" name="qrCode" placeholder="Item Code + Parts Number + Lot Number + Date Issued + Revision Number" autocomplete="off" required>
                                    </div>
                                </div>
                                <div class="col-md-2 col-sm-12">
                                    <div class="form-group">
                                        <label for="QrSubmitBtn" class="form-label">Camera</label>
                                        <button type="button" id="showModal" class="form-control btn btn-sm"><img src="frontend\assets\images\qr_code_scanner_FILL0_wght200_GRAD0_opsz24.png" alt=""></button>
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
        </div>
    </div>
    <div class="fixed-bottom text-center shadow-sm " style="background-color: white;">COPYRIGHT © TECDIA-SD 2023</div>

    <script src="./frontend/js/index.js"></script>
</body>
<script src="./frontend/js/html5-qrcode.min.js"></script>
<script>
    // Get the input field and the QR scanner placeholder
    var inputField = document.getElementById('qrCode');
    var qrPlaceholder = document.getElementById('reader');

    document.getElementById('showModal').addEventListener('click', function() {
        // Initialize the QR scanner
        var html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", {
                fps: 30,
                qrbox: 250
            });

        // Define what happens when a QR code is scanned
        html5QrcodeScanner.render(onScanSuccess);

        function onScanSuccess(decodedText, decodedResult) {
            // Put the scanned data into the input field
            inputField.value = decodedText;
            document.getElementById("QrSubmitBtn").click();
        }
    });
</script>

</html>