import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "../App.css";
import { RandomEmoji } from "../components";
import { useAudio, useSpeech } from "../hooks";
import { Tada } from "../audio";
import { TextField, Grid, Typography } from "@mui/material";

export default function LetterGame() {
  const firstSum = { question: "1 + 1 =", answer: "2" };

  const [sum, setSum] = useState(firstSum);
  const [win, setWin] = useState(false);
  const [praise, setPraise] = useState("Wow!");
  const { play } = useAudio(Tada);

  const textBox = useRef<HTMLInputElement>(null);

  const [answer, setAnswer] = useState<string | null>(null);

  const [talk] = useSpeech(praise);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target?.value);
  };

  function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const any2Numbers = (min: number, max: number) => {
    const number1 = getRndInteger(min, max);
    const number2 = getRndInteger(min, max);
    return [number1, number2];
  };

  const getDivisibleNumbers = () => {
    const [a, b] = any2Numbers(1, 12);
    const product = a * b;
    return [product, a];
  };

  const praises = [
    "oh my goodness, that was fantastic how did you do that",
    "your on fire!",
    "hold the phone! We got a genius here",
    "stop the press, change the headline!",
    "its a miracle! no one will believe it",
    "you've done this before havent you",
    "Im a computer and even Im impressed",
  ];

  function getRandomOperation() {
    const operations = [
      {
        name: "x",
        handleOperation: (a: number, b: number) => a * b,
        handleGetNumbers: () => any2Numbers(0, 12),
      },
      {
        name: "/",
        handleOperation: (a: number, b: number) => a / b,
        handleGetNumbers: getDivisibleNumbers,
      },
      {
        name: "+",
        handleOperation: (a: number, b: number) => a + b,
        handleGetNumbers: () => any2Numbers(0, 12),
      },
      {
        name: "-",
        handleOperation: (a: number, b: number) => a - b,
        handleGetNumbers: () => any2Numbers(0, 12),
      },
    ];

    const index = Math.floor(Math.random() * 4);

    const result = operations[index];

    console.log(result);

    return result;
  }

  function GetSum() {
    const operation = getRandomOperation();
    const [number1, number2] = operation.handleGetNumbers();

    return {
      question: number1 + ` ${operation.name} ` + number2 + " = ",
      answer: operation.handleOperation(number1, number2).toString(),
    };
  }

  function GetNewPraise() {
    const index = getRndInteger(0, praises.length);
    return praises[index];
  }

  useEffect(() => {
    if (answer === sum.answer) {
      setWin(true);
      const newSum = GetSum();
      const newPraise = GetNewPraise();
      // setNewSum(newLetter)
      setSum(newSum);
      setAnswer(null);
      setPraise(newPraise);
      talk();
      //play()
      setTimeout(function () {
        setWin(false);
      }, 1000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer, play, sum.answer]);

  useEffect(() => {
    if (win === false) {
      textBox.current?.focus();
      console.log(textBox);
    }
  }, [win]);

  return (
    <div className="App">
      <header className="App-header">
        {!win && sum && (
          <Grid container alignContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h1">{sum.question}</Typography>
            </Grid>

            <Grid item xs={3}>
              <TextField
                inputRef={textBox}
                value={answer}
                InputProps={{
                  style: {
                    fontSize: "5rem",
                    color: "white",
                  },
                }}
                autoFocus
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        )}
        {win && <RandomEmoji />}
      </header>
    </div>
  );
}
