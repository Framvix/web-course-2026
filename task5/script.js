let sequence = [];
let playerIndex = 0;
let isShowing = false;
let isPlaying = false;
let timer = null;
let highlightTimer = null;

const colorButtons = document.querySelectorAll(".color-button");
const startButton = document.querySelector("#start");
const level = document.querySelector("#level");
const status = document.querySelector("#status");

function startGame() {
    clearTimeout(timer);
    clearTimeout(highlightTimer);
    colorButtons.forEach(button => button.classList.remove("active"));
    sequence = [];
    playerIndex = 0;
    isPlaying = true;
    nextRound();
}

function nextRound() {
    sequence.push(Math.floor(Math.random() * 4));
    playerIndex = 0;
    level.textContent = sequence.length;
    showSequence();
}

function showSequence() {
    isShowing = true;
    status.textContent = "Смотрите последовательность.";
    let index = 0;

    function showNext() {
        const button = colorButtons[sequence[index]];
        button.classList.add("active");
        timer = setTimeout(() => {
            button.classList.remove("active");
            index++;
            timer = setTimeout(() => {
                if (index < sequence.length) {
                    showNext();
                } else {
                    isShowing = false;
                    status.textContent = "Повторите последовательность.";
                }
            }, 250);
        }, 500);
    }

    showNext();
}

function handlePlayerClick(index) {
    if (!isPlaying || isShowing) {
        return;
    }

    clearTimeout(highlightTimer);
    colorButtons.forEach(button => button.classList.remove("active"));
    colorButtons[index].classList.add("active");
    highlightTimer = setTimeout(() => {
        colorButtons[index].classList.remove("active");
    }, 200);

    if (index !== sequence[playerIndex]) {
        endGame();
        return;
    }

    playerIndex++;
    if (playerIndex === sequence.length) {
        isShowing = true;
        status.textContent = "Верно! Следующий раунд.";
        timer = setTimeout(nextRound, 700);
    }
}

function endGame() {
    clearTimeout(timer);
    clearTimeout(highlightTimer);
    colorButtons.forEach(button => button.classList.remove("active"));
    isPlaying = false;
    isShowing = false;
    status.textContent = `Вы дошли до уровня ${sequence.length}`;
}

startButton.addEventListener("click", startGame);
colorButtons.forEach((button, index) => {
    button.addEventListener("click", () => handlePlayerClick(index));
});
