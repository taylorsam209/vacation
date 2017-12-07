import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {getCurrentUserID} from './ducks/frontEnd.js';
import { HashRouter, Route } from "react-router-dom";
import Login from './components/Login/Login.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import Trip from './components/Trip/Trip.js';
import Day from './components/Day/Day.js';
import Listing from './components/Restaurants/Listing.js';
import Restaurant from './components/Restaurants/Restaurant.js';


class App extends Component {

  componentDidMount(){
    this.props.getCurrentUserID();
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route component={Login} path="/" exact />
          <Route component={Dashboard} path="/dashboard" />
          <Route component={Trip} path="/trip/:id" />
          <Route component={Day} path="/day/:id" />
          <Route component={Listing} path='/listing'/>
          <Route component= {Restaurant} path='/restaurant/:id'/>
        </div>
      </HashRouter>
    );
  }
}

export default connect(null,{getCurrentUserID})(App);
