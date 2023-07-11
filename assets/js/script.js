// Global variables
let quizWrap = document.querySelector(".quiz-wrap");
let quizTitle = document.querySelector(".quiz-title");
let startBtn = document.querySelector("#startBtn");
let initWrap = document.querySelector(".init-wrap");
let currentTime = document.querySelector(".current-time");
let timeLeft = 60;
let score = 0;


// Setting quiz question lists
let questionLists = [
    {
        question: "Commonly used data types DO Not Include: ",
        examples: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    {
        question: "A variable in Javascript declared with which of the following keyword? ",
        examples: ["new", "int", "string", "var"],
        correctAnswer: "var"
    },
    {
        question: "What does null mean in JavaScript? ",
        examples: ["empty string value", "absence of a value", "unknown value", "zero value"],
        correctAnswer: "absence of a value"
    },
    {
        question: "Which of the following statements will show a message as well as ask for user input in a popup? ",
        examples: ["alert()", "prompt()", "confirm()", "message()"],
        correctAnswer: "prompt()"
    },
    {
        question: "Which of the given options is an incorrect variable name? ",
        examples: ["javascript", "_javascript", "$javascript", "-javascript"],
        correctAnswer: "-javascript"
    }
]
let index = 0;
let currentQuestion = questionLists[index];


// Click the start button, a list of questions displays on the screen
startBtn.addEventListener("click", function(){
    initWrap.style.display = "none";
    displayQuestion();
    startTimer();
})

// Start timer
function startTimer(){
    let timeInterval = setInterval(function(){
        timeLeft--;
        currentTime.textContent = timeLeft;

        if(timeLeft < 10 && timeLeft > 0){
            currentTime.textContent = "0" + timeLeft;
        }

        if(timeLeft <= 0){
            clearInterval(timeInterval);
        }
    }, 1000);
}

// Display question lists on the screen
function displayQuestion(){
    let quizUl = document.querySelector(".quiz-lists");
    let currentQuestion = questionLists[index];

    quizWrap.style.display = "block";
    quizTitle.textContent = currentQuestion.question;
    quizUl.innerHTML = "";

    currentQuestion.examples.forEach(example => {
        let quizLi = document.createElement("li");
        let quizBtn = document.createElement("button");
        
        quizBtn.classList.add("examples");
        
        
        quizUl.appendChild(quizLi);
        quizLi.appendChild(quizBtn);
        quizBtn.textContent = example;
    });
}

// When the list button is clicked, show the next question and handle answer selection
function handleSelectedAnswer(event){
    let selectTarget = event.target;

    if(selectTarget.matches(".examples")){
        let selectedAnswer = selectTarget.textContent;
        let currentQuestion = questionLists[index];

        if(selectedAnswer === currentQuestion.correctAnswer){
            score += 10;
            alert("You are correct!");
        }else{
            timeLeft -= 10;
            alert("You are wrong!");

            if(timeLeft < 0) {
                currentTime.textContent = 0;
            };
        }
        
        index ++;
        if(index < questionLists.length){
            displayQuestion();
        }else{
            endQuizChallenge();
        }
    }else{
        return;
    }
    
}

// End the coding quiz challenge
function endQuizChallenge(){
    alert("End");
}

document.querySelector(".quiz-lists").addEventListener("click", handleSelectedAnswer);