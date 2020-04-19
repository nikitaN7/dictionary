import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const App = lazy(() => import('./App'));

const FallBack = <div>loading</div>;

const Routes = () => {
  return (
    <Switch>
      <Route path="/">
        <Suspense fallback={FallBack}>
          <App />
        </Suspense>
      </Route>
    </Switch>
  );
};

export default Routes;
