"use strict";

const grilleSize = 4;
let grille;

function onLoad() {
    console.log('Processus de chargement du document terminé…');
    init();
}

// Toute les ressources de la page sont complètement chargées.
window.onload = onLoad;


/**
 * It initializes the grid, adds an event listener to the keyboard, and inserts two random values in the grid
 */
function init() {
    console.log('Initialisation du jeu…');
    grille = new Array(grilleSize);
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
    // insertTestValue(2);

    displayGrid();
}


/**
 * It sets the value of the box at the given coordinate to the given value, and sets the lastInsert property of the box to
 * true
 * @param value - the value to insert
 * @param coordinate - the coordinate of the box where the value is inserted
 */
function insertValue(value, coordinate) {
    // Set all lastInsert to false and remove the class lastInsert
    for (let i = 0; i < grilleSize; i++) {
        for (let j = 0; j < grilleSize; j++) {
            grille[i][j].lastInsert = false;
            let divs = document.getElementsByClassName('row');
            // For each line
            for (let i = 0; i < grilleSize; i++) {
                // For each column
                for (let j = 0; j < grilleSize; j++) {
                    let box = divs[i].children[j];
                    box.classList.remove('lastInsert');
                }
            }
        }
    }

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
    switch (event.keyCode) {
        case 37:
            moveLeft();
            break;
        case 38:
            moveUp();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            moveDown();
            break;
    }
}

/**
 * It moves the boxes up, and if it has moved, it inserts a new value in a random empty box
 */
function moveUp() {
    // get all lines that contains rows.
    let lines = document.getElementsByClassName('row');
    let hasMoved = false;
    // for each line
    for (let i = 0; i < grilleSize; i++) {
        // get all boxes of the line
        let actualBox = lines[i].children;
        // for each box
        for (let j = 0; j < grilleSize; j++) {
            // if the box is not empty
            if (actualBox[j].innerHTML !== "") {
                // Move the box to the most upper empty box
                // get the most upper empty box from all the lines at the same column
                let [line, emptyBox] = getMostUpperEmptyBox(i, j);
                // if there is an empty box and just above the emptybox there is a bow with the same value
                if (line !== 0) {
                    line = line - 1;
                }
                hasMoved = moveBox(lines, line, i, j, actualBox, emptyBox, hasMoved);
            }
        }
    }

    if (hasMoved) {
        insertValue(getNewValue(), getEmptyBox());
        displayGrid();
    }
}

/**
 * It returns the most upper empty box in a column
 * @param line - the line of the box that was clicked
 * @param column - the column number of the box that was clicked
 * @returns An array with the line of the most upper empty box and the empty box itself.
 */
function getMostUpperEmptyBox(line, column) {
    let lines = document.getElementsByClassName('row');
    let emptyBox = null;
    let mostUpperEmptyBoxLine = line;
    for (let i = line; i >= 0; i--) {
        if (lines[i].children[column].innerHTML === "") {
            emptyBox = lines[i].children[column];
            mostUpperEmptyBoxLine = i;
        }
    }
    return [mostUpperEmptyBoxLine, emptyBox];
}

/**
 * It moves all the boxes down and merges the boxes with the same value
 */
function moveDown() {
    // get all lines that contains rows.
    let lines = document.getElementsByClassName('row');
    let hasMoved = false;
    // for each line
    for (let i = grilleSize - 1; i >= 0; i--) {
        // get all boxes of the line
        let actualBox = lines[i].children;
        // for each box
        for (let j = 0; j < grilleSize; j++) {
            // if the box is not empty
            if (actualBox[j].innerHTML !== "") {
                // Move the box to the most down empty box
                // get the most down empty box from all the lines at the same column
                let [line, emptyBox] = getMostDownEmptyBox(i, j);
                // if there is an empty box and just above the emptybox there is a bow with the same value
                if (line !== grilleSize - 1) {
                    line = line + 1;
                }
                hasMoved = moveBox(lines, line, i, j, actualBox, emptyBox, hasMoved);
            }
        }
    }

    if (hasMoved) {
        insertValue(getNewValue(), getEmptyBox());
        displayGrid();
    }
}

/**
 * It returns the most down empty box of a column
 * @param line - the line of the box that we want to check
 * @param column - the column number of the box that was clicked
 * @returns An array with the line of the most down empty box and the empty box.
 */
function getMostDownEmptyBox(line, column) {
    let lines = document.getElementsByClassName('row');
    let emptyBox = null;
    let mostDownEmptyBoxLine = line;
    for (let i = line; i < grilleSize; i++) {
        if (lines[i].children[column].innerHTML === "") {
            emptyBox = lines[i].children[column];
            mostDownEmptyBoxLine = i;
        }
    }
    return [mostDownEmptyBoxLine, emptyBox];
}

/**
 * It moves the boxes to the left
 */
function moveLeft() {
    let lines = document.getElementsByClassName('row');
    let hasMoved = false;
    // for each line
    for (let i = 0; i < grilleSize; i++) {
        // get all boxes of the line
        let actualBox = lines[i].children;
        // for each box
        for (let j = 0; j < grilleSize; j++) {
            // if the box is not empty
            if (actualBox[j].innerHTML !== "") {
                // Move the box to the most left empty box
                // get the most left empty box from all the lines at the same column
                let [column, emptyBox] = getMostLeftEmptyBox(i, j);
                // if there is an empty box and just above the emptybox there is a bow with the same value
                if (column !== 0) {
                    column = column - 1;
                }
                hasMoved = moveBox(lines, column, i, j, actualBox, emptyBox, hasMoved);
            }
        }
    }
    if (hasMoved) {
        insertValue(getNewValue(), getEmptyBox());
        displayGrid();
    }
}

/**
 * It returns the most left empty box in a given line
 * @param line - the line of the box that was clicked
 * @param column - the column number of the box that was clicked
 * @returns An array with the column number of the most left empty box and the empty box itself.
 */
function getMostLeftEmptyBox(line, column) {
    let lines = document.getElementsByClassName('row');
    let emptyBox = null;
    let mostLeftEmptyBoxColumn = column;
    for (let i = column; i >= 0; i--) {
        if (lines[line].children[i].innerHTML === "") {
            emptyBox = lines[line].children[i];
            mostLeftEmptyBoxColumn = i;
        }
    }
    return [mostLeftEmptyBoxColumn, emptyBox];
}

/**
 * It moves the boxes to the right
 */
function moveRight() {
    let lines = document.getElementsByClassName('row');
    let hasMoved = false;
    // for each line
    for (let i = grilleSize - 1; i >= 0; i--) {
        // get all boxes of the line
        let actualBox = lines[i].children;
        // for each box
        for (let j = grilleSize - 1; j >= 0; j--) {
            // if the box is not empty
            if (actualBox[j].innerHTML !== "") {
                console.log(actualBox[j].innerHTML)
                // Move the box to the most right empty box
                // get the most right empty box from all the lines at the same column
                let [column, emptyBox] = getMostRightEmptyBox(i, j);
                // if there is an empty box and just above the emptybox there is a bow with the same value
                if (column !== grilleSize - 1) {
                    column = column + 1;
                }
                hasMoved = moveBox(lines, column, i, j, actualBox, emptyBox, hasMoved);
            }
        }
    }
    if (hasMoved) {
        insertValue(getNewValue(), getEmptyBox());
        displayGrid();
    }
}

/**
 * It returns the most right empty box of a given line
 * @param line - the line of the box that we want to check
 * @param column - the column number of the box that is clicked
 * @returns An array with the column number of the most right empty box and the empty box itself.
 */
function getMostRightEmptyBox(line, column) {
    let lines = document.getElementsByClassName('row');
    let emptyBox = null;
    let mostRightEmptyBoxColumn = column;
    for (let i = column; i < grilleSize; i++) {
        if (lines[line].children[i].innerHTML === "") {
            emptyBox = lines[line].children[i];
            mostRightEmptyBoxColumn = i;
        }
    }
    return [mostRightEmptyBoxColumn, emptyBox];
}


/**
 * It moves the box to the empty box if there is one, or it fuses the box with the box above if it's the same number
 * @param lines - the array of lines
 * @param line - the line above the actual box
 * @param i - the line we are currently on
 * @param j - the index of the box we're currently looking at
 * @param acutalBoxes - the boxes of the line we are currently on
 * @param emptyBox - the first empty box found in the line above
 * @param hasMoved - a boolean that will be true if the box has moved
 * @returns the value of hasMoved.
 */
function moveBox(lines, line, i, j, acutalBoxes, emptyBox, hasMoved) {
    if (line !== i && lines[line].children[j].innerHTML === acutalBoxes[j].innerHTML) {
        // fusion the actual box with the line above
        let caseAbove = lines[line].children[j];
        caseAbove.innerHTML = parseInt(caseAbove.innerHTML) + parseInt(acutalBoxes[j].innerHTML);
        // move the box to the empty box
        acutalBoxes[j].innerHTML = "";
        // update the grid : grille
        let myBox = {
            value: caseAbove.innerHTML, lastInsert: false
        };
        grille[line][j] = Object.create(myBox);
        myBox = {
            value: "", lastInsert: false
        }
        grille[i][j] = Object.create(myBox);
        hasMoved = true;
    }
    // else if there is an empty box
    else if (emptyBox !== null) {
        // move the box to the empty box
        emptyBox.innerHTML = acutalBoxes[j].innerHTML;
        acutalBoxes[j].innerHTML = "";
        // update the grid : grille
        let myBox = {
            value: emptyBox.innerHTML, lastInsert: false
        }
        grille[line][j] = Object.create(myBox);
        myBox = {
            value: "", lastInsert: false
        }
        grille[i][j] = Object.create(myBox);
        hasMoved = true;
    }
    return hasMoved;
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
 * @param row
 */
function isEmptyRow(row) {

}

/**
 * Les fonctions isEmptyRow(row) et isEmptyColumn(column) retourne vrai si la ligne (ou la
 * colonne) ne contient que des éléments de valeur vide
 * @param column
 */

function isEmptyColumn(column) {

}