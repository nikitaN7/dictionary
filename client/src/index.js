import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Modal from './components/modal';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';

// store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Modal />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
