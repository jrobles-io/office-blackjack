
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
const betAmountDiv = document.getElementById('bet-amount');
const betValue = document.querySelector("#bet-value")
const maxBet = 100

betAmountDiv.innerText = `$${maxBet}`;

bettingBar.addEventListener("mousemove", (e) => {
    betAmount = parseInt(bettingBar.value)
    betAmountDiv.innerText = `$${betAmount}`
});

bettingBar.addEventListener("mouseup", (e)=> {
    betAmount = parseInt(bettingBar.value)
    betAmountDiv.innerText = `$${betAmount}`
});





