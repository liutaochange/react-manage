import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loading from '@/components/loading/index.js';
const Admin = lazy(() => import('@/App.js'));
const Login = lazy(() => import('@/pages/login/index.js'));
const Nomatch = lazy(() => import('@/pages/nomatch/index.js'));
const Routers = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" component={props => <Admin {...props} />}></Route>
        <Route exact path="/login" component={props => <Login {...props} />} />
        <Route component={props => <Nomatch {...props} />} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routers;
