"use strict";

const grilleSize = 4;
let grille;
let coupNumber = 0;

function onLoad() {
    console.log('Processus de chargement du document terminé…');
    init();
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('animationend', () => {
            box.classList.remove('move');
        });
    });
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
    updateColor();
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
            coupNumber++;
            moveLeft();
            isVictory();
            break;
        case 38:
            coupNumber++;
            moveUp();
            isVictory();
            break;
        case 39:
            coupNumber++;
            moveRight();
            isVictory();
            break;
        case 40:
            coupNumber++;
            moveDown();
            isVictory();
            break;
    }
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
            actualBox.animate([{top: actualBox.style.top}, {top: mostNearBox.style.top}], {
                duration: 100, iterations: 1
            });

            let topActualBox = actualBox.style.top;
            mostNearBox.animate([{top: mostNearBox.style.top}, {top: topActualBox}], {
                duration: 100, iterations: 1
            })
            mostNearBox.innerHTML = actualBox.innerHTML;
            actualBox.innerHTML = "";
            hasMoved = true;
            grille[lineCoordinate][actualColumn] = {
                value: parseInt(mostNearBox.innerHTML), lastInsert: false
            };
            grille[actualRow][actualColumn] = {
                value: "", lastInsert: false
            }
        } else if (mostNearBox.innerHTML === actualBox.innerHTML) {
            // Move the actual box to the most near empty box
            // and move the most near box to the actual box
            // Create an animation for the movement
            actualBox.animate([{top: actualBox.style.top}, {top: mostNearBox.style.top}], {
                duration: 100, iterations: 1
            });

            let topActualBox = actualBox.style.top;
            mostNearBox.animate([{top: mostNearBox.style.top}, {top: topActualBox}], {
                duration: 100, iterations: 1
            })
            mostNearBox.innerHTML = parseInt(mostNearBox.innerHTML) + parseInt(actualBox.innerHTML);
            actualBox.innerHTML = "";
            hasMoved = true;
            grille[lineCoordinate][actualColumn] = {
                value: parseInt(mostNearBox.innerHTML), lastInsert: false
            };
            grille[actualRow][actualColumn] = {
                value: "", lastInsert: false
            }
        }
    }
    updateColor();
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
            mostNearBox.innerHTML = actualBox.innerHTML;
            actualBox.innerHTML = "";
            hasMoved = true;
            grille[actualRow][columnCoordinate] = {
                value: parseInt(mostNearBox.innerHTML), lastInsert: false
            };
            grille[actualRow][actualColumn] = {
                value: "", lastInsert: false
            }
        } else if (mostNearBox.innerHTML === actualBox.innerHTML) {
            mostNearBox.innerHTML = parseInt(mostNearBox.innerHTML) + parseInt(actualBox.innerHTML);
            actualBox.innerHTML = "";
            hasMoved = true;
            grille[actualRow][columnCoordinate] = {
                value: parseInt(mostNearBox.innerHTML), lastInsert: false
            };
            grille[actualRow][actualColumn] = {
                value: "", lastInsert: false
            }
        }
    }
    updateColor();
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

/**
 * Ajoutez une fonction isVictory() qui retourne vrai si le joueur a obtenu une case d’une
 * valeur égale à 2048 pour la première fois.
 * @returns {boolean}
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
 * @returns {boolean}
 */
function isDefeat() {
    let lines = document.getElementsByClassName('row');
    let defeat = true;
    // for each row
    for (let i = 0; i < grilleSize; i++) {
        // for each column
        for (let j = 0; j < grilleSize; j++) {
            if (lines[i].children[j].innerHTML === "") {
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
 * Ajoutez une fonction qui permet d’animer le déplacement des cases.
 */
function animate() {

}