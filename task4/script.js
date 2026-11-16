let secret = "";
let history = [];

const guessForm = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess-input");
const checkButton = document.querySelector("#check-button");
const newGameButton = document.querySelector("#new-game");
const message = document.querySelector("#message");
const attempts = document.querySelector("#attempts");
const historyList = document.querySelector("#history");

function generateNumber() {
    const digits = [];
    while (digits.length < 4) {
        const digit = String(Math.floor(Math.random() * 10));
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    return digits.join("");
}

function validateGuess(guess) {
    if (guess.length !== 4) {
        return "Введите ровно 4 цифры.";
    }
    if (!/^[0-9]+$/.test(guess)) {
        return "Используйте только цифры.";
    }
    const digits = [];
    for (const digit of guess) {
        if (digits.includes(digit)) {
            return "Все цифры должны быть разными.";
        }
        digits.push(digit);
    }
    return "";
}

function countBullsAndCows(secret, guess) {
    let bulls = 0;
    let cows = 0;
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }
    return { bulls: bulls, cows: cows };
}

function renderHistory() {
    historyList.replaceChildren();
    history.forEach(attempt => {
        const item = document.createElement("li");
        item.textContent = `${attempt.guess} → Быки: ${attempt.bulls}, коровы: ${attempt.cows}`;
        historyList.append(item);
    });
    attempts.textContent = history.length;
}

function checkGuess() {
    const guess = guessInput.value;
    const error = validateGuess(guess);
    if (error !== "") {
        message.textContent = error;
        return;
    }

    const result = countBullsAndCows(secret, guess);
    history.push({ guess: guess, bulls: result.bulls, cows: result.cows });
    renderHistory();
    message.textContent = "";
    if (result.bulls === 4) {
        message.textContent = `Победа! Угадано за ${history.length} попыток`;
        guessInput.disabled = true;
        checkButton.disabled = true;
    } else {
        guessInput.value = "";
        guessInput.focus();
    }
}

function newGame() {
    secret = generateNumber();
    history = [];
    guessInput.value = "";
    guessInput.disabled = false;
    checkButton.disabled = false;
    message.textContent = "";
    renderHistory();
}

guessForm.addEventListener("submit", event => {
    event.preventDefault();
    checkGuess();
});
newGameButton.addEventListener("click", newGame);

newGame();
