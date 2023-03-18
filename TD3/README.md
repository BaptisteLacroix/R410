# M413 - TD2 : Réponses aux Questions

## Exercice	1 : Le	Jeux	de	Taquin (obligatoire)

Pour cet exercice vous devez partir de la page XHTML5 « taquin.html » et du fichier CSS
« css/taquin.css » fournis. Dans un premier temps, aucun ces deux éléments ne pourra être
modifié, seul le fichier JavaScript « taquin.js » le sera.
Vous trouverez le descriptif du Jeux de Taquin à l’URL suivante :
https://fr.wikipedia.org/wiki/Taquin
Bien lire l’ensemble des consignes avant de commencer à coder.
Pour cet exercice vous ne devrez pas utiliser les méthodes getElementByXY() et
getElementsByYZ() !
A vous de trouver d’autres solutions…
Complétez la fonction onLoad() qui ajoute de manière propre un écouteur sur l’évènement
« click » pour chaque élément HTML de type <div> étant dans le classe CSS « box ».

Ecrivez une fonction selection( event) qui échangera la position de la case vide avec la case sur
laquelle on vient de cliquer si et seulement si, ces deux cases ont un coté commun.
Pensez à utiliser l’objet JavaScript Math.
Vous n’avez pas le droit, pour le moment d’écrire d’autres fonctions.

````javascript
"use strict";

function onLoad() {
    console.log('Processus de chargement du document terminé…');
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
        let temp = div.innerHTML;
        div.innerHTML = emptyBox.innerHTML;
        emptyBox.innerHTML = temp;

        // Set class .empty to the clicked box
        div.classList.add('empty');
        // And reove .empty from the empty box
        emptyBox.classList.remove('empty');
    }
}
````

- Que pouvez-vous dire de l'architecture de l'application ?

L'architecture de l'application est très simple, il y a une fonction qui est appelée au chargement de la page,
cette fonction ajoute un écouteur sur l'évènement click sur chaque élément HTML de type div qui a la classe CSS box.
Lorsque l'utilisateur clique sur un élément, la fonction selection est appelée avec l'élément cliqué en paramètre.
Cette fonction va vérifier si la case cliquée est adjacente à la case vide, si c'est le cas, les deux cases sont
échangées.

## Exercice	2 : Le	2048 (obligatoire)

Vous trouverez les règles du 2048 à l’URL suivante :
https://fr.wikipedia.org/wiki/2048_(jeu_vidéo)
Alors que dans le premier exercice on s’est concentré sur la partie graphique de l’application (et
on a utilisé les éléments HTML et le DOM pour modéliser la grille de jeu), dans ce deuxième
exercice nous allons nous concentrer sur les fonctionnalités et la gestion des données en
JavaScript.
En effet, le premier exercice mélangeait volontairement la partie « noyau fonctionnel » de
l’application et la partie présentation.
Dans ce deuxième exercice, nous allons faire l’effort de séparer ces deux parties.
En partant du fichier XHTML5 « 2048.html » (que vous n’avez pas le droit de modifier) écrivez
le fichier CSS et JavaScript pour réaliser le jeu 2048 (vous devrez suivre les consignes données).
Bien lire l’ensemble des consignes avant de commencer à coder.
La grille sera modélisée sous la forme d’un tableau de tableau et initialisée dans une fonction
init().
Chaque case de la grille sera modélisée par un objet :

````javascript
// myBox object initializer
const myBox = {
    value: "",
    lastInsert: false
};
// The last Box
let lastBox = Object.create(myBox);
````

ayant une valeur (value) et un booléen (lastInsert, « false » à l’initialisation) qui servira à indiquer
si la valeur contenue est une nouvelle valeur insérée dans la grille par la fonction insertValue().

La fonction init() :

- Créera la grille, l’initialisera (chaque case aura pour valeur une chaîne vide).
- Abonnera la fenêtre à l’action « appui sur une touche du clavier » (la fonction appelée
  sera keyboardAction()).
- Ajoutera 2 valeurs aléatoirement dans la grille.

Affichera la grille via la fonction displayGrid().
La fonction keyboardAction() appelera les fonctions moveUp(), moveDown(), moveLeft() et
moveRight() en fonction de la touche de direction pressée.
Les autres touches seront ignorées. Les touches qui nous intéressent ont un keyCode entre 37 et 40.
La fonction displayGrid() mettra à jour le DOM en fonction de la grille. La dernière case ajoutée
sera en rouge. Pour le moment on ne s’occupe pas des autres effets graphiques (couleur des cases,
animations, …).
Chacune des fonctions move{Up,Down}() fonctionnera de la fonction suivante :

- Pour toutes les lignes (ou les colonnes en fonction du sens),
- si la ligne courante (ou la colonne) n’est pas vide :
  o tasser les cases dans le sens demandé,
  o fusionner les cases de même valeur,
  o tasser à nouveau les cases pour supprimer les blancs générés par la fonction de
  fusion.
- S’il y a eu au moins un mouvement ou une fusion dans les actions précédentes
  o ajouter une nouvelle valeur dans la grille,
  o afficher la grille.

L’ajout d’une valeur dans la grille sera faites par la fonction insertValue(value, coordinate)

- la valeur sera déterminée par une fonction getNewValue() qui retournera un 2 avec une
  probabilité de 0.9 et un 4 dans le reste des cas. La fonction Math.random() vous retourne
  une valeur dans l’intervalle [0 ; 1[.
- la coordonnée sera un objet composé de deux attributs, ligne et colonne. Elle
  correspondra à une case vide de la grille, déterminée aléatoirement par la fonction
  getEmptyBox().

Les fonctions tampTowards{Left,Right}(row) ou tampTowards{Up,Down}(column)
déplaceront l’ensemble des éléments de la ligne (ou de la colonne) dans la direction spécifiées
pour supprimer les cases vides. Il n’y a pas de fusion de nombre dans ce cas.

Les fonctions mergeTo{Left,Right}(row) ou mergeTo{Up,Down}(column) fusionneront les
éléments de même valeur qui sont cote à cote. En respectant la direction spécifiée.
Attention, ici on ne déplace pas de cases, certaines doublent de valeur, d’autres deviennent vide.
Les fonctions isEmptyRow(row) et isEmptyColumn(column) retourne vrai si la ligne (ou la
colonne) ne contient que des éléments de valeur vide.
