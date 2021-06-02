import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function LoginRedirect({
  isAuth: isAuth,
  component: Component,
  enable: enable,
  ...rest
}) {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (!isAuth) {
            return <Component />;
          } else {
            return (
              <Redirect to={{pathname: '/modifyusers', state: {from: props.location}}} />
            );
          }
        }}
      />
    </div>
  );
}

export default LoginRedirect;