import { useEffect, useState } from "react";
import axios from 'axios';

export const Actions = () => {
  let [products, setProducts] = useState([]);

  
  let [productLength, setProductLength] = useState(null);


  useEffect(() => {
    axios.get("http://localhost/reactphpcrud/backend/CRUD/read.php")
      .then(res => {
        if(res.data.products) {
            setProducts(res.data.products.reverse());
            setProductLength(true);
        } else {
            setProductLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // insert product
  const insertProduct = (newProduct) => {
    axios.post("http://localhost/reactphpcrud/backend/CRUD/create.php", newProduct)
    .then((res) => {
        if (res) {  
          setProducts([
            {
              ...newProduct,
            },
            ...products,
          ]);
          setProductLength(true);
          console.log(res.data);
        } else {
          alert(res.data.products.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // enable edit
  const editMode = (id) => {
    products = products.map((product) => {
      if (product.id === id) {
        product.isEditing = true;
        return product;
      }
      product.isEditing = false;
      return product;
    });
    setProducts(products);
  };

  // cancel edit
  const cancelEdit = (id) => {
    products = products.map((product) => {
      if (product.id === id) {
        product.isEditing = false;
        return product;
      }
      return product;
    });
    setProducts(products);
  };

  // update product
  const updateProduct = (productData) => {
    axios.post("http://localhost/reactphpcrud/backend/CRUD/update.php", productData)
      .then((res) => {
          products = products.map((product) => {
            if (product.id === productData.id) {
              product.isEditing = false;
              product.nume = productData.nume;
              product.pret = productData.pret;
              return product;
            }
            return product;
          });
          setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete product
  const deleteProduct = (theID) => {
      // filter outing the product
    let productDeleted = products.filter((product) => {
      return product.id !== theID;
    });
    axios.post("http://localhost/reactphpcrud/backend/CRUD/delete.php", {id: theID })
      .then((res) => {
        if (res.status == 200) {
          setProducts(productDeleted);
          if (products.length === 1) {
            setProductLength(0);
          }
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    products,
    editMode,
    cancelEdit,
    updateProduct,
    insertProduct,
    deleteProduct,
    productLength,
  };
};