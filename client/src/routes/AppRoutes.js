import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from '../components/app';

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
