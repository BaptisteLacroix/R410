"use strict";

const grilleSize = 4;
let grille;
let coupNumber = 0;
let score = 0;
let isDelayed = false;
let aiInterval = null;
// TODO : add input for this
let depthMax = 7;
let speed = 1000;
// Toutes les ressources de la page sont complètement chargées.
window.onload = onLoad;


function onLoad() {
    console.log('Processus de chargement du document terminé…');
    document.getElementById('game-over-restart').addEventListener('click', function () {
        document.getElementById('game-over').style.display = 'none';
        init();
    });
    document.getElementById('game-won-restart').addEventListener('click', function () {
        document.getElementById('game-won').style.display = 'none';
        init();
    });
    document.getElementById('ai-start').addEventListener('click', async function () {
        document.getElementById('game-won').style.display = 'none';
        aiInterval = setInterval(function () {
            let matrix = self.getMatrix();
            let myMove = self.getMove(self.createCopy(matrix));
            let rmat = self.moveCells(self.createCopy(matrix), myMove);
            console.log(myMove);
            if (self.isEqualMatrix(rmat, matrix))
                myMove = (Math.floor(Math.random() * 100)) % 4;
            switch (myMove) {
                case 0:
                    console.log("UP");
                    moveUp();
                    break;
                case 1:
                    console.log("RIGHT");
                    moveRight();
                    break;
                case 2:
                    console.log("DOWN");
                    moveDown();
                    break;
                case 3:
                    console.log("LEFT");
                    moveLeft();
                    break;
            }
        }, 100);
    });
    init();
}


/**
 * It initializes the grid, adds an event listener to the keyboard, and inserts two random values in the grid
 */
function init() {
    console.log('Initialisation du jeu…');
    grille = new Array(grilleSize);
    coupNumber = 0;
    score = 0;
    isDelayed = false;
    for (let i = 0; i < grilleSize; i++) {
        grille[i] = new Array(grilleSize);
        for (let j = 0; j < grilleSize; j++) {
            let myBox = {
                value: "", lastInsert: false
            };
            grille[i][j] = Object.create(myBox);
        }
    }
    document.addEventListener('keydown', keyboardAction);

    insertValue(getNewValue(), getEmptyBox());
    insertValue(getNewValue(), getEmptyBox());
    displayGrid();
    updateColor();
}

/**
 * It sets the value of the box at the given coordinate to the given value, and sets the lastInsert property of the box to
 * true
 * @param value - the value to insert
 * @param coordinate - the coordinate of the box where the value is inserted
 */
function insertValue(value, coordinate) {
    grille[coordinate.ligne][coordinate.colonne].value = value;
    grille[coordinate.ligne][coordinate.colonne].lastInsert = true;
}

/**
 * It inserts a value in the first two cells of the first column
 * @param value - the value to insert
 */
function insertTestValue(value) {
    grille[0][0].value = value;
    grille[1][0].lastInsert = true;
    grille[1][0].value = value;
    grille[1][0].lastInsert = true;
}

/**
 * If the key pressed is the left arrow, move left. If the key pressed is the up arrow, move up. If the key pressed is the
 * right arrow, move right. If the key pressed is the down arrow, move down
 * @param event - The event object is a JavaScript object that contains information about the event that occurred.
 */
function keyboardAction(event) {
    if (isDelayed) {
        return;
    }
    isDelayed = true;
    setTimeout(function () {
        isDelayed = false;
        switch (event.keyCode) {
            case 37:
                coupNumber++;
                moveLeft();
                break;
            case 38:
                coupNumber++;
                moveUp();
                break;
            case 39:
                coupNumber++;
                moveRight();
                break;
            case 40:
                coupNumber++;
                moveDown();
                break;
        }
        if (isVictory()) {
            clearInterval(aiInterval);
            let gamewon = document.getElementById('game-won');
            gamewon.style.display = 'block';
        }
        if (isDefeat()) {
            clearInterval(aiInterval)
            let gamelost = document.getElementById('game-over');
            gamelost.style.display = 'block';
        }
    }, 200);
}

/**
 * It moves the boxes up, and if it has moved, it inserts a new value in a random empty box
 */
function moveUp() {
    // get all lines that contains rows.
    let lines = document.getElementsByClassName('row');
    let hasMoved = new Array(grilleSize);
    // for each line
    for (let row = 0; row < grilleSize; row++) {
        // get all boxes of the line
        let actualBox = lines[row].children;
        // for each box
        for (let column = 0; column < grilleSize; column++) {
            // if the box is not empty
            // set time sleep for 1 second
            if (actualBox[column].innerHTML !== "") {
                // Move the box to the most upper empty box or if there is a box with the same value, merge the boxes
                // So get the coordinate of the most upper empty box or the box with the same value
                let [lineCoordinate, box] = getMostUpperEmptyOrMergeBox(row, column);
                hasMoved.push(moveOrMergeBoxUpDown(row, column, lineCoordinate, box, actualBox[column]));
            }
        }
    }

    if (hasMoved.includes(true)) {
        insertValue(getNewValue(), getEmptyBox());
        displayGrid();
    }
}

/**
 * It moves all the boxes down and merges the boxes with the same value
 */
function moveDown() {
    // get all lines that contains rows.
    let lines = document.getElementsByClassName('row');
    let hasMoved = new Array(grilleSize);
    // for each line
    for (let row = grilleSize - 1; row >= 0; row--) {
        // get all boxes of the line
        let actualBox = lines[row].children;
        // for each box
        for (let column = 0; column < grilleSize; column++) {
            // if the box is not empty
            if (actualBox[column].innerHTML !== "") {
                // Move the box to the most down empty box or if there is a box with the same value, merge the boxes
                // So get the coordinate of the most down empty box or the box with the same value
                let [lineCoordinate, box] = getMostDownEmptyOrMergeBox(row, column);
                hasMoved.push(moveOrMergeBoxUpDown(row, column, lineCoordinate, box, actualBox[column]));
            }
        }
    }

    if (hasMoved.includes(true)) {
        insertValue(getNewValue(), getEmptyBox());
        displayGrid();
    }
}

/**
 * It moves the boxes to the left
 */
function moveLeft() {
    let lines = document.getElementsByClassName('row');
    let hasMoved = new Array(grilleSize);
    // for each line
    for (let row = 0; row < grilleSize; row++) {
        // get all boxes of the line
        let actualBox = lines[row].children;
        // for each box
        for (let column = 0; column < grilleSize; column++) {
            // if the box is not empty
            if (actualBox[column].innerHTML !== "") {
                // Move the box to the most left empty box or if there is a box with the same value, merge the boxes
                // So get the coordinate of the most left empty box or the box with the same value
                let [columnCoordinate, box] = getMostLeftEmptyOrMergeBox(row, column);
                hasMoved.push(moveOrMergeBoxLeftRight(row, column, columnCoordinate, box, actualBox[column]));
            }
        }
    }
    if (hasMoved.includes(true)) {
        insertValue(getNewValue(), getEmptyBox());
        displayGrid();
    }
}

/**
 * It moves the boxes to the right
 */
function moveRight() {
    let lines = document.getElementsByClassName('row');
    let hasMoved = new Array(grilleSize);
    // for each line
    for (let row = 0; row < grilleSize; row++) {
        // get all boxes of the line
        let actualBox = lines[row].children;
        // for each box
        for (let column = grilleSize - 1; column >= 0; column--) {
            // if the box is not empty
            if (actualBox[column].innerHTML !== "") {
                // Move the box to the most right empty box or if there is a box with the same value, merge the boxes
                // So get the coordinate of the most right empty box or the box with the same value
                let [columnCoordinate, box] = getMostRightEmptyOrMergeBox(row, column);
                hasMoved.push(moveOrMergeBoxLeftRight(row, column, columnCoordinate, box, actualBox[column]));
            }
        }
    }
    if (hasMoved.includes(true)) {
        insertValue(getNewValue(), getEmptyBox());
        displayGrid();
    }
}

/**
 * La fonction displayGrid() mettra à jour le DOM en fonction de la grille. La dernière case ajoutée
 * sera en rouge. Pour le moment on ne s’occupe pas des autres effets graphiques (couleur des cases,
 * animations, …).
 */
function displayGrid() {
    // Get the divs (corresponding to the rows)
    // each lines is a div and each div contains 4 divs (corresponding to the columns, with class box and id rx-cy)
    let divs = document.getElementsByClassName('row');

    // For each line
    for (let i = 0; i < grilleSize; i++) {
        // For each column
        for (let j = 0; j < grilleSize; j++) {
            let box = divs[i].children[j];
            if (grille[i][j].value !== "") {
                box.innerHTML = grille[i][j].value;
                if (grille[i][j].lastInsert) {
                    box.classList.add('lastInsert');
                } else {
                    box.classList.remove('lastInsert');
                }
            } else {
                box.innerHTML = "";
                box.classList.remove('lastInsert');
            }
        }
    }
    let divScore = document.getElementById('score');
    divScore.innerHTML = "Score : " + score;
}

/**
 * Return 2 90% of the time and 4 10% of the time.
 * @returns A random number between 2 and 4.
 */
function getNewValue() {
    return Math.random() < 0.9 ? 2 : 4;
}

/**
 * It returns a random empty box
 * @returns An object with a random empty box.
 */
function getEmptyBox() {
    let emptyBoxes = [];
    for (let i = 0; i < grilleSize; i++) {
        for (let j = 0; j < grilleSize; j++) {
            if (grille[i][j].value === "") {
                emptyBoxes.push({
                    ligne: i, colonne: j
                });
            }
        }
    }
    return emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
}


// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //

/**
 * It moves the box up or down if it's possible
 * @param actualRow - the row of the box we're currently looking at
 * @param actualColumn - the column of the box we're currently looking at
 * @param lineCoordinate - the coordinate of the line where the box is located
 * @param mostNearBox - the box that is the closest to the actual box
 * @param actualBox - the box that is currently being checked
 * @returns A boolean value.
 */
function moveOrMergeBoxUpDown(actualRow, actualColumn, lineCoordinate, mostNearBox, actualBox) {
    let hasMoved = false;
    if (actualRow !== lineCoordinate) {
        if (mostNearBox.innerHTML === "") {
            // Move the actual box to the most near empty box
            // and move the most near box to the actual box
            // Create an animation for the movement
            // the animation from the actual box to the most near box

            animate(actualBox, mostNearBox);
            // wait the end of the animation to move the box
            mostNearBox.innerHTML = actualBox.innerHTML;
            actualBox.innerHTML = "";
            hasMoved = true;
            grille[lineCoordinate][actualColumn] = {
                value: parseInt(mostNearBox.innerHTML), lastInsert: false
            };
            grille[actualRow][actualColumn] = {
                value: "", lastInsert: false
            };
            updateColor();
        } else if (mostNearBox.innerHTML === actualBox.innerHTML) {
            animate(actualBox, mostNearBox);
            mostNearBox.innerHTML = parseInt(mostNearBox.innerHTML) + parseInt(actualBox.innerHTML);
            score += parseInt(mostNearBox.innerHTML);
            actualBox.innerHTML = "";
            hasMoved = true;
            grille[lineCoordinate][actualColumn] = {
                value: parseInt(mostNearBox.innerHTML), lastInsert: false
            };
            grille[actualRow][actualColumn] = {
                value: "", lastInsert: false
            }
            updateColor();
        }
    }
    return hasMoved;
}


/**
 * It moves or merges a box to the left or right
 * @param actualRow - the row of the box we're currently looking at
 * @param actualColumn - the column of the box we're currently looking at
 * @param columnCoordinate - the column coordinate of the box that is the most near to the actual box
 * @param mostNearBox - the box that is the closest to the actual box
 * @param actualBox - the box that is currently being moved
 * @returns A boolean value.
 */
function moveOrMergeBoxLeftRight(actualRow, actualColumn, columnCoordinate, mostNearBox, actualBox) {
    let hasMoved = false;
    if (actualColumn !== columnCoordinate) {
        if (mostNearBox.innerHTML === "") {
            animate(actualBox, mostNearBox)
            // wait the end of the animation to move the box
            mostNearBox.innerHTML = actualBox.innerHTML;
            actualBox.innerHTML = "";
            hasMoved = true;
            grille[actualRow][columnCoordinate] = {
                value: parseInt(mostNearBox.innerHTML), lastInsert: false
            };
            grille[actualRow][actualColumn] = {
                value: "", lastInsert: false
            }
            updateColor();
        } else if (mostNearBox.innerHTML === actualBox.innerHTML) {
            animate(actualBox, mostNearBox);
            // wait the end of the animation to move the box
            mostNearBox.innerHTML = parseInt(mostNearBox.innerHTML) + parseInt(actualBox.innerHTML);
            score += parseInt(mostNearBox.innerHTML);
            actualBox.innerHTML = "";
            hasMoved = true;
            grille[actualRow][columnCoordinate] = {
                value: parseInt(mostNearBox.innerHTML), lastInsert: false
            };
            grille[actualRow][actualColumn] = {
                value: "", lastInsert: false
            }
            updateColor();
        }
    }
    return hasMoved;
}


// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //

/**
 * It returns the most upper empty box in a column
 * @param line - the line of the box that was clicked
 * @param column - the column number of the box that was clicked
 * @returns An array with the line of the most upper empty box and the empty box itself.
 */
function getMostUpperEmptyOrMergeBox(line, column) {
    let lines = document.getElementsByClassName('row');
    let box = null;
    let mostUpperEmptyBoxLine = line;
    for (let i = line - 1; i >= 0; i--) {
        if (lines[i].children[column].innerHTML === "") {
            box = lines[i].children[column];
            mostUpperEmptyBoxLine = i;
        } else if (lines[i].children[column].innerHTML === lines[line].children[column].innerHTML) {
            box = lines[i].children[column];
            mostUpperEmptyBoxLine = i;
            break;
        } else {
            break;
        }
    }
    return [mostUpperEmptyBoxLine, box];
}

/**
 * It returns the most down empty box of a column
 * @param line - the line of the box that we want to check
 * @param column - the column number of the box that was clicked
 * @returns An array with the line of the most down empty box and the empty box.
 */
function getMostDownEmptyOrMergeBox(line, column) {
    let lines = document.getElementsByClassName('row');
    let box = null;
    let mostDownEmptyBoxLine = line;
    for (let i = line + 1; i < grilleSize; i++) {
        if (lines[i].children[column].innerHTML === "") {
            box = lines[i].children[column];
            mostDownEmptyBoxLine = i;
        } else if (lines[i].children[column].innerHTML === lines[line].children[column].innerHTML) {
            box = lines[i].children[column];
            mostDownEmptyBoxLine = i;
            break;
        } else {
            break;
        }
    }
    return [mostDownEmptyBoxLine, box];
}

/**
 * It returns the most left empty box in a given line
 * @param line - the line of the box that was clicked
 * @param column - the column number of the box that was clicked
 * @returns An array with the column number of the most left empty box and the empty box itself.
 */
function getMostLeftEmptyOrMergeBox(line, column) {
    let lines = document.getElementsByClassName('row');
    let box = null;
    let columnCoordinate = column;
    for (let i = column - 1; i >= 0; i--) {
        if (lines[line].children[i].innerHTML === "") {
            box = lines[line].children[i];
            columnCoordinate = i;
        } else if (lines[line].children[i].innerHTML === lines[line].children[column].innerHTML) {
            box = lines[line].children[i];
            columnCoordinate = i;
            break;
        } else {
            break;
        }
    }
    return [columnCoordinate, box];
}

/**
 * It returns the most right empty box of a given line
 * @param line - the line of the box that we want to check
 * @param column - the column number of the box that is clicked
 * @returns An array with the column number of the most right empty box and the empty box itself.
 */
function getMostRightEmptyOrMergeBox(line, column) {
    let lines = document.getElementsByClassName('row');
    let box = null;
    let columnCoordinate = column;
    for (let i = column + 1; i < grilleSize; i++) {
        if (lines[line].children[i].innerHTML === "") {
            box = lines[line].children[i];
            columnCoordinate = i;
        } else if (lines[line].children[i].innerHTML === lines[line].children[column].innerHTML) {
            box = lines[line].children[i];
            columnCoordinate = i;
            break;
        } else {
            break;
        }
    }
    return [columnCoordinate, box];
}

// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //


/**
 * Les fonctions tampTowards{Left,Right}(row) ou tampTowards{Up,Down}(column)
 * déplaceront l’ensemble des éléments de la ligne (ou de la colonne) dans la direction spécifiées
 * pour supprimer les cases vides. Il n’y a pas de fusion de nombre dans ce cas.
 * @param row
 */
function tampTowardsLeft(row) {

}

/**
 * Les fonctions tampTowards{Left,Right}(row) ou tampTowards{Up,Down}(column)
 * déplaceront l’ensemble des éléments de la ligne (ou de la colonne) dans la direction spécifiées
 * pour supprimer les cases vides. Il n’y a pas de fusion de nombre dans ce cas.
 * @param row
 */
function tampTowardsRight(row) {

}

/**
 * Les fonctions tampTowards{Left,Right}(row) ou tampTowards{Up,Down}(column)
 * déplaceront l’ensemble des éléments de la ligne (ou de la colonne) dans la direction spécifiées
 * pour supprimer les cases vides. Il n’y a pas de fusion de nombre dans ce cas.
 * @param column
 */
function tampTowardsUp(column) {

}

/**
 * Les fonctions tampTowards{Left,Right}(row) ou tampTowards{Up,Down}(column)
 * déplaceront l’ensemble des éléments de la ligne (ou de la colonne) dans la direction spécifiées
 * pour supprimer les cases vides. Il n’y a pas de fusion de nombre dans ce cas.
 * @param column
 */
function tampTowardsDown(column) {

}

/**
 * Les fonctions mergeTo{Left,Right}(row) ou mergeTo{Up,Down}(column) fusionneront les
 * éléments de même valeur qui sont cote à cote. En respectant la direction spécifiée.
 * Attention, ici on ne déplace pas de cases, certaines doublent de valeur, d’autres deviennent vide.
 * @param row
 */
function mergeToLeft(row) {

}

/**
 * Les fonctions mergeTo{Left,Right}(row) ou mergeTo{Up,Down}(column) fusionneront les
 * éléments de même valeur qui sont cote à cote. En respectant la direction spécifiée.
 * Attention, ici on ne déplace pas de cases, certaines doublent de valeur, d’autres deviennent vide.
 * @param row
 */
function mergeToRight(row) {

}

/**
 * Les fonctions mergeTo{Left,Right}(row) ou mergeTo{Up,Down}(column) fusionneront les
 * éléments de même valeur qui sont cote à cote. En respectant la direction spécifiée.
 * Attention, ici on ne déplace pas de cases, certaines doublent de valeur, d’autres deviennent vide.
 * @param column
 */
function mergeToUp(column) {

}

/**
 * Les fonctions mergeTo{Left,Right}(row) ou mergeTo{Up,Down}(column) fusionneront les
 * éléments de même valeur qui sont cote à cote. En respectant la direction spécifiée.
 * Attention, ici on ne déplace pas de cases, certaines doublent de valeur, d’autres deviennent vide.
 * @param column
 */
function mergeToDown(column) {

}

/**
 * Les fonctions isEmptyRow(row) et isEmptyColumn(column) retourne vrai si la ligne (ou la
 * colonne) ne contient que des éléments de valeur vide
 * @param row - the row number of the box that is clicked
 */
function isEmptyRow(row) {
    let divs = document.getElementsByClassName('row');
    let empty = true;
    for (let i = 0; i < grilleSize; i++) {
        if (divs[row].children[i].innerHTML !== "") {
            empty = false;
        }
    }
    return empty;
}

/**
 * Les fonctions isEmptyRow(row) et isEmptyColumn(column) retourne vrai si la ligne (ou la
 * colonne) ne contient que des éléments de valeur vide
 * @param column - the column number of the box that is clicked
 */

function isEmptyColumn(column) {
    let divs = document.getElementsByClassName('row');
    let empty = true;
    for (let i = 0; i < grilleSize; i++) {
        if (divs[i].children[column].innerHTML !== "") {
            empty = false;
        }
    }
    return empty;
}

/**
 * Ajoutez une fonction isVictory() qui retourne vrai si le joueur a obtenu une case d’une
 * valeur égale à 2048 pour la première fois.
 * @returns {boolean} true si la partie est gagnée, false sinon
 */
function isVictory() {
    let lines = document.getElementsByClassName('row');
    let victory = false;
    // for each row
    for (let i = 0; i < grilleSize; i++) {
        // for each column
        for (let j = 0; j < grilleSize; j++) {
            if (lines[i].children[j].innerHTML === "2048") {
                console.log("Victory");
                victory = true;
            }
        }
    }
    return victory;
}

/**
 * Ajoutez une fonction isDefeat() qui retourne vrai s’il n’y a plus de case vide dans la grille
 * et si aucun des déplacements ne provoque une fusion.
 * @returns {boolean} true si la partie est perdue, false sinon
 */
function isDefeat() {
    // for each row in grille
    let defeat = true;
    for (let i = 0; i < grilleSize; i++) {
        // for each column in grille
        for (let j = 0; j < grilleSize; j++) {
            // if there is an empty case
            if (grille[i][j].value === "") {
                defeat = false;
            }
            // if there is a case that can be merged
            if (i < grilleSize - 1 && grille[i][j].value === grille[i + 1][j].value) {
                defeat = false;
            }
            if (j < grilleSize - 1 && grille[i][j].value === grille[i][j + 1].value) {
                defeat = false;
            }
        }
    }
    return defeat;
}

/**
 * Ajoutez une fonction, qui lors de la mise à jour de l’affichage, modifie la couleur (via le
 * css) dans case en fonction de leur valeur.
 */
function updateColor() {
    let lines = document.getElementsByClassName('row');
    // for each row
    for (let i = 0; i < grilleSize; i++) {
        // for each column
        for (let j = 0; j < grilleSize; j++) {
            let box = lines[i].children[j];
            box.classList.remove("color-2");
            box.classList.remove("color-4");
            box.classList.remove("color-8");
            box.classList.remove("color-16");
            box.classList.remove("color-32");
            box.classList.remove("color-64");
            box.classList.remove("color-128");
            box.classList.remove("color-256");
            box.classList.remove("color-512");
            box.classList.remove("color-1024");
            box.classList.remove("color-2048");
            if (box.innerHTML !== "") {
                box.classList.add("color-" + box.innerHTML);
            }
        }
    }
}

/**
 * Ajoutez une fonction, qui lors de la mise à jour de l’affichage, modifie la couleur (via le
 * css) dans case en fonction de leur valeur.
 * @param actualBox - la case qui va être déplacée
 * @param mostNearBox - la case la plus proche de la case qui va être déplacée
 */
function animate(actualBox, mostNearBox) {
    let styleActualBox = window.getComputedStyle(actualBox);
    let styleMostNearBox = window.getComputedStyle(mostNearBox);
    let topActualBox = styleActualBox.getPropertyValue('top');
    let leftActualBox = styleActualBox.getPropertyValue('left');
    let topMostNearBox = styleMostNearBox.getPropertyValue('top');
    let leftMostNearBox = styleMostNearBox.getPropertyValue('left');

    mostNearBox.animate([{
        top: topActualBox, left: leftActualBox, zIndex: 10
    }, {
        top: topMostNearBox, left: leftMostNearBox, zIndex: 10
    }], {
        duration: 200, iterations: 1
    });
}

/******************************************/
/******************************************/
/*    THE AI CODE STARTS FROM HERE        */
/* source : https://pastebin.com/Ebu3mQRL */
/******************************************/
/******************************************/

/*  0:Up
    1:Right
    2:Down
    3:Left
*/

function isValid(x, y) {
    return !(x < 0 || x > 3 || y < 0 || y > 3);

}

function moveCells(matrix, move) {
    let dx = [-1, 0, 1, 0];
    let dy = [0, 1, 0, -1];
    let nx, ny;
    for (let k = 0; k < 3; k++) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                nx = i + dx[move];
                ny = j + dy[move];
                if (self.isValid(nx, ny)) {
                    if (matrix[nx][ny] == 0) {
                        matrix[nx][ny] = matrix[i][j];
                        matrix[i][j] = 0;
                    }
                }
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            nx = i + dx[move];
            ny = j + dy[move];
            if (self.isValid(nx, ny)) {
                if (matrix[i][j] == matrix[nx][ny]) {
                    matrix[nx][ny] *= -2;
                    matrix[i][j] = 0;
                }
            }
        }
    }
    for (let k = 0; k < 3; k++) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (matrix[i][j] < 0)
                    matrix[i][j] *= -1;
                nx = i + dx[move];
                ny = j + dy[move];
                if (self.isValid(nx, ny)) {
                    if (matrix[nx][ny] == 0) {
                        matrix[nx][ny] = matrix[i][j];
                        matrix[i][j] = 0;
                    }
                }
            }
        }
    }
    return matrix;
}

function evaluateMatrix(matrix) {
    /* Count Number of Free Spaces */
    let cc = 0;
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++) {
            if (matrix[i][j] == 0)
                cc += 100;
            else
                cc += matrix[i][j] * matrix[i][j];
        }

    return cc;
}

function printMatrix(matrix) {
    for (let i = 0; i < 4; i++) {
        let str = ""
        for (let j = 0; j < 4; j++)
            str += matrix[i][j] + " ";
        console.log(str)
    }
    console.log("******************************");
}

function findFreeCell(matrix) {
    let i, j, k = 0;
    do {
        i = (Math.floor(Math.random() * 100)) % 4;
        j = (Math.floor(Math.random() * 100)) % 4;
        k++;
    } while (matrix[i][j] != 0 && k != 500);
    if (matrix[i][j] != 0)
        for (i = 0; i < 4; i++)
            for (j = 0; j < 4; j++)
                if (matrix[i][j] == 0)
                    return ({x: i, y: j});

    return ({x: i, y: j});
}

function isEqualMatrix(m1, m2) {
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            if (m1[i][j] != m2[i][j])
                return false;
    return true;
}

function minMax(matrix, move, depth) {
    if (depth == depthMax)
        return 0;
    let rmatrix = self.moveCells(self.createCopy(matrix), move);
    let areSame = self.isEqualMatrix(rmatrix, matrix);
    let score = self.evaluateMatrix(rmatrix);

    if (areSame == true)
        return score - 1;
    let maxVal = -1000, val, ret;
    let freeCell = self.findFreeCell(rmatrix);
    if (freeCell.x == 4 || freeCell.y == 4)
        console.log("YES VALUE IS 4 || " + freeCell.x + " | " + freeCell.y);
    rmatrix[freeCell.x][freeCell.y] = 2;
    for (let x = 0; x < 4; x++) {
        val = this.minMax(self.createCopy(rmatrix), x, depth + 1);
        if (val > maxVal)
            maxVal = val;
    }
    return (score + maxVal);
}

/**
 *     console.log("depth = " + depth);
 *     if (depth == depthMax)
 *         return 0;
 *     let rmatrix = self.moveCells(self.createCopy(matrix), move);
 *     let areSame = self.isEqualMatrix(rmatrix, matrix);
 *     let score = self.evaluateMatrix(rmatrix);
 *
 *     if (areSame == true)
 *         return score - 1;
 *     let maxVal = -1000, val, ret;
 *     let freeCell = self.findFreeCell(rmatrix);
 *     if (freeCell.x == 4 || freeCell.y == 4)
 *         console.log("YES VALUE IS 4 || " + freeCell.x + " | " + freeCell.y);
 *     rmatrix[freeCell.x][freeCell.y] = 2;
 *     for (let x = 0; x < 4; x++) {
 *         // use alpha-beta pruning
 *         if (alpha >= beta) break;
 *         val = this.alphaBeta(self.createCopy(rmatrix), x, depth + 1, alpha, beta);
 *         if (val > maxVal) maxVal = val;
 *         alpha = Math.max(alpha, maxVal);
 *     }
 *     return (score + maxVal);
 * }
 */
function getMove(matrix) {

    let maxVal = 0, val, ret;
    for (let x = 0; x < 4; x++) {
        val = this.minMax(self.createCopy(matrix), x, 0);
        // console.log("Score for "+ x + ":" + val )
        if (val > maxVal) {
            maxVal = val;
            ret = x;
        }
    }
    return ret;
}

function getMatrix() {
    let matrix = [];
    for (let i = 0; i < 4; i++) {
        let row = [];
        for (let j = 0; j < 4; j++) {
            console.log(grille)
            let tile = grille[i][j];
            if (tile == null)
                row.push(0);
            else
                row.push(tile["value"]);
        }
        matrix.push(row);
    }
    return matrix;
}

function createCopy(matrix) {
    let ret = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            ret[i][j] = matrix[i][j].valueOf();
    return ret;
}