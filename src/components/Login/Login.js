import React, { Component } from "react";
import About from '../About/About.js';
import RaisedButton from 'material-ui/RaisedButton';
import './Login.css';

const style = {

}

class Login extends Component {
  render() {
    return (
      <main>
        <section className='login'>
          <h1>Trippin'<span>&trade;</span></h1>
          <div className='login-lower-half'>
          <a href={process.env.REACT_APP_LOGIN}>
            <RaisedButton
              label='Login / Sign-up'
              secondary={true}
              style={style}
              className='login-button'/>
          </a>
          </div>
        </section>
        <About/>
      </main>
    );
  }
}

export default Login
