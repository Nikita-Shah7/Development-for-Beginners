import React, { useState, memo } from "react";
import Values from "values.js";

import Header from "./components/Header";
import ColorForm from "./components/ColorForm";
import ColorChart from "./components/ColorChart";
import "./App.scss";


function App() {

  const [ color, setColor ] = useState("#123456");
  const [ list, setList ] = useState([]);
  const [ submitted, setSubmitted ] = useState(false);

  // setColor('#ff2233');
  const colorHandler = (colorKey) => {
    setColor(colorKey);
    console.log(color);
    setSubmitted(true);
    const colors = new Values(color).all(10);
    setList(colors);
    // console.log(list);    
  }

  return (
    <>
      <Header />
      <ColorForm Color={color} CHandler={colorHandler}/>
      <ColorChart Color={color} ColorList={list} />
    </>
  );
}

export default memo(App);
