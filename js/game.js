console.log('Game script loaded');
class Game {
    constructor () {
        this.blackjack = new Blackjack();
        this.playerCards 
        this.dealerCards;
        this.playerScore;
        this.dealerScore;

        this.playerCardsContainer = document.querySelector("#player .cards-container");
        this.dealerCardsContainer = document.querySelector("#dealer .cards-container");
        this.playerScoreContainer = document.querySelector("#player .score");
        this.dealerScoreContainer = document.querySelector("#dealer .score");
        this.gameResultContainer = document.getElementById("game-result");

        this.hit = document.getElementById("hit-button");
        this.stand  = document.getElementById("stand-button");
        this.bet = document.getElementById("bet-button");
        this.gameOver;
    }

    play() {
        //Reset game
        this.gameOver = false
        this.playerCards = [];
        this.dealerCards = [];
        this.hit.style.pointerEvents = "auto";
        this.stand.style.pointerEvents = "auto";
        this.bet.style.pointerEvents = "none";
        this.gameResultContainer.innerHTML = '';


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
            if(!this.gameOver){
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
            }
        };

        //Player stands
        this.stand.onclick = () => {
            if(!this.gameOver){
                console.log("Player stands.");
                this.dealerHits();        
                this.endGame();
            };  
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
                //<div class="front" style="background: url(../img/playing-cards/${cardName}.svg) no-repeat center center"></div>
                this.dealerCardsContainer.innerHTML += cardImage;
            });
        //console.log(cardImage)
        
        // console.log(document.querySelectorAll('#dealer .card'))
        // console.log(this.dealerCardsContainer)

        let divDealerCards = document.querySelectorAll('#dealer .card');
        divDealerCards[1].classList.toggle('turned');

        if (gameOver) {
            divDealerCards[1].classList.toggle('turned');
            //divDealerCards.forEach((card) => card.classList.toggle('turned'));
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

    endGame() { 
        this.gameResultContainer.innerHTML = this.blackjack.compareScores(this.playerScore, this.dealerScore); //Show game result
        this.hit.style.pointerEvents = "none";
        this.stand.style.pointerEvents = "none";
        this.bet.style.pointerEvents = "auto";
        this.gameOver = true;  
        this.showCardsAndScore(this.gameOver);
        this.blackjack.resetDeck() 
        console.log("playerCards:", this.playerCards, "dealerCards:", this.dealerCards)
        console.log(`playerScore: ${this.playerScore}`, `dealerScore: ${this.dealerScore}`)
        console.log(this.blackjack.compareScores(this.playerScore, this.dealerScore));
    };

};


        

