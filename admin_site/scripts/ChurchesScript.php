<?php
//include connection file
include("connection.php");
$db = new dbObj();
$connString =  $db->getConnstring();

$params = $_REQUEST;
$action = $params['action'] !='' ? $params['action'] : '';

if (isset($params['q'])) {
    $churchId = $params['q'];
}

$churchCls = new Church($connString);

switch($action) {
    case 'list':
        $churchCls->getChurches();
        break;

    case 'create':
        $churchCls->insertChurch();
        $churchCls->UploadDocument();
        break;

    case 'update':
        $churchCls->updateChurch();
        $churchCls->UploadDocument();
        break;

    case 'delete':
        $churchCls->deleteChurch($churchId);
        break;

    case 'getOne':
        $churchCls->getChurch($churchId);
        break;

    default:
        return;
}


class Church
{
    protected $conn;
    protected $data = array();

    function __construct($connString)
    {
        $this->conn = $connString;
    }

    function getChurches()
    {
        $data = array();
        $sql = "SELECT * FROM church WHERE active = 1";

        $queryRecords = mysqli_query($this->conn, $sql);// or die("error to fetch churches data");
        $count = 0;

        while ($row = mysqli_fetch_assoc($queryRecords)) {
            $data[] = $row;
            $count .= $count;
        }

        echo json_encode($data);  // send data as json format*/
    }

    function getChurch($churchId)
    {
        $data = array();
        $sql = "SELECT * FROM church WHERE active = 1 and id = " . $churchId;

        $queryRecords = mysqli_query($this->conn, $sql);// or die("error to fetch churches data");

        while ($row = mysqli_fetch_assoc($queryRecords)) {
            $data[] = $row;
        }

        echo json_encode($data);  // send data as json format*/
    }

    function insertChurch()
    {
        $sql = "INSERT INTO church(name, leadingMember, address, description, active, timestamp)";
        $sql .= "VALUES('" . $_POST["name"] . "', '" . $_POST["leader"] . "', '" . $_POST["address"] . "'";
        $sql .= ", '" . $_POST["description"] . "', 1, now());";

        //Insert record into database
        $result = mysqli_query($this->conn, $sql);

        if (!$result)
        {
            $result = mysqli_error($this->conn);
        }

        if ($result)
        {
            header("Location: ../churches.php");
        }
    }

    function UploadDocument()
    {
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
        $uploadOk = 1;
        $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
            $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
            if($check !== false) {
                echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                echo "File is not an image.";
                $uploadOk = 0;
            }
        }
// Check if file already exists
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
// Check file size
        if ($_FILES["fileToUpload"]["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
// Allow certain file formats
        if($imageFileType != "docx" && $imageFileType != "doc" && $imageFileType != "pdf"
            && $imageFileType != "gif" ) {
            echo "Sorry, only DOC, DOCX, PDF files are allowed.";
            $uploadOk = 0;
        }
// Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    }

    function updateChurch()
    {
        $churchId = $_POST["churchId"];

        if (isset($_POST["leader"]))
        {
            $leader = $_POST["leader"];
        }

        $sql = "UPDATE church SET name = '" . $_POST["name"] . "', leadingMember = '" . $leader . "'";
        $sql .= ", address = '" . $_POST["address"] . "', description = '" . $_POST["description"] . "',";
        $sql .= "timestamp = now() WHERE id = " . $churchId . ";";
        //Update record in database
        $result = mysqli_query($this->conn, $sql);

        if (!$result)
        {
            $result = mysqli_error($this->conn);
        }

        if ($result)
        {
            header("Location: ../churches.php");
        }
    }

    function deleteChurch($churchId)
    {
        //Delete from database
        $sql = "UPDATE church SET active = 0, timestamp = now() WHERE id = " . $churchId;

        $result = mysqli_query($this->conn, $sql);

        if (!$result)
        {
            $result = mysqli_error($this->conn);
        }

        print json_encode($result);
    }
}
?>