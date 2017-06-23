import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import rootReducer from './redux/root_reducer';
import {Provider} from 'react-redux';
import App from './containers/app';

// Register Service Worker
if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('/wodadvisor/service_worker.js')
      .then(function(reg) {
         // registration worked
         console.log('Registration succeeded. Scope is ' + reg.scope);
      }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
   });
}

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
       <App />
    </Provider>,
   document.getElementById('root')
);
