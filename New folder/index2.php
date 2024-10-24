<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/+esm"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs"></script>
    <script type="module" src=" import pdfjs-dist from https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/+esm "></script> -->
    <!-- <script src="https://unpkg.com/browse/pdfjs-dist@4.0.379/"></script> -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>
    <div class="container">
        <canvas id="my_canvas" style="width: 100%;margin-left: auto ;margin-right: auto ;">
        </canvas>
        <div class="col-md-12 d-flex align-items-center justify-content-center">
            <div class="row">
                <div class="col-md-6">
                    <input type="number" id="jumpPageInput" class="form-control" placeholder="Jump to Page">
                </div>
                <div class="col-md-6">
                    <button onclick="jumpToPage()" class="form-control btn btn-primary ">Go</button>
                </div>
                <div class="col-md-6">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" onclick="prevPage()">Previous</a></li>
                            <li class="page-item"><a class="page-link" onclick="nextPage()">Next</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="col-md-6">
                    <a href="https://172.16.2.120/tpc_ver2/main.php"><button class="form-control btn btn-primary ">Back to home</button></a>
                </div>
            </div>

            <!-- <button class="btn btn-outline-secondary mx-auto" onclick="prevPage()">Previous</button>
            <button class="btn btn-outline-secondary mx-auto" onclick="nextPage()">Next</button> -->
        </div>
    </div>
    <!-- <script>
        pdfjsLib.getDocument('compressed.tracemonkey-pldi-09.pdf').then(doc => {
            console.log('This file has' + doc._pdfInfo.numPages + 'pages');

            doc.getPage(1).then(page => {
                var myCanvas = document.getElementById('my_canvas');
                var context = myCanvas.getContext("2d");
                var viewport = page.getViewport(2);
                myCanvas.width = viewport.width;
                myCanvas.height = viewport.height;

                page.render({
                    canvasContext: context,
                    viewport: viewport
                })
            })
        })
    </script> -->

    <script>
        let currentPage = 1;
        let totalPages;

        const urlParams = new URLSearchParams(window.location.search);
        const urlPath = urlParams.get('PATH');
        // const path = 'compressed.tracemonkey-pldi-09.pdf';
        const pathArray = urlPath.split("/");
        console.log(pathArray);
        // Debug
        const path = pathArray[7];
        // Deploy
        // const path = pathArray[8];

        // const proxyUrl = 'https://172.16.2.120?url=' + encodeURIComponent(pathArray[5]);
        const jumpPageInput = document.getElementById('jumpPageInput');

        pdfjsLib.getDocument(path).then(doc => {
            totalPages = doc.numPages;
            console.log('This file has ' + totalPages + ' pages');
            renderPage(currentPage);
        });

        function renderPage(pageNumber) {
            const myCanvas = document.getElementById('my_canvas');
            const context = myCanvas.getContext('2d');

            pdfjsLib.getDocument(path).then(doc => {
                doc.getPage(pageNumber).then(page => {
                    jumpPageInput.value = '';
                    const viewport = page.getViewport(2);
                    myCanvas.width = viewport.width;
                    myCanvas.height = viewport.height;

                    page.render({
                        canvasContext: context,
                        viewport: viewport
                    });

                    jumpPageInput.placeholder = `Current Page: ${pageNumber}`;
                });
            });
        }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                renderPage(currentPage);
            }
        }

        function nextPage() {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage(currentPage);
            }
        }

        function jumpToPage() {
            const page = parseInt(jumpPageInput.value);
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                renderPage(currentPage);
            } else {
                Swal.fire({
                    title: "Message promt!",
                    text: `You have entered an invalid page number, we are only limited to [1-${totalPages}]`,
                    icon: "error"
                });

            }
        }
    </script>

</body>

</html>