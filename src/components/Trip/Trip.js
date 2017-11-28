import React, { Component } from "react";
import { connect } from 'react-redux'
import './Trip.css';
import { showGroup } from '../../ducks/frontEnd';
/* Components*/
import Menu from '../Menu/Menu.js';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { addDay, getAllDays, deleteDay, getAllEvents } from '../../ducks/frontEndABs.js';
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
      dayDate: '12/03/2018',
      daysArr: [{
        "day_id": 3,
        "trip_id": 1,
        "date": "12/20/2017"
      },
      {
        "day_id": 4,
        "trip_id": 1,
        "date": "12/21/2017"
      },
      {
        "day_id": 6,
        "trip_id": 1,
        "date": "3/21/2017"
      },
      {
        "day_id": 7,
        "trip_id": 1,
        "date": "01/14/2018"
      },
      {
        "day_id": 8,
        "trip_id": 1,
        "date": "01/14/18"
      },
      {
        "day_id": 9,
        "trip_id": 1,
        "date": "01/14/18"
      },
      {
        "day_id": 10,
        "trip_id": 1,
        "date": "02/14/2088"
      },
      {
        "day_id": 11,
        "trip_id": 1,
        "date": "02/14/2088"
      },
      {
        "day_id": 12,
        "trip_id": 1,
        "date": "02/14/2088"
      },
      {
        "day_id": 13,
        "trip_id": 1,
        "date": "02/14/2088"
      },
      {
        "day_id": 14,
        "trip_id": 1,
        "date": "02/14/2088"
      },
      {
        "day_id": 15,
        "trip_id": 1,
        "date": "02/14/2088"
      },
      {
        "day_id": 16,
        "trip_id": 1,
        "date": "02/14/2088"
      }]
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddDay = this.handleAddDay.bind(this);
    this.handleGetAllDays = this.handleGetAllDays.bind(this);
    this.handleDayDelete = this.handleDayDelete.bind(this);

  }

  componentDidMount() {
    this.props.showGroup(true);
    // this.props.getAllDays("/api/", 1);
  }

  handleAddDay() {
    const dayArr = [this.state.dayName, this.state.dayDate]
    // this.props.addDay(dayArr)
  }

  handleGetAllDays() {
    const styles = {

      largeIcon: {
        width: 60,
        height: 60,
      },

    };

    return this.state.daysArr.map((e, i, arr) => {
      return (
        <div key={i}>
          <br />
          <Card className='' style={{ margin: '10px', padding: '10px' }}>
            <p style={{ fontSize: '36px' }} >{e.date}</p>
            <IconButton tooltip="Cancel Day" touch={true} tooltipPosition="top-center" onClick={() => { this.handleDayDelete() }} iconStyle={styles.largeIcon}>
              <ActionCancel />
            </IconButton>
            <Link to='/day' className='logo-font' onClick={() => { this.props.getAllEvents }}>
              <IconButton tooltip="Day Information" touch={true} tooltipPosition="top-center" iconStyle={styles.largeIcon} >
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
    this.props.deleteDay(e)
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

// function mapStateToProps(state){
//   return {
//
//   }
// };

export default connect(null, { showGroup, addDay, getAllDays, deleteDay, getAllEvents })(Trip);
