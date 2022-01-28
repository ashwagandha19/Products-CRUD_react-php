<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// include database and models files
include_once '../config/db_conn.php';
include_once '../Models/Product.php';

// get database connection
$database = new Dbh();
$db = $database->connect();

 // prepare product object
$product = new Product($db);

 // get posted data
$data = json_decode(file_get_contents("php://input"));


$product->id = $data->id;
var_dump($product->id);
    
if($product->delete()){
    echo json_encode("Product deleted.");
} else{
    echo json_encode("Data could not be deleted");
}
?>