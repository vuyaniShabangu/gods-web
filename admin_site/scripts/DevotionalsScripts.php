<?php
//include connection file
include("connection.php");
$db = new dbObj();
$connString =  $db->getConnstring();

$params = $_REQUEST;
$action = $params['action'] !='' ? $params['action'] : '';
$devotionalCls = new Devotional($connString);

switch($action) {
    case 'list':
        $devotionalCls->getDevotionals();
        break;

    case 'create':
        $devotionalCls->insertDevotional();
        break;

    case 'update':
        $devotionalCls->updateDevotional();
        break;

    case 'delete':
        $devotionalCls->deleteDevotional();
        break;

    default:
        return;
}


class Devotional
{
    protected $conn;
    protected $data = array();

    function __construct($connString)
    {
        $this->conn = $connString;
    }

    function getDevotionals()
    {
        $data = array();
        $sql = "SELECT * FROM church ";

        $queryRecords = mysqli_query($this->conn, $sql);// or die("error to fetch churches data");
        $count = 0;

        while ($row = mysqli_fetch_assoc($queryRecords)) {
            $data[] = $row;
            $count .= $count;
            //echo "<pre>";print_R($data);die;
        }

        $json_data = array(
            "Result" => 'OK',
            "Records" => $data,
            "TotalRecordCount" => $count
        );

        echo json_encode($json_data);  // send data as json format*/
    }

    function insertDevotional()
    {
        //Insert record into database
        $result = mysqli_query("INSERT INTO people(Name, Age, RecordDate) VALUES('" . $_POST["Name"] . "', " . $_POST["Age"] . ",now());");

        //Get last inserted record (to return to jTable)
        $result = mysqli_query("SELECT * FROM people WHERE PersonId = LAST_INSERT_ID();");
        $row = mysqli_fetch_array($result);

        //Return result to jTable
        $jTableResult = array();
        $jTableResult['Result'] = "OK";
        $jTableResult['Record'] = $row;
        print json_encode($jTableResult);
    }

    function updateDevotional()
    {
        //Update record in database
        $result = mysqli_query("UPDATE people SET Name = '" . $_POST["Name"] . "', Age = " . $_POST["Age"] . " WHERE PersonId = " . $_POST["PersonId"] . ";");

        //Return result to jTable
        $jTableResult = array();
        $jTableResult['Result'] = "OK";
        print json_encode($jTableResult);
    }

    function deleteDevotional()
    {
        //Delete from database
        $result = mysqli_query("DELETE FROM people WHERE PersonId = " . $_POST["PersonId"] . ";");

        //Return result to jTable
        $jTableResult = array();
        $jTableResult['Result'] = "OK";
        print json_encode($jTableResult);
    }
}
?>