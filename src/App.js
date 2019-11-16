import React, { Component } from 'react';
import Hero from './components/hero/index';
import HeroList from './components/home/index';
import './App.css';
import { Route } from 'react-router-dom';
import View from './components/view/index';
import AddNewHero from './components/addNewHero/index'

export default class App extends Component {
  render(){
    return (
      <div>
        <Route exact path="/" component={HeroList}/>
        <Route exact path="/add-new-hero" component={AddNewHero}/>
        <Route exact path="/view/:id" component={View}/>
      </div>
    )
  }
}