import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <App />
    </Provider>
  </DndProvider>,
  document.getElementById('root')
)

serviceWorker.unregister();
