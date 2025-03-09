export function useSpeech(text: string) {
  // https://usefulangle.com/post/98/javascript-text-to-speech
  // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
  // get all voices that browser offers
  const available_voices = window.speechSynthesis.getVoices();

  // this will hold an english voice
  let english_voice;

  // find voice by language locale "en-US"
  // if not then select the first voice
  for (let i = 0; i < available_voices.length; i++) {
    if (available_voices[i].lang === "en-GB") {
      english_voice = available_voices[i];
      break;
    }
  }
  if (!english_voice) english_voice = available_voices[0];

  // new SpeechSynthesisUtterance object
  const utter = new SpeechSynthesisUtterance();
  utter.rate = 1;
  utter.pitch = 0.5;
  utter.text = text;
  utter.volume = 100;
  utter.voice = english_voice;

  // event after text has been spoken
  utter.onend = function () {
    // Speech finished
  };

  // speak
  const speak = () => {
    window.speechSynthesis.speak(utter);
  };

  return speak;
}
