console.log('Game script loaded');
class Game {
    constructor () {
        this.blackjack = new Blackjack();
        this.playerCards = [];
        this.dealerCards = [];
        this.playerScore;
        this.dealerScore;
        this.hit; //= true; //remove true to declare undifiend variable
        this.stand //= true;
        this.gameover = false;
    }

    play() {
        //Deal 2 cards to each player
        for (let i = 2; i > 0; i--) {
            this.playerCards.push(this.blackjack.dealCard());
            this.dealerCards.push(this.blackjack.dealCard());
        }
        console.log("Initial Cards:", this.playerCards, this.dealerCards);
        
        //let hit = true; //remove true to declare undifiend variable
        
        while (!this.gameOver) { //add timer to this loop to auto-stand after 10 seconds
            this.playerScore = this.blackjack.calculateScore(this.playerCards);
            this.dealerScore = this.blackjack.calculateScore(this.dealerCards); 
        
            if (this.playerScore === 0 || this.dealerScore === 0 || this.playerScore > 21) {
            this.gameOver = true;
            break;
            }
   
            //hit = true; //uncomment and change with event listener
            if(this.hit || this.stand)  {
                if(this.hit) {
                    this.playerCards.push(this.blackjack.dealCard());
                    this.hit = false; //remove this line this is just to avoid infinite loop
                } 
                else this.gameOver = true;
            }  
        }
        
        while (this.dealerScore !== 0 && this.dealerScore < 17) {
            this.dealerCards.push(this.blackjack.dealCard());
            this.dealerScore = this.blackjack.calculateScore(this.dealerCards);
        }

        console.log("playerCards:", this.playerCards, "dealerCards:", this.dealerCards)
        console.log(`playerScore: ${this.playerScore}`, `dealerScore: ${this.dealerScore}`)
        console.log(this.blackjack.compareScores(this.playerScore, this.dealerScore));
    }
}