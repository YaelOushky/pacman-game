'use strict'
const PACMAN = '🦜';
// const PACMAN = '<img class="pacman" src="img/pacman.jpg"/>';

var gDdGhost = []
var gPacman;
var gRotate= ''

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {
    if (!gGame.isOn) return;
    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (gPacman.isSuper) {
        return movePacmanPower(ev)
    }
    if (nextCell === WALL) return;
    else if (nextCell === FOOD) updateScore(1);
    else if (nextCell === CHERRY) updateScore(10), gCherrySound.play()
    else if (nextCell === GHOST) {
        gErrorSound.play()
        gameOver();
        renderCell(gPacman.location, EMPTY)
        return;
    }
    else if (nextCell === POWER) {
        gPowerSound.play()
        updateScore(1)
        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
            while (gDdGhost.length) {
                gGhosts.push(gDdGhost.pop())
            }
        }, 5000);
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the dom
    renderCell(gPacman.location, EMPTY);
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, getPacmanHTML());
    checkWin()
}

function movePacmanPower(ev) {
    if (!gGame.isOn) return;
    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    else if (nextCell === CHERRY ) updateScore(10) , gCherrySound.play()
    else if (nextCell === FOOD) updateScore(1);
    else if (nextCell === GHOST){
        updateScore(1);
        var dadGhost = spliceGhost(nextLocation.i, nextLocation.j)
        gDdGhost.push(dadGhost)
    }
    else if (nextCell === POWER) return
  
    renderCell(gPacman.location, EMPTY)
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the dom
    renderCell(gPacman.location, EMPTY);
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, getPacmanHTML());
    checkWin()
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gRotate = 'rotate(90deg)'
            nextLocation.i--;
            break;
        case 'ArrowDown':
            gRotate = 'rotate(0deg)'
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            gRotate = 'rotate(90deg)'
            nextLocation.j--;
            break;
        case 'ArrowRight':
            gRotate = 'rotate(-90deg)'
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

function getPacmanHTML() {
    return `<div style="transform:${gRotate}" class="pacman">${PACMAN}</div>`
  }
