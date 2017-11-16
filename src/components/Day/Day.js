import React, { Component } from "react";
import Menu from '../Menu/Menu.js';
import { showGroup } from '../../ducks/reducer';
import { connect } from 'react-redux';

class Day extends Component {
    componentDidMount() {
        this.props.showGroup(true);
    }
    render() {
        return (
            <div>
                <Menu />
                <h1>Day</h1>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        gIcon: state.gIcon
    }
}

export default connect(mapStateToProps, { showGroup })(Day);