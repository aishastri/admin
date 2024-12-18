import React from 'react'
import "./index.css";
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import 'core-js';
import App from './App';
import store from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
