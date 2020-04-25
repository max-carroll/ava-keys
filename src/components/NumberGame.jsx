// eslint-disable
import React from 'react';
import '../App.css';
import { Word, RandomEmoji } from '.'
import { useEventListener, useAudio } from '../hooks'
import { Tada, Oops, TryAgain } from '../audio'
import Points from './Points';
import { TextField, Grid, Typography } from '@material-ui/core';

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
  //   "dog","cat","dad","mum","ava","bat","bag","tag","sad","mad","lad","boy","girl","pot","dot","spot","eye","my","foot"
  // ]

  var startingWords = ['hello', 'timmy']

  var startingWords = [
    //   "chicken","banana","leopard","dolphin","panther",'aeroplane','fridge','freezer','poster','table','family','animal'
    //  'dad','milk','star','genius','poo-poo','chick','wood','timmy','tommy','tammy','dizzy'
    'andrea', 'lizzy', 'dizzy', 'louisa', 'max', 'maxymus', 'jhonna', 'jojo', 'maria', 'yvvonne', 'jet', 'ava']

  var firstSum = { question: "1 + 1 =", answer: "2" }
  const [words, setWords] = React.useState(startingWords)
  const [position, setPosition] = React.useState(0)
  const [currentWord, setWord] = React.useState("tin")
  const [sum, setSum] = React.useState(firstSum)
  const [win, setWin] = React.useState(false)
  const [wordComplete, setWordComplete] = React.useState(false)
  const { play } = useAudio(Tada)
  const { play: playOops } = useAudio(TryAgain)
  const [score, setScore] = React.useState(0)

  const textBox = React.useRef(null)

  const [answer, setAnswer] = React.useState(null)

  const handleChange = event => {
    setAnswer(event.target.value);
  };

  const sums = [
    { question: "1 + 1 + =", answer: "2" },
    { question: "1 + 2 + =", answer: "3" },
    { question: "1 + 3 + =", answer: "4" },
    { question: "1 + 4 + =", answer: "5" },
    { question: "1 + 5 + =", answer: "6" },
  ]

  function GetSum() {

    var number1 = Math.floor(Math.random() * 10);
    var number2 = Math.floor(Math.random() * 10);

    return {
      question: number1 + " + " + number2 + " = ",
      answer: (number1 + number2).toString()
    }


  }

  React.useEffect(() => {
    if (answer == sum.answer) {
      setWin(true)
      var newSum = GetSum()
      // setNewSum(newLetter)
      setSum(newSum)
      setAnswer(null)
      play()
      setTimeout(function () { setWin(false); }, 1000);

    }
    else {

    }

  }, [answer])

  React.useEffect(() => {
    if (win == false) {
      textBox.current.focus()
      console.log(textBox)
    }
  }, [win])

  return (
    <div className="App">
      <header className="App-header">


        {
          !win && sum &&
          <Grid container justify="center" alignContent="center" alignItems="center" spacing={2}>

            <Grid item>
              <Typography variant="h1">{sum.question}</Typography>
            </Grid>

            <Grid item xs={3} >

              <TextField
                //variant="outlined"
                // InputProps={{
                //   ref:{textBox}
                // }}
                inputRef={textBox}
                value={answer}
                InputProps={{
                  style: {
                     fontSize: '5rem', color: 'white'
                  }
                }}
                autoFocus
 
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        }
        {
          win && <RandomEmoji />
        }




      </header>
    </div >
  );
}


