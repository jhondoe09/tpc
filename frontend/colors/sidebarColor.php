<?php 
    function like_match($pattern, $subject)
    {
        $pattern = str_replace('%', '.*', preg_quote($pattern, '/'));
        return (bool) preg_match("/^{$pattern}$/i", $subject);
    }
    if(isset($_SESSION['sidebar_code'])){
        if(like_match('%CWP%', $_SESSION['sidebar_code'])){
            $_SESSION['headers'] = './frontend/headers/cwp.php';
            $_SESSION['nav_content'] = './frontend/nav_content/cwp.php';
            ?>
            <style>
            #sidebar {
                background-image: linear-gradient(to top right, #1d4ed8, #93c5fd);
            }
            </style>
            <?php 
        }else if(like_match('%Polishing%', $_SESSION['sidebar_code'])){
            $_SESSION['headers'] = './frontend/headers/cwp.php';
            $_SESSION['nav_content'] = './frontend/nav_content/cwp.php';
            ?>
            <style>
            #sidebar {
                background-image: linear-gradient(to top right, #f97316, #fdba74);
            }
            </style>
            <?php
        }else if(like_match('%SWP%', $_SESSION['sidebar_code'])){
            $_SESSION['headers'] = './frontend/headers/swp.php';
            $_SESSION['nav_content'] = './frontend/nav_content/swp.php';
            ?>
            <style>
            #sidebar {
                background-image: linear-gradient(to top right, #7e22ce, #d8b4fe);
            }
            </style>
            <?php
        }else if(like_match('%CCD%', $_SESSION['sidebar_code'])){
            $_SESSION['headers'] = './frontend/headers/ccd.php';
            $_SESSION['nav_content'] = './frontend/nav_content/ccd.php';
            ?>
            <style>
            #sidebar {
                background-image: linear-gradient(to top right, #6d28d9, #c4b5fd);
            }
            </style>
            <?php
        }else if(like_match('%CCI%', $_SESSION['sidebar_code'])){
            $_SESSION['headers'] = './frontend/headers/cci.php';
            $_SESSION['nav_content'] = './frontend/nav_content/cci.php';
            ?>
            <style>
            #sidebar {
                background-image: linear-gradient(to top right, #c2410c, #fdba74);
            }
            </style>
            <?php
        }
    }
    // else{
    //     header('locatin:index.php');
    // }
    ?>