import React, { Component } from "react";
import About from '../About/About.js';
import RaisedButton from 'material-ui/RaisedButton';
import './Login.css';

const style = {
  margin: 12
}

class Login extends Component {
  render() {
    return (
      <main>
        <section className='login'>
          <a href={process.env.REACT_APP_LOGIN}>
            <RaisedButton label='Login / Sign-up' primary={true} style={style}/>
          </a>
          <h1>Login</h1>
          <About/>
        </section>
      </main>
    );
  }
}

export default Login
