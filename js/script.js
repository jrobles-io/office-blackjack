

    const startScreen = document.getElementById("start-screen");
    const startButton = document.getElementById("start-button");
    const gameScreen = document.getElementById("game-screen");
    gameScreen.style.display = "none";

    startButton.addEventListener("click", function () {
        gameScreen.style.display = "flex";
        startScreen.style.display = "none";
      });



    const betButton = document.getElementById("bet-button");
    const hitButton = document.getElementById("hit-button");
    const standButton  = document.getElementById("stand-button");
    const gameResultContainer = document.getElementById("game-result");
    const game = new Game()
    let betAmount = 100;
    let bankroll = 100;

    //Disable Hit & Stand buttons
    hitButton.style.pointerEvents = "none";
    standButton.style.pointerEvents = "none";

    //Bet Button starts a new game
    betButton.addEventListener("click", () => {
        game.play(betAmount);
        betAmountDiv.innerText = `Current bet: $${betAmount}`;
    });

    //Manage betting slide bar
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




