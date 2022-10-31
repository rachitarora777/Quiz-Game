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
        question: 'Which is the longest river in the world?',
        choice1: 'Amazon',
        choice2: 'Indus',
        choice3: 'Ganges',
        choice4: 'Nile',
        answer: 4,
    },
    {
        question:"Which organ purifies our blood?",
        choice1: "Heart",
        choice2: "Lungs",
        choice3: "Kidneys",
        choice4: "Liver",
        answer: 3,
    },
    {
        question: "LBW is related to which sport?",
        choice1: "Volleyball",
        choice2: "Hockey",
        choice3: "Football",
        choice4: "Cricket",
        answer: 4,
    },
    {
        question: "Which city is not one of the 4 metropolitian cities of India?",
        choice1: "Mumbai",
        choice2: "Kolkata",
        choice3: "Chandigarh",
        choice4: "Delhi",
        answer: 3,
    },
    {
        question: "Name the first female Indian Astronaut",
        choice1: "Sirisha Bandla",
        choice2: "Kalpana Chawla",
        choice3: "Sunita Williams",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "Who is known as Father of Indian Constitution?",
        choice1: "Dr. B. R. Ambedkar",
        choice2: "Mahatma Gandhi",
        choice3: "Dr. Rajendra Prasad",
        choice4: "Pandit Jawaharlal Nehru",
        answer: 1,
    },
    {
        question: "How many Cricket world cups has India won?",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 2,
    },
    {
        question: "Which is the hottest planet in our solar system?",
        choice1: "Mercury",
        choice2: "Mars",
        choice3: "Venus",
        choice4: "Jupiter",
        answer: 3,
    },
    {
        question: "Entomology is the science that studies",
        choice1: "Plants",
        choice2: "Mammals",
        choice3: "Birds",
        choice4: "Insects",
        answer: 4,
    },
    {
        question: "Name the lightest gas",
        choice1: "Helium",
        choice2: "Hydrogen",
        choice3: "Nitrogen",
        choice4: "Oxygen",
        answer: 2,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

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