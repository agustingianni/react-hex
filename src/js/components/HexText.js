import React from "react";
import {GetASCIIOrDot} from "../utils.js"

export default class HexText extends React.Component {
    handleOnClick(e) {
        // Set the writing mode to hex.
        this.props.setCurrentEditMode("ascii");

        if (e.target !== e.currentTarget) {
            var cur_offset = parseInt(e.target.getAttribute("data-offset"));
            this.props.setCurrentOffset(cur_offset);
        }
        
        e.stopPropagation();
    }

    render() {        
        var chars = Array.prototype.map.call(this.props.data, function(val, i) {
            return (
                <span key={i} data-val={val} data-offset={i}>
                    {GetASCIIOrDot(val)}
                </span>
            );
        });

        return (
            <div className="hex-text" onClick={this.handleOnClick.bind(this)}>
                {chars}
            </div>
        );
    }
}
