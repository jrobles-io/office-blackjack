
const betButton = document.getElementById("bet-button");
const gameResultContainer = document.getElementById("game-result");
const game = new Game()
let betAmount = 100;

//Bet Button starts a new game
betButton.addEventListener("click", () => {
    game.play(betAmount);
    betAmountDiv.innerText = `Current bet: $${betAmount}`;
});


const bettingBar = document.getElementById('betting-bar');
const bettingKnob = document.getElementById("draggable-knob");
const betAmountDiv = document.getElementById('bet-amount');
let isDragging = false;

const maxBet = 100;

betAmountDiv.innerText = `$${maxBet}`;

bettingKnob.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true
})

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const bettingBarRect = bettingBar.getBoundingClientRect();  
    let newWidth = e.clientX - bettingBarRect.left;

    newWidth = Math.min(Math.max(newWidth, 1), bettingBarRect.width); 

    betAmount = Math.round((newWidth / bettingBarRect.width) * maxBet);
    betAmountDiv.innerText = `$${betAmount}`;

    bettingBar.style.width = `${newWidth / bettingBarRect.width * 100}%`;

});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false
    };
});


