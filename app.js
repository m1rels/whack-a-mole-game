const square = document.querySelectorAll('.square')
const joker = document.querySelectorAll('.joker')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result = 0
let currentTime = timeLeft.textContent 
let hitPosition = 0
let clickedEl = null

function randomSquare() {
    square.forEach(className => {
        //classList & remove?
        className.classList.remove('joker')
    })
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('joker')


    //assign the id of the randomPosition to hitPosition for us to use later 
    hitPosition = randomPosition.id
}

function mouseUpCallback(el) {
    if (el.id === hitPosition) {
        result = result + 1
        score.textContent = result 
    }
}

square.forEach(el => {
    el.addEventListener('mouseup', () => { mouseUpCallback(el) })
})

let timerJokerId = null
function moveJoker() {
    timerJokerId = setInterval(randomSquare, 1000)
}

moveJoker()

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if(currentTime === 0) {
        clearInterval(timerCountdownId)
        clearInterval(timerJokerId)
        el = document.getElementById(hitPosition)
        el.removeEventListener('mouseup', () => { mouseUpCallback(el) })
    }
}
    

let timerCountdownId = setInterval(countDown, 1000)

document.querySelector("button#restart").addEventListener('click', () =>{
    let confirmed = confirm('Willst du das Spiel neustarten?')
    if (confirmed) {
        document.location.reload()
    }
})


document.getElementById("stop").addEventListener('click', () =>{
    let answer = prompt('Willst du das Spiel pausieren?')
    if (answer === 'JA') {
        clearInterval(timerCountdownId)
        clearInterval(timerJokerId)
        document.getElementById("stop").setAttribute("disabled", "disabled")
    }
})
