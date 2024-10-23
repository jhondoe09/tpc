<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['open_excel'])) {
        echo 'POSTED';
        $pythonScriptPath = 'C:\xampp\htdocs\testTPC\py\test.py';

        exec("python $pythonScriptPath", $output, $return_var);

        if ($pythonScriptPath !== 0) {
            echo "Error: Python script execution failed.\n";
        } else {
            echo $pythonScriptPath;
            echo "Output: " . implode("\n", $output) . "\n";
        }
    } else {
        echo $_POST['open_excel'];
        echo 'NOT POSTED';
    }
}
