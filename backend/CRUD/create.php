<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // include database and models files
    include_once '../config/db_conn.php';
    include_once '../Models/Product.php';

    $database = new Dbh();
    $db = $database->connect();

    $product = new Product($db);

    $data = json_decode(file_get_contents("php://input"));

    $product->nume = $data->nume;
    $product->pret = $data->pret;

    var_dump($product);
    
    if($product->create()){
        echo 'Product created successfully.';
    } else{
        echo 'Product could not be created.';
    }
?>