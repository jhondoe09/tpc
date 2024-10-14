<?php include 'frontend/layouts/links.php' ?>
<div class="col-md-12 mx-auto row">
  <nav class="navbar navbar-expand-sm" style="background-color: white;">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="row row-cols-1">
        <div class="col">
          <p class="h5" id="sectionDescription">Section Description</p>
        </div>
        <div class="col-7">
          <p class="" id="formAssignment">Form Assignment</p>
        </div>
        <!-- <div class="col-5">
          <p class="">Yield: 90%</p>
        </div> -->
      </div>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

        <li class="nav-item p-1">
          <button type="button" class="btn btn-info position-relative d-none" data-bs-toggle="modal" data-bs-target="#viewHiddenModal" id="hiddenProcessBtn"><span class="material-symbols-outlined align-bottom">visibility_off</span>Hidden
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="hiddenProcessBadge">
              0
            </span></button>
        </li>
        <li class="nav-item p-1">
          <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#viewIcModal"><span class="material-symbols-outlined align-bottom">picture_as_pdf</span>View IC</button>
        </li>
        <li class="nav-item p-1">
          <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#qrModal"><img src="frontend/assets/images/qr_code_scanner_FILL0_wght200_GRAD0_opsz24.png" alt="Scan QR">Scan QR</button>
        </li>
        <li class="nav-item p-1">
          <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#openProcessModal"><img src="frontend/assets/images/lock_open_FILL0_wght200_GRAD0_opsz24.png" alt="Open Sub-Process">Open Sub-Process</button>
        </li>
        <li class="nav-item p-1">
          <a style="text-decoration: none;"><button type="button" class="btn btn-info" id="exit" onclick="exit()"><img src="frontend/assets/images/logout_FILL0_wght200_GRAD0_opsz24.png" alt="Exit">Exit</button></a>
        </li>
      </ul>
    </div>
  </nav>
</div>


<!-- Modal -->

<div class="modal fade" tabindex="-1" id="qrModal">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div id="" class="modal-body bg-gradient-to-r from-cyan-200 to-blue-400" style="font-family: 'Roboto Condensed', sans-serif; background-color: grey; background-color: cyan;">
        <div class="mx-auto" id="reader1"></div>
        <div class="bg-body rounded-3 shadow-sm p-2" id="">
          <div class="container text-left">
            <div class="row gx-5">
              <form action="#" method="POST">
                <div class="row">
                  <div class="col-md-2 col-sm-12">
                    <div class="form-group">
                      <label for="sectionId" class="form-label" for="sectionId">Section</label>
                      <select class="form-select" aria-label="Default select example" id="sectionId" name="sectionId">
                      </select>
                    </div>
                  </div>
                  <div class="col-md-7 col-sm-12">
                    <div class="form-group">
                      <label for="qrCode" class="form-label" for="qrCode2">Scan QR Code</label>
                      <input type="text" class="form-control" id="qrCode2" name="qrCode2" placeholder="Item Code + Parts Number + Lot Number + Date Issued + Revision Number" autocomplete="off" required>
                    </div>
                  </div>
                  <div class="col-md-1 col-sm-12">
                    <div class="form-group">
                      <label for="QrSubmitBtn" class="form-label" for="showCamera">Camera</label>
                      <button type="button" id="showCamera" class="form-control btn btn-sm"><img src="frontend\assets\images\qr_code_scanner_FILL0_wght200_GRAD0_opsz24.png" alt=""></button>
                    </div>
                  </div>
                  <div class="col-md-1 col-sm-12">
                    <div class="form-group">
                      <label for="QrSubmitBtn" class="form-label" for="QrSubmitBtn">Scan</label>
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
  </div>
</div>

<!-- End of modal -->


<!-- Toast -->

<div class="toast toast-container position-fixed bottom-0 start-50 translate-middle-x text-bg-info border-0" id="liveToast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body" id="errorP">
    </div>
    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>


<!-- Open Process Modal -->
<!-- Modal -->
<div class="modal fade" id="openProcessModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="text-center modal-title fs-5" id="exampleModalLabel">Open Sub-Process</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div id="" class="modal-body bg-gradient-to-r from-cyan-200 to-blue-400" style="font-family: 'Roboto Condensed', sans-serif; background-color: grey;">
        <div class="mx-auto" id="reader3"></div>
        <div class="bg-body rounded-3 shadow-sm p-2" id="">
          <div class="container text-left">
            <div class="gx-5">
              <form action="#" method="POST">
                <div class="col-md-12 row">
                  <div class="col-md-7 col-sm-12">
                    <div class="form-group">
                      <label for="subProcessSelect" class="form-label">Sub-Process</label>
                      <select class="form-select" aria-label="Default select example" id="subProcessSelect" name="subProcessSelect">

                      </select>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                      <label for="IdScan" class="form-label">Scan ID</label>
                      <!-- <input type="text" class="form-control" id="IdScan" name="IdScan" placeholder="Scan ID" autocomplete="off" oninput="onInputSub()" onkeydown="return (event.keyCode!=13);" required> -->
                      <input type="text" class="form-control" id="IdScan" name="IdScan" placeholder="Scan ID" autocomplete="off" oninput="onInputSub()" onkeydown="onInputSub(); return (event.keyCode!=13);" required>
                    </div>
                  </div>
                  <div class="col-md-1 col-sm-12">
                    <div class="form-group">
                      <label for="subProcessOpen" class="form-label">Open</label>
                      <button type="submit" id="subProcessOpen" name="subProcessOpen" class="btn btn-outline-info disabled"><img src="frontend/assets/images/lock_open_right_FILL0_wght200_GRAD0_opsz24.png" alt="Open"></button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- View Hidden Process Modal -->
<div class="modal fade" id="viewHiddenModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="viewHiddenModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="viewHiddenModalLabel">View Hidden Process</h1>
      </div>
      <div class="modal-body">
        <div class="container">
          <div class="col-md-12 row row-cols-4" id="modalBody" width="200%" height="500px">

          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close_view_ic_modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!-- End of View Hidden Process Modal -->


<!-- View IC Document Modal -->
<div class="modal fade" id="viewIcModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="viewIcModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="viewIcModalLabel">View IC Document Attachments</h1>
      </div>
      <div class="modal-body">
        <div class="container attachment-container">
          <div class="col-md-12 row row-cols-4" id="IcAttachment" width="200%" height="500px">

          </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close_view_ic_modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!-- End of View IC Document Modal -->

<!-- View IC Attachment Modal -->
<div class="modal fade" id="viewICAttachmentModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="viewICAttachmentModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="viewICAttachmentModalLabel">Modal title</h1>
      </div>
      <div class="modal-body h-100">
        <div class="col-md-12 mx-auto" id="iframe_div">

        </div>

        <div class="container col-md-12 mx-auto d-none" id="loading_content">
          <span role="status">Preparing Attachments</span>
          <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="view_ic_attachment_modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!-- ENd of View IC Attachment Modal -->

<script>
  // Get the input field and the QR scanner placeholder
  var input = document.getElementById('qrCode2');
  var qrPlaceholder = document.getElementById('reader1');

  document.getElementById('showCamera').addEventListener('click', function() {
    // Initialize the QR scanner
    var html5QrcodeScanner = new Html5QrcodeScanner(
      "reader1", {
        fps: 30,
        qrbox: 250
      });

    // Define what happens when a QR code is scanned
    html5QrcodeScanner.render(onScanSuccess);

    function onScanSuccess(decodedText, decodedResult) {
      // Put the scanned data into the input field
      input.value = decodedText;
      //  alert(decodedText);
      document.getElementById("QrSubmitBtn").click();
    }
  });
</script>

<script>
  // Get the input field and the QR scanner placeholder
  var inputField = document.getElementById('IdScan');
  var qrPlaceholder = document.getElementById('reader3');

  document.getElementById('IdScan').addEventListener('click', function() {
    // Initialize the QR scanner
    var html5QrcodeScanner = new Html5QrcodeScanner(
      "reader3", {
        fps: 30,
        qrbox: 250
      });

    // Define what happens when a QR code is scanned
    html5QrcodeScanner.render(onScanSuccess);

    function onScanSuccess(decodedText, decodedResult) {
      // Put the scanned data into the input field
      inputField.value = decodedText;
      document.getElementById("IdScan").oninput();
    }
  });
</script>