//console.log('Game script loaded');
class Game {
    constructor () {
        this.blackjack = new Blackjack();
        this.playerCards 
        this.dealerCards;
        this.playerScore;
        this.dealerScore;
        this.bet;
        this.bankroll = 100;
        this.gameOver;

        //html divs
        this.startScreen = document.querySelector("#start-screen");
        this.playerCardsContainer = document.querySelector("#player .cards-container");
        this.dealerCardsContainer = document.querySelector("#dealer .cards-container");
        this.playerScoreContainer = document.querySelector("#player .score");
        this.dealerScoreContainer = document.querySelector("#dealer .score");
        this.gameResultContainer = document.getElementById("game-result");
        this.bettingBar = document.getElementById('betting-bar');
        this.betAmountDiv = document.getElementById('bet-amount');
        this.bankrollDiv = document.getElementById('bankroll');

        //html buttons
        this.hit = document.getElementById("hit-button");
        this.stand  = document.getElementById("stand-button");
        this.betButton = document.getElementById("bet-button");
        
    }

    play(betAmount) {
        //Reset game
        this.gameOver = false
        this.playerCards = [];
        this.dealerCards = [];
        this.hit.style.pointerEvents = "auto";
        this.stand.style.pointerEvents = "auto";
        this.betButton.style.pointerEvents = "none";
        this.bettingBar.style.pointerEvents = "none";
        this.gameResultContainer.innerHTML = '';
        this.bet = betAmount;
        this.bankrollDiv.innerHTML = `Bankroll: $${this.bankroll}`


        //Deal 2 cards to each player
        for (let i = 2; i > 0; i--) {
            this.playerCards.push(this.blackjack.dealCard());
            this.dealerCards.push(this.blackjack.dealCard());
        };
        
        //Calculate Scores
        this.playerScore = this.blackjack.calculateScore(this.playerCards);
        this.dealerScore = this.blackjack.calculateScore(this.dealerCards); 
        this.showCardsAndScore(this.gameOver);

        console.log("playerCards:", this.playerCards, "dealerCards:", this.dealerCards)
        console.log(`playerScore: ${this.playerScore}`, `dealerScore: ${this.dealerScore}`)
    
        //Check for Blackjack
        if(this.dealerScore === 0) {
            this.flipDealerCard()
            setTimeout(() => {       
                return this.endGame(); 
            }, 1500);
        };

        if (this.playerScore === 0) {
            this.flipDealerCard()
            setTimeout(() => {     
                this.dealerHits();   
                return this.endGame(); 
            }, 1500);
        };

        //Player hits
        this.hit.onclick = () => {
            console.log("Player hits.");

            this.playerCards.push(this.blackjack.dealCard());
            this.playerScore = this.blackjack.calculateScore(this.playerCards);
            this.showCardsAndScore(this.gameOver);

            console.log("playerCards:", this.playerCards, "dealerCards:", this.dealerCards)
            console.log(`playerScore: ${this.playerScore}`, `dealerScore: ${this.dealerScore}`)

            if (this.playerScore >= 21) { 
                this.flipDealerCard() 
                setTimeout(() => {     
                    this.dealerHits();   
                    return this.endGame(); 
                }, 1500);
            };
        };

        //Player stands
        this.stand.onclick = () => {
            console.log("Player stands.");

            this.flipDealerCard()
            setTimeout(() => {     
                this.dealerHits();   
                return this.endGame();             
            }, 1500);
        };
        
        //console.log(this.bankroll)
    };

    showCardsAndScore(gameOver) {
        this.dealerCardsContainer.innerHTML = '';
        this.playerCardsContainer.innerHTML = '';

        //Show Player Cards
        this.playerCards.forEach((card) => {
            let cardName = Object.keys(card)[0]
            let cardImage = `
            <div class="card" name="${cardName}">
                <img class="back" src="img/playing-cards/X.svg">
                <img class="front" src="img/playing-cards/${cardName}.svg">
            </div>    
            `;
            this.playerCardsContainer.innerHTML += cardImage
        });

        //Show Dealer Cards
        this.dealerCards.forEach((card) => {
            let cardName = Object.keys(card)[0];
            let cardImage = `
            <div class="card" name="${cardName}">
                <img class="back" src="img/playing-cards/X.svg">
                <img class="front" src="img/playing-cards/${cardName}.svg">
                </div>    
                `;
                this.dealerCardsContainer.innerHTML += cardImage;
            });
        
        //Flip dealer's second card until game is over
        let divDealerCards = document.querySelectorAll('#dealer .card');
        divDealerCards[1].classList.toggle('turned');

        if (gameOver) {
            divDealerCards[1].classList.toggle('turned');
        };

        // //Show Scores
        this.playerScoreContainer.innerHTML = this.playerScore === 0 ? "Blackjack!" : this.playerScore;
        if(gameOver) {
            this.dealerScoreContainer.innerHTML = this.dealerScore === 0 ? "Blackjack!" : this.dealerScore
        } else {
            this.dealerScoreContainer.innerHTML =Object.values(this.dealerCards[0]);
        };    



    };

    flipDealerCard() {
        this.hit.style.pointerEvents = "none";
        this.stand.style.pointerEvents = "none";
        setTimeout(() => {
            let divDealerCards = document.querySelectorAll('#dealer .card');
            divDealerCards[1].classList.toggle('turned');
            this.dealerScoreContainer.innerHTML = this.dealerScore
        }, 500);
    }

    dealerHits() {
        while (this.dealer != 0 && this.dealerScore < 17) {
            console.log("Dealer hits.")
            this.dealerCards.push(this.blackjack.dealCard());
            this.dealerScore = this.blackjack.calculateScore(this.dealerCards);
        };    
    };

    calculateBetResult(betAmount, gameResult) {
        if(gameResult === "Draw.") {
            return 0;
        }
        if(gameResult === "Player wins!") {
            return betAmount;
        }
        else if(gameResult === "Player wins! Blackjack!") {
            return betAmount * 1.5;
        }
        else return -betAmount
    };
    
    updateBankroll(betResult) {
        const plusMinus = betResult >= 0 ? "+" : "-"
        const bankrollImpact = `Bankroll: $${this.bankroll} ` + plusMinus + ` $${Math.abs(betResult)}`
        this.bankrollDiv.innerHTML = bankrollImpact
        this.bankroll += betResult
        
        setTimeout(() => {
            this.bankrollDiv.innerHTML = `Bankroll: $${this.bankroll}`
        }, 2000);

        setTimeout(() => {
            this.betAmountDiv.innerText = `$${betAmount}`
        }, 2000);
        
    };

    endGame() { 
        //Calculate and show game results
        const gameResult = this.blackjack.compareScores(this.playerScore, this.dealerScore);
        this.gameResultContainer.innerHTML = gameResult //Show game result
        const betResult = this.calculateBetResult(this.bet, gameResult)
        //console.log(betResult)
        this.updateBankroll(betResult)

        //Enable/Disable buttons
        this.hit.style.pointerEvents = "none";
        this.stand.style.pointerEvents = "none";
        this.betButton.style.pointerEvents = "auto";
        this.bettingBar.style.pointerEvents = "auto";

        //Show cards & reset deck
        this.gameOver = true;  
        this.showCardsAndScore(this.gameOver);
        this.blackjack.resetDeck() 
        console.log("playerCards:", this.playerCards, "dealerCards:", this.dealerCards)
        console.log(`playerScore: ${this.playerScore}`, `dealerScore: ${this.dealerScore}`)
        console.log(this.blackjack.compareScores(this.playerScore, this.dealerScore));

        //add logic to limit new bet to bankroll amount
        if (this.bankroll <= 0) {
            setTimeout (() => {
                this.gameOverPage() 
            }, 1700);
        }
    };

    gameOverPage() {
        // Clear the document body
        document.body.innerHTML = '';
    
        // Game Over Message
        const gameOverMessage = document.createElement('div');
        gameOverMessage.setAttribute('id', 'game-over-message');
        gameOverMessage.innerHTML = '<h1>Game Over</h1><p>Micheal Scott took all your cash!</p>';
        document.body.appendChild(gameOverMessage);

        const gameOverImage = '<img id="game-over-img" src="img/game-over-image.png">'
        gameOverMessage.innerHTML += gameOverImage
    
        // Restart Button
        const restartButton = document.createElement('button');
        restartButton.setAttribute('id', 'restart-button');
        restartButton.innerText = 'Play Again';
        document.body.appendChild(restartButton);
        const newLocal = restartButton.onclick = function () {
            window.location.reload();
        };
    };   
};


        

