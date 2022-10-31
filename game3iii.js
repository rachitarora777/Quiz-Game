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
        question: 'Light year is the unit of',
        choice1: 'Light',
        choice2: 'Length',
        choice3: 'Speed',
        choice4: 'None',
        answer: 2,
    },
    {
        question: "One light year is equal to",
        choice1: "2 trillion miles",
        choice2: "8 trillion miles",
        choice3: "6 trillion miles",
        choice4: "9 trillion miles",
        answer: 3,
    },
    {
        question: "Light from Sun reaches Earth in approximately",
        choice1: "5minutes",
        choice2: "9minutes",
        choice3: "10minutes",
        choice4: "8minutes",
        answer: 4,
    },
    {
        question: "Hertz is the SI unit of",
        choice1: "Frequency",
        choice2: "Weight",
        choice3: "Pressure",
        choice4: "Power",
        answer: 1,
    },
    {
        question: "The velocity of the sound is highest in",
        choice1: "Water",
        choice2: "Air",
        choice3: "Vacuum",
        choice4: "Metal",
        answer: 4,
    },
    {
        question: "In SONAR which kind of wave is used",
        choice1: "Audible sound",
        choice2: "Ultrasonic",
        choice3: "Radio",
        choice4: "Infrasonic",
        answer: 2,
    },
    {
        question: "Which one type of radiation has the longest wave length",
        choice1: "Infrared",
        choice2: "Ultraviolet",
        choice3: "X-ray",
        choice4: "Radio Wave",
        answer: 4,
    },
    {
        question: "Which one of the following ray has minimum wavelength",
        choice1: "Gamma ray",
        choice2: "Cosmic ray",
        choice3: "Ultraviolet ray",
        choice4: "X-ray",
        answer: 1,
    },
    {
        question: "Who discovered X-ray",
        choice1: "Ernest Rutherford",
        choice2: "Wilhelm Rontgen",
        choice3: "Pierre Curie",
        choice4: "Marie Curie",
        answer: 2,
    },
    {
        question: "According to the quantum theory of light, the energy of light is carried in discrete units are called",
        choice1: "Photons",
        choice2: "Photoelectrons",
        choice3: "Electrons",
        choice4: "Protons",
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