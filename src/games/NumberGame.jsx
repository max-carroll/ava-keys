// eslint-disable
import React from 'react';
import '../App.css';
import { RandomEmoji } from '../components'
import { useAudio } from '../hooks'
import { Tada, TryAgain } from '../audio'
import { TextField, Grid, Typography } from '@material-ui/core';

export default function LetterGame() {

  var firstSum = { question: "1 + 1 =", answer: "2"}

  const [sum, setSum] = React.useState(firstSum)
  const [win, setWin] = React.useState(false)
  const { play } = useAudio(Tada)
  const { play: playOops } = useAudio(TryAgain)

  const textBox = React.useRef(null)

  const [answer, setAnswer] = React.useState(null)

  const handleChange = event => {
    setAnswer(event.target.value);
  };


  function getRandomOperation() {
    const operations = [
      {name: "x", handleOperation : (a,b) => a * b},
      {name: "/", handleOperation : (a,b) => a / b},
      {name: "+", handleOperation : (a,b) => a + b},
      {name: "-", handleOperation : (a,b) => a - b},
    ]

    var index = Math.floor(Math.random() * 3);

    

    var result = operations[index]

    console.log(result)

    return result;
  }

  function GetSum() {

    var number1 = Math.floor(Math.random() * 10);
    var number2 = Math.floor(Math.random() * 10);

    var operation = getRandomOperation()

    return {
      question: number1 + ` ${operation.name} ` + number2 + " = ",
      answer: (operation.handleOperation(number1,number2)).toString()
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


