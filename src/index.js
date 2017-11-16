import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import { Provider } from "react-redux";
import store from "./store";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const turqoiseGreen = '#8FD8AB'
    , jet = '#2E382E'

const theme1 = getMuiTheme({
  fontFamily: '"Tienne", serif',
  palette: {
    primary1Color: turqoiseGreen,
    accent1Color: jet
  }
})

ReactDOM.render(

  <MuiThemeProvider muiTheme={theme1}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>

  , document.getElementById('root'));
unregister();
