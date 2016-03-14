import React from "react";
import {AddLeadingZeros} from "../utils.js"

export default class HexStatusBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    Current byte: 0x{AddLeadingZeros(this.props.cur_offset, 8)}
                </div>
                
                <div>
                    Data size: 0x{AddLeadingZeros(this.props.data_size, 8)}
                </div>
                
                <div>
                    Writting mode: {this.props.writes_ascii ? "ASCII" : "HEX"}
                </div>
            </div>
        );
    }
}
