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
        question: 'Organic chemistry is the study of the compounds that make up living organisms. All organic molecules contain:',
        choice1: 'Carbon and nitrogen',
        choice2: 'Carbon and hydrogen',
        choice3: 'Carbon, hydrogen, and oxygen',
        choice4: 'Carbon only',
        answer: 2,
    },
    {
        question: "The symbol Ag stands for which element?",
        choice1: "Magnesium",
        choice2: "Silver",
        choice3: "Gallium",
        choice4: "Gold",
        answer: 2,
    },
    {
        question: "Three of the most common states of matter are solids, liquids, and gases. A liquid has:",
        choice1: "A defined volume, but not a defined shape",
        choice2: "A definite shape, but no defined volume",
        choice3: "A defined volume and shape",
        choice4: "No defined volume or shape",
        answer: 1,
    },
    {
        question: "You can't live without iron. Where in the body is most of the iron located?",
        choice1: "Your bones",
        choice2: "Your brain",
        choice3: "Your blood",
        choice4: "Your skin",
        answer: 3,
    },
    {
        question: "A mole contains Avogadro's number of items. What is Avogadro's number?",
        choice1: "6.023 x 10^23",
        choice2: "3 x 10^8",
        choice3: "6023",
        choice4: "6.02 x 10^-23",
        answer: 1,
    },
    {
        question: "What do you call an atom that has more protons than electrons?",
        choice1: "An anion",
        choice2: "A molecule",
        choice3: "A cation",
        choice4: "An isotope",
        answer: 3,
    },
    {
        question: "All of the following are amino acids except:",
        choice1: "Adenine",
        choice2: "Leucine",
        choice3: "Tyrosine",
        choice4: "Tryptophan",
        answer: 1,
    },
    {
        question: "A drop of food coloring spreading out in a cup of water is an example of which transport process?",
        choice1: "Vapor Pressure",
        choice2: "Effusion",
        choice3: "Osmosis",
        choice4: "Diffusion",
        answer: 4,
    },
    {
        question: "In a solution of saltwater (a saline solution), salt is the:",
        choice1: "Solute",
        choice2: "Sol",
        choice3: "Solvent",
        choice4: "Colloid",
        answer: 1,
    },
    {
        question: "All of the following elements are liquids around room temperature except which one?",
        choice1: "Mercury",
        choice2: "Magnesium",
        choice3: "Bromine",
        choice4: "Gallium",
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