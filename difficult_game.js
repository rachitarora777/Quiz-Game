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
        question: 'Name the highest mountain peak of India',
        choice1: 'Mount Kanchenjunga',
        choice2: 'Kedarnath',
        choice3: 'Nanda Devi',
        choice4: 'None of the above',
        answer: 1,
    },
    {
        question:"What is the study of Universe known as??",
        choice1: "Astronomy",
        choice2: "Cosmology",
        choice3: "Astrology",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "How many layers are there in Earth’s atmosphere?",
        choice1: "4",
        choice2: "3",
        choice3: "6",
        choice4: "5",
        answer: 4,
    },
    {
        question: "Who invented the Television?",
        choice1: "John Logie Baird",
        choice2: "Charles Babbage",
        choice3: "Thomas Edison",
        choice4: "Alexander Graham Bell",
        answer: 1,
    },
    {
        question: "Which state has taken up Sanskrit as an official language?",
        choice1: "Uttarakhand",
        choice2: "Uttar Pradesh",
        choice3: "Madhya Pradesh",
        choice4: "Jharkand",
        answer: 1,
    },
    {
        question: "Who was the first Indian to have won the Nobel Prize?",
        choice1: "Mother Teresa",
        choice2: "Rabindranath Tagore",
        choice3: "CV Raman",
        choice4: "Hargobind Khorana",
        answer: 2,
    },
    {
        question: "Who was the first female ruler of India?",
        choice1: "Razia Sultan",
        choice2: "Rani Padmini",
        choice3: "Rani Lakshmibai",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "Where will you find the largest museum of India?",
        choice1: "Chennai",
        choice2: "Mumbai",
        choice3: "Hyderabad",
        choice4: "Delhi",
        answer: 1,
    },
    {
        question: "Which planet is the coldest planet in our solar system?",
        choice1: "Neptune",
        choice2: "Uranus",
        choice3: "Jupiter",
        choice4: "Saturn",
        answer: 1,
    },
    {
        question: "What is the most spoken language in the world?",
        choice1: "Hindi",
        choice2: "Mandarin",
        choice3: "English",
        choice4: "French",
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