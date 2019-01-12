/*
 * Create a list that holds all of your cards
 */


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
    }

    return array;
}


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
 
 

let toogleCards=[];
let clockOff = true;
let time = 0;
let moves = 0;
let clockId;
let matched = 0;
const TOTAL_PAIRS = 8;

const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
deck.addEventListener('click', event=>{
    const clickTarget = event.target;
    if (isClickValid(clickTarget)
){      if (clockOff){
            startClock();
            clockOff = false;
        }       
        toogleCard(clickTarget)
        addToogleCard(clickTarget);
        if (toogleCards.length === 2){
            checkForMatch(clickTarget);
            addMove();
            checkScore();
        }
    }
})

function toogleCard(card){
    card.classList.toggle('open');
    card.classList.toggle('show')
}

function addToogleCard(clickTarget){
    toogleCards.push(clickTarget);
    console.log(toogleCards);
}

function checkForMatch(){
    if (toogleCards[0].firstElementChild.className === toogleCards[1].firstElementChild.className){
        toogleCards[0].classList.toggle('match');
        toogleCards[1].classList.toggle('match');
        toogleCards = [];
        matched++;
    } else {
        setTimeout(() => {
            toogleCard(toogleCards[0]);
            toogleCard(toogleCards[0]);
            toogleCards = [];
        }, 1000);

    }
}

function isClickValid(clickTarget){
    return (
        clickTarget.classList.contains('card') && 
        !clickTarget.classList.contains('match') && 
        toogleCards.length < 2 && 
        !toogleCards.includes(clickTarget)
    );
}

function shuffleDeck(){
    const cardsToShuflle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledcards = shuffle(cardsToShuflle);
    for (card of shuffledcards) {
        deck.appendChild(card);
    }
}
shuffleDeck();

function addMove(){
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

function checkScore(){
    if (moves === 16 || moves === 24){
        hideStar();
    }
}

function hideStar(){
    const starList = document.querySelectorAll('.stars li');
    for (star of starList){
        if (star.style.display !== 'none'){
            star.style.display = 'none';
            break;
        };
    }
}

function startClock(){
    clockId = setInterval(() => {
    time++;
    displayTime();
    console.log(time);
    }, 1000);
}
startClock();

function displayTime(){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const clock = document.querySelector('.clock');
    console.log(clock);
    if (seconds < 10){
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

function stopClock(){
    clearInterval(clockId);
}

function toogleModal(){
    const modal = document.querySelector('.modal__background');
    modal.classList.toggle('hide')
}

function writeModalStats(){
    const timeStat = document.querySelector('.modal__time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal__moves');
    const starsStat = document.querySelector('.modal__stars');
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars(){
    stars = document.querySelector('.stars li');
    starCount = 0;
    for (star of stars){
        if (star.style.display !== 'none'){
            starCount++;
        }
    }
    console.log(startCount);
    return startCount;
}

document.querySelector('.modal__cancel').addEventListener('click', () =>{
    toogleModal();
});

document.querySelector('.modal__replay').addEventListener('click', replayGame)

document.querySelector('.restart').addEventListener('click', resetGame)

function resetGame(){
    resetClockAndTime();
    resetMoves();
    resetStars();
    shuffleDeck();
}

function resetClockAndTime(){
    stopClock();
    clockoff = true;
    time = 0;
    displayTime();
}

function resetMoves(){
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStars(){
    stars = 0;
    const startList = document.querySelector('.stars li');
    for (star of starList){
        star.style.display = 'inline';
    }
}

function gameover(){
    stopClock();
    writeModalStats();
    toogleModal();
}

function replayGame(){
    resetGame();
    toogleModal();
}

function resetCards(){
    const cards = document.querySelector('.deck li');
    for (let card of cards){
        card.className = 'card'
    }
}


//condition de game over; dans quelle fonction la placer
if (matched === TOTAL_PAIRS){
    gameover();
}
