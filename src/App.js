import React from 'react';
import './App.css';
import {createUseStyles} from 'react-jss'
import {LetterGame, WordGame} from './components';


function App() {

  

  return (
    <div className="App">
      <header className="App-header">
        <WordGame />
      </header>
    </div>
  );
}

export default App;
