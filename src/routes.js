import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed';
import Article from './pages/Article';
import Auth from './pages/Auth';
import TagFeed from './pages/TagFeed';
import YourFeed from './pages/YourFeed';

const Router = () => {
  return (
    <Switch>
      <Route path='/' component={GlobalFeed} exact />
      <Route path='/feed' component={YourFeed} />
      <Route path='/tags/:slug' component={TagFeed} />
      <Route path='/articles/:slug' component={Article} />
      <Route path='/login' component={Auth} />
      <Route parh='/register' component={Auth} />
    </Switch>
  )
}

export default Router;