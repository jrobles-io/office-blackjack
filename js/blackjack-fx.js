const cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10];
let playerCards = [];
let dealerCards = [];
let gameOver = false;


//Deal 2 cards to each player
for (i = 2; i > 0; i--) {
  playerCards.push(dealCard(cards));
  dealerCards.push(dealCard(cards));
}
console.log("Initial Cards:", playerCards, dealerCards);

let playerScore;
let dealerScore;
let hit = true; //remove true to declare undifiend variable

while (!gameOver) {
    playerScore = calculateScore(playerCards);
    dealerScore = calculateScore(dealerCards); 

  if (playerScore === 0 || dealerScore === 0 || playerScore > 21) {
    gameOver = true;
    break;
  }
  
  //hit = true; //change for event listener

  if(hit) {
    playerCards.push(dealCard(cards));
    hit = false; //remove this line this is just to avoid infinite loop
  } 
  else gameOver = true;  
}

while (dealerScore !== 0 && dealerScore < 17) {
    dealerCards.push(dealCard(cards));
    dealerScore = calculateScore(dealerCards);
}

console.log(`playerCards: ${playerCards}`, `dealerCards: ${dealerCards}`)
console.log(`playerScore: ${playerScore}`, `dealerScore: ${dealerScore}`)
console.log(compareScores(playerScore, dealerScore));


function dealCard(cardsArr) {
  let card = cardsArr[Math.floor(Math.random() * cardsArr.length)];
  return card;
}
//console.log(`dealCards ====> ${dealCards(cards)}`);

function calculateScore(cards) {
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

function compareScores(playerScore, dealerScore) {
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
