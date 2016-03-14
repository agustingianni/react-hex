import React from "react";
import {AddLeadingZeros} from "../utils.js"

export default class HexBytes extends React.Component {
    handleOnClick(e) {
        // Set the writing mode to hex.
        this.props.setCurrentEditMode("hex");

        if (e.target !== e.currentTarget) {
            var cur_offset = parseInt(e.target.getAttribute("data-offset"));
            this.props.setCurrentOffset(cur_offset);
        }
        
        e.stopPropagation();
    }

    handleOnMouseOver(e) {
        if (e.target !== e.currentTarget) {
            e.target.style.background = "#C7E8FF";
        }
        
        e.stopPropagation();
    }

    handleOnMouseOut(e) {
        if (e.target !== e.currentTarget) {
            e.target.style.background = "#ffffff";
        }
        
        e.stopPropagation();
    }

    render() {
        var bytes = Array.prototype.map.call(this.props.data, function(val, i) {
            return (
                <span key={i} data-offset={i}>
                    {AddLeadingZeros(val, 2)} 
                </span>
            );
        });

        return (
            <div className="hex-bytes"
                    onMouseOver={this.handleOnMouseOver.bind(this)}
                    onMouseOut={this.handleOnMouseOut.bind(this)}
                    onClick={this.handleOnClick.bind(this)}>
                {bytes}
            </div>
        );
    }
}