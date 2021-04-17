// eslint-disable
import React from 'react';
import '../App.css';
import { RandomEmoji } from '../components'
import { useAudio, useSpeech } from '../hooks'
import { Tada, TryAgain } from '../audio'
import { TextField, Grid, Typography } from '@material-ui/core';

export default function LetterGame() {

  var firstSum = { question: "1 + 1 =", answer: "2"}

  const [sum, setSum] = React.useState(firstSum)
  const [win, setWin] = React.useState(false)
  const [praise, setPraise] = React.useState("Wow!")
  const { play } = useAudio(Tada)
  const { play: playOops } = useAudio(TryAgain)

  const textBox = React.useRef(null)

  const [answer, setAnswer] = React.useState(null)

  const talk = useSpeech(praise)

  const handleChange = event => {
    setAnswer(event.target.value);
  };


  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  const any2Numbers = (min, max) => {
    var number1 = getRndInteger(min, max)
    var number2 = getRndInteger(min, max);
    return [number1, number2]
  }

  const getDivisibleNumbers = () => {
    const [a,b] = any2Numbers(1,12)
    const product = a*b
    return [product, a]

  }

  const praises = [
    "oh my goodness, that was fantastic how did you do that",
    "your on fire!",
    "hold the phone! We got a genius here",
    "stop the press, change the headline!",
    "its a miracle! no one will believe it",
    "you've done this before havent you",
    "Im a computer and even Im impressed",
    
  ]


  function getRandomOperation() {
    const operations = [
      {name: "x", handleOperation : (a,b) => a * b, handleGetNumbers : () => any2Numbers(0,12)},
      {name: "/", handleOperation : (a,b) => a / b, handleGetNumbers : getDivisibleNumbers},
      {name: "+", handleOperation : (a,b) => a + b, handleGetNumbers : () => any2Numbers(0,12)},
      {name: "-", handleOperation : (a,b) => a - b, handleGetNumbers : () => any2Numbers(0,12)},
    ]

    var index = Math.floor(Math.random() * 4);

    var result = operations[index]

    console.log(result)

    return result;
  }

  function GetSum() {
  
    var operation = getRandomOperation()
    var [number1,number2] = operation.handleGetNumbers()

    return {
      question: number1 + ` ${operation.name} ` + number2 + " = ",
      answer: (operation.handleOperation(number1,number2)).toString()
    }
  }

  function GetNewPraise() {
    var index = getRndInteger(0, praises.length)
    return praises[index]
  }

  React.useEffect(() => {
    if (answer == sum.answer) {
      setWin(true)
      var newSum = GetSum()
      var newPraise = GetNewPraise()
      // setNewSum(newLetter)
      setSum(newSum)
      setAnswer(null)
      setPraise(newPraise)
      talk()
      //play()
      setTimeout(function () { setWin(false); }, 1000);
    }
    else {

    }

  }, [answer, play, sum.answer])

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


