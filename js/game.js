'use strict'
const WALL = '🧱 '
const FOOD = '♦️'
const EMPTY = ' '
const POWER = '💪'
const CHERRY = '🍒'

var gWinSound = new Audio('audio/win.wav');
var gErrorSound = new Audio('audio/error.wav');
var gPowerSound = new Audio('audio/power.mp3');
var gCherrySound = new Audio('audio/cherry.mp3');

var gIntervalCharry
var gCounter
var gBoard

var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gCounter = 60
    gGame.score = 0
    gGame.isOn = true
    gBoard = buildBoard()
    var btnRestart = document.querySelector('button')
    btnRestart.classList.remove('hide')
    var elWin = document.querySelector('.winner')
    elWin.classList.remove('hide')
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gIntervalCharry = setInterval(() => {
        addCherry()
    }, 15000);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = POWER;
    board[8][8] = POWER;
    board[1][8] = POWER;
    board[8][1] = POWER;

    return board
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
    if (diff === 10) gCounter += diff
}

function gameOver() {
    gGame.isOn = false;
    Restart()
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCharry)
}

function Restart() {
    var btnRestart = document.querySelector('button')
    btnRestart.classList.add('hide')
}

function checkWin() {
    if (gCounter === gGame.score) {
        var elWin = document.querySelector('h3')
        elWin.classList.add('hide')
        gWinSound.play()
        gameOver()
    }
}

function addCherry() {
    var emptyCell = null
    while (!emptyCell) {
        var randomI = getRandomIntInt(1, 8)
        var randomJ = getRandomIntInt(1, 8)
        if (gBoard[randomI][randomJ] === EMPTY) {
            emptyCell = gBoard[randomI][randomJ]
        }
    }
    emptyCell = CHERRY
    renderCell({ i: randomI, j: randomJ }, CHERRY)
}