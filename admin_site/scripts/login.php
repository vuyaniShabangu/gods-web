<?php
    require_once 'config.php';
     
    session_start();

    $emailAddress = $_POST['emailAddress'];
    $pwd = md5($_POST['password']);
    $qry = "SELECT id, name, surname, email, password, phone_number FROM ourthgco_godsweb.administrator WHERE email='" . $emailAddress . "' AND password='" . $pwd . "' AND Active = '1';";
    $result = mysqli_query($con,$qry);
    $num_row = mysqli_num_rows($result);
    $row = mysqli_fetch_assoc($result);
    if( $num_row == 1 ) {
    	echo 'true';
    	$_SESSION['Name'] = $row['name'] . ' ' . $row['surname'];
    	$_SESSION['Id'] = $row['id'];
    	}
    else {
    	//echo 'false';
        echo $num_row;
    }
?>