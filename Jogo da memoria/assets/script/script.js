const FRONT = "card_front";
const BACK = "card_back";
const ICON = "icon";
const CARD = "card"




startGame();

function startGame() {

    initializeCards(game.createCardsFromTechs(game.techs));
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    game.cards.forEach(card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        createCardContet(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);

    })

}

function createCardContet(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {

        cardElementFace.innerHTML = "&lt/&gt";
    }

    element.appendChild(cardElementFace);
}


function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOver = document.getElementById("gameOver");
                    gameOver.style.display = 'flex';
                }
            }

            else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip');
                    game.unFlipCards();
                }, 900)
            }
        }
    }
}

function restart() {
    game.clearCards();
    startGame();
    let gameOver = document.getElementById("gameOver");
    gameOver.style.display = 'none';
}

function clearPage(){
    game.clearCards();
    startGame()
}
