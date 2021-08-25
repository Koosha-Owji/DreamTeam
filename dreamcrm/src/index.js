import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
      primary: {
        light: '#8d98f2',
        main: '#5a6abf',
        dark: '#23408e',
        contrastText: '#fff',
      },
      secondary: {
        light: '#eeffff',
        main: '#bbdefb',
        dark: '#8aacc8',
        contrastText: '#000',
      },
}});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}><App /></ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
