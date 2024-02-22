console.log('Game script loaded');
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
        this.playerCardsContainer = document.querySelector("#player .cards-container");
        this.dealerCardsContainer = document.querySelector("#dealer .cards-container");
        this.playerScoreContainer = document.querySelector("#player .score");
        this.dealerScoreContainer = document.querySelector("#dealer .score");
        this.gameResultContainer = document.getElementById("game-result");
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
        this.gameResultContainer.innerHTML = '';

        //Substract bet amount from bankroll
        this.bet = betAmount;
        //this.bankroll -= betAmount;
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
            this.endGame();
        };
        if (this.playerScore === 0) {
            this.dealerHits();
            this.endGame();
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
                this.dealerHits();
                this.endGame();
            }
        };

        //Player stands
        this.stand.onclick = () => {
            console.log("Player stands.");
            this.dealerHits();        
            this.endGame(); 
        };    
    };

    showCardsAndScore(gameOver) {
        this.dealerCardsContainer.innerHTML = '';
        this.playerCardsContainer.innerHTML = '';

        //Show Player Cards
        this.playerCards.forEach((card) => {
            let cardName = Object.keys(card)[0]
            let cardImage = `
            <div class="card" name="${cardName}">
                <img class="back" src="../img/playing-cards/X.svg">
                <img class="front" src="../img/playing-cards/${cardName}.svg">
            </div>    
            `;
            this.playerCardsContainer.innerHTML += cardImage
        });

        //Show Dealer Cards
        this.dealerCards.forEach((card) => {
            let cardName = Object.keys(card)[0];
            let cardImage = `
            <div class="card" name="${cardName}">
                <img class="back" src="../img/playing-cards/X.svg">
                <img class="front" src="../img/playing-cards/${cardName}.svg">
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
        this.playerScoreContainer.innerHTML = this.playerScore;
        this.dealerScoreContainer.innerHTML = gameOver ? this.dealerScore : Object.values(this.dealerCards[0]);
    };

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
        console.log(betResult)
        this.updateBankroll(betResult)

        //Enable/Disable buttons
        this.hit.style.pointerEvents = "none";
        this.stand.style.pointerEvents = "none";
        this.betButton.style.pointerEvents = "auto";

        //Show cards & reset deck
        this.gameOver = true;  
        this.showCardsAndScore(this.gameOver);
        this.blackjack.resetDeck() 
        console.log("playerCards:", this.playerCards, "dealerCards:", this.dealerCards)
        console.log(`playerScore: ${this.playerScore}`, `dealerScore: ${this.dealerScore}`)
        console.log(this.blackjack.compareScores(this.playerScore, this.dealerScore));
    };

};


        

