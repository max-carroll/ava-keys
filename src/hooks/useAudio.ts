import React from "react";

export default function useAudio(url: string) {
  const [audio] = React.useState(new Audio(url));
  const [playing, setPlaying] = React.useState(false);

  const toggle = () => setPlaying(!playing);
  const play = () => {
    audio.play();
  };

  React.useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audio, playing]);

  return { playing, toggle, play };
}
//https://stackoverflow.com/questions/47686345/playing-sound-in-reactjs
