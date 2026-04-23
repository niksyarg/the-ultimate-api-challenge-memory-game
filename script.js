const settingsScreen = document.getElementById('settings-screen');
const gameScreen = document.getElementById('game-screen');
const grid = document.getElementById('game-grid');
const amountLabel = document.getElementById('amount-val');

let amount = 4;
let chosenCards = [];
let matchedCount = 0;


document.getElementById('plus').onclick = () => { if(amount < 12) amount++; amountLabel.innerText = amount; };
document.getElementById('minus').onclick = () => { if(amount > 2) amount--; amountLabel.innerText = amount; };

document.getElementById('start-btn').onclick = () => {
    const category = document.querySelector('input[name="category"]:checked').value;
    settingsScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    initGame(category);
};

function initGame(theme) {
    grid.innerHTML = '';
    chosenCards = [];
    matchedCount = 0;


    const images = [];
    for(let i = 0; i < amount; i++) {
    
        const url = `https://loremflickr.com/200/200/${theme}?lock=${i}`;
    images.push(url);
    }

    const gameDeck = [...images, ...images].sort(() => Math.random() - 0.5);

    gameDeck.forEach(url => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-back"></div>
                <div class="card-front" style="background-image: url('${url}')"></div>
            </div>
        `;
        card.onclick = () => flip(card);
        grid.appendChild(card);
    });
}

function flip(card) {
    if (chosenCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        chosenCards.push(card);

        if (chosenCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [c1, c2] = chosenCards;
    const img1 = c1.querySelector('.card-front').style.backgroundImage;
    const img2 = c2.querySelector('.card-front').style.backgroundImage;

    if (img1 === img2) {
        matchedCount++;
        chosenCards = [];
        if (matchedCount === amount) {
            setTimeout(() => alert('Win'), 500);
        }
    } else {
        setTimeout(() => {
            c1.classList.remove('flipped');
            c2.classList.remove('flipped');
            chosenCards = [];
        }, 1000);
    }
}

document.getElementById('back-btn').onclick = () => {
    gameScreen.classList.add('hidden');
    settingsScreen.classList.remove('hidden');
};