import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes/Routes';

import * as serviceWorker from './serviceWorker';
import store from './store';

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  </DndProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
