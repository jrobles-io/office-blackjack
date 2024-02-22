console.log('Blackjack script loaded');
class Blackjack {
    constructor () {
        this.originalDeck = {
          clubs_ace: 11,
          clubs_2: 2,
          clubs_3: 3,
          clubs_4: 4,
          clubs_5: 5,
          clubs_6: 6,
          clubs_7: 7,
          clubs_8: 8,
          clubs_9: 9,
          clubs_10: 10,
          clubs_jack:	10,
          clubs_queen: 10,
          clubs_king: 10,

          diamonds_ace: 11,
          diamonds_2: 2,
          diamonds_3: 3,
          diamonds_4: 4,
          diamonds_5: 5,
          diamonds_6: 6,
          diamonds_7: 7,
          diamonds_8: 8,
          diamonds_9: 9,
          diamonds_10: 10,
          diamonds_jack:	10,
          diamonds_queen: 10,
          diamonds_king: 10,

          hearts_ace: 11,
          hearts_2: 2,
          hearts_3: 3,
          hearts_4: 4,
          hearts_5: 5,
          hearts_6: 6,
          hearts_7: 7,
          hearts_8: 8,
          hearts_9: 9,
          hearts_10: 10,
          hearts_jack:	10,
          hearts_queen: 10,
          hearts_king: 10,

          spades_ace: 11,
          spades_2: 2,
          spades_3: 3,
          spades_4: 4,
          spades_5: 5,
          spades_6: 6,
          spades_7: 7,
          spades_8: 8,
          spades_9: 9,
          spades_10: 10,
          spades_jack:	10,
          spades_queen: 10,
          spades_king: 10,
      };

      this.deck = {...this.originalDeck};
    };

    resetDeck() {
      this.deck = {...this.originalDeck};
    };

    dealCard() {
        const cardNames = Object.keys(this.deck);
        const randomCardName = cardNames[Math.floor(Math.random() * cardNames.length)]
        const randomCard = {[randomCardName]: this.deck[randomCardName]};
        delete this.deck[randomCardName];
        // console.log("randomCard", randomCard)
        // console.log("remaining deck", cardNames.length)
        return randomCard;
    };
     
    calculateScore(cards) {
        const cardValueArr = [];
        cards.forEach ((card) => {
          cardValueArr.push(Object.values(card)[0])
        });

        let score = cardValueArr.reduce((partialScore, i) => partialScore + i, 0);

        //Check for Blackjack, I will use 0 to represent Blackjack.
        if (score === 21 && cards.length === 2) {
          return 0;
        };
      
        //Check if Ace counts as 11 or 1 and recaluclate score
        cardValueArr.forEach((cardValue) => {
          if (cardValue === 11 && score > 21) {
            const indexOfAce = cardValueArr.indexOf(11);
            cardValueArr.splice(indexOfAce, 1, 1);
            score = cardValueArr.reduce((partialScore, i) => partialScore + i, 0);
          }
        });
        return score;
      };
      
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
          return "Player wins!";
        } else return "Dealer wins."
    };
};