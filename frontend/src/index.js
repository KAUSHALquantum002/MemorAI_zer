import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mathjax/es5/tex-mml-chtml.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
ReactDOM.render(<App />, document.getElementById('root'));
