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
        question: 'The theory of relativity is presented by which scientist',
        choice1: 'Isaac Newton',
        choice2: 'Albert Einstein',
        choice3: 'Stephen Hawking',
        choice4: 'Marie Curie',
        answer: 2,
    },
    {
        question: "What type of lens is used in a magnifying glass",
        choice1: "Concave",
        choice2: "Plano-concave",
        choice3: "Convex",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: "Total number of colors exists in sunlight",
        choice1: "5",
        choice2: "9",
        choice3: "10",
        choice4: "7",
        answer: 4,
    },
    {
        question: "Who is the first person to define speed",
        choice1: "Galileo",
        choice2: "Newton",
        choice3: "Kepler",
        choice4: "Ptolemy",
        answer: 1,
    },
    {
        question: "If the spinning speed of the earth is increased then the weight of body at the equator will be",
        choice1: "Increases",
        choice2: "Double",
        choice3: "Same",
        choice4: "Decreases",
        answer: 4,
    },
    {
        question: "Which color deviates least when passing through a Prism",
        choice1: "Blue",
        choice2: "Red",
        choice3: "Yellow",
        choice4: "Green",
        answer: 2,
    },
    {
        question: "Which color deviates highest when passing through a Prism",
        choice1: "Indigo",
        choice2: "Green",
        choice3: "Orange",
        choice4: "Violet",
        answer: 4,
    },
    {
        question: "Electrons carry a",
        choice1: "Negative charge",
        choice2: "Positive charge",
        choice3: "Variable charge",
        choice4: "Neutral charge",
        answer: 1,
    },
    {
        question: "Proton carry a",
        choice1: "Negative charge",
        choice2: "Positive charge",
        choice3: "Variable charge",
        choice4: "Neutral charge",
        answer: 2,
    {
        question: "What is the size of Electron as comapared to Proton and Neutron",
        choice1: "1/1836",
        choice2: "1/1923",
        choice3: "1/355",
        choice4: "1/1236",
        answer: 1,
    }
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