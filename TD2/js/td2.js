let backupBody;
let hasBackup = false;
let latestSelected = null;

function onLoad() {
    initSelect();
    insertObject();
    document.addEventListener("click", function (event) {
        if (event.target.id === "searchButton") {
            event.preventDefault();
            console.log("searchButton clicked");
            search();
        }
    });
    document.addEventListener("input", function (event) {
        if (event.target.id === "searchInputInteractive") {
            event.preventDefault();
            console.log("searchInputInteractive clicked");
            interactiveSearch();
        }
    });
}

// Toute les ressources de la page sont complètement chargées.
window.onload = onLoad;

// M413 - TD2

function initSelect() {
    document.addEventListener('click', select);
    // document.addEventListener('click', select2);
}

function select(event) {
    event.target.style.backgroundColor ? event.target.style.backgroundColor = '' : event.target.style.backgroundColor = 'red';
}

function insertObject() {
    // Création de la div
    let div = document.createElement('div');
    div.id = 'insert-div';

    // Création du select
    let select = document.createElement('select');
    select.id = 'insert-type';
    select.name = 'type';

    // Ajout des options au select
    let optionDiv = document.createElement('option');
    optionDiv.value = 'div';
    optionDiv.textContent = 'div';
    select.appendChild(optionDiv);

    let optionP = document.createElement('option');
    optionP.value = 'p';
    optionP.textContent = 'p';
    select.appendChild(optionP);

    let optionSpan = document.createElement('option');
    optionSpan.value = 'span';
    optionSpan.textContent = 'span';
    select.appendChild(optionSpan);

    // Création de l'input
    let input = document.createElement('input');
    input.type = 'text';
    input.id = 'insert-text';
    input.value = 'My New Text Element';

    // Ajout des éléments à la div
    div.appendChild(select);
    div.appendChild(input);

    // Insertion de la div au début du body
    let body = document.getElementsByTagName('body')[0];
    body.insertBefore(div, body.firstChild);
}


/**
 * Select an element and insert a new element before it
 * @param event
 */
function select2(event) {
    // Vérification que l'élément sélectionné n'est pas la div d'insertion
    if (event.target.id !== 'insert-div' && !event.target.closest('#insert-div') &&
        !event.target.closest('#inputs') && event.target.id !== 'inputs') {
        // Désélection des éléments précédemment sélectionnés
        if (latestSelected) {
            latestSelected.style.backgroundColor = '';
            if (latestSelected.parentNode) {
                latestSelected.parentNode.style.backgroundColor = '';
                if (latestSelected.parentNode.parentNode) {
                    latestSelected.parentNode.parentNode.style.backgroundColor = 'orange';
                }
            }
        }

        // Sélection de l'élément cliqué
        latestSelected = event.target;
        latestSelected.style.backgroundColor = 'red';
        if (latestSelected.parentNode) {
            latestSelected.parentNode.style.backgroundColor = 'orange';
            if (latestSelected.parentNode.parentNode) {
                latestSelected.parentNode.parentNode.style.backgroundColor = '';
            }
        }
    }

}

/**
 * Insert an element before the target element
 * @param target - The element before which the new element will be inserted
 */
function insertElement(target) {
    // Récupération des éléments de la div d'insertion
    let select = document.getElementById('insert-type');
    let input = document.getElementById('insert-text');

    // Création de l'élément à insérer
    let element = document.createElement(select.value);
    let text = document.createTextNode(input.value);
    element.appendChild(text);

    // Insertion de l'élément avant l'élément sélectionné
    target.parentNode.insertBefore(element, target);
}


/**
 * Highlight all occurrences of the search term
 */
function search() {
    const value = document.getElementById("searchInput").value;
    if (!hasBackup) {
        backupBody = document.body.innerHTML;
        hasBackup = true;
    } else {
        document.body.innerHTML = backupBody;
    }
    if (value === "" || value.length < 0) {
        document.body.innerHTML = backupBody;
        return;
    }
    const regex = new RegExp(`(${value})`, "gi");
    highlightText(document.body, regex, value);
}


/**
 * Highlight all occurrences of the search term
 */
function interactiveSearch() {
    const value = document.getElementById("searchInputInteractive").value;
    if (!hasBackup) {
        backupBody = document.body.innerHTML;
        hasBackup = true;
    } else {
        document.body.innerHTML = backupBody;
    }
    if (value === "" || value.length < 0) {
        document.body.innerHTML = backupBody;
        return;
    }
    console.log(backupBody);
    const regex = new RegExp(`(${value})`, "gi");
    document.getElementById("searchInputInteractive").value = value;
    document.getElementById("searchInputInteractive").focus();
    highlightText(document.body, regex, value);
}

/**
 * It takes a DOM element, a regular expression, and a value, and then it highlights the value in the DOM element
 * @param element - The element to search for the text.
 * @param regex - The regular expression to match the text against.
 * @param value - The value of the input field.
 */
function highlightText(element, regex, value) {
    if (element.nodeType === Node.TEXT_NODE && element.nodeValue.match(regex)) {
        const wrapper = document.createElement("span");
        wrapper.innerHTML = element.nodeValue.replace(regex, `<span class="select">$1</span>`);
        element.parentNode.replaceChild(wrapper, element);
    } else if (element.nodeType === Node.ELEMENT_NODE) {
        element.childNodes.forEach((node) => {
            highlightText(node, regex, value);
        });
    }
}


