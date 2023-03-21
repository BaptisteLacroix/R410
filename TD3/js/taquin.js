"use strict";

let size = 3;
let defaultGrid = [];
let grid = [];
let clicked = false;
let solved = false;
let victory_div = document.getElementById('victory-message');


// Toutes les ressources de la page sont complètement chargées.
window.onload = onLoad;

/**
 * It adds event listeners to the buttons and the input
 */
function onLoad() {
    console.log('Processus de chargement du document terminé…');
    document.getElementById('btnNewGame').addEventListener('click', function () {
        solved = false;
        clicked = false;
        victory_div.style.display = 'none';
        init();
    });
    document.getElementById('btnReset').addEventListener('click', function () {
        solved = false;
        clicked = false;
        victory_div.style.display = 'none';
        console.log('Reset');
        reset();
    });
    document.getElementById('btnShuffle').addEventListener('click', function () {
        victory_div.style.display = 'none';
        solved = false;
        clicked = false;
        init();
    });
    document.getElementById('btnSolve').addEventListener('click', function () {
        if (clicked === false && solved === false) {
            clicked = true;
            solve();
        }
    });
    document.getElementById('size').addEventListener('input', function () {
        if (this.value >= 3 && this.value < 10) {
            clicked = false;
            solved = false;
            victory_div.style.display = 'none';
            size = this.value;
            init();
        }
    });
    init();
}

function moveBox(move) {
    // Get the empty box
    let emptyBox = document.getElementsByClassName('empty')[0];
    // get the box that the empty box will replace
    let box = null;
    switch (move) {
        case 'u':
            box = document.getElementById('r' + (parseInt(emptyBox.id.split('-')[0][1]) + 1) + '-c' + emptyBox.id.split('-')[1][1]);
            break;
        case 'd':
            box = document.getElementById('r' + (parseInt(emptyBox.id.split('-')[0][1]) - 1) + '-c' + emptyBox.id.split('-')[1][1]);
            break;
        case 'l':
            box = document.getElementById('r' + emptyBox.id.split('-')[0][1] + '-c' + (parseInt(emptyBox.id.split('-')[1][1]) + 1));
            break;
        case 'r':
            box = document.getElementById('r' + emptyBox.id.split('-')[0][1] + '-c' + (parseInt(emptyBox.id.split('-')[1][1]) - 1));
            break;
    }
    // for each box in all_boxes, we call the function selection and wait 1 second before loop again
    selection(box);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function solve() {
    let stringInitial = '';
    for (const element of grid) {
        stringInitial += element + ' ';
    }
    stringInitial = stringInitial.substring(0, stringInitial.length - 1);
    let goal = '';
    for (let i = 0; i < size * size; i++) {
        goal += i + ' ';
    }
    goal = goal.substring(0, goal.length - 1);
    // Send the stringInitiale and goal to the server and get the response
    let jsonData = {
        stringInitial: JSON.stringify(stringInitial), goal: JSON.stringify(goal), size: JSON.stringify(size)
    }

    $.ajax({
        url: 'http://localhost:5000/a_star', type: 'GET', contentType: 'application/json', data: {
            json: jsonData
        }, success: async function (response) {
            console.log(response);
            let index = grid.indexOf('0');
            grid[index] = '';
            let moves = response.split(',');
            for (const move of moves) {
                moveBox(move);
                await sleep(500);
            }
            console.log(solved);
            if (solved) {
                console.log('Victory');
                victory_div.style.display = 'block';
                victory_div.style.width = size * 102 + 'px';
                victory_div.style.height = size * 102 + 'px';
            }
            clicked = false;
        }, error: function (error) {
            console.log(error.responseText);
        }
    });
}

/**
 * It creates a div for each box in the grid, and adds a click listener to each div
 * @param game - The game div
 * @param actualGrid - The grid
 */
function setBoxPosition(game, actualGrid) {
    for (let i = 1; i <= size; i++) {
        for (let j = 1; j <= size; j++) {
            let div = document.createElement('div');
            div.classList.add('box');
            div.id = 'r' + i + '-c' + j;
            div.style.top = (i - 1) * 102 + 'px';
            div.style.left = (j - 1) * 102 + 'px';
            div.style.lineHeight = '100px';
            div.style.cursor = 'pointer';
            div.innerHTML = actualGrid[(i - 1) * size + (j - 1)];
            if (actualGrid[(i - 1) * size + (j - 1)] == 0) {
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
    for (const element of divs) {
        document.addEventListener('click', function (event) {
            if (event.target.id === element.id) {
                selection(element);
            }
        });
    }

    setImage("./assets/images/croco.jpg", size);
}

/**
 * It removes all the divs in the #game, then it creates a new grid by sending a GET request to the server, and finally it
 * sets a listener click on each divs
 */
function init() {
    // Remove all divs in the #game
    let game = document.getElementById('game');
    while (game.firstChild) {
        game.removeChild(game.firstChild);
    }
    // Create a new grid
    // wait for the response from the server
    $.ajax({
        url: 'http://localhost:5000/generate_puzzle', type: 'GET', contentType: 'application/json', data: {
            size: JSON.stringify(size)
        }, success: function (response) {
            grid = response[0].split(' ');
            defaultGrid = grid;
            setBoxPosition(game, grid);
        }, error: function (error) {
            console.log(error.responseText);
        }
    })
}

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

/**
 * It removes all the divs in the #game, then creates new divs with the new grid, and finally adds a click listener to each
 * div
 */
function reset() {
    // Remove all divs in the #game
    let game = document.getElementById('game');
    while (game.firstChild) {
        game.removeChild(game.firstChild);
    }
    setBoxPosition(game, defaultGrid);
}


/**
 * If the empty box is next to the clicked box, then swap the two boxes
 * @param div - the box that was clicked
 */
function selection(div) {
    let emptyBox = document.getElementsByClassName('empty')[0];
    let emptyBoxId = emptyBox.id;

    let emptyBoxIdX = emptyBoxId.split('-')[0][1];
    let emptyBoxIdY = emptyBoxId.split('-')[1][1];

    let boxId = div.id;
    let boxIdX = boxId.split('-')[0][1];
    let boxIdY = boxId.split('-')[1][1];

    if ((emptyBoxIdX === boxIdX && (Math.abs(boxIdY - emptyBoxIdY) === 1)) || (emptyBoxIdY === boxIdY && (Math.abs(boxIdX - emptyBoxIdX) === 1))) {
        animation(div, emptyBox);
        let temp = div.innerHTML;
        div.innerHTML = emptyBox.innerHTML;
        emptyBox.innerHTML = temp;

        // update the grid array inversely
        // from the grid get the position of the previous empty box
        let indexBox = grid.indexOf(emptyBox.innerHTML);
        let indexEmptyBox = grid.indexOf(div.innerHTML);
        grid[indexBox] = "";
        grid[indexEmptyBox] = emptyBox.innerHTML;

        // Set class .empty to the clicked box
        div.classList.add('empty');
        // And reove .empty from the empty box
        emptyBox.classList.remove('empty');
    }
    solved = isSolve();
    console.log(solved);
}

/**
 * It takes two boxes, and animates the first one to the position of the second one
 * @param actualBox - The box that is clicked.
 * @param emptyBox - The box that is empty.
 */
function animation(actualBox, emptyBox) {
    let styleActualBox = window.getComputedStyle(actualBox);
    let styleMostNearBox = window.getComputedStyle(emptyBox);
    let topActualBox = styleActualBox.getPropertyValue('top');
    let leftActualBox = styleActualBox.getPropertyValue('left');
    let topMostNearBox = styleMostNearBox.getPropertyValue('top');
    let leftMostNearBox = styleMostNearBox.getPropertyValue('left');

    emptyBox.animate([{
        top: topActualBox, left: leftActualBox, zIndex: 10
    }, {
        top: topMostNearBox, left: leftMostNearBox, zIndex: 10
    }], {
        duration: 200, iterations: 1
    });

    // move the background image of the clicked box to the position of the empty box
    actualBox.animate([{
        backgroundPositionX: leftActualBox, backgroundPositionY: topActualBox
    }, {
        backgroundPositionX: leftMostNearBox, backgroundPositionY: topMostNearBox
    }], {
        duration: 200, iterations: 1
    });
}

/**
 * If the innerHTML of each div is equal to the corresponding value in the grid array, then the puzzle is solved.
 * @returns A boolean value.
 */
function isSolve() {
    let divs = document.getElementsByClassName('box');
    let solved = true;
    for (let i = 0; i < divs.length; i++) {
        if (divs[i].innerHTML != grid[i]) {
            solved = false;
        }
    }
    return solved;
}

/**
 * Get an image divide it into pieces and set the pieces in the grid
 * @param imagePath - The path of the image.
 * @param size - The size of the grid.
 */
function setImage(imagePath, size) {
    let image = new Image();
    image.src = imagePath;
    let game = document.getElementById('game');
    // Set as background of game an image with the size of the grid
    game.style.backgroundImage = 'url(' + imagePath + ')';
    game.style.backgroundSize = size * 102 + 'px ' + size * 102 + 'px';
    // set background image opacity to 0.5
    //game.style.opacity = 0.7;
    image.onload = function () {
        // get only the image with the width and height of the grid
        let canvas = document.createElement('canvas');
        canvas.width = size * 102;
        canvas.height = size * 102;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, size * 102, size * 102);
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                let tempCanvas = document.createElement('canvas');
                tempCanvas.width = size * 102;
                tempCanvas.height = size * 102;
                let tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(image, 0, 0, row * 102, col * 102);
                let box = document.getElementById('r' + (row + 1) + '-c' + (col + 1));
                box.style.backgroundImage = 'url(' + tempCanvas.toDataURL() + ')';
            }
        }
    }
}
