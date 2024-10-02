// game.js

// Declare variables to track player scores, number of rounds, and current answer
let teamAScore = 0;
let teamBScore = 0;
let currentRound = 1;
const totalRounds = 5;
let teamAPlayer, teamBPlayer;
let gameData = {
    roundScores: [],
    correctAnswers: [
        "Car",
        "Tools",
        "Bikes",
        "Lawn mower",
        "Storage",
        "Boxes"
    ]
};

// Get elements from the DOM
const playerForm = document.getElementById("player-form");
const resultsDiv = document.getElementById("results");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const countdownTimer = document.getElementById("countdown-timer");

// Initialize the game
function startGame(event) {
    event.preventDefault(); // Prevent form submission
    teamAPlayer = document.getElementById("teamA-player1").value;
    teamBPlayer = document.getElementById("teamB-player1").value;

    playerForm.style.display = "none"; // Hide the player form
    countdownTimer.style.display = "block"; // Show countdown timer
    startCountdown();
    console.log("Game started with players:", teamAPlayer, teamBPlayer);
}

// Function to validate answers
function validateAnswer(answer) {
    if (gameData.correctAnswers.includes(answer)) {
        displayCorrectAnswer(answer);
        updateScores();
    } else {
        alert(`${answer} is not a correct answer.`); // Alert for incorrect answers
        resultsDiv.innerHTML += `<p>${answer} is not a correct answer.</p>`;
    }
}

// Display correct answers in the results section
function displayCorrectAnswer(answer) {
    resultsDiv.innerHTML += `<p>${answer} is correct!</p>`;
}

// Update player scores in the score tables
function updateScores() {
    if (currentRound % 2 === 1) { // Odd rounds for Team A
        teamAScore += 10; // Example points for correct answer
        gameData.roundScores[currentRound - 1] = { teamA: 10, teamB: 0 }; // Save round scores
    } else { // Even rounds for Team B
        teamBScore += 10; // Example points for correct answer
        gameData.roundScores[currentRound - 1] = { teamA: 0, teamB: 10 }; // Save round scores
    }
    updateScoreTable(); // Update score table dynamically
}

// Function to update the score table
function updateScoreTable() {
    resultsDiv.innerHTML += `<p>Team A Score: ${teamAScore} | Team B Score: ${teamBScore}</p>`;
    console.log(`Scores updated - Team A: ${teamAScore}, Team B: ${teamBScore}`);
}

// Countdown timer that begins when the game starts
function startCountdown() {
    let countdown = 5;
    timerElement.textContent = countdown; // Set initial timer display
    const countdownInterval = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownTimer.style.display = "none"; // Hide countdown
            startAnswerTimer(); // Start answer timer
        }
    }, 1000);
}

// Function to start answer timer
function startAnswerTimer() {
    let timeRemaining = 30; // Set the time limit for answering
    progressBar.value = 100; // Set progress bar max value
    const answerInterval = setInterval(() => {
        timeRemaining--;
        progressBar.value = (timeRemaining / 30) * 100; // Update progress bar
        if (timeRemaining <= 0) {
            clearInterval(answerInterval);
            resultsDiv.innerHTML += "<p>Time is up!</p>"; // Notify players time is up
            handleRoundEnd(); // Handle end of round
        }
    }, 1000);
}

// Handle the end of the round
function handleRoundEnd() {
    if (currentRound >= totalRounds) {
        gameOver(); // If all rounds are completed
    } else {
        currentRound++; // Move to the next round
        console.log(`Moving to round ${currentRound}`);
        startCountdown(); // Restart countdown for the next round
    }
}

// Game over function
function gameOver() {
    let winner = teamAScore > teamBScore ? "Team A" : "Team B";
    resultsDiv.innerHTML += `<h3>Game Over! ${winner} wins!</h3>`;
    console.log(`Game Over! ${winner} wins!`);
    resetGame(); // Reset game for next play
}

// Reset game function
function resetGame() {
    teamAScore = 0;
    teamBScore = 0;
    currentRound = 1;
    gameData.roundScores = [];
    playerForm.reset();
    playerForm.style.display = "block"; // Show the player form again
    resultsDiv.innerHTML = ""; // Clear results
    console.log("Game reset for new play.");
}

// Add event listeners to the game buttons
playerForm.addEventListener("submit", startGame);

document.getElementById("teamA-play").addEventListener("click", () => {
    const answer = prompt("Team A, enter your answer:");
    if (answer) {
        validateAnswer(answer.trim());
    }
});

document.getElementById("teamB-play").addEventListener("click", () => {
    const answer = prompt("Team B, enter your answer:");
    if (answer) {
        validateAnswer(answer.trim());
    }
});

document.getElementById("teamA-pass").addEventListener("click", () => {
    resultsDiv.innerHTML += "<p>Team A passed their turn.</p>";
    handleRoundEnd(); // Handle end of round
});

document.getElementById("teamB-pass").addEventListener("click", () => {
    resultsDiv.innerHTML += "<p>Team B passed their turn.</p>";
    handleRoundEnd(); // Handle end of round
});
