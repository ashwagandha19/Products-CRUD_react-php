import { useContext, useState } from "react";
import { AppContext } from "../../Context";
import ReactPaginate from 'react-paginate';

const ProductList = () => {
  const {
    products,
    productLength,
    editMode,
    cancelEdit,
    updateProduct,
    deleteProduct,
  } = useContext(AppContext);

  // Storing products new data when they editing their info.
  const [newData, setNewData] = useState({});

  const [pageNumber, setPageNumber]  = useState(0);

  const productsPerPage = 7;
  const pagesVisited = pageNumber * productsPerPage;



  const saveBtn = () => {
    updateProduct(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (id, nume, pret) => {
    setNewData({ id, nume, pret });
    editMode(id);
  };

  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteProduct(id);
    }
  };

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({selected}) => {
    setPageNumber(selected);
  };

  return !productLength ? (
    <p>{productLength === null ? "Loading..." : "Please insert some products."}</p>
  ) : (
    <>
    <table className="highlight tableContainer">
      <thead>
        <tr>
          <th>Nume</th>
          <th>Pret</th>
        </tr>
      </thead>
      <tbody>
        {products
        .slice(pagesVisited, pagesVisited + productsPerPage)
        .map(({ id, nume, pret, isEditing }) => {
          return isEditing === true ? (
            <tr className="tableData" key={id}>
              <td>
                <input
                  type="text"
                  defaultValue={nume}
                  onChange={(e) => updateNewData(e, "nume")}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={pret}
                  onChange={(e) => updateNewData(e, "pret")}
                />
              </td>
              <td className="tableButtons">
                <button className="btn waves-effect green lighten-1" onClick={() => saveBtn()}>
                  Save
                </button>
                <button
                  className="btn waves-effect orange lighten-1"
                  onClick={() => cancelEdit(id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr className="tableActions" key={id}>
              <td>{nume}</td>
              <td>{pret}</td>
              <td className="tableButtons">
                <button 
                  className="blue darken-2 btn waves-effect"
                  onClick={() => enableEdit(id, nume, pret)}
                >
                  Edit
                </button>
                <button
                  className="btn waves-effect red lighten-1"
                  onClick={() => deleteConfirm(id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
          <ReactPaginate 
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"prevBttn"}
          nextLinkClassName={"nextBtn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          />
    </>
  );
};

export default ProductList;