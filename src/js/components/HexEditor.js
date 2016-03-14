import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/HexEditor.css";
import {StringToArray, GetRandomByteArray, IsHexCharacterCode} from "../utils.js"

import HexStatusBar from "./HexStatusBar.js"
import HexOffsets from "./HexOffsets.js"
import HexText from "./HexText.js"
import HexBytes from "./HexBytes.js"

export default class HexEditor extends React.Component {
    render() {
        return (
            <div className="hex-editor container">
                <div className="page-header">
                    <h1>HexEditor</h1>
                </div>
                
                <div className="row">
                    <div className="col-md-2 monospaced-font">
                        <HexOffsets
                            data={this.state.data}
                            setCurrentOffset={this.setCurrentOffset.bind(this)}
                        />
                    </div>

                    <div className="col-md-5 monospaced-font">
                        <HexBytes
                            data={this.state.data}
                            setCurrentOffset={this.setCurrentOffset.bind(this)}
                            setCurrentEditMode={this.setCurrentEditMode.bind(this)}
                        />
                    </div>

                    <div className="col-md-5 monospaced-font">
                        <HexText
                            data={this.state.data}
                            setCurrentOffset={this.setCurrentOffset.bind(this)}
                            setCurrentEditMode={this.setCurrentEditMode.bind(this)}
                        />
                    </div>
                </div>
                <div className="row">
                    <HexStatusBar
                        cur_offset={this.state.cur_offset}
                        writes_ascii={this.state.writes_ascii}
                        data_size={this.state.data.length}
                    />
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            cur_offset: 0,
            writes_ascii: true,
            first_nibble: true 
        };
    }

    setCurrentEditMode(mode) {
        this.setState({
            writes_ascii: mode === "ascii",
            first_nibble: true
        });
    }

    setCurrentOffset(cur_offset) {
        this.setState({cur_offset: cur_offset});
    }

    random_data() {
        const hex_data = GetRandomByteArray(256);
        this.setState({ data: hex_data });
    }

    handleASCIIWrite(code) {        
        // Set the new value.
        var new_data = this.state.data;        
        new_data[this.state.cur_offset] = code;

        // If we are at the last byte don't increment the offset.
        var increment = (this.state.cur_offset + 1 == this.state.data.length) ? 0 : 1;
        this.setState({
            cur_offset: this.state.cur_offset + increment,
            data: new_data,
            first_nibble: true
        });
    }

    handleHexWrite(code) {
        if (!IsHexCharacterCode(code)) {
            console.log("Character is not in [0-9a-fA-F]")
            return;
        }

        // Convert from char code to a hex value.
        const number = parseInt(String.fromCharCode(code), 16);

        // Set the new value.
        var new_data = this.state.data;
        var old_val = new_data[this.state.cur_offset];
    
        if (this.state.first_nibble) {
            new_data[this.state.cur_offset] = (old_val & 0x0f) | (number << 4);
        } else {
            new_data[this.state.cur_offset] = (old_val & 0xf0) | (number << 0);
        }

        // If we are at the last byte don't increment the offset.
        var increment = (this.state.cur_offset + 1 == this.state.data.length ||
            this.state.first_nibble) ? 0 : 1;

        this.setState({
            cur_offset: this.state.cur_offset + increment,
            data: new_data,
            first_nibble: !this.state.first_nibble
        });       
    }

    onKeyDownHandler(e) {
        if (event.defaultPrevented)
            return;
        
        this.state.writes_ascii ? this.handleASCIIWrite(e.charCode) : this.handleHexWrite(e.charCode);        
    }

    onPasteHandler(e) {
        // Get the pasted data and convert it to an Array.
        var pasted_data = StringToArray(e.clipboardData.getData("text/plain"));
        const start = this.state.cur_offset;
        var n = pasted_data.length;
        
        // If we have too much data then we clamp the size.
        if (start + n > this.state.data.length) {
            n = this.state.data.length - start;
            pasted_data = pasted_data.slice(0, n);
        }

        // Create a copy of the origianl state.
        var new_data = this.state.data.slice();

        // Prepare the arguments for the 'slice' call.
        const splice_params = [start, n].concat(Array.from(pasted_data));
        Array.prototype.splice.apply(new_data, splice_params);

        // Calculate the increment.
        const increment = (this.state.cur_offset + n == this.state.data.length) ? n - 1 : n;

        // Update the state.
        this.setState({
            cur_offset: this.state.cur_offset + increment,
            data: new_data,
            first_nibble: true
        });
    }

    componentDidMount() {
        this.random_data();
        document.addEventListener("keypress", this.onKeyDownHandler.bind(this));
        document.addEventListener("paste", this.onPasteHandler.bind(this));
    }    

    componentWillUnmount() {
        document.removeEventListener("keypress", this.onKeyDownHandler);
        document.removeEventListener("paste", this.onPasteHandler);
    }
}
