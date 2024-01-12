const questions = [
    {
        question: "Which is larget water animal in the World?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Star fish", correct: false},
            { text: "fish", correct: false},
        ]
    },
    {
        question: "Which is larget animal in the World?",
        answers: [
            { text: "Lion", correct: false},
            { text: "Black cat", correct: false},
            { text: "Elephant", correct: true},
            { text: "Tiger", correct: false},
        ]
    },
    {
        question: "Which is larget tree in the World?",
        answers: [
            { text: "Mango tree", correct: false},
            { text: "Orang tree", correct: false},
            { text: "Babbule tree", correct: true},
            { text: "Pipal tree", correct: false},
        ]
    },
    {
        question: "Which is small animal in the option?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: false},
            { text: "Elephant", correct: false},
            { text: "Ant", correct: true},
        ]
    },

]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);

    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    
    if(score === questions.length){
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}<br/> You are Win`;
    }
    else{
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    }
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }
        else{
            startQuiz();
        }
});

startQuiz();