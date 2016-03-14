import React from "react";
import {AddLeadingZeros} from "../utils.js"

export default class HexOffsets extends React.Component {
    handleOnClick(e) {
        if (e.target !== e.currentTarget) {
            var cur_offset = parseInt(e.target.getAttribute("data-offset"));
            this.props.setCurrentOffset(cur_offset);
        }
        
        e.stopPropagation();
    }

    render() {
        var offsets = []
        for (var i = 0; i < this.props.data.length; i += 16) {
            offsets.push(
                <div key={i} data-offset={i}>
                    {AddLeadingZeros(i, 8)}
                </div>
            );
        }

        return (
            <div className="hex-offsets" onClick={this.handleOnClick.bind(this)}>
                {offsets}
            </div>
        );
    }
}
