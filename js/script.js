
const betButton = document.getElementById("bet-button");
const game = new Game();

//Bet Button starts a new game
betButton.addEventListener("click", () => {
    game.play()
});


