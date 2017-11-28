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
import { searchRestaurants } from "../../ducks/restaurant.js"
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Edit from 'material-ui/svg-icons/image/edit'

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
    this.handleRestaurants = this.handleRestaurants.bind(this);
  }

  componentDidMount() {
    this.props.showGroup(true);
    // this.props.getAllEvents("/api/", day_id);
  }

  handleAddEvent() {
    const eventArr = [this.state.eventName, this.state.inputOne, this.state.inputTwo]
    this.props.addEvent(eventArr)
  }

  handleAddRestaurant() {
    const restArr = [this.state.eventName, this.props.currentRestaurant.name]
    this.props.addRestaurant(restArr)
  }

  handleGetAllEvents() {
    // return this.props.eventsArr.map((e, i, arr) => {
    //   return (
    //     <div key={i}>
    // <Card className='' style={{ margin: '10px', padding: '10px' }}>
    //       {e.confirmation || null}
    //       {e.airline_name || null}
    //       {e.lodging_name || null}
    //       {e.lodging_details || null}
    //       {e.activity_name || null}
    //       {e.activity_details || null}
    //       {e.rental_company || null}
    //       {e.rental_details || null}
    //       <IconButton tooltip="Cancel Event" touch={true} tooltipPosition="top-center" onClick={() => { this.handleEventDelete(e) }}>
    //         <ActionCancel />
    //       </IconButton>
    //       <IconButton tooltip="Edit Event" touch={true} tooltipPosition="top-center" onClick={() => { this.handleEventEdit(e) }}>
    //         <Edit />
    //       </IconButton>
    // </Card>
    //     </div>
    //   )
    // })
  }

  handleRestaurants() {
    // axios.get('/api/savedRestaurants/:id', day_id).then(resp => {
    //   return resp.map((e, i, arr) => {
    //     return (
    //       <div key={i}>
    //        <Card className='' style={{ margin: '10px', padding: '10px' }}>
    //         <Link to=`/restaraunt/${e.yelpId}`>{e.title}</Link>
    //           <img src={e.image_url || 'https://pixy.org/images/placeholder.png'} alt="" />
    //         <IconButton tooltip="top-center" touch={true} tooltipPosition="top-center" onClick={() => { this.handleEventDelete(e) }}>
    //           <ActionCancel />
    //         </IconButton>
    //       <IconButton tooltip="Edit Event" touch={true} tooltipPosition="top-center" onClick={() => { this.handleEventEdit(e) }}>
    //         <Edit />
    //       </IconButton>
    //        </Card>
    //       </div>
    //     )
    //   })
    // })
  }

  handleEventDelete(e) {
    this.props.deleteEvent(e)
  }

  handleEventEdit(e) {
    if (e.confirmation) {
      this.handleOpen();
      this.updateInputOne(e.confirmation);
      this.updateInputTwo(e.airline_name);
    } else if (e.lodging_name) {
      this.handleOpen();
      this.updateInputOne(e.lodging_name);
      this.updateInputTwo(e.airline_details);
    } else if (e.activity_name) {
      this.handleOpen();
      this.updateInputOne(e.activity_name);
      this.updateInputTwo(e.activity_details);
    } else if (e.rental_company) {
      this.handleOpen();
      this.updateInputOne(e.rental_company);
      this.updateInputTwo(e.rental_details);
    } else if (e.yelpId) {
      this.handleOpen();
      this.updateInputOne(e.location);
    }
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
            hintText="Enter City"
            id="text-field-default-event"
            defaultValue={this.state.inputOne}
            onChange={(e) => this.updateInputOne(e.target.value)}
          />
          <Link to="/listing" >
            <RaisedButton label="Search" primary={true} onClick={() => { this.props.searchRestaurants(this.state.inputOne), console.log(this.state.inputOne) }} />
          </Link>
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
    const restaurantActions = (
      <div className='new-event-actions'>
        <RaisedButton
          label="Ok"
          primary={true}
          onClick={() => { this.handleAddRestaurant(), this.props.closeRestaurantModal() }}
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
          {this.handleRestaurants()}
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
          </Dialog >
          {/* <Dialog
            title={eventName}
            actions={restaurantActions}
            modal={false}
            open={this.props.restaurantModalToggle}
            onRequestClose={this.props.closeRestaurantModal()}>
            <div>
              <TextField
                id="text-field-default-event"
                defaultValue={eventName}
                onChange={(e) => this.updateEventName(e.target.value)}
              />
              <TextField
                hintText={this.props.currentRestaurant.name}
                id="text-field-default-event"
                defaultValue={this.props.currentRestaurant.name}
              />
            </div>
          </Dialog> */}
        </section>
      </main>
    )
  }
}
function mapStateToProps(state) {
  return {
    gIcon: state.gIcon,
    restaurantModalToggle: state.frontEnd.restaurantModalToggle,
    currentRestaurant: state.restaurant.currentRestaurant
  }
}

export default connect(null, { showGroup, searchRestaurants })(Day);
