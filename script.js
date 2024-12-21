let currentQuestionIndex = 0;
let questions = [];
let userAnswers = [];

function decodeHtmlEntities(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
}

async function fetchTrivia() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        const data = await response.json();
        questions = data.results;
        showQuestion(currentQuestionIndex);
    } catch (error) {
        console.error("Error fetching trivia:", error);
    }
}

function showQuestion(index) {
    const question = questions[index];
    const questionText = document.getElementById('question');
    const answerButtons = document.getElementById('answer-buttons');

    answerButtons.innerHTML = '';
    document.getElementById('next-button').disabled = false;

    questionText.innerText = decodeHtmlEntities(question.question);

    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = decodeHtmlEntities(answer);        button.onclick = () => checkAnswer(answer, button);
        answerButtons.appendChild(button);
    });
}

function checkAnswer(selectedAnswer, selectedButton) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct_answer;

    const buttons = document.querySelectorAll('#answer-buttons button');
    buttons.forEach(button => button.disabled = true);

    if (selectedAnswer === correctAnswer) {
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
        const correctButton = [...buttons].find(button => button.textContent === correctAnswer);
        if (correctButton) {
            correctButton.classList.add('correct');
        }
    }

    userAnswers.push({
        question: currentQuestion.question,
        selected: selectedAnswer,
        correct: selectedAnswer === correctAnswer
    })
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `<h2>Quiz Complete!</h2>`;
    let score = 0;
    userAnswers.forEach(answer => {
        if (answer.correct) score++;
    });

    quizContainer.innerHTML += `<p>Your score: ${score} out of ${questions.length}</p>`;
}

fetchTrivia();
