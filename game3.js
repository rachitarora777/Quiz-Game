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
        question: 'The alloy of steel that is used for making automobile parts such as axle, ball bearing, etc. is',
        choice1: 'Nickel steel',
        choice2: 'Chromium steel',
        choice3: 'Tungsten steel',
        choice4: 'Stainless steel',
        answer: 2,
    },
    {
        question: "In the visible spectrum, the colour having the shortest wavelength is -",
        choice1: "Green",
        choice2: "Red",
        choice3: "Violet",
        choice4: "Blue",
        answer: 3,
    },
    {
        question: "After a shower of rain, a rainbow is seen - ",
        choice1: "Even in the absence of the sun",
        choice2: "Opposite the sun",
        choice3: "Towards the sun",
        choice4: "Anywhere, irrespective of the position of the sun",
        answer: 4,
    },
    {
        question: "Non-metallic mineral is - ",
        choice1: "Marble ",
        choice2: "Manganese ",
        choice3: "Silver ",
        choice4: "Lead",
        answer: 1,
    },
    {
        question: "A man weighing 65 kg jumps from a 100 ft high building with a load of 35 kg What will be the load experienced by him?",
        choice1: "20 kg ",
        choice2: "100 kg ",
        choice3: "200 kg ",
        choice4: "Zero",
        answer: 4,
    },
    {
        question: "The working principle of transformer is - ",
        choice1: "Self - induction",
        choice2: "Mutual induction ",
        choice3: "Electromagnetic induction ",
        choice4: "Lorentz law",
        answer: 2,
    },
    {
        question: "Which of the following is a semiconductor?",
        choice1: "Silver",
        choice2: "Glass",
        choice3: "Copper",
        choice4: "Silicon",
        answer: 4,
    },
    {
        question: " Which one of the following attributes is not true for uniform circular motion ?",
        choice1: "The distance is always equal to the displacement",
        choice2: "Velocity is always perpendicular to the radius of the circle",
        choice3: "The speed of the body remain constant",
        choice4: "The velocity of the body is continuously changing",
        answer: 1,
    },
    {
        question: " Once a satellite has been launched into orbit, the only force governing its motion is the force of - ",
        choice1: "Gravity",
        choice2: "Elasticity",
        choice3: "Friction",
        choice4: "Fuel driven",
        answer: 1,
    },
    {
        question: "The term refraction of light means -",
        choice1: "Bending of light rays when they enter from one medium to another medium",
        choice2: "Splitting of white light into seven colours when it passes through the prism",
        choice3: "Bending of light round the corners of obstacles and apertures",
        choice4: "Coming back of light from a bright smooth surface",
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