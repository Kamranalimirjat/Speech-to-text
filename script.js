const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const clearBtn = document.getElementById('clear');
const textArea = document.getElementById('text');

let recognition;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    textArea.value = transcript;
  };

  recognition.onerror = (event) => {
    console.error("Speech Recognition Error: ", event.error);
  };
} else {
  alert("Sorry, your browser doesn't support Speech Recognition.");
  startBtn.disabled = true;
}

startBtn.addEventListener('click', () => {
  if (recognition) {
    recognition.start();
  }
});

stopBtn.addEventListener('click', () => {
  if (recognition) {
    recognition.stop();
  }
});

clearBtn.addEventListener('click', () => {
  textArea.value = '';
});
