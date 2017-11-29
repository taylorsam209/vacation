import React, { Component } from "react";
import { connect } from 'react-redux'
import './Trip.css';
import { showGroup, updateDaysList, createNewDay, deletedSelectedDay, updateCurrentDay, updateEventsList } from '../../ducks/frontEnd';
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
    nextProps.daysList;
    this.handleGetAllDays();
  }

  handleAddDay() {
    // const dayArr = [this.props.currentTrip.trip_id, this.state.dayDate];
    const dayArr = { trip_id: 2, date: "03/04/2064" }
    this.props.createNewDay(dayArr)
  }

  handleGetAllDays() {
    console.log("Days List", this.props.daysList)
    const styles = {

      largeIcon: {
        width: 60,
        height: 60,
      },

    };

    return this.props.daysList.map((e, i, arr) => {
      return (
        <div key={i}>
          <br />
          <Card className='' style={{ margin: '10px', padding: '10px' }}>
            {/*<p style={{ fontSize: '36px' }} >{e.date}</p>*/}
            <CardTitle
              title={`Day ${i+1}`}
              subtitle={e.date}
            />
            <IconButton tooltip="Cancel Day" touch={true} tooltipPosition="top-center" onClick={() => { this.handleDayDelete(e) }} iconStyle={styles.largeIcon}>
              <ActionCancel />
            </IconButton>
            <Link to={`/day/${e.day_id}`} className='logo-font' onClick={() => { this.props.getAllEvents }}>
              <IconButton tooltip="Day Information" touch={true} tooltipPosition="top-center" iconStyle={styles.largeIcon} onClick={() => { this.props.updateCurrentDay(e.day_id), this.props.updateEventsList(e.day_id) }}>
                <Info />
              </IconButton>
            </Link>
            <br />
          </Card>
        </div>
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

  render() {
    const { dayName } = this.state;
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
        <Menu />
        <section className='trip'>
          <h1>Current Trip</h1>
          <br />
          <RaisedButton label="Add day" primary={true} onClick={this.handleOpen} />
          <br />
          <br />

          {this.handleGetAllDays()}
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
            <DatePicker hintText="New adventure begins..." onChange={(x, event) => { this.updateDayDate(x, event) }} />
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
