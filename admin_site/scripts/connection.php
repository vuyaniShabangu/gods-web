<?php
Class dbObj{
    /* Database connection start */
    var $servername = '4ourthg.com';
    var $username = 'ourthgco';
    var $password = '70Juu94ojU';
    var $dbname = 'ourthgco_godsweb';

    var $conn;
    function getConnstring() {
        $con = mysqli_connect($this->servername, $this->username, $this->password, $this->dbname) or die("Connection failed: " . mysqli_connect_error());

        /* check connection */
        if (mysqli_connect_errno()) {
            printf("Connect failed: %s\n", mysqli_connect_error());
            exit();
        } else {
            $this->conn = $con;
        }
        return $this->conn;
    }
}
?>