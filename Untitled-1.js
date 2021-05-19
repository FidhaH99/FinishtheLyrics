const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-button");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    nextButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question:
      "What you know about rollin' down in the deep? When your brain goes numb, you can call that mental freeze",
    answers: [
      {
        text: "When these people talk too much, put that shit in slow motion, yeah",
        correct: true,
      },
      {
        text: "When those people talk too much, put this shit in slow motion, yeah",
        correct: false,
      },
    ],
  },
  {
    question:
      "Breathe me in, breathe me out I don't know if I could ever go without",
    answers: [
      {
        text: " I'm just thinking out loud I don't know if I could ever go without",
        correct: true,
      },
      {
        text: "I'm just saying out loud I don't know if I could ever go without",
        correct: false,
      },
    ],
  },
  {
    question: "Now the day bleeds Into nightfall",
    answers: [
      { text: "And you're not here To get me through it all", correct: true },
      { text: "And you're not here To save me through it all", correct: false },
    ],
  },
  {
    question: "Candy, she's sweet like candy in my veins",
    answers: [
      { text: "Baby, I'm dying for another taste", correct: true },
      { text: "Baby, I'd love another taste", correct: false },
    ],
  },
  {
    question:
      "And I was runnin' far away Would I run off the world someday? Nobody knows Nobody knows",
    answers: [
      {
        text: " and I was dancing in the rain I felt alive and I can't complain",
        correct: true,
      },
      {
        text: "and I was dancing in the rain I felt the love and I can't complain",
        correct: false,
      },
    ],
  },
];
