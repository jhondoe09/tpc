<!-- <?php

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
</head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs"></script>
<script>
    // Fetch PDF document
    const pdfUrl = 'https://172.16.2.13/TPC-endpoint/uploads/DISTR_RO-TCI-WSDC-0001AJFI-0-Sample%20External%20Document%20-%20121623-%20For%20Deletion.pdf';

    // PDF.js setup
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

    // Load PDF document
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(pdf => {
        // Fetch the first page
        pdf.getPage(1).then(page => {
            const canvas = document.getElementById('pdfCanvas');
            const context = canvas.getContext('2d');

            // Set the canvas size to match the PDF page's size
            const viewport = page.getViewport({
                scale: 1.5
            });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    });
</script>

<body>
    <canvas id="pdfCanvas"></canvas>

</body>

</html> -->



<!-- 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Display File in iframe</title>
</head>

<body>

    <iframe src="fileviewer.php" width="2000" height="1000"></iframe>

</body>

</html> -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

</body>

</html>