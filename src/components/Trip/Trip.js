import React, { Component } from "react";
import { connect } from 'react-redux'
import './Trip.css';
import { showGroup, updateDaysList, createNewDay, deletedSelectedDay, updateCurrentDay, updateEventsList } from '../../ducks/frontEnd';
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
    this.handleGetAllDays = this.handleGetAllDays.bind(this);
    this.handleDayDelete = this.handleDayDelete.bind(this);

  }

  componentDidMount() {
    const {currentTrip} = this.props;
    this.props.showGroup(true);
    this.props.updateDaysList(currentTrip ? currentTrip.trip_id : 124);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.updateDaysList(nextProps.currentTrip ? nextProps.currentTrip.trip_id : 124);
  }

  handleAddDay() {
    const {currentTrip, createNewDay} = this.props;
    const {dayDate, dayName} = this.state;
    console.log({dayDate});
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

  handleGetAllDays() {
    console.log("Days List", this.props.daysList)
    const styles = {

      largeIcon: {
        width: 60,
        height: 60,
      },

    };

    function sortByDate(daysList){
      let modifiedDatesDaysList = daysList.map(day=>{
        let modifiedDate = day.date.split('/');
        let year = modifiedDate.pop();
        modifiedDate.unshift(year);
        day.date = modifiedDate.join('/');
        return day;
      });
      let orderedDays = _.sortBy(modifiedDatesDaysList, ['date', 'day_name', 'trip_id', 'day_id']);
      return orderedDays.map(day=>{
        let modifiedDate = day.date.split('/');
        let year = modifiedDate.shift();
        modifiedDate.push(year);
        day.date = modifiedDate.join('/');
        return day;
      });
    }

    
    const sortedDays = sortByDate(this.props.daysList);
    console.log(sortedDays)
    
    return sortedDays.map((e, i, arr) => {
      return (
        <Card className='day-box' key={i}>
          <CardTitle
            title={e.day_name || `Day ${i+1}`}
            subtitle={e.date}
          />
          <IconButton tooltip="Cancel Day" touch={true} tooltipPosition="top-center" onClick={() => { this.handleDayDelete(e) }} iconStyle={styles.largeIcon}>
            <ActionCancel />
          </IconButton>
          <Link to={`/day/${e.day_id}`} className='logo-font'>
            <IconButton tooltip="Day Information" touch={true} tooltipPosition="top-center" iconStyle={styles.largeIcon} onClick={() => { this.props.updateCurrentDay(e.day_id), this.props.updateEventsList(e.day_id) }}>
              <Info />
            </IconButton>
          </Link>
          <br />
        </Card>
      )
    })
  }

  handleDayDelete(e) {
    this.props.deletedSelectedDay(e.day_id)
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  updateDayName(value) {
    this.setState({ dayName: value });
  };

  updateDayDate(event, value) {
    this.setState({ dayDate: value });
  };

  tripViewStyle(){
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
          <RaisedButton label="Add day" primary={true} onClick={this.handleOpen} />
          <section className='day-display'>
            {this.handleGetAllDays()}
          </section>
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
            <DatePicker hintText="New adventure begins..." onChange={(x, event) => this.updateDayDate(x, event) } />
          </Dialog>
        </section>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    daysList: state.frontEnd.daysList,
    currentTrip: state.frontEnd.currentTrip
  }
};

export default connect(mapStateToProps, { showGroup, createNewDay, updateDaysList, deletedSelectedDay, updateEventsList, updateCurrentDay })(Trip);
