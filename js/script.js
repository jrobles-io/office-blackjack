
const game = new Game();
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
const betButton = document.getElementById("bet-button");

//game.play();
hitButton.addEventListener("click", () => {
    game.hit = true
    console.log(game.hit)
});






function startGame() {
    game
    game.play();
}


