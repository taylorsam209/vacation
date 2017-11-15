import React, { Component } from "react";
import About from '../About/About.js';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12
}

class Login extends Component {
    render() {
        return (
            <div>
              <a href={process.env.REACT_APP_LOGIN}>
                <RaisedButton label='Login / Sign-up' primary={true} style={style}/>
              </a>
                <h1>Login</h1>
                <About />
            </div>
        )
    }
}

export default Login
