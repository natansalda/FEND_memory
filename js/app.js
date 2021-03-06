// variables
// a list that holds all opened cards
let flippedCards = [];

// a variable holding number of moves
let moves = 0;

// variable making sure we don't start the clock right away when opening the website
let timerOff = true;

let time = 0;
let minutes = 0;
let timerId;

// variable keeping the value of matched pairs
let pairs = 0;

// const variable telling how many pairs we need to win the game
const MAX_PAIRS = 8;

// we save a deck into a variable
const deck = document.querySelector('.deck');

// we save an array of cards to shuffle into a variable
const cardsInDeck = Array.from(document.querySelectorAll('.card'));

// we save timer display to a variable
const timerDisplayed = document.querySelector('.timer');

// function to start and reset game
function startGame() {
    time = 0;
    minutes = 0;
    moves = 0;
    pairs = 0;
    shuffleCards();
    showBackOfCards();
    timerDisplayed.innerHTML = "0:00";
}
startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
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
    const shuffledCards = shuffle(cardsInDeck);
    // we append newly shuffled cards to the deck
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}

function showBackOfCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.classList = 'card';
    }
}

// we add listener to all cards in the deck
deck.addEventListener('click', event => {
    // and now we add the logic when card is clicked
    const elementClicked = event.target;
    if (isProperClick(elementClicked)) {
        // let's first start the clock
        if (timerOff) {
            startTimer();
            timerOff = false;
        }
        flipCard(elementClicked);
        addFlippedCard(elementClicked);
        // now it is time to check if our 2 cards match each other
        if (flippedCards.length === 2) {
            checkCardsMatch(elementClicked);
            // add a move to move counter
            countMovesNumber();
            // show proper number of stars
            showStars();
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
        pairs++;
        if (pairs === MAX_PAIRS) {
            endGame();
        }
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

function countMovesNumber() {
    moves++;
    const numberOfMovesText = document.querySelector('.moves');
    numberOfMovesText.innerHTML = moves;
}

function showStars() {
    if (moves === 12) {
        hideOneStar();
    } else if (moves === 20) {
        hideOneStar();
    }
}

function hideOneStar() {
    const starsList = document.querySelectorAll('.stars li'); // change to fa-star
    for (star of starsList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}

// function for a timer
function startTimer() {
    timerId = setInterval(() => {
        time++;
        updateTime();
    }, 1000);
}

function updateTime() {
    if (time < 10) {
        timerDisplayed.innerHTML = minutes + ":0" + time;
    } else if (time < 60) {
        timerDisplayed.innerHTML = minutes + ":" + time;
    } else if (time == 60) {
        minutes++;
        time = 0;
        timerDisplayed.innerHTML = minutes + ":0" + time;
    } else if (time > 60) {
        timerDisplayed.innerHTML = minutes + ":" + time;
    }
}

function stopTimer() {
    clearInterval(timerId);
}

function showPopup() {
    const popup = document.querySelector('.popup_background');
    popup.classList.toggle('hide');
}

function addResultsToPopup() {
    const timeResult = document.querySelector('.popup_time');
    const endTime = document.querySelector('.timer').innerHTML;
    const movesResult = document.querySelector('.popup_moves');
    const starsResult = document.querySelector('.popup_stars');
    const endStars = document.querySelector('.stars').innerHTML;

    timeResult.innerHTML = "Time: " + endTime;
    movesResult.innerHTML = "Moves: " + moves;
    starsResult.innerHTML = "You got: " + endStars;
}

document.querySelector('.popup_close').addEventListener('click', () => {
    showPopup();
});

document.querySelector('.button_cancel').addEventListener('click', () => {
    showPopup();
});

document.querySelector('.button_replay').addEventListener('click', () => {
    resetGame();
    showPopup();
});

document.querySelector('.restart').addEventListener('click', resetGame);

function resetGame() {
    timerOff = true;
    time = 0;
    moves = 0;
    pairs = 0;
    document.querySelector('.moves').innerHTML = moves;
    stars = 0;
    const starsList = document.querySelectorAll('.stars li');
    for (star of starsList) {
        star.style.display = 'inline';
    }
    stopTimer();
    updateTime();
    shuffleCards();
    showBackOfCards();
}

// start whole game again when the reset is clicked
const shuffleButton = document.querySelector('.restart');
shuffleButton.addEventListener('click', event => {
    stopTimer();
    startGame();
});

function endGame() {
    stopTimer();
    addResultsToPopup();
    showPopup();
    showBackOfCards();
}