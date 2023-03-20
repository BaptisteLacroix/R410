"use strict";

let size = 3;

function onLoad() {
    console.log('Processus de chargement du document terminé…');
    document.getElementById('btnNewGame').addEventListener('click', function () {
        init();
    });
    document.getElementById('btnShuffle').addEventListener('click', function () {
        init();
    });
    document.getElementById('size').addEventListener('input', function () {
        if (this.value >= 3 && this.value < 10) {
            size = this.value;
            init();
        }
    });
    init();
}


function init() {
    // Remove all divs in the #game
    let game = document.getElementById('game');
    while (game.firstChild) {
        game.removeChild(game.firstChild);
    }

    // Create a new grid
    let grid = randomGrid();
    for (let i = 1; i <= size; i++) {
        for (let j = 1; j <= size; j++) {
            let div = document.createElement('div');
            div.classList.add('box');
            div.id = 'r' + i + '-c' + j;
            div.style.top = (i - 1) * 102 + 'px';
            div.style.left = (j - 1) * 102 + 'px';
            div.style.lineHeight = '100px';
            div.style.cursor = 'pointer';
            div.innerHTML = grid[(i - 1) * size + (j - 1)];
            if (grid[(i - 1) * size + (j - 1)] === 0) {
                div.classList.add('empty');
                div.innerHTML = '';
            }
            game.appendChild(div);
        }
    }

    // Set the size of the #game
    game.style.width = size * 102 + 'px';
    game.style.height = size * 102 + 'px';

    let divs = document.getElementsByClassName('box');
    // Set a listener click on each divs
    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', function () {
            selection(divs[i]);
        });
    }
}

// Toute les ressources de la page sont complètement chargées.
window.onload = onLoad;


/**
 * Return a random grid, with the value 0 in the last box
 */
function randomGrid() {
    let grid = [];
    let numberArray = [];
    for (let i = 0; i < size * size; i++) {
        numberArray.push(i);
    }

    for (let i = 0; i < size * size; i++) {
        let random = Math.floor(Math.random() * numberArray.length);
        grid.push(numberArray[random]);
        numberArray.splice(random, 1);
    }

    // replace the value 0 to the last box
    let index = grid.indexOf(0);
    grid[index] = grid[grid.length - 1];
    grid[grid.length - 1] = 0;

    return grid;
}


function selection(div) {
    let emptyBox = document.getElementsByClassName('empty')[0];
    let emptyBoxId = emptyBox.id;

    let emptyBoxIdX = emptyBoxId.split('-')[0][1];
    let emptyBoxIdY = emptyBoxId.split('-')[1][1];

    let boxId = div.id;
    let boxIdX = boxId.split('-')[0][1];
    let boxIdY = boxId.split('-')[1][1];

    if ((emptyBoxIdX === boxIdX && (Math.abs(boxIdY - emptyBoxIdY) === 1)) ||
        (emptyBoxIdY === boxIdY && (Math.abs(boxIdX - emptyBoxIdX) === 1))) {
        animation(div, emptyBox);
        let temp = div.innerHTML;
        div.innerHTML = emptyBox.innerHTML;
        emptyBox.innerHTML = temp;

        // Set class .empty to the clicked box
        div.classList.add('empty');
        // And reove .empty from the empty box
        emptyBox.classList.remove('empty');
    }
}

function animation(actualBox, emptyBox) {
    let styleActualBox = window.getComputedStyle(actualBox);
    let styleMostNearBox = window.getComputedStyle(emptyBox);
    let topActualBox = styleActualBox.getPropertyValue('top');
    let leftActualBox = styleActualBox.getPropertyValue('left');
    let topMostNearBox = styleMostNearBox.getPropertyValue('top');
    let leftMostNearBox = styleMostNearBox.getPropertyValue('left');

    emptyBox.animate([{
        top: topActualBox,
        left: leftActualBox,
        zIndex: 10
    }, {
        top: topMostNearBox,
        left: leftMostNearBox,
        zIndex: 10
    }], {
        duration: 200, iterations: 1
    });
}


function manhattanDistance(grid, size) {
    let distance = 0;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let value = grid[i * size + j];
            if (value !== 0) {
                let targetX = Math.floor((value - 1) / size);
                let targetY = (value - 1) % size;
                distance += Math.abs(i - targetX) + Math.abs(j - targetY);
            }
        }
    }

    return distance;
}

function isSolved(grid, size) {
    for (let i = 0; i < size * size - 1; i++) {
        if (grid[i] !== i + 1) {
            return false;
        }
    }

    return true;
}

function solve(grid, size) {
    let openSet = [{
        grid: grid,
        g: 0,
        h: manhattanDistance(grid, size)
    }];

    while (openSet.length > 0) {
        let current
// Trouver l'état avec le coût le plus bas dans l'ensemble ouvert
        let currentIndex = 0;
        for (let i = 1; i < openSet.length; i++) {
            if (openSet[i].g + openSet[i].h < openSet[currentIndex].g + openSet[currentIndex].h) {
                currentIndex = i;
            }
        }
        let currentState = openSet[currentIndex];

        // Vérifier si l'état actuel est résolu
        if (isSolved(currentState.grid, size)) {
            console.log('Solved!');
            return currentState.grid;
        }

        // Retirer l'état actuel de l'ensemble ouvert et le traiter
        openSet.splice(currentIndex, 1);

        // Trouver la position de la case vide
        let emptyIndex = currentState.grid.indexOf(0);

        // Les mouvements possibles
        let moves = [
            {x: -1, y: 0},
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: 0, y: 1}
        ];

        // Parcourir les mouvements possibles
        for (let move of moves) {
            let emptyX = Math.floor(emptyIndex / size);
            let emptyY = emptyIndex % size;
            let newX = emptyX + move.x;
            let newY = emptyY + move.y;

            // Vérifier si le mouvement est valide
            if (newX >= 0 && newX < size && newY >= 0 && newY < size) {
                // Créer une copie de la grille actuelle et échanger la case vide avec la case adjacente
                let newGrid = currentState.grid.slice();
                let newIndex = newX * size + newY;
                newGrid[emptyIndex] = newGrid[newIndex];
                newGrid[newIndex] = 0;

                // Vérifier si la nouvelle grille existe déjà dans l'ensemble ouvert
                let foundInOpenSet = false;
                for (let state of openSet) {
                    if (state.grid.every((value, index) => value === newGrid[index])) {
                        foundInOpenSet = true;
                        break;
                    }
                }

                // Ajouter la nouvelle grille à l'ensemble ouvert si elle n'y est pas déjà
                if (!foundInOpenSet) {
                    openSet.push({
                        grid: newGrid,
                        g: currentState.g + 1,
                        h: manhattanDistance(newGrid, size)
                    });
                }
            }
        }
    }

    // Aucune solution trouvée
    console.log('No solution found');
    return null;
}