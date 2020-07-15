import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppRoutes from './AppRoutes';
import PrivateRoute from './PrivateRoute';
import AuthPage from '../components/auth/AuthPage';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/signin" component={AuthPage} />
      <Route path="/signup" component={AuthPage} />
      <PrivateRoute component={AppRoutes} />
    </Switch>
  );
};

export default Routes;
