import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  component: React.ElementType;
};

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/signin', state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
