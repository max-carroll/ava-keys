import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  letter: {
    fontSize: "15rem",
  },
  complete: {
    color: "yellow",
  },
  uncomplete: {
    color: "blue",
  },
});

interface LetterProps {
  letter: string;
  postitionInWord?: number;
  currentPosition?: number;
}

export default function Letter({
  letter,
  postitionInWord = 0,
  currentPosition = 0,
}: LetterProps) {
  const classes = useStyles();
  const style =
    postitionInWord < currentPosition ? classes.complete : classes.uncomplete;

  //console.log(postitionInWord, currentPosition)
  return (
    <span className={style}>
      <span className={classes.letter}>{letter}</span>
    </span>
  );
}
