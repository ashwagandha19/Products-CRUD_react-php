import { useState, useContext } from "react";
import { AppContext } from "../../Context";

import { useFormik } from 'formik';
import * as Yup from 'yup';

const Form = () => {
  const { insertProduct } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      nume: "",
      pret: "",
    },
    validationSchema: Yup.object({
      nume: Yup.string()
      .trim()
      .max(15, "Must be 15 characters or less")
      .required("The product name is a required field"),
      pret: Yup.number()
      .required("The price is a required field")
    }),
    onSubmit: () => {
      insertProduct(newProduct);
      formik.resetForm({});
    }
  });
  let newProduct = formik.values;

  return (
    <div className="insertFormContainer">
    <form className="insertForm" onSubmit={formik.handleSubmit}>
      <h2>Add product</h2>
      <div className="input-field col s6">
        <label htmlFor="nume" className="formLabel">Nume</label>
        <input
          type="text"
          id="nume"
          placeholder="Nume"
          autoComplete="off"
          required
          className="formInput"
          onChange={formik.handleChange}
          value={formik.values.nume}
          onBlur={formik.handleBlur}
        />
        {formik.errors.nume && formik.touched.nume ? <p className="inputError">{formik.errors.nume}</p> : null}
      </div>

      <div className="input-field col s6">
        <label htmlFor="pret" className="formLabel">Pret</label>
        <input
          type="text"
          id="pret"
          placeholder="Pret"
          autoComplete="off"
          required
          className="formInput"
          onChange={formik.handleChange}
          value={formik.values.pret}
          onBlur={formik.handleBlur}
        />
        {formik.errors.pret && formik.touched.pret ? <p className="inputError">{formik.errors.pret}</p> : null}
      </div>
      <button className="btn waves-effect orange darken-1" type="submit" name="action" value="Insert">
          Insert Product
      </button>
    </form>
    </div>
  );
};

export default Form;