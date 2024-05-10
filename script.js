// string - ""
// list - []
// dictionary - {} A dictionary has key-value pair


const quizData = [
    {
        question:"2340-1040=",
        options: ["1000", "1300", "1030", "3100"],
        answer:"1300"
    },

    {
        question:"Which of the things below is a living thing?",
        options: ["ant", "fan", "pencil", "car"],
        answer:"ant"
    },

    {
        question:"452x10=",
        options: ["0", "4525", "4052", "4520"],
        answer:"4520"
    },

    {
        question:"900-740",
        options: ["620", "602", "260", "621"],
        answer:"260"
    },

    {
        question:"Which of the things below is a non-living thing?",
        options: ["ant", "mealworm", "dead tree", "tree"],
        answer:"dead tree"
    },

    {
        question:"900+560=",
        options: ["1460", "4154", "1567", "1456"],
        answer:"1460"
    }
];

const questionElement = document.getElementById('question');
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById('timer');
const timerText = document.getElementById('countdown');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');
const optionsElement = document.getElementById('option-container');
const resultElement = document.getElementById('result');


progressBar.style.width = '0%';


let currentQuestion = 0;
let score = 0;
let timer = 0;


startButton.addEventListener('click', startQuiz);

function startQuiz()
{
    startButton.style.display = 'none';
    progressBarContainer.style.display = 'block';
    resultElement.textContent = `You scored ${score} points`;
    loadQuestion();
}

function loadQuestion()
{
    clearInterval(timer);

    if(currentQuestion < quizData.length)
    {
        // Update the progress bar
        progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;

        const currentQuizData = quizData[currentQuestion];
        questionElement.textContent = currentQuizData.question;

        // Set initial countdown value
        timerText.textContent = 30;

        // Clone 4 option buttons
        optionsElement.innerHTML = ''; // Clear previous options

        currentQuizData.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            optionsElement.appendChild(button);

            button.addEventListener('click', () => {
                checkAnswer(option);
            });
        });


        // kickstart the timer for the current question
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;

            // check if the time is up
            if(parseInt(timerText.textContent) === 0)
            {
                // reset the timer
                clearInterval(timer);

                currentQuestion = currentQuestion + 1;

                loadQuestion();
            }
        }, 1000);
    }else
    {
        endQuiz();
    }

}


function checkAnswer(option)
{
    const currentQuizData = quizData[currentQuestion];

    if(option === currentQuizData.answer)
    {
        score++;
    }

    resultElement.textContent = `You scored ${score} points`;
    currentQuestion++;
    loadQuestion();
}

function endQuiz()
{
    progressBarContainer.style.display = 'none';
    questionElement.textContent = "Quiz has ended! Horray!";
    optionsElement.style.display = 'none';
    timerElement.style.display = 'none';
}