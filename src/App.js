import React from 'react';
import './App.css';
import { Letter} from './components'
import useEventListener from './hooks/useEventListener'
import {createUseStyles} from 'react-jss'

const getRandomLetter = () => {
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = characters.charAt(Math.floor(Math.random() * characters.length));
  return result
  
 }

function App() {


  // https://usehooks.com/useEventListener/
  const [currentPress, setCurrentPress] = React.useState(null)
  const [currentLetter, setCurrentLetter] = React.useState('A')


  const handler = React.useCallback((e)=> {
    var keynum;
    if(window.event) { // IE                    
      keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera                   
      keynum = e.which;
    }
    const letter = String.fromCharCode(keynum)    
    setCurrentPress(letter)

    console.log(`letter ${currentLetter} - press ${letter}`)
    if (currentLetter === letter) {
      alert("you win")
      var newLetter = getRandomLetter()
      setCurrentLetter(newLetter)
      console.log()
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
        <Letter letter={currentLetter}  />
      </header>
    </div>
  );
}

export default App;
