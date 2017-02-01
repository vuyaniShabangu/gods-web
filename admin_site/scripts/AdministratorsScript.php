<?php
//include connection file
include("connection.php");
$db = new dbObj();
$connString =  $db->getConnstring();

$params = $_REQUEST;
$action = $params['action'] !='' ? $params['action'] : '';

if (isset($params['q'])) {
    $adminId = $params['q'];
}

$administratorCls = new Administrator($connString);

switch($action) {
    case 'list':
        $administratorCls->getAdministrators();
        break;

    case 'create':
        $administratorCls->insertAdministrator();
        break;

    case 'update':
        $administratorCls->updateAdministrator();
        break;

    case 'delete':
        $administratorCls->deleteAdministrator($adminId);
        break;

    case 'getOne':
        $administratorCls->getAdministrator($adminId);
        break;

    default:
        return;
}


class Administrator
{
    protected $conn;
    protected $data = array();

    function __construct($connString)
    {
        $this->conn = $connString;
    }

    function getAdministrators()
    {
        $data = array();
        $sql = "SELECT * FROM administrator WHERE active = 1";

        $queryRecords = mysqli_query($this->conn, $sql);// or die("error to fetch churches data");
        $count = 0;

        while ($row = mysqli_fetch_assoc($queryRecords)) {
            $data[] = $row;
            $count .= $count;
        }

        echo json_encode($data);  // send data as json format*/
    }

    function getAdministrator($adminId)
    {
        $data = array();
        $sql = "SELECT * FROM administrator WHERE active = 1 and id = " . $adminId;

        $queryRecords = mysqli_query($this->conn, $sql);// or die("error to fetch churches data");

        while ($row = mysqli_fetch_assoc($queryRecords)) {
            $data[] = $row;
        }

        echo json_encode($data);  // send data as json format*/
    }

    function insertAdministrator()
    {
        $sql = "INSERT INTO administrator(name, surname, email, password, phone_number, active, timestamp)";
        $sql .= "VALUES('" . $_POST["name"] . "', '" . $_POST["surname"] . "', '" . $_POST["email"] . "'";
        $sql .= ", '" . md5($_POST["password"]) . "', '" . $_POST["phone_number"] . "', 1, now());";

        //Insert record into database
        $result = mysqli_query($this->conn, $sql);

        if (!$result)
        {
            $result = mysqli_error($this->conn);
        }

        if ($result)
        {
            header("Location: ../administrators.php");
        }
    }

    function updateAdministrator()
    {
        $adminId = $_POST["adminId"];

        $sql = "UPDATE administrator SET name = '" . $_POST["name"] . "', surname = '" . $_POST["surname"] . "'";
        $sql .= ", email = '" . $_POST["email"] . "', password = '" . md5($_POST["password"]) . "', phone_number = '" . $_POST["phone_number"] . "',";
        $sql .= "timestamp = now() WHERE id = " . $adminId . ";";
        //Update record in database
        $result = mysqli_query($this->conn, $sql);

        if (!$result)
        {
            $result = mysqli_error($this->conn);
        }

        if ($result)
        {
            header("Location: ../administrators.php");
        }
    }

    function deleteAdministrator($adminId)
    {
        //Delete from database
        $sql = "UPDATE administrator SET active = 0, timestamp = now() WHERE id = " . $adminId;

        $result = mysqli_query($this->conn, $sql);

        if (!$result)
        {
            $result = mysqli_error($this->conn);
        }
        
        print json_encode($result);
    }
}
?>