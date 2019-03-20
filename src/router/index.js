import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from '@/components/loading/index.js';
const Admin = lazy(() => import('@/App.js'));
const Login = lazy(() => import('@/pages/login/index.js'));
const Nomatch = lazy(() => import('@/pages/nomatch/index.js'));
const Details = lazy(() => import('@/pages/details/index.js'));
const Routers = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/login.html" component={props => <Login {...props} />} />
        <Route exact path="/order/detail-:orderId.html" component={props => <Details {...props} />} />
        <Route path="/" component={props => <Admin {...props} />}></Route>
        <Route component={props => <Nomatch {...props} />} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routers;
