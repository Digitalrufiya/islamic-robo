const reminders = [
  {
    question: "taqwa",
    answer: "“O you who believe! Fear Allah as He should be feared, and do not die except as Muslims.” (Qur’an 3:102)"
  },
  {
    question: "death",
    answer: "“Every soul shall taste death.” (Qur’an 3:185)"
  },
  {
    question: "hellfire",
    answer: "“Fear the Fire whose fuel is men and stones.” (Qur’an 2:24)"
  },
  {
    question: "purpose",
    answer: "“And I did not create jinn and mankind except to worship Me.” (Qur’an 51:56)"
  },
  {
    question: "forgiveness",
    answer: "“Despair not of the Mercy of Allah. Verily, Allah forgives all sins.” (Qur’an 39:53)"
  }
];

function askDRF() {
  const input = document.getElementById("input").value.toLowerCase();
  const output = document.getElementById("output");
  const match = reminders.find(r =>
    input.includes(r.question)
  );

  if (match) {
    output.innerHTML = `<p>${match.answer}</p>`;
  } else {
    output.innerHTML = `<p>🤖 DRF: I am a digital reminder. I advise you to consult a local scholar for deep guidance. May Allah guide us all. 🤲</p>`;
  }
}
