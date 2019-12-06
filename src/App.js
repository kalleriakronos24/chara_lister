import React, { Component } from 'react';
import HeroList from './components/home/index.jsx';
import './App.css';
import { Route } from 'react-router-dom';
import View from './components/view/index.jsx';
import AddNewHero from './components/addNewHero/index.jsx'
import EditChara from './components/character/edit/index.jsx';

export default class App extends Component {
  render(){
    return (
      <div>
        <Route exact path="/" component={HeroList}/>
        <Route exact path="/add-new-hero" component={AddNewHero}/>
        <Route exact path="/view/:name" component={View}/>
        <Route exact path="/chara/edit/:name" component={EditChara}/>
      </div>
    )
  }
}