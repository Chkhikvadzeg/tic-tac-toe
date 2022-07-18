const X = document.querySelector('.x');
const O = document.querySelector('.o');
const cpu = document.querySelector('#cpu')
let chosenX = false;

const yourIcon = document.querySelector('#your-icon');
const oponentsIcon = document.querySelector('#oponents-icon');
const cell = document.querySelectorAll(".cell");
const resetButton = document.querySelector('.btn-reset');
const resetWindow = document.querySelector('.reset');
const blackBackground = document.querySelector('.black-bg');
const cancelButton = document.querySelector('#cancel');
const result = document.querySelector('.result');
const whoWon = document.querySelector('.who-won');
const nextRound = document.querySelector('#next-round')
const quitGame = document.querySelector('#quit-game');
const restartButton = document.querySelector('#reset');
const loss = document.querySelector('#loss');
const win = document.querySelector('#win');
const tie = document.querySelector('#tie');
let emptyCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let winningChances = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let  myIcons = [];
let oponentsIcons = [];
let myWins = 0;
let oponentsWins = 0;
let ties = 0;

X.addEventListener('click', () => {
    O.classList.remove('active');
    X.classList.add('active');
    chosenX = true;
})

O.addEventListener('click', () => {
    X.classList.remove('active');
    O.classList.add('active');
    chosenX = false;
})

cpu.addEventListener('click', () => {
    // Removing main page where you choose icon and oponent and showing game page when you choose everything.
    document.querySelector('.game.start').style.display = 'none';
    document.querySelector('.game.action').style.display = 'block'
    if(chosenX){
        yourIcon.innerHTML = 'X (YOU)'
        oponentsIcon.innerHTML = 'O (CPU)'
    }else{
        yourIcon.innerHTML = 'O (YOU)'
        oponentsIcon.innerHTML = 'X (CPU)'
    
    }

    // Added hover Images in every cell. if x is chosen on the main page, then hover image will be x outline, or if o is chosen hover image will be o outline

    cell.forEach(n => {
        addHoverImages(n);
    });

    const turnImage = document.createElement('img');
    turnImage.src = `./assets/${chosenX ? 'icon-x.svg' : 'icon-o.svg'}`;
    turnImage.classList.add(`${chosenX ? 'x' : 'o'}`)
    document.querySelector('.queue').insertAdjacentElement('afterbegin', turnImage)

    putOifXChosen();
});

// Create images on cell click. image will be x if you chose x and will be o if you chose o.
const startGame = () => {
    cell.forEach(n => n.addEventListener('click', () => {
        const image = document.createElement('img');
        image.src = `./assets/${chosenX ? 'icon-x.svg' : 'icon-o.svg'}`;
        image.classList.add(`${chosenX ? 'icon-x' : 'icon-o'}`);
        if(n.childNodes[0] === n.querySelector('.cell-hoverImage')){
            n.removeChild(n.querySelector('.cell-hoverImage'));
        }else {
            return;
        }
        if(n.childNodes.length < 1){
            n.appendChild(image);
            let cellIndex = +n.getAttribute('cellIndex')
            emptyCells.splice(emptyCells.indexOf(cellIndex), 1);
            myIcons.push(+n.getAttribute('cellIndex'))
    
            if(emptyCells.length > 0){
                let randomIndex = Math.floor(Math.random() * emptyCells.length) 
                let cellIndexOponent = emptyCells[randomIndex]  
                const oponentImage = document.createElement('img');
                oponentImage.src = `./assets/${chosenX ? 'icon-o' : 'icon-x'}.svg`;
                oponentImage.classList.add(`${chosenX ? 'icon-o' : 'icon-x'}`)
                cell[cellIndexOponent].replaceChild(oponentImage, cell[cellIndexOponent].querySelector('.cell-hoverImage'));
                emptyCells.splice(emptyCells.indexOf(cellIndexOponent), 1);
                oponentsIcons.push(cellIndexOponent);
            }
            gameResult();
        }
        
    }));
}

const gameResult = () => {
    for(let i = 0; i < winningChances.length; i++){
        console.log(winningChances[i].every(n => myIcons.includes(n)));
        if(winningChances[i].every(n => myIcons.includes(n))){
            blackBackground.style.display = 'block';
            result.style.display = 'flex';
            if(whoWon.childElementCount > 1){
                whoWon.removeChild(whoWon.querySelector('img'));
            }
            const myIcon = document.createElement('img');
            myIcon.classList.add(`${chosenX ? 'icon-x' : 'icon-o'}`);
            myIcon.src = `./assets/${chosenX ? 'icon-x.svg' : 'icon-o.svg'}`;
            whoWon.insertAdjacentElement('afterbegin', myIcon);
            whoWon.querySelector('h3').innerHTML = 'TAKES THE ROUND'
            whoWon.querySelector('h3').style.color = `${chosenX ? '#31C3BD' : '#F2B137'}`
            document.querySelector('.result-result').textContent = 'You win! congrats! :)'
            myWins++;
            win.innerHTML = myWins;
        }else if(winningChances[i].every(n => oponentsIcons.includes(n))){
            blackBackground.style.display = 'block';
            result.style.display = 'flex';
            if(whoWon.childElementCount > 1){
                whoWon.removeChild(whoWon.querySelector('img'));
            }
            const UIIcon = document.createElement('img');
            UIIcon.classList.add(`${chosenX ? 'icon-o' : 'icon-x'}`);
            UIIcon.src = `./assets/${chosenX ? 'icon-o.svg' : 'icon-x.svg'}`;
            whoWon.insertAdjacentElement('afterbegin', UIIcon);
            document.querySelector('.result-result').textContent = 'OH NO, YOU LOST…'
            whoWon.querySelector('h3').innerHTML = 'TAKES THE ROUND'
            whoWon.querySelector('h3').style.color = `${!chosenX ? '#31C3BD' : '#F2B137'}`
            oponentsWins++;
            loss.innerHTML = oponentsWins;
        }else if(emptyCells.length === 0 && i === winningChances.length - 1){
            blackBackground.style.display = 'block';
            result.style.display = 'flex';
            whoWon.querySelector('h3').style.color = '#A8BFC9'
            document.querySelector('.result-result').textContent = ''
            whoWon.querySelector('h3').innerHTML = 'Round tied!'
            if(whoWon.childElementCount > 1){
                whoWon.removeChild(whoWon.querySelector('img'));
            }
            ties++;
            tie.innerHTML = ties;
            return;
        }
    }
}

startGame();

resetButton.addEventListener('click', () => { 
    blackBackground.style.display = 'block'
    resetWindow.style.display = 'flex'
})

cancelButton.addEventListener('click', () => {
    blackBackground.style.display = 'none'
    resetWindow.style.display = 'none'
})

restartButton.addEventListener('click', () => {
    resetWindow.style.display = 'none';
    restartGame();
})

quitGame.addEventListener('click', () => {
    blackBackground.style.display = 'none';
    result.style.display = 'none';
    location.reload(); 
})


nextRound.addEventListener('click', () => {
    result.style.display = 'none';
    restartGame();
})

const addHoverImages = n => {
    if(n.childNodes.length < 1){
        const hoverImage = document.createElement('img');
        hoverImage.classList.add('cell-hoverImage');
        hoverImage.src = `./assets/${chosenX ? 'icon-x-outline.svg' : 'icon-o-outline.svg'}`
        hoverImage.classList.add(`${chosenX ? 'icon-x' : 'icon-o'}`)
        n.appendChild(hoverImage)            
    }
}

const putOifXChosen = () => {
    if(!chosenX){
        randomCellInteger = Math.floor(Math.random() * emptyCells.length);
        const image = document.createElement('img');
        image.src = './assets/icon-x.svg';
        image.classList.add('icon-x');
        cell[randomCellInteger].replaceChild(image, cell[randomCellInteger].querySelector('.cell-hoverImage'))
        emptyCells.splice(randomCellInteger, 1)
        oponentsIcons.push(randomCellInteger);
    }
}

const restartGame = () => {
    blackBackground.style.display = 'none'
    cell.forEach(n => {
        n.removeChild(n.childNodes[0]);
        addHoverImages(n);
    })
    emptyCells = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    myIcons = [];
    oponentsIcons = [];
    putOifXChosen();
    startGame();
}




