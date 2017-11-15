import React, { Component } from "react";
import Menu from '../Menu/Menu.js';

class Trip extends Component {
    render() {
        return (
            <div>
                <Menu />
                <h1>Current Trip</h1>
            </div>
        )
    }
}

export default Trip