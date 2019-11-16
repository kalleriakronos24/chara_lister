import React from 'react';
import { Route } from 'react-router-dom';
import HeroList from './components/home/index';
import View from './components/view/index';

export default (
    <Route exact path="/" component={HeroList}>
          <Route exact path="/view/:name" component={View} />
    </Route> 
)