import React, { Component } from "react";
import Menu from '../Menu/Menu.js';
import { showGroup, newTripModal } from '../../ducks/reducer';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const richBlack = '#02111b';
const dodgerBlue = '#1098f7';
const green = '#00825D'

class Dashboard extends Component {


    componentDidMount() {
        this.props.showGroup(false);
        console.log("gIcon Results:", this.props.showGroup)
    }

    handleTrips() {
        const tempArr = ["Logan", "Taylor", "Jared", "Scott", "Logan", "Taylor", "Jared", "Scott", "Logan", "Taylor", "Jared", "Scott"]
        return tempArr.map((e, i, arr) => {
            return (
                <div>
                    {e}
                </div>
            )
        })
    }

    handleOpen = () => {
        console.log("New Trip Modal Opened")
        this.props.newTripModal(true);
    };

    handleClose = () => {
        this.props.newTripModal(false);
    };

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        return (
            <div>
                <Menu />
                <h1>Dashboard</h1>
                <RaisedButton
                    label='Plan A New Trip'
                    labelColor='white'
                    backgroundColor={dodgerBlue}
                    style={{ margin: '5px' }}
                    onClick={() => { this.handleOpen() }}
                />
                <Dialog
                    title="Dialog With Date Picker"
                    actions={actions}
                    modal={false}
                    open={this.props.newTripOpen}
                    onRequestClose={this.handleClose}
                >
                    Open a Date Picker dialog from within a dialog.
                 <DatePicker hintText="Date Picker" />
                </Dialog>
                <div>{this.handleTrips()}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        gIcon: state.gIcon,
        newTripOpen: state.newTripOpen
    }
}

export default connect(mapStateToProps, { showGroup, newTripModal })(Dashboard);