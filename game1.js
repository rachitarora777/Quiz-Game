const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'A function f is defined by f(x)=|x+ 4|. For what values of x is the graph of f not differentiable?hat is 2 + 2?',
        choice1: 'x = -4',
        choice2: 'x = 4',
        choice3: 'x = 0',
        choice4: 'The function is differentiable in its entire domain',
        answer: 1,
    },
    {
        question:
            "If a, b, c, d ∈ N and they are four consecutive terms of an AP then the ath, bth, cth, dth terms of a GP are in",
        choice1: "AP",
        choice2: "GP",
        choice3: "HP",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "How many seconds are in one day?",
        choice1: "64,800",
        choice2: "36,000",
        choice3: "86,400",
        choice4: "21,600",
        answer: 3,
    },
    {
        question: "What is the next number in the series 28, 33, 40, 51, 64, ?",
        choice1: "128",
        choice2: "32",
        choice3: "81",
        choice4: "66",
        answer: 3,
    },
    {
        question: "How many sides does a dodecahedron have?",
        choice1: "14",
        choice2: "20",
        choice3: "11",
        choice4: "12",
        answer: 4,
    },
    {
        question: "What is the smallest prime number?",
        choice1: "2",
        choice2: "1",
        choice3: "0",
        choice4: "3",
        answer: 1,
    },
    {
        question: "What is  -10 ÷ (20 ÷ 2² × 5 ÷ 5) × 8 - 2 ",
        choice1: "38",
        choice2: "-18",
        choice3: "-16",
        choice4: "18",
        answer: 2,
    },
    {
        question: "What percentage is 8.95 of 10.95?",
        choice1: "21.93%",
        choice2: "46.8%",
        choice3: "13.45%",
        choice4: "10.95%",
        answer: 4,
    },
    {
        question: "What Is The Only Number That Has The Same Number Of Letters?",
        choice1: "4",
        choice2: "5",
        choice3: "2",
        choice4: "8",
        answer: 1,
    },
    {
        question: "What Is The Other Name For The International Day Of Mathematics?",
        choice1: "Pi Day",
        choice2: "Infinity Day",
        choice3: "Newton's Day",
        choice4: "Epsilon Day",
        answer: 1,
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()