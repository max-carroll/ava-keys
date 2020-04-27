// eslint-disable
import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'


import { LetterGame, WordGame, NumberGame } from './components';
import { Tagalog } from './components/Tagalog';


function App() {



  return (
    <>
      <BrowserRouter>
        <AppBar>
          <Toolbar>
            <Typography><Link to="/words" style={{ color: 'white', textDecoration: 'none' }}><Button>Word Game</Button></Link></Typography>
            <Typography><Link to="/numbers" style={{ color: 'white', textDecoration: 'none' }}><Button>NumberGame</Button></Link></Typography>
            <Typography><Link to="/letters" style={{ color: 'white', textDecoration: 'none'  }}><Button>Letters Game</Button></Link></Typography>
            <Typography><Link to="/tagalog" style={{ color: 'white', textDecoration: 'none'  }}><Button>Tagalog Game</Button></Link></Typography>
          </Toolbar>
        </AppBar>
        <div className="App">
          <header className="App-header">

            <Switch>
              <Route component={WordGame} path="/words" />
              <Route component={LetterGame} path="/letters" />
              <Route component={NumberGame} path="/numbers" />
              <Route component={Tagalog} path="/tagalog" />
            </Switch>



          </header>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
