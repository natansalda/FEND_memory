//  A list that holds all of cards in deck
 let allCards = [];

 // a list that holds all opened cards
 let flippedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// function to shuffle the whole deck
function shuffleCards() {
    const cardsInDeck = Array.from(document.querySelectorAll('.deck li'))
    console.log('Cards to shuffle', cardsInDeck);
    const shuffledCards = shuffle(cardsInDeck);
    console.log('Shuffled cards', shuffleCards);
}
shuffleCards()

// we add listener to all cards in the deck
const deck = document.querySelector('.deck');
deck.addEventListener('click', event => {
    // and now we add the logic when card is clicked
    const elementClicked = event.target;
    if (isProperClick(elementClicked)) {
        flipCard(elementClicked);
        addFlippedCard(elementClicked);
        // now it is time to check if our 2 cards match each other
        if (flippedCards.length === 2) {
            checkCardsMatch(elementClicked);
        }
    }
});

// function making sure we only handle proper clicks
function isProperClick(elementClicked) {
    return (
        elementClicked.classList.contains('card') &&
        // let's make sure we don't count already matched cards
        !elementClicked.classList.contains('match') &&
         // we only want 2 flipped cards at a time and those needs to be 2 different cards
         flippedCards.length < 2 && !flippedCards.includes(elementClicked)
    );
}

// function to flip card
function flipCard(elementClicked) {
    elementClicked.classList.toggle('open');
    elementClicked.classList.toggle('show');
}

// function to add flipped card to flippedCards list
function addFlippedCard(elementClicked) {
    flippedCards.push(elementClicked);
}

// function to check if 2 cards match
function checkCardsMatch() {
    // do the cards classes match (font awesome)?
    if (
        flippedCards[0].firstElementChild.className ===
        flippedCards[1].firstElementChild.className
    ) {
        // yes they do, so they need to stay as matched
        flippedCards[0].classList.toggle('match');
        flippedCards[1].classList.toggle('match');
        // and we clear the list
        flippedCards = []
    } else {
        // to see both cards we need to setTimeOut
        setTimeout(() => {
            // cards don't match so we flip them back and clear the list
            flipCard(flippedCards[0]);
            flipCard(flippedCards[1]);
            flippedCards = [];
        }, 1000);
     }
}

/*
 * shuffle the cards when the user clicks shuffle button
 */
const shuffleButton = document.querySelector('.restart');
shuffleButton.addEventListener('click', shuffleCards());

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//function eventFunction() {
//    const itemClicked = event.target;
//	    if (itemClicked.classList.contains('.card')) {
//		    console.log("You have clicked the card!");
//};
//const deck = document.querySelectorAll('.deck');
//deck.addEventListener('click', eventFunction);




// When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. 
// It should also tell the user how much time it took to win the game, and what the star rating was.


// The game displays a star rating (from 1 to at least 3) that reflects the player's performance. 
// At the beginning of a game, it should display at least 3 stars. After some number of moves, it should change to a lower star rating. 
// After a few more moves, it should change to a even lower star rating (down to 1). Game displays the current number of moves a user has made.

// When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.