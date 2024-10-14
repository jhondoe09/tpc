<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['open_excel'])) {
        $name = $_POST['exampleCheck1'];
        $width = $_POST['width'];
        $pythonScriptPath = '//172.16.2.13/htdocs/testTPC/py/test.py';
        // if ($width > 810) {
        //     $pythonScriptPath = '//172.16.2.13/htdocs/testTPC/py/test.py';
        // } else {
        //     $pythonScriptPath = '//172.16.2.13/htdocs/testTPC/py/test2.py';
        // }
        // echo $pythonScriptPath;
        // echo getenv("HOMEDRIVE") .  getenv("HOMEPATH");
        // $path = getenv("HOMEDRIVE") .  getenv("HOMEPATH") . '\Documents\ForRead.txt';
        // $user =  get_current_user();
        // echo getenv('USERPROFILE');
        // echo getenv("HOMEDRIVE");

        $path = "//172.16.2.13/htdocs/testTPC/py/ForRead.txt";
        $fp = fopen($path, 'w');
        fwrite($fp, 'file://172.16.2.13/htdocs/TPC-endpoint/uploads/' . $name);
        fclose($fp);

        exec("python $pythonScriptPath", $output, $return_var);
        header('Location: https://172.16.2.120/tpc_ver2/main.php');
    } else {
        echo $_POST['open_excel'];
        echo 'NOT POSTED';
    }
}
