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