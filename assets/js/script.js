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

// Global variables
let quizWrap = document.querySelector(".quiz-wrap");
let initWrap = document.querySelector(".init-wrap");
let endWrap = document.querySelector(".end-wrap");
let scoreWrap = document.querySelector(".score-wrap");
let quizTitle = document.querySelector(".quiz-title");
let startBtn = document.querySelector("#startBtn");
let currentTime = document.querySelector(".current-time");
let scoreText = document.querySelector(".score-text");
let initialSubmitBtn = document.querySelector(".initial-submit")
let quizLists = document.querySelector(".quiz-lists")
let goBackBtn = document.querySelector(".back-btn")
let clearScoreBtn = document.querySelector(".clear-btn")

let timeInterval;
let timeLeft = 60;
let score = 0;
let index = 0;
let currentQuestion = questionLists[index];


// Click the start button, a list of questions displays on the screen
function startQuizChallenge(){
    initWrap.style.display = "none";
    displayQuestion();
    startTimer();
}


// Start timer
function startTimer(){
    timeInterval = setInterval(function(){
        timeLeft--;
        currentTime.textContent = timeLeft;

        if(timeLeft < 10 && timeLeft > 0){
            currentTime.textContent = "0" + timeLeft;
        }

        if(timeLeft <= 0){
            endQuizChallenge();
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
    clearInterval(timeInterval);

    quizWrap.style.display = "none";
    endWrap.style.display = "block";

    scoreText.textContent = "Quiz challenge is over! Your final score is " + score;
}

// Save the score to local storage
function saveScore(event){
    event.preventDefault();

    endWrap.style.display = "none";
    scoreWrap.style.display = "block";

    
    let initialsValue = document.querySelector(".initial-input").value.trim();
    if(initialsValue === ""){
        alert("Please enter your initials.");
        return;
    }

    let storedObjects = JSON.parse(localStorage.getItem("initials"));
    if(!storedObjects){
        storedObjects = [];
    }
    
    let scoreObj = {
        "initials": initialsValue,
        "score": score
    }
    
    // Add an object to array
    storedObjects.push(scoreObj);
    window.localStorage.setItem("initials", JSON.stringify(storedObjects));

    // Display score lists
    for(let i = 0; i < storedObjects.length; i++){
        let scoreBox = document.querySelector(".score-box");
        let scoreLists = document.createElement("li");
        scoreLists.textContent = `${[i+1]}. ${storedObjects[i].initials} - ${storedObjects[i].score}`

        scoreBox.insertAdjacentElement("beforeend", scoreLists);
    }
}

// refresh the page
function pageGetsRefreshed(){
    location.reload();
}

// Clear local storage
function clearLocalstorage(){
    window.localStorage.clear();
}

// Event Listeners
startBtn.addEventListener("click", startQuizChallenge);
initialSubmitBtn.addEventListener("click", saveScore);
quizLists.addEventListener("click", handleSelectedAnswer);
goBackBtn.addEventListener("click", pageGetsRefreshed);
clearScoreBtn.addEventListener("click", clearLocalstorage);