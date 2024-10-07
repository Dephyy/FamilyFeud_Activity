let teamAScore = 0;
let teamBScore = 0;
let currentRound = 0;
const totalRounds = 5;
let timer;
let timeLeft = 10;
let isTeamATurn = true; // Track whose turn it is

const startGame = () => {
    teamAScore = 0;
    teamBScore = 0;
    currentRound = 0;

    document.getElementById("team-a-score").innerText = teamAScore;
    document.getElementById("team-b-score").innerText = teamBScore;

    document.getElementById("player-info").style.display = "none";
    document.querySelector(".team-controls").style.display = "flex";

    startRound();
};

const startRound = () => {
    currentRound++;
    if (currentRound > totalRounds) {
        alert("Game Over!");
        return;
    }

    // Reset timer for each round
    timeLeft = 10;
    document.getElementById("countdown-timer").style.display = "block";
    document.getElementById("countdown").innerText = timeLeft;
    document.getElementById("time-progress").value = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("countdown").innerText = timeLeft;
        document.getElementById("time-progress").value = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! Moving to the next round.");
            isTeamATurn = !isTeamATurn; // Switch turns
            startRound();
        }
    }, 1000);
};

const submitAnswer = () => {
    const answerInput = document.getElementById("answer-input").value.trim();
    const resultDiv = document.getElementById("results");

    if (!answerInput) {
        alert("Please enter an answer.");
        return;
    }

    // Simulate answer checking
    const isCorrect = Math.random() > 0.5; // Random for demo purposes
    if (isCorrect) {
        if (isTeamATurn) {
            teamAScore += 10;
            resultDiv.innerHTML += `<p>Team A answered: "${answerInput}" - Correct!</p>`;
        } else {
            teamBScore += 10;
            resultDiv.innerHTML += `<p>Team B answered: "${answerInput}" - Correct!</p>`;
        }
    } else {
        resultDiv.innerHTML += `<p>"${answerInput}" - Incorrect!</p>`;
    }

    document.getElementById("team-a-score").innerText = teamAScore;
    document.getElementById("team-b-score").innerText = teamBScore;
    document.getElementById("answer-input").value = ""; // Clear input
};

// Handle pass team actions
const passTeamA = () => {
    alert("Team A passed! It's Team B's turn.");
    clearInterval(timer); // Clear the timer
    isTeamATurn = false; // Switch to Team B
    startRound();
};

const passTeamB = () => {
    alert("Team B passed! It's Team A's turn.");
    clearInterval(timer); // Clear the timer
    isTeamATurn = true; // Switch to Team A
    startRound();
};

// Event Listeners
document.getElementById("player-form").addEventListener("submit", (e) => {
    e.preventDefault();
    startGame();
});

document.getElementById("submit-answer").addEventListener("click", submitAnswer);
document.getElementById("pass-team-a").addEventListener("click", passTeamA);
document.getElementById("pass-team-b").addEventListener("click", passTeamB);
