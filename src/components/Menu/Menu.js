import React, { Component } from "react";
import { Link } from "react-router-dom";
import {showGroup} from '../../ducks/reducer';
import {connect} from 'react-redux';
import './Menu.css';
import Group from '../Group/Group.js';
import Noti from '../Noti/Noti.js';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import GroupIcon from 'material-ui/svg-icons/social/group';

const richBlack = '#02111b';
const dodgerBlue = '#1098f7'

class Menu extends Component {

  componentDidMount(){
    this.props.showGroup(false);
  }

    render() {
        const {gIcon} = this.props;
        return (
          <nav className='menu'>
            <Link to='/dashboard'>
              <h2 className='logo-font'>
                Trippin'
              </h2>
            </Link>

            {
              gIcon &&
                <GroupIcon
                  className='group-icon'
                  color='white'
                />
            }

            <NotificationsIcon
              className='noti-icon'
              color='white'
            />

            <a href={process.env.REACT_APP_LOGOUT}>
              <RaisedButton
                label='Logout'
                labelColor='white'
                backgroundColor={dodgerBlue}
                className='logout'
                style={{margin: '5px'}}
              />
            </a>
          </nav>
        );
    }
};

function mapStateToProps(state){
  return {
    gIcon: state.gIcon
  }
}

export default connect(mapStateToProps, {showGroup})(Menu);
