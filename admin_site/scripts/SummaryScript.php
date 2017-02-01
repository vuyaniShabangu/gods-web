<?php
//include connection file
include("connection.php");
$db = new dbObj();
$connString =  $db->getConnstring();

$params = $_REQUEST;
$action = $params['action'] !='' ? $params['action'] : '';

$summaryCls = new Summary($connString);

switch($action) {
    case 'churches':
        $summaryCls->getChurchesSummary();
        break;

    case 'devotions':
        $summaryCls->getDevotionsSummary();
        break;

    case 'admins':
        $summaryCls->getAdminsSummary();
        break;

    case 'events':
        $summaryCls->getEventsSummary();
        break;

    default:
        return;
}


class Summary
{
    protected $conn;
    protected $data = array();

    function __construct($connString)
    {
        $this->conn = $connString;
    }

    function getChurchesSummary()
    {
        $data = array();
        $sql = "SELECT * FROM church WHERE active = 1 ORDER BY timestamp DESC;";

        $queryRecords = mysqli_query($this->conn, $sql);// or die("error to fetch churches data");
        $count = 0;

        while ($row = mysqli_fetch_assoc($queryRecords)) {
            $data[] = $row;
            $count .= $count;
        }

        echo json_encode($data);  // send data as json format*/
    }

    function getDevotionsSummary()
    {
        $data = array();
        $sql = "SELECT * FROM devotions WHERE active = 1 ORDER BY timestamp DESC;";

        $queryRecords = mysqli_query($this->conn, $sql);// or die("error to fetch churches data");
        $count = 0;

        while ($row = mysqli_fetch_assoc($queryRecords)) {
            $data[] = $row;
            $count .= $count;
        }

        echo json_encode($data);  // send data as json format*/
    }

    function getAdminsSummary()
    {
        $data = array();
        $sql = "SELECT * FROM administrator WHERE active = 1 ORDER BY timestamp DESC;";

        $queryRecords = mysqli_query($this->conn, $sql);// or die("error to fetch churches data");
        $count = 0;

        while ($row = mysqli_fetch_assoc($queryRecords)) {
            $data[] = $row;
            $count .= $count;
        }

        echo json_encode($data);  // send data as json format*/
    }

    function getEventsSummary()
    {
        $data = array();
        $sql = "SELECT * FROM events WHERE active = 1 ORDER BY timestamp DESC;";

        $queryRecords = mysqli_query($this->conn, $sql);// or die("error to fetch churches data");
        $count = 0;

        while ($row = mysqli_fetch_assoc($queryRecords)) {
            $data[] = $row;
            $count .= $count;
        }

        echo json_encode($data);  // send data as json format*/
    }
}
?>