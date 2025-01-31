const wordImage = document.getElementById("wordImage");
const userAnswer = document.getElementById("userAnswer");
const checkButton = document.getElementById("checkButton");
const message = document.getElementById("message");
const feedback = document.querySelector(".feedback");

const cvcWords = [
  { word: "bed", image: "bed.jpg" },
  { word: "box", image: "box.jpeg" },
  { word: "cup", image: "cup.jpeg" },
  { word: "fan", image: "fan.jpeg" },
  { word: "pig", image: "pig.jpeg" },
  { word: "rug", image: "rug.jpeg" },
  { word: "sun", image: "sun.jpeg" },
  { word: "web", image: "web.jpeg" },
  { word: "cat", image: "cat.jpeg" },
  { word: "dog", image: "dog.jpg" },
];

let currentWordIndex = 0;
let score = 0;
let totalWords = cvcWords.length;

function loadNextWord() {
  if (currentWordIndex < cvcWords.length) {
    currentWord = cvcWords[currentWordIndex];
    wordImage.src = currentWord.image;
    wordImage.onerror = function() {
      message.textContent = `Error loading image: ${currentWord.image}`;
      feedback.classList.add("incorrect");
      loadNextWord(); // Try the next word if image fails to load
    };
    userAnswer.value = "";
    message.textContent = "";
    feedback.classList.remove("correct", "incorrect");
  } else {
    showFinalScore();
  }
}

function checkAnswer() {
  const userInput = userAnswer.value.toLowerCase();
  if (userInput === currentWord.word) {
    message.textContent = "Correct!";
    feedback.classList.add("correct");
    score++;
  } else {
    message.textContent = "Wrong!";
    feedback.classList.add("incorrect");
  }
  currentWordIndex++;
  setTimeout(loadNextWord, 1000); // Wait 1 second before loading the next word
}

function showFinalScore() {
  const finalScoreDisplay = document.createElement("p");
  finalScoreDisplay.id = "finalScore";
  finalScoreDisplay.textContent = `Final Score: ${score}/${totalWords}`;
  document.querySelector(".feedback").appendChild(finalScoreDisplay);
  checkButton.disabled = true;
  userAnswer.disabled = true;
}

checkButton.addEventListener("click", checkAnswer);
userAnswer.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

loadNextWord(); // Start with the first word
