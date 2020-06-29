// eslint-disable

import React from "react";
import "../App.css";
import { Letter, RandomEmoji } from "../components";
import Speech from "react-speech";
import { useEventListener, useAudio } from "../hooks";
import { Tada, TryAgain } from "../audio";
import { Keyboard } from "../components/Keyboard";
import { Grid } from "@material-ui/core";

const getRandomLetter = () => {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //var characters       = 'abcdefghijklmnopqrstuvwxyz';
  var result = characters.charAt(Math.floor(Math.random() * characters.length));
  return result;
};

const getLetterFromEvent = (e) => {
  var keynum;
  if (window.event) {
    // IE
    keynum = e.keyCode;
  } else if (e.which) {
    // Netscape/Firefox/Opera
    keynum = e.which;
  }
  const letter = String.fromCharCode(keynum);
  return letter;
};

export default function LetterGame() {
  // https://usehooks.com/useEventListener/
  const [currentPress, setCurrentPress] = React.useState(null);
  const [currentLetter, setCurrentLetter] = React.useState(getRandomLetter());
  const [win, setWin] = React.useState(false);
  const { play } = useAudio(Tada);
  const { play: playOops } = useAudio(TryAgain);

  const handler = React.useCallback((e) => {
    const letter = getLetterFromEvent(e);
    setCurrentPress(letter);
    if (currentLetter.toLowerCase() === letter.toLowerCase()) {
      setWin(true);
      var newLetter = getRandomLetter();
      setCurrentLetter(newLetter);
      play();
      setTimeout(function () {
        setWin(false);
      }, 3000);
    } else {
      playOops();
    }
  });

  useEventListener("keydown", handler);

  React.useEffect(() => {
    // return document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
