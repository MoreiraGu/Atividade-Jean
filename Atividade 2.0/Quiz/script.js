const questions = [
    {
        question: "Em que ano o São Paulo FC foi fundado?",
        answers: [
            { text: "a) 1940", correct: false },
            { text: "b) 1930", correct: false },
            { text: "c) 1935", correct: true },
            { text: "d) 1950", correct: false },
        ]
    },
    {
        question: "Qual é o estádio oficial do São Paulo FC?",
        answers: [
            { text: "a) Morumbi", correct: true },
            { text: "b) Maracanã", correct: false },
            { text: "c) Pacaembu", correct: false },
            { text: "d) Fármacia", correct: false },
        ]
    },
    {
        question: "Qual jogador do São Paulo marcou o gol da vitória no Mundial de Clubes de 2005?",
        answers: [
            { text: "a) Mineiro", correct: true },
            { text: "b) Danilo", correct: false },
            { text: "c) Aloísio", correct: false },
            { text: "d) Lugano", correct: false },
        ]
    },
    {
        question: "Qual jogador revelado pelo São Paulo foi vendido para o Real Madrid em 2005?",
        answers: [
            { text: "a) Kaká", correct: false },
            { text: "b) Júlio Baptista", correct: true },
            { text: "c) Lucas Moura", correct: false },
            { text: "d) Casemiro", correct: false },
        ]
    },
    {
        question: "Quantos gols Rogério Ceni marcou em sua carreira como goleiro?",
        answers: [
            { text: "a) 95", correct: false },
            { text: "b) 123", correct: false },
            { text: "d) 100", correct: false },
            { text: "c) 131", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons"); 
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próximo";
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
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length} questões!`;
    nextButton.innerHTML = "Refazer o teste";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();