// Global variables
let quizTitle = document.querySelector(".quiz-title");
let currentTime = document.querySelector(".current-time");
let timeLeft = 60;

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

// Start timer
function startTimer(){
    let timeInterval = setInterval(function(){
        timeLeft--;
        currentTime.textContent = timeLeft;

        if(timeLeft <= 0){
            clearInterval(timeInterval);
        }
    }, 1000);
}

startTimer()

// Display question lists on the screen
function DisplayQuestion(){
}
