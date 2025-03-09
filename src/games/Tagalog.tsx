import { Paper, Grid } from "@mui/material";
import { useAudio } from "../hooks";
import { ChickenIntro, CatIntro, PresentIntro, IceCreamIntro } from "../audio";

import Princess from "../audio/Princess.mp3";
import Lips from "../audio/Lips.mp3";
import Eyes from "../audio/Eyes.mp3";
import Rocket from "../audio/Rocket.mp3";
import Rainbow from "../audio/Rainbow.mp3";
import Fire from "../audio/Fire.mp3";
import Duck from "../audio/Duck.mp3";
import SmileyFace from "../audio/SmileyFace.mp3";
import Boat from "../audio/Boat.mp3";
import Dragon from "../audio/Dragon.mp3";

interface Word {
  intro: string;
  tagalog: string;
  picture: string;
}

export const WordCard = ({ word }: { word: Word }) => {
  const { play: playIntro } = useAudio(word.intro);

  return (
    <Grid item>
      <Paper onClick={() => playIntro()}>
        <Grid
          container
          style={{ height: 200, width: 200 }}
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>{word.tagalog}</Grid>

          <Grid item>
            <span style={{ fontSize: "5rem" }}>{word.picture}</span>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export const Tagalog = () => {
  const words = [
    {
      eng: "chicken",
      tagalog: "manok",
      picture: "🐔",
      intro: ChickenIntro,
    },
    {
      eng: "cat",
      tagalog: "pusa",
      picture: "😺",
      intro: CatIntro,
    },
    { tagalog: "regalo", picture: "🎁", intro: PresentIntro },
    { tagalog: "sorbetes", picture: "🍦", intro: IceCreamIntro },
    { tagalog: "labi", picture: "💋", intro: Lips },
    { tagalog: "princessa", picture: "👸", intro: Princess },
    { tagalog: "mata", picture: "👀", intro: Eyes },

    { tagalog: "rocket", picture: "🚀", intro: Rocket },
    { tagalog: "rainbow", picture: "🌈", intro: Rainbow },
    { tagalog: "fire", picture: "🔥", intro: Fire },
    { tagalog: "duck", picture: "🦆", intro: Duck },
    { tagalog: "smiley face", picture: "😀", intro: SmileyFace },
    { tagalog: "boat", picture: "⛵", intro: Boat },
    { tagalog: "dragon", picture: "🐉", intro: Dragon },

    // Sort into categories, tags

    // (1) you click on and it tells you what it is
    // (2) Its asks you 'Nasaan ang pusa?' and you have to click it (like a quiz)
    // (3) what letter does it start with
  ];

  return (
    <>
      <Grid container direction="row" spacing={2}>
        {words.map((w) => (
          <WordCard word={w} />
        ))}
      </Grid>
    </>
  );
};
