'use strict';

let backupBody;
let hasBackup = false;

/**
 * Search the input value in the page
 */
function onLoad() {
    // Your JavaScript code goes here !
    defineHeading1();
    defineHeading2();
    defineHeading3();
    defineHeading4();
    swapInnerHTML();
    dateAlter();
    document.addEventListener("click", function (event) {
        if (event.target.id === "countdown") {
            event.preventDefault();
            getNbDays2();
        }
    });
    updateClock1();
    updateClock2();
    updateGraphicClock();
    document.getElementById("texte").addEventListener("input", checkInput);
    document.addEventListener("input", function (event) {
        if (event.target.id === "texte") {
            event.preventDefault();
            checkInput();
        }
    });
    toggleMenu();
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

/**
 * Search the input value in the page
 */
function defineHeading1() {
    document.title = document.getElementById('title').innerText;
}

/**
 * Define the title of the page with the first h2 element
 */
function defineHeading2() {
    document.title = document.querySelector('h2').innerText;
}

/**
 * Define the title of the page with the last h2 element
 */
function defineHeading3() {
    let querys = document.querySelectorAll('h2');
    if (querys.length > 0) {
        document.title = querys[querys.length - 1].innerText;
    } else {
        document.title = 'Lacroix Baptiste';
    }
}

/**
 * Define the title of the page with the first or the last h2 element
 */
function defineHeading4() {
    let querys = document.getElementsByClassName('firstOrLast');
    if (querys.length > 0 && querys.length % 2 === 0) {
        document.title = querys[0].innerText;
    } else if (querys.length > 0 && querys.length % 2 !== 0) {
        document.title = querys[querys.length - 1].innerText;
    } else {
        document.title = 'Lacroix Baptiste';
    }
}

/**
 * Swap the innerHTML of the first and the second p element
 */
function swapInnerHTML() {
    let querys = document.querySelectorAll('p');
    let temp = querys[0].innerHTML;
    querys[0].innerHTML = querys[1].innerHTML;
    querys[1].innerHTML = temp;
}

/**
 * Change the update date and the author
 */
function dateAlter() {
    let date = new Date().toLocaleDateString("fr-FR", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    })
    let author = document.head.querySelector("meta[name='author']").content
    document.getElementById("update-date").innerHTML = "Derniere modif : " + date + " par : " + author;
}

/**
 * Get the number of days before the 19th of July
 */
function getNbDays2() {
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(`July 19, ${currentYear}`);
    const today = new Date();
    let nbDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

    const display = document.getElementById("countdown");
    display.innerHTML = `Il reste ${nbDays} jour${nbDays !== 1 ? 's' : ''} avant le 19 juillet ${currentYear}`;
}

/**
 * Get the current time and display it in the clock
 */
function getClock() {
    const display = document.getElementById("clock");
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    display.innerHTML = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

/**
 * Update the clock with the current time
 */
function updateClock1() {
    getClock();
    setInterval(updateClock1, 1000);
}

/**
 * Update the clock with the current time
 */
function updateClock2() {
    getClock();
    setTimeout(updateClock2, 1000);
}

/**
 * Update the graphic clock with the current time
 */
function updateGraphicClock() {
    const display = document.getElementById("graphic-clock");
    // Get all img elements
    let images = display.getElementsByTagName("img");
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Set hours
    images[0].src = `assets/images/${Math.floor(hours / 10)}.gif`;
    images[1].src = `assets/images/${hours % 10}.gif`;

    // Set minutes
    images[2].src = `assets/images/${Math.floor(minutes / 10)}.gif`;
    images[3].src = `assets/images/${minutes % 10}.gif`;

    // Set seconds
    images[4].src = `assets/images/${Math.floor(seconds / 10)}.gif`;
    images[5].src = `assets/images/${seconds % 10}.gif`;
    setInterval(updateGraphicClock, 1000);
}

/**
 * Check the input value and change the input background color
 * - green if the value is a number
 * - red if the value is not a number
 * - white if the value is empty
 */
function checkInput() {
    const input = document.getElementById("texte");
    const value = input.value;
    if (value === "") {
        input.className = "white";
    } else if (isNaN(value)) {
        input.className = "red";
    } else {
        input.className = "green";
    }
}

/**
 * Toggle the menu display
 */
function toggleMenu() {
    let menu = document.getElementById("menu");
    let images = menu.getElementsByTagName("img");
    let lists = menu.getElementsByTagName("ul");
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("click", function () {
            if (lists[i].style.display === "none") {
                lists[i].style.display = "block";
                images[i].src = "assets/images/minus.gif";
            } else {
                lists[i].style.display = "none";
                images[i].src = "assets/images/plus.gif";
                let a = images[i].parentElement;
                a.style.borderBottomLeftRadius = "10px";
                a.style.borderBottomRightRadius = "10px";
            }
        });
    }
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
