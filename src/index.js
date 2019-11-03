import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography:{
    fonstFamily: '"Noto Sans JP", serif' 
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
, document.getElementById('root'));