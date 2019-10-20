// eslint-disable
import React from 'react';
import '../App.css';
import { Word } from '.'
import { useEventListener, useAudio } from '../hooks'
import { Tada } from '../audio'



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
  var startingWords =[
    "dog","cat","dad","mum","ava"
  ]

  const [words, setWords] = React.useState(startingWords)
  const [position, setPosition] = React.useState(0)
  const [currentWord, setWord] = React.useState("tin")
  const [currentPress, setCurrentPress] = React.useState(null)
  const [currentLetter, setCurrentLetter] = React.useState(currentWord.charAt(position))
  const [win, setWin] = React.useState(false)
  const { play } = useAudio(Tada)

  const handler = React.useCallback((e) => {
    const press = getLetterFromEvent(e)
    console.log(`press: ${press}, currentLetter: ${currentLetter}, position: ${position}`)
    
    setCurrentPress(press)
    if (currentLetter.toLowerCase() === press.toLowerCase()) {
      setWin(true)
      let word = currentWord

      var nextPosition = position + 1;
      setPosition(nextPosition)

      if (nextPosition === word.length) {
        setPosition(0)
        word = words.pop()
        setWord(word)
        const updatedWords = words.filter(w=> w !== word)
        setWords(updatedWords)
        nextPosition = 0
      }
      
      var newLetter = word.charAt(nextPosition)
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


