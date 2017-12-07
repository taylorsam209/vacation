import React, { Component } from "react";
import Menu from '../Menu/Menu.js';
import { showGroup, newTripModal, updateTripList, searchTripModal, getTripByCode, getCurrentUserID, createNewTrip, updateCurrentTrip, deleteSelectedTrip, updateDaysList } from '../../ducks/frontEnd';
import { connect } from 'react-redux';
import './Dashboard.css';
import mountainLandscape from '../../assets/images/tripPlaceholders/mountain-landscape.jpg';
import serengeti from '../../assets/images/tripPlaceholders/serengeti.jpg';
// Components
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Card, CardText, CardMedia, CardTitle } from 'material-ui/Card';
import { getAllTrips, getAllDays } from '../../ducks/frontEndABs.js';
import IconButton from 'material-ui/IconButton';
import ActionCancel from 'material-ui/svg-icons/navigation/cancel';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { Link } from "react-router-dom";

const tripPlaceholders = [
    serengeti,
    mountainLandscape
];

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            user_id: 0,
            date: "",
            trip_name: "",
            trip_code: "",
            trip_location: "",
            trip_details: ""
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
        this.searchTrip = this.searchTrip.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentUserID();
        this.props.showGroup(false);
        console.log("gIcon Results:", this.props.showGroup);
        this.props.updateTripList(this.props.user_id);
    }

    componentWillReceiveProps(nextProps) {
        //nextProps.updateTripList(nextProps.user_id);
    }

    handleTrips(tripList) {
        return tripList.map((trip, index) => {
            return (

                <Card key={index} className='trip'> <Link to={`/trip/${trip.trip_id}`} onClick={() => {
                    this.props.updateCurrentTrip(trip.trip_id), this.props.updateDaysList(trip.trip_id)
                }
                }>
                    <CardMedia
                        overlay={<CardTitle
                            title={trip.trip_name}
                            subtitle={trip.trip_location}
                        />}
                    >
                        <img
                            src={trip.trip_image || tripPlaceholders[0]}
                            alt={trip.trip_name}
                        />
                    </CardMedia>
                    <CardText>
                        {trip.date}

                    </CardText>
                </Link>
                <RaisedButton
                  label='Cancel Trip'
                  secondary={true}
                  onClick={() => this.handleTripDelete(trip)}
                  style={{marginBottom: '5px'}}
                />
                </Card>

            )
        })
    }

    handleOpen = () => {
        this.props.newTripModal(true);
    };

    handleClose = () => {
        this.props.newTripModal(false);
        this.setState({
            tripName: '',
            tripDetails: '',
            tripCode: '',
            tripDate: '',
            tripLocation: ''
        });
    };
    handleSearchOpen = () => {
        this.props.searchTripModal(true);
    };
    handleSearchClose = () => {
        this.props.searchTripModal(false);
    };

    handleTripName(e) {
        this.setState({
            trip_name: e
        })
    }
    handleTripDetails(e) {
        this.setState({
            trip_details: e
        })
    }
    handleTripSearch(e) {
        this.setState({
            searchText: e
        })
    }
    handleTripCode(e) {
        this.setState({
            trip_code: e
        })
    }
    handleTripDate(event, date) {
        console.log(event)
        let month = date.getMonth() + 1
        let day = date.getDate()
        let year = date.getFullYear()
        this.setState({
            date: `${month}/${day}/${year}`
        })
        console.log(date);
    }
    handleTripLocation(e) {
        this.setState({
            trip_location: e
        })
    }

    validationName() {
        if (this.state.trip_name === '') {
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
        if (this.state.trip_code.length !== 5) {
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
        if (this.state.trip_code !== '' && this.state.trip_code.length === 5) {
            return false
        } else {
            return true
        }
    }
    searchTripDisableToggle() {
        if (this.state.trip_code.length === 5) {
            return false
        } else {
            return true
        }
    }

    newTrip() {
        let tripObj = this.state;

        this.props.createNewTrip(tripObj)
    }

    handleTripDelete(e) {
        console.log("trip id", e.trip_id)
        this.props.deleteSelectedTrip(e.trip_id)
    }
    searchTrip() {
        console.log("Constant Call?")
        this.props.getTripByCode(this.state.trip_code, this.props.user_id)
    }

    render() {
        const searchActions = [
            <div className='new-day-actions'>
                <RaisedButton
                    label="Ok"
                    primary={true}
                    keyboardFocused={true}
                    onClick={() => { this.handleSearchClose(), this.searchTrip() }}
                    disabled={this.searchTripDisableToggle()}
                />
                <RaisedButton
                    label='Cancel'
                    secondary={true}
                    onClick={this.handleSearchClose}
                    className='new-day-cancel'
                /></div>
        ];
        const actions = [
            <div className='new-day-actions'>
                <RaisedButton
                    label="Ok"
                    primary={true}
                    keyboardFocused={true}
                    onClick={() => { this.handleClose(), this.newTrip() }}
                    disabled={this.tripDisableToggle()}
                />
                <RaisedButton
                    label='Cancel'
                    secondary={true}
                    onClick={this.handleClose}
                    className='new-day-cancel'
                /></div>
        ];
        const { currentTrip, tripList, user_id } = this.props;
        if(user_id && tripList.length === 0){
          this.props.updateTripList(user_id);
        }
        return (
            <div id="Dashboard">
                <Menu />
                <h4 className='dash-header'>Recently viewed:</h4>
                <Card className='recently-viewed-trip' zDepth={3}>
                    <CardTitle
                        title={currentTrip ? currentTrip.trip_name : ''}
                    // subtitle={currentTrip ? currentTrip.trip_location : ''}
                    />
                    <CardMedia>
                        <img src={mountainLandscape} />
                        {/* <img src={currentTrip ? currentTrip.trip_image : mountainLandscape} /> */}
                    </CardMedia>
                    <CardText>
                        <p>{currentTrip ? currentTrip.trip_location : ''}</p>
                        <p>{currentTrip ? currentTrip.trip_details : ''}</p>
                    </CardText>
                </Card>
                <RaisedButton
                    label='Enter Trip Code'
                    labelColor='white'
                    primary={true}
                    style={{ margin: '5px' }}
                    onClick={() => { this.handleSearchOpen() }} />
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
                <Dialog
                    title="Enter the Five Character Code to Search"
                    actions={searchActions}
                    modal={false}
                    open={this.props.searchTripOpen}
                    onRequestClose={this.handleSearchClose}
                >
                    <br /> <TextField
                        hintText="Five Character Code Here"
                        maxLength="5"
                        onChange={e => { this.handleTripCode(e.target.value) }}
                    /> <br />
                    <br />
                </Dialog>
                { tripList.length ?
                  <section className='trip-display'>
                    {this.handleTrips(tripList)}
                  </section>
                  : null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_id: state.frontEnd.user_id,
        tripList: state.frontEnd.tripList,
        gIcon: state.frontEnd.gIcon,
        newTripOpen: state.frontEnd.newTripOpen,
        currentTrip: state.frontEnd.currentTrip,
        searchTripOpen: state.frontEnd.searchTripOpen
    }
}

export default connect(mapStateToProps, { showGroup, newTripModal, updateTripList, searchTripModal, createNewTrip, getAllTrips, getAllDays, getTripByCode, getCurrentUserID, updateCurrentTrip, deleteSelectedTrip, updateDaysList })(Dashboard);
