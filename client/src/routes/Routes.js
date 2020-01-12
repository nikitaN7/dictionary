import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const AppRoutes = lazy(() => import('./AppRoutes'));

const FallBack = <div>loading</div>;

const Routes = () => {
  return (
    <Switch>
      <Route path="/">
        <Suspense fallback={FallBack}>
          <AppRoutes />
        </Suspense>
      </Route>
    </Switch>
  );
};

export default Routes;
