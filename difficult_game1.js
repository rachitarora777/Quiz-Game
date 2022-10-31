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
        question: 'What is the only temperature that is the same in Fahrenheit and Celsius',
        choice1: '-40',
        choice2: '-273',
        choice3: '0',
        choice4: '100',
        answer: 1,
    },
    {
        question: "What number does giga stand for?",
        choice1: "A million",
        choice2: "A billion",
        choice3: "100 thousand",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "How many equal sides do Icosahedrons have?",
        choice1: "22",
        choice2: "13",
        choice3: "20",
        choice4: "16",
        answer: 3,
    },
    {
        question: "What is the next number in the series 28, 33, 40, 51, 64, ?",
        choice1: "128",
        choice2: "32",
        choice3: "343",
        choice4: "66",
        answer: 3,
    },
    {
        question: "What is the mathematical name for #?",
        choice1: "Numero sign",
        choice2: "Pound sign",
        choice3: "Hashtag",
        choice4: "Octothorp",
        answer: 4,
    },
    {
        question: "What is the Pythagoras’ Constant?",
        choice1: "√2",
        choice2: "√(a^2 + b^2)",
        choice3: "a^2 + b^2",
        choice4: "2√2",
        answer: 1,
    },
    {
        question: "Each side of a square is 62/3 m long. Find its Area.",
        choice1: "12 3/2 m2",
        choice2: "44 4/9 m2",
        choice3: "65 1/2 m2",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "Two numbers are in ratio 4 : 5. If the sum of the numbers is 135, find the numbers.",
        choice1: "65 and 70",
        choice2: "60 and 75",
        choice3: "55 and 80",
        choice4: "65 and 75",
        answer: 2,
    },
    {
        question: "A clock seen through a mirror shows 8 o’clock. What is the correct time?",
        choice1: "4:00",
        choice2: "8:00",
        choice3: "12:40",
        choice4: "12:20",
        answer: 1,
    },
    {
        question: "Fill in the blanks; 4, 6, 12, 14, 28, 30,___?",
        choice1: "34",
        choice2: "64",
        choice3: "32",
        choice4: "60",
        answer: 4,
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