import React, { Component } from "react";
import { connect } from 'react-redux'
import './Trip.css';
import { showGroup, updateDaysList, createNewDay, deletedSelectedDay, updateCurrentDay, updateEventsList, updateCurrentTrip } from '../../ducks/frontEnd';
import _ from 'lodash';
/* Components*/
import Menu from '../Menu/Menu.js';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { deleteDay, getAllEvents } from '../../ducks/frontEndABs.js';
import IconButton from 'material-ui/IconButton';
import ActionCancel from 'material-ui/svg-icons/navigation/cancel';
import Info from 'material-ui/svg-icons/action/info';
import { Link } from "react-router-dom";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { updateSavedRestaurants, updateSavedRestaurantsData } from '../../ducks/restaurant';
import HandleGetAllDays from './HandleGetAllDays';


class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dayName: 'New Day',
      dayDate: ''
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddDay = this.handleAddDay.bind(this);
    this.handleDayDelete = this.handleDayDelete.bind(this);
    this.handleEventAdaptation = this.handleEventAdaptation.bind(this);
    this.handleAdminAccess = this.handleAdminAccess.bind(this);
  }

  componentDidMount() {
    this.props.showGroup(true);
    // const { currentTrip } = this.props;
    // this.props.showGroup(true);
    // if (this.props.currentTrip) {
    //   this.props.updateDaysList(currentTrip.trip_id);
    // }
  }

  componentWillReceiveProps(nextProps) {
    this.handleAdminAccess()
  }
  handleAdminAccess() {
    const currentTrip = this.props;
    return (
      currentTrip ? this.props.user_id == currentTrip.user_id ? <RaisedButton label="Add day" primary={true} onClick={this.handleOpen} /> : null : null
    )

  }

  handleEventAdaptation(e) {
    console.log("Event Adapt", e)
    console.log("Day Wasnt Event")
    this.props.updateEventsList(e);
    this.props.updateSavedRestaurants(e);
    this.props.updateSavedRestaurantsData(e);
  }

  handleAddDay() {
    console.log("This is the line")

    const { currentTrip, createNewDay } = this.props;
    const { dayDate, dayName } = this.state;
    console.log({ dayDate });
    const month = dayDate.getMonth() + 1;
    const day = dayDate.getDate();
    const year = dayDate.getFullYear();
    const newDay = {
      trip_id: currentTrip ? currentTrip.trip_id : 124,
      date: `${month}/${day}/${year}`,
      day_name: dayName
    }

    createNewDay(newDay);
  }



  handleDayDelete(e) {
    this.props.deletedSelectedDay(e.day_id)
  }

  handleOpen() {
    this.setState({ open: true });
    console.log("This is the line")
  };

  handleClose() {
    this.setState({ open: false });
    console.log("This is the line")

  };

  updateDayName(value) {
    this.setState({ dayName: value });
    console.log("This is the line")

  };

  updateDayDate(event, value) {
    this.setState({ dayDate: value });
    console.log("This is the line")

  };

  tripViewStyle() {
    return {
      // backgroundImage: `url('${"/static/media/beach-vacation-mobile.ac25f94c.jpg"}')`
    }
  }


  render() {
    const { dayName } = this.state;
    const { currentTrip } = this.props;
    const actions = (
      <div className='new-day-actions'>
        <RaisedButton
          label="Ok"
          primary={true}
          onClick={() => { this.handleAddDay(), this.handleClose() }}
          className='new-day-ok'
        />
        <RaisedButton
          label='Cancel'
          secondary={true}
          onClick={this.handleClose}
          className='new-day-cancel'
        />
      </div>
    );

    return (
      <main>
        <section className='trip-view' style={this.tripViewStyle()}>
          <Menu />
          {/*<h1></h1>*/}
          <Card className='trip-view-header' zDepth={3}>
            <CardTitle
              title={currentTrip ? currentTrip.trip_name : 'Trip Name Here'}
              subtitle={currentTrip ? currentTrip.date : 'Trip Date Here'}
            />
          </Card>
          {this.handleAdminAccess()}
          { this.props.daysList.length > 0 &&
          <section className='day-display'>

            <HandleGetAllDays
              handleEventAdaptation={this.handleEventAdaptation}
              handleDayDelete={this.handleDayDelete}
            />
          </section>
          }
          <Dialog
            title={dayName}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <TextField
              id="text-field-default"
              defaultValue={dayName}
              onChange={(e) => this.updateDayName(e.target.value)}
            />
            Select a date.
            <DatePicker hintText="New adventure begins..." onChange={(x, event) => this.updateDayDate(x, event)} />
          </Dialog>
        </section>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.frontEnd.user_id,
    daysList: state.frontEnd.daysList,
    currentTrip: state.frontEnd.currentTrip,
    currentDay: state.frontEnd.currentDay,
    buttonDisplay: state.frontEnd.buttonDisplay
  }
};

export default connect(mapStateToProps, { showGroup, createNewDay, updateDaysList, deletedSelectedDay, updateEventsList, updateCurrentDay, updateSavedRestaurants, updateSavedRestaurantsData, updateCurrentTrip })(Trip);
