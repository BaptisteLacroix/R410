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
 * La fonction init() :
 * - Créera la grille, l’initialisera (chaque case aura pour valeur une chaîne vide).
 * - Abonnera la fenêtre à l’action « appui sur une touche du clavier » (la fonction appelée
 * sera keyboardAction()).
 * - Ajoutera 2 valeurs aléatoirement dans la grille.
 * - Affichera la grille via la fonction displayGrid().
 * Chaque case de la grille sera modélisée par un objet :
 * // myBox object initializer
 *     const myBox = {
 *         value: "",
 *         lastInsert: false
 *     };
 *     // The last Box
 *     let lastBox = Object.create(myBox);
 * ayant une valeur (value) et un booléen (lastInsert, « false » à l’initialisation) qui servira à indiquer
 * si la valeur contenue est une nouvelle valeur insérée dans la grille par la fonction insertValue().
 */
function init() {
    console.log('Initialisation du jeu…');
    grille = new Array(grilleSize);
    for (let i = 0; i < grilleSize; i++) {
        grille[i] = new Array(grilleSize);
        for (let j = 0; j < grilleSize; j++) {
            let myBox = {
                value: "",
                lastInsert: false
            };
            grille[i][j] = Object.create(myBox);
        }
    }
    document.addEventListener('keydown', keybaordAction);

    insertValue(getNewValue(), getEmptyBox());
    insertValue(getNewValue(), getEmptyBox());

    console.log(grille);

    displayGrid();
}

/**
 * L’ajout d’une valeur dans la grille sera faites par la fonction insertValue(value, coordinate)
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
 * La fonction keyboardAction() appelera les fonctions moveUp(), moveDown(), moveLeft() et
 * moveRight() en fonction de la touche de direction pressée
 */
function keybaordAction(event) {
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
 * Chacune des fonctions move{Up,Down}() fonctionnera de la fonction suivante :
 * - Pour toutes les lignes (ou les colonnes en fonction du sens),
 * - si la ligne courante (ou la colonne) n’est pas vide :
 * o tasser les cases dans le sens demandé,
 * o fusionner les cases de même valeur,
 * o tasser à nouveau les cases pour supprimer les blancs générés par la fonction de
 * fusion.
 * - S’il y a eu au moins un mouvement ou une fusion dans les actions précédentes
 * o ajouter une nouvelle valeur dans la grille,
 * o afficher la grille
 */
function moveUp() {

}

/**
 * Chacune des fonctions move{Up,Down}() fonctionnera de la fonction suivante :
 * - Pour toutes les lignes (ou les colonnes en fonction du sens),
 * - si la ligne courante (ou la colonne) n’est pas vide :
 * o tasser les cases dans le sens demandé,
 * o fusionner les cases de même valeur,
 * o tasser à nouveau les cases pour supprimer les blancs générés par la fonction de
 * fusion.
 * - S’il y a eu au moins un mouvement ou une fusion dans les actions précédentes
 * o ajouter une nouvelle valeur dans la grille,
 * o afficher la grille
 */
function moveDown() {

}

function moveLeft() {

}

function moveRight() {

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
 * la valeur sera déterminée par une fonction getNewValue() qui retournera un 2 avec une
 * probabilité de 0.9 et un 4 dans le reste des cas. La fonction Math.random() vous retourne
 * une valeur dans l’intervalle [0 ; 1[.
 */
function getNewValue() {
    return Math.random() < 0.9 ? 2 : 4;
}

/**
 * la coordonnée sera un objet composé de deux attributs, ligne et colonne. Elle
 * correspondra à une case vide de la grille, déterminée aléatoirement par la fonction
 * getEmptyBox().
 */
function getEmptyBox() {
    let emptyBoxes = [];
    for (let i = 0; i < grilleSize; i++) {
        for (let j = 0; j < grilleSize; j++) {
            if (grille[i][j].value === "") {
                emptyBoxes.push({
                    ligne: i,
                    colonne: j
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