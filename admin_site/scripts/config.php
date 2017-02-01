<?php
    $host = '4ourthg.com';
    $username = 'ourthgco';
    $password = '70Juu94ojU';
    $database = 'ourthgco_godsweb';
    
    $con = mysqli_connect($host,$username,$password, $database) or die(mysqli_error($con));
     
    if (!$con) {
        echo "Unable to connect to DB: " . mysqli_error($con);
        exit;
    }
     
    if (!mysqli_select_db($con, $database)) {
        echo "Unable to select mydbname: " . mysqli_error($con);
        exit;
    }
?>