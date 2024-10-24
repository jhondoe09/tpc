<?php

// $pdf_path = '\\\172.16.2.16\SID_Documents\Document Control\Distribution\External\DISTR_RO-TCI-WSDC-0001AJFI-0-Sample External Document - 121623- For Deletion.pdf';
// $pdf_path = 'https://172.16.2.16/SID_Documents/Document Control/Distribution/External/DISTR_RO-TCI-WSDC-0001AJFI-0-Sample External Document - 121623- For Deletion.pdf';
$pdf_path = '\\172.16.2.13\htdocs\TPC-endpoint\uploadsDISTR_RO-TCI-WSDC-0001AJFI-0-Sample%20External%20Document%20-%20121623-%20For%20Deletion.pdf';
header("Content-type: application/pdf");
header("Content-Disposition: inline; filename='document.pdf'");
header("Content-Length: " . filesize($pdf_path));


readfile($pdf_path);
