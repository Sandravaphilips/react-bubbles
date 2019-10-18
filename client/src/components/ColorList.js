import React, { useState } from "react";
import axiosWithAuth from "../axios";
import AddColor from "./AddColor";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({colors, updateColors}) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorId, setColorId] = useState(null);
  const [addFriend, setAddFriend] = useState(false);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    const newColor = colors.find(colorEdit => color === colorEdit)
    setColorId(newColor.id)
  };
  
  const saveEdit = ( colorId) => {
    // e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorId}`,
    colorToEdit)
    .then(() => {
      setColorId(null)
    })
    .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(response => {
      updateColors(colors.filter(color => color.id !== response.data))
    })
  };
  
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} >
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              <span onClick={() => editColor(color)} >{color.color}</span>
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>

      <button onClick={() => setAddFriend(true)} >Add Color</button>

      {addFriend && (
        <AddColor />
      )}

      {editing && (
        <form onSubmit={() => saveEdit(colorId)}>
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
    </div>
  );
};

export default ColorList;
