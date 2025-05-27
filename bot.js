// bot.js
function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  synth.speak(utter);
}

function speakSalaam() {
  speak("As-salaamu Alaikum wa Rahmatullah, welcome to Divine Robotics");
}

function speakVerse() {
  speak("Indeed, Allah commands justice, and good conduct, and giving to relatives. Surah An-Nahl, verse 90.");
}
