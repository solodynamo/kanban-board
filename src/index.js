import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
const reactRoot = document.getElementById('react-root');
ReactDOM.render(<App/>, reactRoot);