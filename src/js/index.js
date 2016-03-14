import React from "react";
import ReactDOM from "react-dom";
import HexEditor from "./components/HexEditor.js";

const content = document.getElementById('content');
ReactDOM.render(
    <HexEditor/>,
    content
);