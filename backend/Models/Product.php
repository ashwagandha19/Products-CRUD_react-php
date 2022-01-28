<?php
class Product {

// database connection
public $conn;

// object properties
public $id;
public $nume;
public $pret;

// db conn
public function __construct($db){
  $this->conn = $db;
}

public function read(){

  // select all query
  $query = "SELECT * FROM products";

  // prepare query statement
  $stmt = $this->conn->prepare($query);
  // execute query
  $stmt->execute();
  return $stmt;
}

public function create() {

  $query = "INSERT INTO products SET nume=:nume, pret=:pret";
  
  $stmt = $this->conn->prepare($query);
  
  $this->nume=htmlspecialchars(strip_tags($this->nume));
  $this->pret=htmlspecialchars(strip_tags($this->pret));
  
  // bind values 
  $stmt->bindParam(":nume", $this->nume);
  $stmt->bindParam(":pret", $this->pret);
  
  if($stmt->execute()){
      return true;
  }else{
      return false;
  }
}

public function update() {

  $query = "UPDATE Products SET nume = :nume, pret = :pret WHERE id = :id";
  
  $stmt = $this->conn->prepare($query);
  
  // posted values
  $this->nume=htmlspecialchars(strip_tags($this->nume));
  $this->pret=htmlspecialchars(strip_tags($this->pret));
  
  // bind parameters
  $stmt->bindParam(":nume", $this->nume);
  $stmt->bindParam(":pret", $this->pret);
  $stmt->bindParam(":id", $this->id);
  
    // execute the query
    if($stmt->execute()){
        return true;
    }
  
    return false;
}

public function delete(){
  
  $query = "DELETE FROM Products WHERE id = :id";
    
  $stmt = $this->conn->prepare($query);

  $this->id=htmlspecialchars(strip_tags($this->id));
  
  $stmt->bindParam(":id", $this->id);

  if($result = $stmt->execute()){
      return true;
  }else{
      return false;
  }
}
}
?>