import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  letter: {
    fontSize: "30rem",
  },
});

const getRandomEmoji = () => {
  const characters = [
    "😜",
    "😂",
    "😉",
    "😁",
    "😎",
    "💋",
    "🤞",
    "👍",
    "😃",
    "👀",
    "❤",
    "✨",
    "🐱",
    "🍟",
    "🎂",
    `😜😜`,
    "🐉",
  ];

  //👸💜🕳🕳☮🔯🧡💛💙🕎🕎✡☸🕉☪✝💟💌💓☸

  const min = 0;
  const max = characters.length;
  const random = Math.floor(Math.random() * (+max - +min)) + +min;
  const result = characters[random];
  return result;
};

export default function RandomEmoji() {
  const emoji = getRandomEmoji();
  const classes = useStyles();
  return <div className={classes.letter}>{emoji}</div>;
}
