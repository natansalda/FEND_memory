/*
 * A list that holds all of cards in deck
 */

 let values = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        console.log("YAY!")
    }
    return array;
};

const deck = document.querySelector('.deck');
deck.addEventListener('click', event => {
    const elementClicked = event.target;
    if (elementClicked.classList.contains('card')) {
    elementClicked.classList.toggle('open');
    elementClicked.classList.toggle('show');
    }
});
/*
 * shuffle the cards when the user clicks shuffle button
 */
//const shuffleButton = document.querySelector('.restart');
//shuffleButton.addEventListener('click', shuffle(values));

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