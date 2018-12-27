import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
const Admin = lazy(() => import('./App'));
const Login = lazy(() => import('./pages/login/index.js'));
const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Admin} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);


ReactDOM.render(<App />, document.getElementById('root'));
