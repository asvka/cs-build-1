import React from 'react';
import { Route, NavLink } from 'react-router-dom'
import './App.css';
import './components/game.css'
import Welcome from './components/welcome'
import Game from './components/game'
import About from './components/about'


export default function App() {
  return (
    <main>
    <div className='App'>
      <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/about'>About</NavLink>
      </nav>
      <Welcome />
      <Route exact path='/' component={Game}/>
      <Route path='/about' component={About} />
    </div>
    </main>
  );
}

