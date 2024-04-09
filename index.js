function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.questionIndex = 0;
}

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

Quiz.prototype.getQuestionByIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.checkOptionWithAnswer = function (userAnswer) {
  let currentQuestion = this.getQuestionByIndex();
  if (currentQuestion.isCorrectAnswer(userAnswer)) {
    this.score++;
  }
  this.questionIndex++;
};

function Question(questionText, choices, answer) {
  this.question = questionText;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (userAnswer) {
  return this.answer === userAnswer;
};

function loadQuestions() {
  if (jsQuiz.isEnded()) {
    showScore();
  } else {
    var element = document.getElementById("question");
    element.innerHTML = jsQuiz.getQuestionByIndex().question;

    var choices = jsQuiz.getQuestionByIndex().choices;    
    if (choices) {
      for (var i = 0; i < choices.length; i++) {
        var element = document.getElementById("choice" + i);
        element.innerHTML = choices[i];
        handleOptionButton("btn" + i, choices[i]);
      }
    }
    showProgress();
  }
}

function handleOptionButton(id, choice) {
  var button = document.getElementById(id);
  button.onclick = function () {
    jsQuiz.checkOptionWithAnswer(choice);
    loadQuestions();
  };
}

function showProgress() {
  var currentQuestionNumber = jsQuiz.questionIndex + 1;
  var element = document.getElementById("progess");
  element.innerHTML =
    "Question " + currentQuestionNumber + " of " + jsQuiz.questions.length;
}

function showScore() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML +=
    "<h2> Your scores: " +
    jsQuiz.score +
    ". And mark percentage is: " +
    (jsQuiz.score / questions.length) * 100 +
    "%" +
    "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
}

let questions = [
    new Question("What is the result of 2 + 2?", ["3", "4", "5", "6"], "4"),
    new Question("Which keyword is used to declare a constant in JavaScript?", ["const", "let", "var", "static"], "const"),
    new Question("What is the output of 'typeof 42' in JavaScript?", ["'number'", "'string'", "'undefined'", "'object'"], "'number'"),
    new Question("What method is used to add a new element to the end of an array in JavaScript?", [".push()", ".pop()", ".concat()", ".join()"], ".push()"),
    new Question("What symbol is used for single-line comments in JavaScript?", ["//", "/*", "--", "-->"], "//")
];


let jsQuiz = new Quiz(questions);
loadQuestions();
