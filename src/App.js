import React from 'react';
import './App.css';
import { Letter} from './components'
import {useEventListener, useAudio} from './hooks/'
import {createUseStyles} from 'react-jss'
import {Fanfare, Tada} from './audio'
import RandomEmoji from './components/RandomEmoji';

const getRandomLetter = () => {
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = characters.charAt(Math.floor(Math.random() * characters.length));
  return result  
 }

 const getLetterFromEvent = e => {
  var keynum;
  if(window.event) { // IE                    
    keynum = e.keyCode;
  } else if(e.which){ // Netscape/Firefox/Opera                   
    keynum = e.which;
  }
  const letter = String.fromCharCode(keynum)   
  return letter
 }

function App() {

  // https://usehooks.com/useEventListener/
  const [currentPress, setCurrentPress] = React.useState(null)
  const [currentLetter, setCurrentLetter] = React.useState(getRandomLetter())
  const [win, setWin] = React.useState(false)
  const {play} = useAudio(Tada)
  

  const handler = React.useCallback((e)=> {
    const letter = getLetterFromEvent(e)
    setCurrentPress(letter)
    if (currentLetter === letter) {
      setWin(true)
      var newLetter = getRandomLetter()
      setCurrentLetter(newLetter)
      play()
      setTimeout(function(){ setWin(false);}, 1200);
    }
  })

  useEventListener('keydown', handler);


  React.useEffect(()=> {        
    
   // return document.removeEventListener('keydown', handleKeyDown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div className="App">
      <header className="App-header">
         {
           !win 
            ?<Letter letter={currentLetter}  />
            : <RandomEmoji  />
         }
      </header>
    </div>
  );
}

export default App;
