const screen = document.querySelector('.section')
const board = document.querySelector('.board')
const startBtn = document.querySelector('.start')
const startScreen = document.querySelector('.startScreen')
const rules = document.querySelector('.rules')
const back = document.createElement('a')
    back.classList.add('back')
    back.innerHTML = '<p>BACK</p>'


const images = ['img/Bentley.jpg', 'img/Bugatti.jpg', 'img/Ferrari.jpg', 'img/Jaguar.jpg', 'img/Lambo.jpg', 'img/Maserati.jpg', 'img/Porsche.jpg', 'img/RR.jpg', 'img/Subaru.jpg', 'img/Tesla.jpg', 'img/Toyota.jpg']
const logos = ['img/Bentley Logo.jpg', 'img/Bugatti Logo.jpg', 'img/Ferrari Logo.jpg', 'img/Jaguar Logo.jpg', 'img/Lambo Logo.jpg', 'img/Maserati Logo.jpg', 'img/Porsche Logo.jpg', 'img/RR Logo.jpg', 'img/Subaru Logo.jpg', 'img/Tesla Logo.jpg', 'img/Toyota Logo.jpg']
const CARDS_QUANTITY = 18

let clickQuantity = 0
let selectedCards = []

let time = 0
let score = 0
let lives = 4

let timer
let memorize

const startImgs = document.querySelectorAll('.slide')

board.classList.toggle('hidden')

startImgs.forEach((startImg) => {
    startImg.addEventListener('mouseover', () => {
        removeActive()
        startImg.classList.add('active')
    })
})

function removeActive() {
    startImgs.forEach((startImg) => {
        startImg.classList.remove('active')
    })
}

rules.addEventListener('click', event => {
    if (event.target.classList.contains('rules')) {
        startBtn.style.transform = 'translateY(258px)'
        rules.style.transform = 'translateY(-340px)'
        rules.style.pointerEvents = 'none'

        startScreen.append(back)

        const rulesBoard = document.createElement('div')
        rulesBoard.classList.add('rulesBoard')

        startScreen.append(rulesBoard)
        rulesBoard.innerHTML = 
        '<p>Like cool cars? Here you will have the opportunity to enjoy plenty of atmospheric pictures of luxury cars with atmospheric background ! In addition to enjoy the views, you can test your memory for the knowledge of popular car brands, as well as remember their location on the playing field! All this is based on the series of games "Find a Pair".</p><br>' +

        '<p>Before starting the game, remember a few points:</p><br>' + 
        '<p>1. To win, you need to reveal all the cards;</p><br>' +
        '<p>2. The cards are opened and compared with each other when you click on the first one and then the second one in turn;</p><br>' +
        '<p>3. In case of a match of the brand-brand or auto-auto cards, you will be awarded 3 points;</p><br>' +
        '<p>4. In case of a match of the car-brand or auto-brand cards, you will be awarded 5 points;</p><br>' +
        '<p>5. If the selected cards do not match in any way, your life counter will decrease by 1;</p><br>' +
        '<p>6. The game is given 2 minutes and 4 lives: after the expiration of time or lives - the game ends;</p><br>' +
        '<p>7. Before the start of the game, you are given 10 seconds to memorize the location of the cards, after which the cards are turned over;</p><br>' +
        '<p>8. At the end of the game, the total of the points scored is summed up.</p>'

        back.addEventListener('click', () => window.location.reload())
    }
})

startBtn.addEventListener('click', event => {
    if (event.target.classList.contains('start')) {
        startBtn.classList.toggle('hidden')
        startImgs.forEach(element => element.classList.toggle('hidden'))
        startScreen.classList.toggle('hidden')
        board.classList.remove('hidden')
    
        const upbar = document.createElement('div')
        upbar.classList.add('upbar')
        board.append(upbar)
        
        const timeBar = document.createElement('div')
        timeBar.classList.add('timeBar')
        upbar.append(timeBar)

        const time = document.createElement('p')
        time.classList.add('time')
        timeBar.append(time)

        const livesBar = document.createElement('div')
        livesBar.classList.add('livesBar')
        upbar.append(livesBar)

        const lives = document.createElement('p')
        lives.classList.add('lives')
        livesBar.append(lives)

        const scoreBar = document.createElement('div')
        scoreBar.classList.add('scoreBar')
        upbar.append(scoreBar)

        const score = document.createElement('p')
        score.classList.add('score')
        scoreBar.append(score)

        startTheGame()
        setPictures()
        cardsMatching()
    }
    
})

function startTheGame() {
    setInterval(increasingTime, 1000)
    setTime(time)
    setLives(lives)
    setPoints(score)


    const field = document.createElement('div')
    field.classList.add('field')

    board.append(field)
    board.append(back)

        for (i = 0; i < CARDS_QUANTITY; i++) {

            const cards = document.createElement('div')
            cards.classList.add('review-card')

            field.append(cards)
            
            const cardInner = document.createElement('div')
            cardInner.classList.add('review-card-inner')
            cardInner.style.transform = 'rotateY(180deg)'

            cards.append(cardInner)

            const cardInnerFront = document.createElement('div')
            cardInnerFront.classList.add('review-card-front')

            cardInner.append(cardInnerFront)

            const cardInnerBack = document.createElement('img')
            cardInnerBack.classList.add('review-card-back')

            cardInner.append(cardInnerBack)

            const memorize = setTimeout(() => {cardInner.style.transform = 'rotateY(360deg)'}, 10000)
        }
        back.addEventListener('click', () => window.location.reload())
        
}

// TIME

function increasingTime() {
    if (time === 125) {
        finishTheGame()
    } else if (time === 115) {
        document.querySelector('.timeBar').style.animation = 'pulsate 1.2s linear infinite';
        let current = ++time
        if (current <= 9) {
            current = `${current}`
        }
        setTime(current)
    } else {
        let current = ++time
        if (current <= 9) {
            current = `${current}`
        }
        setTime(current)
    }
    
}

function setTime(value) {
    const time = document.querySelector('.time')
    time.innerHTML = `Time: ${value}`
}

// LIVES

function decreasingLives() {
    if (lives === 1) {
        finishTheGame()
    } else if (lives === 2) {
        document.querySelector('.livesBar').style.animation = 'pulsate 1.2s linear infinite';
        lives-- 
    } else {
        lives--
    }
    setLives(lives)
}

function setLives(value) {
    const lives = document.querySelector('.lives')
    lives.innerHTML = `Lives: ${value}`
}

// POINTS

function increasingPoints(a) {
    score = score + a
    setPoints(score)
}

function setPoints(current) {
    const score = document.querySelector('.score')
    score.innerHTML = `Score: ${current}` 
}

// PICTURES SETTING

function setPictures() {
    let setPics = document.querySelectorAll('.review-card-back')
    setPics = Array.prototype.slice.call(setPics, 0)
    const setImagesPics = []
    const setLogosPics = []
    const setImagesGroups = 2

    for (let i = 0; i < setPics.length/setImagesGroups; i++) {
        let index = Math.floor(Math.random() * images.length)
        setImagesPics.push(index)
        setPics[i].setAttribute('src', images[index])         
        setImagesPics.push(setPics[i].attributes.src.nodeValue)
    }

    setImagesPics.sort()
    setLogosPics.splice(0, 5, ...setImagesPics)

    for (let i = 9; i < setPics.length; i++) {
        const Index = setLogosPics.reduce(item => {
            return item
        })
        setLogosPics.shift()    
        setPics[i].setAttribute('src', logos[Index])
        setLogosPics.push(setPics[i].attributes.src.nodeValue)
    }

    function shuffle() {

    // ФУНКЦИЯ ДЛЯ РАНДОМНОЙ СОРТИРОВКИ

        function random(a, b) {  
            return 0.5 - Math.random();
          } 

    // СМЕНА АТРИБУТОВ SRC У КАРТОЧЕК

        const attributes = setPics.map(element => element.getAttribute('src')).sort(random)
        for (let i = 0; i < setPics.length; i++) {
            const index = attributes.indexOf(attributes[i])
            setPics[i].setAttribute('src', attributes[index])
        }
        return setPics.map(element => element.attributes.src.nodeValue)
    }

    shuffle()
    
} 

//      ОБРАБОТКА КЛИКОВ ПО КАРТОЧКАМ И СРАВНИВАНИЕ КАРТОЧЕК

function cardsMatching() {
    let cards = document.querySelectorAll('.review-card')
    let cardInner = document.querySelectorAll('.review-card-inner')
    
    cards = Array.prototype.slice.call(cards, 0)
    cardInner = Array.prototype.slice.call(cardInner, 0)

    cardInner.map(element => element.addEventListener('click', event => {
        clickQuantity++
        element.style.transform = 'translateY(-30px)'
        element.classList.add('selected')

        let selectedCards = cardInner.filter(element => element.classList.contains('selected'))
        
        const otherCards = cardInner.filter(element => !element.classList.contains('selected'))
        
        if (clickQuantity % 2 === 0) {
            console.log(cards)
            cardInner.forEach(element => element.style.pointerEvents = 'none')
            otherCards.forEach(element => element.style.opacity = '0.3')
            const versusBoard = document.createElement('div')
                versusBoard.classList.add('versusBoard')
                board.append(versusBoard)

            selectedCards.map(element => {
                    element.style.transform = 'rotateY(180deg)'
                    element.style.height = '430px'
                    element.style.width = '550px'
                    versusBoard.append(element)
            })
        }

            // СРАВНЕНИЕ ВЫБРАННЫХ КАРТ
        const names = selectedCards.map(element => element.lastChild.src.slice(22).replace(/[^a-zа-яё\./]/gi, ' ').replace(/\s{2,}/g, ' '))
        const versusBoard = document.querySelector('.versusBoard')
        const united = images.concat(logos)

        const matching = names.map(element => {
                return united.indexOf(element)      
        })

        const arriving = selectedCards.map(element => {
            return cardInner.indexOf(element)
        })
        
        timer = setTimeout(() => {
            selectedCards.forEach(element => {
                element.style.transform = 'rotateY(360deg)'
                element.style.height = '200px'
                element.style.width = '120px'
            })
            otherCards.forEach(element => {
                element.style.opacity = '1'
                element.style.pointerEvents = 'auto'
            })

            if (matching[0] - matching[1] === 11 || matching[1] - matching[0] === 11) {
                if (clickQuantity % 2 === 0) {
                    selectedCards.forEach(element => {
                        element.style.transform = 'rotateY(180deg)'
                        element.style.pointerEvents = 'none'
                    })
                    increasingPoints(5)
                    setLives(lives)
                }
            } else if (matching[0] === matching[1]) {
                if (clickQuantity % 2 === 0) {
                    selectedCards.forEach(element => {
                        element.style.transform = 'rotateY(180deg)'
                        element.style.pointerEvents = 'none'
                    })
                    increasingPoints(3)
                    setLives(lives)
                }
            } else {
                if (selectedCards.length === 2) {
                    decreasingLives()
                    setPoints(score)
                }
            }

            board.removeChild(versusBoard);

            cards[arriving[0]].append(selectedCards[0])
            cards[arriving[1]].append(selectedCards[1])
            
            selectedCards.forEach(element => {
                element.classList.remove('selected')
                element.classList.add('done')
            })
            
            if (cardInner.every(element => element.classList.contains('done'))) {
                finishTheGame()
            }
        }, 4000);
    }))
}

function finishTheGame() {
    let cardInner = document.querySelectorAll('.review-card-inner')
    cardInner = Array.prototype.slice.call(cardInner, 0)

    const win = cardInner.every(element => element.classList.contains('done'))

    board.removeChild(document.querySelector('.field'))
        const upbar = document.querySelector('.upbar')
        upbar.classList.add('hidden')
        
        const results = document.createElement('div')
        board.append(results)
        results.classList.add('results')

    if (win) {
        results.innerHTML = '<h1>YOU WIN</h1>'
    } else {
        results.innerHTML = '<h1>Game Over</h1>'
    }
    const scoreResults = document.createElement('p')
    results.append(scoreResults)
    scoreResults.innerHTML = 'Your points: '+`${score}`

    board.addEventListener('click', () => window.location.reload())
    clearTimeout(timer, memorize)
}




