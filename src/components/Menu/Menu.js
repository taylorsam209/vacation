import React, { Component } from "react";
import { Link } from "react-router-dom";
import { showGroup, showNoti, groupShow } from '../../ducks/reducer';
import { connect } from 'react-redux';
import './Menu.css';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import GroupIcon from 'material-ui/svg-icons/social/group';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


const richBlack = '#02111b';
const dodgerBlue = '#1098f7';
const green = '#00825D'

class Menu extends Component {

  handleNotiToggle() {
    if (this.props.groupOpen) {
      this.handleGroupToggle();
      this.props.showNoti(!this.props.notiOpen); console.log("It Hit");
    } else {
      this.props.showNoti(!this.props.notiOpen); console.log("It Hit");
    }
  }

  handleGroupToggle() {
    if (this.props.notiOpen) {
      this.handleNotiToggle();
      this.props.groupShow(!this.props.groupOpen); console.log("It Hit")
    } else {
      this.props.groupShow(!this.props.groupOpen); console.log("It Hit")
    }
  }

  handleGroup() {
    console.log("Group Attempt")
    const tempArr = ["Logan", "Taylor", "Jared", "Scott", "Logan", "Taylor", "Jared", "Scott", "Logan", "Taylor", "Jared", "Scott"]
    return tempArr.map((e, i, arr) => {
      return (
        <div>
          {e}
        </div>
      )
    })
  }

  handleNoti() {
    console.log("Group Attempt")
    const tempArr = ["Logan", "Taylor", "Jared", "Scott", "Logan", "Taylor", "Jared", "Scott", "Logan", "Taylor", "Jared", "Scott"]
    return tempArr.map((e, i, arr) => {
      return (
        <div>
          {e}
        </div>
      )
    })
  }

  render() {
    const { gIcon } = this.props;
    console.log(gIcon)
    return (
      <nav className='menu'>
        <Link to='/dashboard' className='logo-font'>
          <h2 >
            Trippin'
              </h2>
        </Link>

        {
          gIcon ?
            <GroupIcon
              className='group-icon'
              color='white'
              onClick={() => { this.handleGroupToggle() }}
            /> : null
        }

        <NotificationsIcon
          className='noti-icon'
          color='white'
          onClick={() => { this.handleNotiToggle() }}
        />

        <a href={process.env.REACT_APP_LOGOUT} className='logout'>
          <RaisedButton
            label='Logout'
            labelColor='white'
            primary={true}
            style={{ margin: '5px' }}
          />
        </a>
        <Drawer width={250} openSecondary={true} open={this.props.notiOpen} >
          <AppBar title="Notifications"

            iconElementLeft={<IconButton><NavigationClose onClick={() => { this.handleNotiToggle() }}

            />
            </IconButton>}
          />
          {this.handleNoti()}
        </Drawer>
        <Drawer width={250} openSecondary={false} open={this.props.groupOpen} >
          <AppBar title="Group"

            iconElementRight={<IconButton><NavigationClose onClick={() => { this.handleGroupToggle() }} />
            </IconButton>}
            iconElementLeft={<IconButton></IconButton>}
          />
          {this.handleGroup()}
        </Drawer>
      </nav >
    );
  }
};

function mapStateToProps(state) {
  return {
    groupOpen: state.groupOpen,
    notiOpen: state.notiOpen,
    gIcon: state.gIcon
  }
}

export default connect(mapStateToProps, { showGroup, showNoti, groupShow })(Menu);
