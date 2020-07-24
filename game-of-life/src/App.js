import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Welcome from './components/welcome'
import Game from './components/game'

import axios from 'axios'

export default function App() {
  return (
    <main>
    <div className='App'>
      <Route exact path='/' component={Game}/>
    </div>
    </main>
  );
}

