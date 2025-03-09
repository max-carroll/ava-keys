// eslint-disable
import './App.css';
import { BrowserRouter,  Route, Link, Routes } from 'react-router'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'


import { LetterGame, WordGame, NumberGame, Tagalog } from './games';
import { Speak } from './games/Speak';
import { SaveWords } from './components/SaveWords';
import { Flappy } from './components/Flappy';


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
            <Typography><Link to="/talk" style={{ color: 'white', textDecoration: 'none'  }}><Button>Talk Game</Button></Link></Typography>
            <Typography><Link to="/savewords" style={{ color: 'white', textDecoration: 'none'  }}><Button>Save Words</Button></Link></Typography>
            <Typography><Link to="/flappy" style={{ color: 'white', textDecoration: 'none'  }}><Button>Flappy</Button></Link></Typography>
          </Toolbar>
        </AppBar>
        <div className="App">
          <header className="App-header">

            <Routes>
              <Route element={<WordGame />} path="/words" />
              <Route element={<LetterGame />} path="/letters" />
              <Route element={<NumberGame />} path="/numbers" />
              <Route element={<Tagalog />} path="/tagalog" />
              <Route element={<Speak />} path="/talk" />
              <Route element={<SaveWords />} path="/savewords" />
              <Route element={<Flappy />} path="/flappy" />
            </Routes>



          </header>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
