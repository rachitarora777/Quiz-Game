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
        question: 'What is the most popular lucky number?',
        choice1: 'Seven',
        choice2: 'One',
        choice3: 'Ten',
        choice4: 'Hundred',
        answer: 1,
    },
    {
        question: "What does the Roman Numeral 'L' equal?",
        choice1: "100",
        choice2: "50",
        choice3: "1000",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "How many sides does a circle have?",
        choice1: "Zero",
        choice2: "Pi",
        choice3: "Infinite",
        choice4: "2*pi*r",
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
        question: "Which prime number comes after 3?",
        choice1: "2",
        choice2: "13",
        choice3: "7",
        choice4: "5",
        answer: 4,
    },
    {
        question: "Solve : 24 + 4 ÷ 4",
        choice1: "25",
        choice2: "6",
        choice3: "28",
        choice4: "7",
        answer: 1,
    },
    {
        question: "How many hours in 90 minutes?",
        choice1: "1 hours",
        choice2: "1.5 hours",
        choice3: "1.30 hours",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "How many digits answer we will get when we add 99 and 1?",
        choice1: "1",
        choice2: "3",
        choice3: "100",
        choice4: "99",
        answer: 2,
    },
    {
        question: "What are the integer solutions of the inequality |x| < 2?",
        choice1: "1, 0, and –1",
        choice2: "2, 1, 0, –1, and –2",
        choice3: "2",
        choice4: "2 and –2",
        answer: 1,
    },
    {
        question: "How many sides are there in a nonagon?",
        choice1: "3",
        choice2: "5",
        choice3: "7",
        choice4: "9",
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