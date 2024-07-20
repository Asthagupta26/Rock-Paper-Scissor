function showRules() {
    document.querySelector("#game-rule").style.display = "block";
}

function hideRules() {
    document.querySelector("#game-rule").style.display = "none";
}

function proceedToCelebration() {
    window.location.href = "./celebration.html";
}

let playerScore = parseInt(localStorage.getItem("playerScoreSaved")) || 0;
document.querySelector(".your-score").innerText = playerScore;
let computerScore = parseInt(localStorage.getItem("computerScoreSaved")) || 0;
document.querySelector(".computer-score").innerText = computerScore;

let choices = [];

function recordChoice(choice) {
    choices.push(choice);
}

let options = ["rock", "paper", "scissor"];

function getRandomChoice() {
    return options[Math.floor(Math.random() * 3)];
}

function chooseRock() {
    updateScores("rock");
}

function chooseScissor() {
    updateScores("scissor");
}

function choosePaper() {
    updateScores("paper");
}

function updateScores(playerChoice) {
    let playerScore = parseInt(localStorage.getItem("playerScoreSaved")) || 0;
    let computerScore = parseInt(localStorage.getItem("computerScoreSaved")) || 0;

    let computerChoice = getRandomChoice();
    recordChoice(playerChoice);
    recordChoice(computerChoice);

    if (playerChoice === "rock" && computerChoice === "scissor" ||
        playerChoice === "scissor" && computerChoice === "paper" ||
        playerChoice === "paper" && computerChoice === "rock") {
        playerScore += 1;
    } else if (computerChoice === "rock" && playerChoice === "scissor" ||
        computerChoice === "scissor" && playerChoice === "paper" ||
        computerChoice === "paper" && playerChoice === "rock") {
        computerScore += 1;
    }

    localStorage.setItem("playerScoreSaved", playerScore);
    localStorage.setItem("computerScoreSaved", computerScore);

    document.querySelector(".your-score").innerText = playerScore;
    document.querySelector(".computer-score").innerText = computerScore;

    displayResults();
}

function displayResults() {
    let resultDisplay = document.querySelector(".winning-template");
    resultDisplay.style.width = "50%";
    resultDisplay.style.flexDirection = "row";
    resultDisplay.innerHTML = `
        <div class="circle1 playerCircle1">
            <div class="circle2 playerCircle2">
                <span class="chosen-option-text">YOU PICKED</span>
                <div class="chosen-option-logo playerCircle3">
                    <div class="${choices[0]}">
                        <img src="./assets/${choices[0]}.png" alt="userpicked" class="game-tool-logo">
                    </div>
                </div>
            </div>
        </div>
        <div class="result">
            <p class="result-text">${determineWinner()}</p><br>
            <p class="constant-result-text">AGAINST PC</p>
            <button class="play-again" onclick="startNewGame()">PLAY AGAIN</button>
        </div>
        <div class="circle1 compCircle1">
            <div class="circle2 compCircle2">
                <span class="chosen-option-text">PC PICKED</span>
                <div class="chosen-option-logo compCircle3">
                    <div class="${choices[1]}">
                        <img src="./assets/${choices[1]}.png" alt="computerpicked" class="game-tool-logo">
                    </div>
                </div>
            </div>
        </div>`;

    if (choices[0] === choices[1]) {
        document.querySelector(".constant-result-text").innerText = "";
        document.querySelector(".play-again").innerText = "REPLAY";
        document.querySelector(".result-text").style.top = "40px";
    } else if (choices[0] === "rock" && choices[1] === "scissor" ||
        choices[0] === "scissor" && choices[1] === "paper" ||
        choices[0] === "paper" && choices[1] === "rock") {
        document.querySelectorAll(".playerCircle1, .playerCircle2, .playerCircle3").forEach(el => el.style.background = "rgba(46, 154, 37, 0.3)");
    } else {
        document.querySelectorAll(".compCircle1, .compCircle2, .compCircle3").forEach(el => el.style.background = "rgba(46, 154, 37, 0.3)");
    }
}

function determineWinner() {
    if (choices[0] === "rock" && choices[1] === "scissor" ||
        choices[0] === "scissor" && choices[1] === "paper" ||
        choices[0] === "paper" && choices[1] === "rock") {
        document.querySelector(".next-button").style.display = "block";
        return "YOU WIN";
    } else if (choices[1] === "rock" && choices[0] === "scissor" ||
        choices[1] === "scissor" && choices[0] === "paper" ||
        choices[1] === "paper" && choices[0] === "rock") {
        return "YOU LOST";
    } else {
        return "TIE UP";
    }
}

function startNewGame() {
    window.location.href = "./index.html";
}
