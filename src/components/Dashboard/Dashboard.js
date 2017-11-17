import React, { Component } from "react";
import Menu from '../Menu/Menu.js';
import { showGroup, newTripModal } from '../../ducks/frontEnd';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { addTrip, getAllTrips, getAllDays } from '../../ducks/frontEndABs.js';
import IconButton from 'material-ui/IconButton';
import ActionCancel from 'material-ui/svg-icons/navigation/cancel';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { Link } from "react-router-dom";


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            tripName: '',
            tripDetails: '',
            tripCode: '',
            tripDate: '',
            tripLocation: ''
        }

        this.handleTrips = this.handleTrips.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClosed = this.handleClose.bind(this);
        this.validationName = this.validationName.bind(this);
        this.validationCode = this.validationCode.bind(this);
        this.handleTripName = this.handleTripName.bind(this);
        this.handleTripDetails = this.handleTripDetails.bind(this);
        this.handleTripCode = this.handleTripCode.bind(this);
        this.handleTripDate = this.handleTripDate.bind(this);
        this.handleTripLocation = this.handleTripLocation.bind(this);
        this.tripDisableToggle = this.tripDisableToggle.bind(this);
        this.newTrip = this.newTrip.bind(this);
        this.handleTripDelete = this.handleTripDelete.bind(this);

    }

    componentDidMount() {
        this.props.showGroup(false);
        // this.props.getAllTrips();
    }

    handleTrips() {
        // return this.props.tripArr.map((e, i, arr) => {
        //     return (
        //         <div key={i}>
        //             {e}
        //             <IconButton tooltip="top-center" touch={true} tooltipPosition="top-center" onClick={() => { this.handleTripDelete() }}>
        //                 <ActionCancel />
        //             </IconButton>
        //             <Link to='/trip' className='logo-font' onClick={() => { this.props.getAllDays }}>
        // <IconButton tooltip="top-center" touch={true} tooltipPosition="top-center">
        //                  <ContentCreate />
        //             </IconButton>
        // </Link>
        //         </div>
        //     )
        // })
    }

    handleOpen = () => {
        this.props.newTripModal(true);
    };

    handleClose = () => {
        this.props.newTripModal(false);
    };

    handleTripName(e) {
        this.setState({
            tripName: e
        })
    }
    handleTripDetails(e) {
        this.setState({
            tripDetails: e
        })
    }
    handleTripCode(e) {
        this.setState({
            tripCode: e
        })
    }
    handleTripDate(event, date) {
        this.setState({
            tripDate: date
        })
    }
    handleTripLocation(e) {
        this.setState({
            tripLocation: e
        })
    }

    validationName() {
        if (this.state.tripName === '') {
            return (
                <div>
                    <TextField required
                        hintText="Trip Name"
                        errorText="This field is required"
                        onChange={e => { this.handleTripName(e.target.value) }}
                    /> <br />
                    <br />
                </div>
            )
        } else {
            return (
                <div>
                    <TextField required
                        hintText="Trip Name"
                        onChange={e => { this.handleTripName(e.target.value) }}
                    /> <br />
                    <br />
                </div>
            )
        }
    }
    validationCode() {
        if (this.state.tripCode.length !== 5) {
            return (
                <div>
                    <TextField required
                        hintText="Trip Code - Must Be Five Characters"
                        errorText="This field is required and has to be five characters long"
                        onChange={e => { this.handleTripCode(e.target.value) }}
                        maxLength="5"
                    /> <br />
                    <br />
                </div>
            )
        } else {
            return (
                <div>
                    <TextField required
                        hintText="Trip Code - Must Be Five Characters"
                        onChange={e => { this.handleTripCode(e.target.value) }}
                        maxLength="5"
                    /> <br />
                    <br />
                </div>
            )
        }
    }

    tripDisableToggle() {
        if (this.state.tripName !== '' && this.state.tripCode.length === 5) {
            return false
        } else {
            return true
        }
    }

    newTrip() {
        const tripVar = [this.state.tripDate, this.state.tripName, this.state.tripCode, this.state.tripDetails, this.state.tripLocation]
        let tempTripArr = []
        for (let i = 0; i < tripVar.length; i++) {
            if (tripVar[i] !== '') {
                tempTripArr.push(tripVar[i])
            }
        }
        this.props.addTrip(tempTripArr)
    }

    handleTripDelete(e) {
        this.props.deleteTrip(e)
    }

    render() {
        const actions = [
            <div className='new-day-actions'>
                <RaisedButton
                    label="Ok"
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.handleClose}
                    disabled={this.tripDisableToggle()}
                    onClick={() => { this.newTrip() }}
                />
                <RaisedButton
                    label='Cancel'
                    secondary={true}
                    onClick={this.handleClose}
                    className='new-day-cancel'
                /></div>
        ];
        return (
            <div>
                <Menu />
                <h1>Dashboard</h1>
                <RaisedButton
                    label='Plan A New Trip'
                    labelColor='white'
                    primary={true}
                    style={{ margin: '5px' }}
                    onClick={() => { this.handleOpen() }}
                />
                <Dialog
                    title="Tell us about your future trip!"
                    actions={actions}
                    modal={false}
                    open={this.props.newTripOpen}
                    onRequestClose={this.handleClose}
                >
                    Pick a start date for your trip!
                 <DatePicker hintText="Date Picker" onChange={(x, event) => { this.handleTripDate(x, event) }} />
                    {this.validationName()}
                    {this.validationCode()}
                    <TextField
                        hintText="Trip Location"
                        onChange={e => { this.handleTripLocation(e.target.value) }}
                    /> <br />
                    <br /> <TextField
                        hintText="Trip Details"
                        onChange={e => { this.handleTripDetails(e.target.value) }}
                    /> <br />
                    <br />
                </Dialog>
                <div>{this.handleTrips()}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        gIcon: state.frontEnd.gIcon,
        newTripOpen: state.frontEnd.newTripOpen
    }
}

export default connect(mapStateToProps, { showGroup, newTripModal, addTrip, getAllTrips, getAllDays })(Dashboard);
