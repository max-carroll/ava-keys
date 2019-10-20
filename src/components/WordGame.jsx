// eslint-disable
import React from 'react';
import '../App.css';
import { Word, RandomEmoji } from '.'
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
  // var startingWords =[
  //   "dog","cat","dad","mum","ava"
  // ]

  // var startingWords = ['hello','timmy']

  var startingWords =[
    "chicken","banana","leopard","dolphin","panther",'aeroplane','fridge','freezer','poster','table','family','animal'
  ]

  const [words, setWords] = React.useState(startingWords)
  const [position, setPosition] = React.useState(0)
  const [currentWord, setWord] = React.useState("tin")
  const [currentPress, setCurrentPress] = React.useState(null)
  const [currentLetter, setCurrentLetter] = React.useState(currentWord.charAt(position))
  const [win, setWin] = React.useState(false)
  const [wordComplete, setWordComplete] = React.useState(false)
  const { play } = useAudio(Tada)

  const handler = React.useCallback((e) => {
    const press = getLetterFromEvent(e)
    console.log(`press: ${press}, currentLetter: ${currentLetter}, position: ${position}`)
    
    setCurrentPress(press)
    if (currentLetter.toLowerCase() === press.toLowerCase()) {

      let word = currentWord
      
      var nextPosition = position + 1;
      setPosition(nextPosition)
      
      if (nextPosition === word.length) {

        if (words.length === 0 ) {
          setWin(true) // the game is completely won
        }
        else {
          word = words.pop()
          const updatedWords = words.filter(w=> w !== word)
          nextPosition = 0
          setPosition(0)
          setWord(word)
          setWords(updatedWords)
          setWordComplete(true)
          play()
          setTimeout(function () { setWordComplete(false); }, 1000);
        }
      }
      
      var newLetter = word.charAt(nextPosition)
      setCurrentLetter(newLetter)
      
     
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
        {
          win &&
             <p>you win!!!</p>
        }
        { !win &&
          !wordComplete
            ? <Word word={currentWord.toUpperCase()} currentPosition={position} />
            : <RandomEmoji />
        }
      </header>
    </div>
  );
}


