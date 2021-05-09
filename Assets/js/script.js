const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// ENDGAME function
endGame = () => {
  return window.location.assign('end.html');
}

// TIMER COUNTDOWN
let seconds = document.getElementById("countdown").textContent;
let countdown = setInterval(function(){
    seconds--;
    (seconds == 1) ? document.getElementById("plural").textContent = "" : document.getElementById("plural").textContent = "s";
    document.getElementById("countdown").textContent = seconds;
    if (seconds <= 0) clearInterval(countdown);
    if (seconds === 0) {
      endGame();
    }
},1000);

// MY QUESTIONS
let questions = [
  {
    question: "In what element is an external file stored in your HTML page?",
    choice1: "Section",
    choice2: "Body",
    choice3: "Link",
    choice4: "Head",
    answer: 3,
  },
  {
    question:"What element can continue to execute a block of code as long as the secified condition remains TRUE?",
    choice1: "Repeater",
    choice2: "Debugger",
    choice3: "QuerySelector",
    choice4: "Loop",
    answer: 4,
  },
  {
    question:"What is the JavaScript element that represents either TRUE or FALSE values?",
    choice1: "Boolean",
    choice2: "Condition",
    choice3: "EventListener",
    choice4: "QuerySelector",
    answer: 1,
  },
  {
    question:"When working with JQuery, you are actually working with which programming language?",
    choice1: "Ruby",
    choice2: "Javascript",
    choice3: "Python",
    choice4: "CSS",
    answer: 2,
  },
  {
    question: "How do we represent an elements class when working in CSS?",
    choice1: "class ()",
    choice2: "#class {}",
    choice3: ".class {}",
    choice4: "ID",
    answer: 3,
  }
];
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

// START FUNCTION
startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

// SCROLLING THROUGH QUESTIONS FUNCTION
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${
    (questionCounter / MAX_QUESTIONS) * 100
  }%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score +=num;
  scoreText.innerText = score;
};

startQuiz();