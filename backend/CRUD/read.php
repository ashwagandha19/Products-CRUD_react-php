<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and models files
include_once '../config/db_conn.php';
include_once '../Models/Product.php';

// instantiate database and product object
$database = new Dbh();
$db = $database->connect();

$product = new Product($db);

$stmt = $product->read();
$productCount = $stmt->rowCount();

// check if more than 0 record found
if($productCount > 0){

    // products array
    $products_arr=array();
    $products_arr["products"] = array();
    $products_arr["productCount"]=$productCount;

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $e = array(
            "id" => $id,
            "nume" => $nume,
            "pret" => $pret,
        );

        array_push($products_arr["products"], $e);
    }
    echo json_encode($products_arr);
}

else{
    http_response_code(404);
    echo json_encode(
        array("message" => "No record found.")
    );
}
