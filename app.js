let gameSequence = [];
let userSequence = [];
let btns = ["red", "blue", "yellow", "purpple"];
let level = 0;
let started = false;

// DOM elements
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const statusText = document.getElementById("statusText");
const levelDisplay = document.getElementById("levelDisplay");

// Start Game
startBtn.addEventListener("click", function () {
    if (!started) {
        started = true;
        reset();
        statusText.innerText = "Game Started! Watch and repeat the pattern.";
        startBtn.disabled = true;
        restartBtn.disabled = false;
        levelUp();
    }
});

// Restart Game
restartBtn.addEventListener("click", function () {
    reset();
    levelUp();
    statusText.innerText = "Game Restarted! Watch and repeat.";
});

// Flash for Simon's turn
function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(() => {
        btn.classList.remove("gameflash");
    }, 550);
}

// Flash for User click
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 550);
}

// Level Up
function levelUp() {
    userSequence = [];
    level++;
    levelDisplay.innerText = level;
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let btn = document.getElementById(randomColor);
    gameSequence.push(randomColor);
    gameFlash(btn);
}

// Handle user button press
function btnPress() {
    if (!started) return;

    let btn = this;
    let userColor = btn.getAttribute("id");
    userSequence.push(userColor);
    userFlash(btn);
    checkAnswer(userSequence.length - 1);
}

// Compare user input to game sequence
function checkAnswer(currentIndex) {
    if (userSequence[currentIndex] === gameSequence[currentIndex]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(levelUp, 800);
        }
    } else {
        statusText.innerHTML = `❌ Game Over! Your score was <b>${level}</b><br>Click <b>Restart</b> to try again.`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "";
        }, 200);
        started = false;
        startBtn.disabled = false;
    }
}

// Button listeners
const allBtns = document.querySelectorAll(".box");
allBtns.forEach((btn) => {
    btn.addEventListener("click", btnPress);
});

// Reset Game
function reset() {
    gameSequence = [];
    userSequence = [];
    level = 0;
    levelDisplay.innerText = level;
}
