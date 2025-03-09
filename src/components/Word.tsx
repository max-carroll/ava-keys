import { createUseStyles } from "react-jss";
import Letter from "./Letter";
const useStyles = createUseStyles({
  letter: {
    fontSize: "30rem",
  },
});

interface WordProps {
  word: string;
  currentPosition: number;
}

export default function Word({ word, currentPosition }: WordProps) {
  const letters = word.split("");

  const classes = useStyles();
  return (
    <div className={classes.letter}>
      {letters.map((l, i) => (
        <Letter
          letter={l}
          postitionInWord={i}
          currentPosition={currentPosition}
        />
      ))}
    </div>
  );
}
