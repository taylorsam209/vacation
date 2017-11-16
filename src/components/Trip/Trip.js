import React, { Component } from "react";
import Menu from '../Menu/Menu.js';
import { showGroup } from '../../ducks/reducer';
import { connect } from 'react-redux';

class Trip extends Component {
    componentDidMount() {
        this.props.showGroup(true);
    }
    render() {
        return (
            <div>
                <Menu />
                <h1>Current Trip</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        gIcon: state.gIcon
    }
}

export default connect(mapStateToProps, { showGroup })(Trip);