import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import { Provider } from "react-redux";
import store from "./store";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

ReactDOM.render(<MuiThemeProvider><Provider store={store}><App /></Provider></MuiThemeProvider>, document.getElementById('root'));
unregister();
