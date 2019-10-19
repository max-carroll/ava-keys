import React from 'react';
import '../App.css';
import { Word, RandomEmoji } from '.'
import { useEventListener, useAudio } from '../hooks'
import { createUseStyles } from 'react-jss'
import { Fanfare, Tada } from '../audio'

const getLetterFromEvent = e => {
  var keynum;
  if (window.event) { // IE                    
    keynum = e.keyCode;
  } else if (e.which) { // Netscape/Firefox/Opera                   
    keynum = e.which;
  }
  const letter = String.fromCharCode(keynum)
  return letter
}

export default function LetterGame() {

  const [position, setPosition] = React.useState(0)
  const [currentWord, setWord] =React.useState("doggy")
  const [currentPress, setCurrentPress] = React.useState(null)
  const [currentLetter, setCurrentLetter] = React.useState(currentWord.charAt(position))
  const [win, setWin] = React.useState(false)
  const { play } = useAudio(Tada)

  const handler = React.useCallback((e) => {
    const letter = getLetterFromEvent(e)
    console.log(letter)
    console.log(currentLetter)
    setCurrentPress(letter)
    if (currentLetter.toLowerCase() === letter.toLowerCase()) {
      setWin(true)
      setPosition(position + 1)
      var newLetter = currentWord.charAt(position + 1)

      setCurrentLetter(newLetter)
      play()
      setTimeout(function () { setWin(false); }, 3000);
    }
  })

  useEventListener('keydown', handler);


  React.useEffect(() => {

    // return document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <Word word={currentWord} currentPosition={position} />
      </header>
    </div>
  );
}


