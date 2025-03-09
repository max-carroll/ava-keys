import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  score: {
    fontSize: "1rem",
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
  },
});

interface PointsProps {
  score: number;
}

export default function Points({ score }: PointsProps) {
  const classes = useStyles();

  //console.log(postitionInWord, currentPosition)
  return (
    <span className={classes.score}>
      <span>Points: </span>
      {score}
    </span>
  );
}
