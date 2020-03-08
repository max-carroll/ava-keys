// eslint-disable
import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'


import {LetterGame, WordGame, Word} from './components';


function App() {

  

  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Switch>
            <Route path='/' exact  >
              <Link to="/words" style={{color: 'white'}}>Word Game</Link>
              <Link to="/letters" style={{color: 'white'}}>Letters Game</Link>
            </Route>
            <Route component={WordGame} path="/words" />
            <Route component={LetterGame} path="/letters" />
          </Switch>
          
        </BrowserRouter>

     
      </header>
    </div>
  );
}

export default App;
