console.log('Bet script loaded');
class Bets {
    constructor (betAmount) {
        this.bankroll;
        this.bet = betAmount;
    };



    startBet(gameResult) {
        if(gameResult === "Draw.") {
            return this.bet;
        }
        else if(gameResult === "Player wins.") {
            return this.bet * 2;
        }
        else if(gameResult === "Player wins. Blackjack!") {
            return this.bet * 2.5;
        }
        else return 0
    }
}