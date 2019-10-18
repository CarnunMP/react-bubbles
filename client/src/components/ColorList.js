import React, { useState } from "react";
import axiosWithAuth from "../axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    const editedColor = {
      code: {hex: colorToEdit.code.hex},
      color: colorToEdit.color,
      id: colorToEdit.id,
    }
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, editedColor)
      .then(res => {
        const newColor = res.data;
        let newColors = colors;
        newColors[colors.findIndex(color => color.id === newColor.id)] = newColor;
        updateColors(newColors);
        setEditing(false);
      })
      .catch(err => {
        alert(`ColorList.js, saveEdit(e): ${err.message}`);
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        const deletedColorId = res.data;
        const newColors = colors.filter(color => color.id !== deletedColorId);
        updateColors(newColors);
        setEditing(false);
      })
      .catch(err => {
        alert(`ColorList.js, deleteColor(color): ${err.message}`);
      });
  };

  const addNewColor = (formValues, actions) => {
    const colorToPost = {
        color: formValues.color,
        code: {hex: formValues.code}
      };
    debugger

    axiosWithAuth().post("http://localhost:5000/api/colors/", colorToPost)
      .then(res => {
        const newColors = res.data;
        updateColors(newColors);
        actions.resetForm();
      })
      .catch(err =>{
        alert(`ColorList.js, addNewolor(formValues, actions): ${err.message}`);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span className="delete" onClick={() => deleteColor(color)}>
              x
            </span>
            <span>
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <Formik
        initialValues={{color: "", code: ""}}
        onSubmit={addNewColor}
        validationSchema={
          yup.object().shape({
            color: yup.string().required("*color name required"),
            code: yup.string()
              .test(
                "code",
                "code must start with '#' and be seven characters long",
                value => value !== undefined && value[0] === "#" && value.length === 7,
              ),
          })
        }
        render={props => (
          <Form>
            <div className="field">
              <Field name="color" type="text" placeholder="color name" />
              <ErrorMessage name="color" component="div" />
            </div>
            <div className="field">
              <Field name="code" type="text" placeholder="hex code" />
              <ErrorMessage name="code" component="div" />
            </div>
            <button type="submit">Add Color</button>
          </Form>
        )}
      />
    </div>
  );
};

export default ColorList;
