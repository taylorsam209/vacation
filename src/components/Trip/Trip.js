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
  }

  componentDidMount() {
    this.props.showGroup(true);
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
    console.log("State Date", this.state.dayDate)
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
          onClick={this.handleClose}
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

export default connect(null, { showGroup })(Trip);
