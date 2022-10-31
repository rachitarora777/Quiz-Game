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
        question: 'Which among the following gas was leaked at Bhopal during the Bhopal gas tragedy at 2-3 December 1984?',
        choice1: 'Methyl isocyanide',
        choice2: 'Methyl isocyanate',
        choice3: 'Methyl isochloride',
        choice4: 'Methyl isochlorate',
        answer: 2,
    },
    {
        question: "What is the common name of analgesic and antipyretic drug acetylsalicylic acid?",
        choice1: "Paracetamol",
        choice2: "Aspirin",
        choice3: "Wintergreen",
        choice4: "Trazodone",
        answer: 2,
    },
    {
        question: "Calamine is an ore of which among the following?",
        choice1: "Zinc",
        choice2: "Copper",
        choice3: "Mercury",
        choice4: "Iron",
        answer: 1,
    },
    {
        question: "What happens to the weight of Iron, when it rusts?",
        choice1: "Increases for long time",
        choice2: "Decreases then increases",
        choice3: "Increases then decreases",
        choice4: "Remains the same",
        answer: 3,
    },
    {
        question: "What is the chemical formula of butane",
        choice1: "C4H10 ",
        choice2: "C4H8 ",
        choice3: "C3H8 ",
        choice4: "C3H6",
        answer: 1,
    },
    {
        question: "Which among the following is popularly called Hypo?",
        choice1: "Silver Bromide",
        choice2: " Silver nitrate",
        choice3: "Sodium thiosulphate ",
        choice4: "Sodium phosphate",
        answer: 3,
    },
    {
        question: "Which among the following is an example of a Chemical Change?",
        choice1: "Rusting of iron ",
        choice2: "Magnetisation of iron ",
        choice3: " Melting of iron ",
        choice4: " Heating of iron",
        answer: 1,
    },
    {
        question: "Which among the following substances is most suitable for making Compact Discs?",
        choice1: "PVC",
        choice2: "Polyethylene",
        choice3: "Polyamides",
        choice4: "Polycarbonates",
        answer: 4,
    },
    {
        question: "Which among the following types of glasses contains Cerium and other rare earths and has a high absorption of ultraviolet rays?",
        choice1: "Crookes Glass",
        choice2: "Pyrex Glass",
        choice3: "Flint Glass",
        choice4: "Crown Glass",
        answer: 1,
    },
    {
        question: "PVC is a polymer of ?",
        choice1: "Propane",
        choice2: "Vinyl chloride",
        choice3: "Styrene",
        choice4: "Carbonates",
        answer: 2,
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