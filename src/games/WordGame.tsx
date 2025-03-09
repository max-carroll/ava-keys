// eslint-disable
import React from 'react';
import '../App.css';
import { Word, RandomEmoji } from '../components'
import { useEventListener, useAudio } from '../hooks'
import { Tada, TryAgain } from '../audio'

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
 //   "chicken","banana","leopard","dolphin","panther",'aeroplane','fridge','freezer','poster','table','family','animal'
//  'dad','milk','star','genius','poo-poo','chick','wood','timmy','tommy','tammy','dizzy'
'sloth','chicken','giraffe','monkey','narwhal','horse','cat','dog','hamster','fish','lizard',
'andrea','lizzy','dizzy','louisa','max','maxymus','jhonna','jojo' ,'maria','yvvonne','jet','ava' ]

  const [words, setWords] = React.useState(startingWords)
  const [position, setPosition] = React.useState(0)
  const [currentWord, setWord] = React.useState("tin")
  const [currentLetter, setCurrentLetter] = React.useState(currentWord.charAt(position))
  const [win, setWin] = React.useState(false)
  const [wordComplete, setWordComplete] = React.useState(false)
  const { play } = useAudio(Tada)
  const { play : playOops} = useAudio(TryAgain)
  const [score, setScore]= React.useState(0)

  React.useEffect(() => {
    const otherWords = localStorage.getItem('words')  
    
    if (otherWords) {
      let newWords = otherWords.split('\n')
      setWords(prev => [...prev, ...newWords])
  
    }
  }, [])


const reset = () => {
  setWords(startingWords)
  setScore(0)
  setPosition(0)
  setWin(false)
  setWordComplete(false)
  setWord("tin")
  setCurrentLetter("tin".charAt(0))
}

  const handler = React.useCallback((e) => {
    const press = getLetterFromEvent(e)
    console.log(`press: ${press}, currentLetter: ${currentLetter}, position: ${position}`)
    
    if (currentLetter.toLowerCase() === press.toLowerCase()) {
      let word = currentWord
      var nextPosition = position + 1;
      setPosition(nextPosition)
      
      if (nextPosition === word.length) {
        if (words.length === 0 ) {
          setWin(true) // the game is completely won
        }
        else {
          setScore(score + 10)
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
    else {
      playOops()
    }
  })

  useEventListener('keydown', handler);

  return (
    <div className="App">
      <header className="App-header">
        {
          win &&
          <>
             <p>you win!!!</p>
             <button onClick={reset}>retry</button>
            </>
        }
        { !win &&
          !wordComplete
            ? <Word word={currentWord.toUpperCase()} currentPosition={position} />
            : <RandomEmoji />
        }
        {/* <Points score={score} /> */}
      </header>
    </div>
  );
}


