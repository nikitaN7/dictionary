import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppRoutes from './AppRoutes';
import PrivateRoute from './PrivateRoute';
import AuthPage from '../components/auth/AuthPage';

const Routes = () => {
  return (
    <Switch>
      <Route path="/signin" component={AuthPage} />
      <Route path="/signup" component={AuthPage} />
      <PrivateRoute path="/" component={AppRoutes} />
    </Switch>
  );
};

export default Routes;
