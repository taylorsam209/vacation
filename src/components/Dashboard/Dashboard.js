import React, { Component } from "react";
import Menu from '../Menu/Menu.js';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Menu />
                <h1>Dashboard</h1>
            </div>
        )
    }
}

export default Dashboard;