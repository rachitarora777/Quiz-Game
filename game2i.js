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
        question: 'One of the essential minerals in the human body is salt. How much salt (NaCl) is in the average adult human body?',
        choice1: '1kg',
        choice2: '250gms',
        choice3: '500gms',
        choice4: 'none',
        answer: 2,
    },
    {
        question: "If you fill a glass to the brim with ice water and the ice melts, what will happen?",
        choice1: "The glass will over flow as the ice turns to water",
        choice2: "The water level will drop slightly as the ice melts.",
        choice3: "The level of water in the glass will remain unchanged as the ice melts.",
        choice4: "I'll never find out because I'll drink the water or walk away before anything happens.",
        answer: 2,
    },
    {
        question: " The symbol Sb stands for stibnum or stibnite. What is the modern name of this element?",
        choice1: "Antimony",
        choice2: "Seaborgium",
        choice3: "Mercury",
        choice4: "Samarium",
        answer: 1,
    },
    {
        question: "Water-based liquids can be described as acidic, neutral, or basic, with respect to pH. Which of these describes milk?",
        choice1: "Milk does not have a pH",
        choice2: "Strong acid",
        choice3: "Slightly acidic",
        choice4: "Slightly basic",
        answer: 3,
    },
    {
        question: "DNA codes for proteins, which are the building blocks of organisms. What is the most abundant protein in the human body?",
        choice1: "Collagen",
        choice2: "Keratin",
        choice3: "Albumin",
        choice4: "Tubulin",
        answer: 1,
    },
    {
        question: "Noble gases are inert because they have completed outer electron shells. Which of these elements isn't a noble gas?",
        choice1: "Helium",
        choice2: "Krypton",
        choice3: "Chlorine",
        choice4: "Argon",
        answer: 3,
    },
    {
        question: "What is the most common isotope of hydrogen?",
        choice1: "Protium",
        choice2: "Deuterium",
        choice3: "Tritum",
        choice4: "Hydrogen only has one isotope!",
        answer: 1,
    },
    {
        question: "You can't live without water! What is its chemical formula?",
        choice1: "H2",
        choice2: "O2",
        choice3: "H2O2",
        choice4: "H2O",
        answer: 4,
    },
    {
        question: "Who is credited with the invention of the modern periodic table?",
        choice1: "Mendeleev",
        choice2: "Mendel",
        choice3: "Lavoisier",
        choice4: "Nobel",
        answer: 1,
    },
    {
        question: "Which of these elements is a nonmetal?",
        choice1: "Manganese",
        choice2: "Sulfur",
        choice3: "Aluminum",
        choice4: "Beryllium",
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