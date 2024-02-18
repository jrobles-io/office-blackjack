console.log('Blackjack script loaded');
class Blackjack {
    constructor () {
        this.deck = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10];
    }

    dealCard() {
        let randomCard = this.deck[Math.floor(Math.random() * this.deck.length)];
        return randomCard;
    }
      //console.log(`dealCards ====> ${dealCards(cards)}`);
      
    calculateScore(cards) {
        let score = cards.reduce((partialScore, i) => partialScore + i, 0);
      
        //Check for Blackjack, I will use 0 to represent Blackjack.
        if (score === 21 && cards.length === 2) {
          return 0;
        }
      
        //Check if Ace counts as 11 or 1
        if (cards.includes(11) && score > 21) {
          const indexOfAce = cards.indexOf(11);
          cards.splice(indexOfAce, 1, 1);
          score = cards.reduce((partialScore, i) => partialScore + i, 0);
        }
        return score;
      }
      //console.log(`calculateScore ===> ${calculateScore([10, 11])}`);
      
    compareScores(playerScore, dealerScore) {
        if (playerScore > 21 && dealerScore > 21) {
          return "Dealer wins.";
        } else if (playerScore === dealerScore) {
          return "Draw.";
        } else if (dealerScore === 0) {
          return "Dealer wins. Blackjack!";
        } else if (playerScore === 0) {
          return "Player wins! Blackjack!";
        } else if (playerScore > 21) {
          return "Dealer wins.";
        } else if (dealerScore > 21) {
          return "Player wins!";
        } else if (playerScore > dealerScore) {
          return "Player wins.";
        } else return "Dealer wins."
    }
      //console.log(`compareScores ===> ${compareScores(16, 18)}`);
}