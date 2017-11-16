import React, {Component} from "react";
import {connect} from 'react-redux'
import './Day.css';
import {showGroup} from '../../ducks/reducer';
/* Components*/
import Menu from '../Menu/Menu.js';
<<<<<<< HEAD
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class Day extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      eventName: 'New Event'
=======
import { showGroup } from '../../ducks/reducer';
import { connect } from 'react-redux';

class Day extends Component {
    componentDidMount() {
        this.props.showGroup(true);
    }
    render() {
        return (
            <div>
                <Menu />
                <h1>Day</h1>
            </div>
        )
>>>>>>> master
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){
    this.props.showGroup(true);
  }

  handleOpen(){
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
  };

  updateEventName(value){
    this.setState({eventName: value});
  };

  actions(){
    return (
      <div className='new-event-actions'>
        <RaisedButton
          label="Ok"
          primary={true}
          onClick={this.handleClose}
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
  }

  render() {
    const {eventName} = this.state;
    const actions = (
      <div className='new-event-actions'>
        <RaisedButton
          label="Ok"
          primary={true}
          onClick={this.handleClose}
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
        <Menu/>
        <section className='day'>
          <h1>Day</h1>
          <RaisedButton label="Add event" primary={true} onClick={this.handleOpen} />
          <Dialog
            title={eventName}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >

            <TextField
              id="text-field-default-event"
              defaultValue={eventName}
              onChange={(e)=>this.updateEventName(e.target.value)}
            />
            Select a date.
            <DatePicker hintText="This event starts on..." />
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

<<<<<<< HEAD
// function mapStateToProps(state){
//   return {
//
//   }
// };

export default connect(null, {showGroup})(Day);
=======
export default connect(mapStateToProps, { showGroup })(Day);
>>>>>>> master
