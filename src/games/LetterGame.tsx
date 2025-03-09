// eslint-disable

import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import { Letter, RandomEmoji } from "../components";
import { useEventListener, useAudio, useSpeech } from "../hooks";
import { Tada, TryAgain } from "../audio";
import { Keyboard } from "../components/Keyboard";
import { Grid } from "@mui/material";

const getRandomLetter = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //var characters       = 'abcdefghijklmnopqrstuvwxyz';
  const result = characters.charAt(
    Math.floor(Math.random() * characters.length)
  );
  return result;
};

const getLetterFromEvent = (e: KeyboardEvent) => {
  let keynum;
  if (window.event) {
    // IE
    keynum = e.keyCode;
  } else if (e.which) {
    // Netscape/Firefox/Opera
    keynum = e.which;
  }
  const letter = String.fromCharCode(keynum!);
  return letter;
};

export default function LetterGame() {
  // https://usehooks.com/useEventListener/
  const [, setCurrentPress] = React.useState<string | null>(null);
  const [currentLetter, setCurrentLetter] = React.useState(getRandomLetter());

  const [win, setWin] = React.useState(false);
  const { play } = useAudio(Tada);
  const { play: playOops } = useAudio(TryAgain);

  const [talk] = useSpeech(`Can you find letter ${currentLetter} `);

  const handler = useCallback(
    (e: KeyboardEvent) => {
      const letter = getLetterFromEvent(e);
      setCurrentPress(letter);
      if (currentLetter.toLowerCase() === letter.toLowerCase()) {
        setWin(true);
        const newLetter = getRandomLetter();
        setCurrentLetter(newLetter);
        play();
        setTimeout(function () {
          setWin(false);
        }, 1000);
      } else {
        playOops();
      }
    },
    [currentLetter, play]
  );

  useEventListener("keydown", handler as EventListener);

  React.useEffect(() => {
    talk();

    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentLetter]);

  return (
    <Grid container direction="column">
      <Grid item>
        {!win ? <Letter letter={currentLetter} /> : <RandomEmoji />}
      </Grid>

      {!win && (
        <Grid item>
          <div
            style={
              {
                // position : 'absolute',
                // bottom: 0,
                // left: '37%'
              }
            }
          >
            <Keyboard letter={currentLetter.toLocaleLowerCase()} size={0.7} />
          </div>
        </Grid>
      )}
    </Grid>
  );
}
