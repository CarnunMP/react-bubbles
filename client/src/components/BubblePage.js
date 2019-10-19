import React, { useState, useEffect } from "react";
import axiosWithAuth from "../axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const [editing, setEditing] = useState(false);
  // ^Moved up to solve prob of constant re-renders when useEffect, below, depends on colorList!

  useEffect(() => {
    axiosWithAuth().get("http://localhost:5000/api/colors")
      .then(res => {
        setColorList(res.data);
      })
      .catch(err => {
        alert(`BubblePage.js: ${err.message}`);
      });
  }, [editing]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} editing={editing} setEditing={setEditing}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
