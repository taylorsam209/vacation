import React, { Component } from "react";
import { connect } from 'react-redux'
import './Day.css';
import { showGroup } from '../../ducks/frontEnd';
/* Components*/
import Menu from '../Menu/Menu.js';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionCancel from 'material-ui/svg-icons/navigation/cancel';
import { addEvent, getAllEvents, deleteEvent } from '../../ducks/frontEndABs.js';
import { Link } from "react-router-dom";


class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      eventName: 'New Event',
      value: 1,
      inputOne: '',
      inputTwo: '',

    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEventType = this.handleEventType.bind(this);
    this.updateInputOne = this.updateInputOne.bind(this);
    this.updateInputTwo = this.updateInputTwo.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleGetAllEvents = this.handleGetAllEvents.bind(this);
    this.handleEventDelete = this.handleEventDelete.bind(this);
    // this.handleRestarauntSearch = this.handleRestarauntSearch.bind(this);
  }

  componentDidMount() {
    this.props.showGroup(true);
    this.props.getAllEvents;
  }

  handleAddEvent() {
    const eventArr = [this.state.eventName, this.state.inputOne, this.state.inputTwo, this.state.value]
    this.props.addEvent(eventArr)
  }

  handleGetAllEvents() {
    // return this.props.daysArr.map((e, i, arr) => {
    //       return (
    //           <div key={i}>
    //               {e}
    //               <IconButton tooltip="top-center" touch={true} tooltipPosition="top-center" onClick={() => { this.handleEventDelete() }}>
    //                   <ActionCancel />
    //               </IconButton>
    //           </div>
    //       )
    //   })
  }

  handleEventDelete(e) {
    this.props.deleteEvent(e)
  }


  handleChange = (event, index, value) => this.setState({ value });

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
    this.makeBlank();
  };

  makeBlank() {
    this.setState({
      inputOne: '',
      inputTwo: ''
    })
  }

  // handleRestarauntSearch() {

  // }

  updateEventName(value) {
    this.setState({ eventName: value });
  };

  updateInputOne(value) {
    this.setState({ inputOne: value })
  }

  updateInputTwo(value) {
    this.setState({ inputTwo: value })
  }


  handleEventType() {
    if (this.state.value === 1) {
      return (
        <div>
          <TextField
            hintText="Confirmation Number"
            id="text-field-default-event"
            defaultValue={this.state.inputOne}
            onChange={(e) => this.updateInputOne(e.target.value)}
          />
          <TextField
            hintText="Flight Airline"
            id="text-field-default-event"
            defaultValue={this.state.inputTwo}
            onChange={(e) => this.updateInputTwo(e.target.value)}
          />
        </div>
      )
    } else if (this.state.value === 2) {
      return (
        <div>
          <TextField
            hintText="Rental Company"
            id="text-field-default-event"
            defaultValue={this.state.inputOne}
            onChange={(e) => this.updateInputOne(e.target.value)}
          />
          <TextField
            hintText="Rental Company Details"
            id="text-field-default-event"
            defaultValue={this.state.inputTwo}
            onChange={(e) => this.updateInputTwo(e.target.value)}
          />
        </div>
      )
    } else if (this.state.value === 3) {
      return (
        <div>
          <TextField
            hintText="Lodge/Hotel Name"
            id="text-field-default-event"
            defaultValue={this.state.inputOne}
            onChange={(e) => this.updateInputOne(e.target.value)}
          />
          <TextField
            hintText="Lodging Details"
            id="text-field-default-event"
            defaultValue={this.state.inputTwo}
            onChange={(e) => this.updateInputTwo(e.target.value)}
          />
        </div>
      )
    } else if (this.state.value === 4) {
      return (
        <div>
          <TextField
            hintText="Restaraunt Name"
            id="text-field-default-event"
            defaultValue={this.state.inputOne}
            onChange={(e) => this.updateInputOne(e.target.value)}
          />
          <RaisedButton label="Search" primary={true} onClick={() => { this.handleRestarauntSearch() }} />
        </div>
      )
    } else if (this.state.value === 5) {
      return (
        <div>
          <TextField
            hintText="Activity Name"
            id="text-field-default-event"
            defaultValue={this.state.inputOne}
            onChange={(e) => this.updateInputOne(e.target.value)}
          />
          <TextField
            hintText="Activity Details"
            id="text-field-default-event"
            defaultValue={this.state.inputTwo}
            onChange={(e) => this.updateInputTwo(e.target.value)}
          />
        </div>
      )
    }
  }

  render() {
    const { eventName } = this.state;

    const actions = (
      <div className='new-event-actions'>
        <RaisedButton
          label="Ok"
          primary={true}
          onClick={() => { this.handleAddEvent(), this.handleClose() }}
          className='new-event-ok'
        />
        <RaisedButton
          label='Cancel'
          secondary={true}
          onClick={this.handleClose}
          className='new-event-cancel'
        />
      </div>
    );
    return (
      <main>
        <Menu />
        <section className='day'>
          <h1>Day</h1>
          <br />
          <RaisedButton label="Add event" primary={true} onClick={this.handleOpen} />
          {this.handleGetAllEvents()}
          <Dialog
            title={eventName}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={1} label="Flight" primaryText="Flight" />
              <MenuItem value={2} label="Car Rentals" primaryText="Car Rentals" />
              <MenuItem value={3} label="Lodging" primaryText="Lodging" />
              <MenuItem value={4} label="Restaraunts" primaryText="Restaraunts" />
              <MenuItem value={5} label="Activites" primaryText="Activities" />
            </DropDownMenu>
            <TextField
              id="text-field-default-event"
              defaultValue={eventName}
              onChange={(e) => this.updateEventName(e.target.value)}
            />
            {this.handleEventType()}
          </Dialog>
        </section>
      </main>
    )
  }
}
function mapStateToProps(state) {
  return {
    gIcon: state.gIcon
  }
}

export default connect(null, { showGroup })(Day);
