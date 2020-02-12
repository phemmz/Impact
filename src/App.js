import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route ,Redirect, Switch } from 'react-router-dom';

import { Loading } from './components';
import Provider from './context/GeneralContext';

const Home = lazy(() => import('./pages/Home'));
const Admin = lazy(() => import('./pages/Admin'));

const App = () => (
  <Provider>
    <Router>
      <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/admin" component={Admin}/>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
      </Suspense>
    </Router>
  </Provider>
);

export default App;
