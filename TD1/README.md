# M413 - TD1 : Réponses aux Questions

## 6 Exercice 1 : Commençons avec l’objet document

Nous allons commencer par écrire une simple page HTML qui devra contenir 1 balise `<h1>`, 2
balises `<h2>` et 3 balises `<h3>`.
Chacune de ces balises contiendra un court texte facilement
identifiable et différent. Vous aurez donc au moins 6 textes différents. Libre à vous d’ajouter
d’autres textes et d’autre balise à votre page. Le titre de votre page (défini par la balise `<title>`
de la section `<head>`) devra être « TD1 - Exercice 1 ».
La propriété « `document.title` »

Ajoutez un id= « title » à votre `<h1>`.
Écrivez une méthode defineHeading1(), qui au chargement de la page, recherche dans celle-ci la
balise ayant l’id « title » et change le titre de la page avec le contenu de la balise.

### 1. Quel sera l’évènement qui déclenchera l’appelle de votre fonction ?

1. L’évènement qui déclenchera l’appelle de ma fonction est le chargement de la page.

### 2. Quelle méthode avez-vous utilisée pour récupérer l’objet représentant votre balise `<h1>` ?

2. J’ai utilisé la méthode `getElementById()` pour récupérer l’objet représentant ma balise `<h1>`.

```javascript 
function defineHeading1() {
    document.getElementById('title').innerText;
}
```

### 3. Quelle propriété de l’objet représentant votre balise `<h1>` avez-vous utilisée pour récupérer le texte de celui-ci ?

3. J’ai utilisé la propriété `innerHTML` pour récupérer le texte de celui-ci.

```javascript 
function defineHeading1() {
    document.title = document.getElementById('title').innerText;
}
```

Maintenant on souhaite faire la même chose, mais en récupérant le texte de la première balise
`<h2>` du document.

### 4. Quelle(s) méthode(s) avez-vous utilisée pour récupérer l’objet représentant la première balise `<h2>` ?

4. J’ai utilisé la méthode `querySelector()` pour récupérer l’objet représentant la première balise `<h2>`.

```javascript 
function defineHeading2() {
    document.title = document.querySelector('h2').innerText;
}
```

Attention, cette fois, il n’y a pas d’id dans la balise. Ecrivez une fonction `defineHeading2()` qui effectue cela.
Maintenant modifiez votre code pour prendre non pas le première mais la dernière balise `<h2>`.
Attention, le code devra fonctionner quel que soit le nombre de balises `<h2>`.
S’il n’y a aucune balise `<h2>`, le titre de la page sera votre nom et prénom. Vous ferez cela dans la
méthode `defineHeading3()`.

### 5. Comment faire pour connaitre le nombre de balise `<h2>` du document ?

5. J’ai utilisé la méthode `querySelectorAll()` pour connaitre le nombre de balise `<h2>` du document.

```javascript 
function defineHeading3() {
    let querys = document.querySelectorAll('h2');
    if (querys.length > 0) {
        document.title = querys[querys.length - 1].innerText;
    } else {
        document.title = 'Lacroix Baptiste';
    }
}
```

Modifiez votre page en ajoutant le `<h1>`, le 2eme `<h2>` et le premier `<h3>` avec la classe CSS « `firstOrLast` ».
Ecrivez une fonction `defineHeading4()` qui sélectionne le premier élément de cette classe comme titre pour le document,
si le nombre d’éléments de cette classe est paire. Si le nombre est impair, on utilisera le dernier.
S’il n’y en a aucun, le titre de la page sera votre nom et prénom.

### 6. Quelle méthode avez-vous utilisée pour récupérer les objets de votre classe ?

6. J’ai utilisé la méthode `getElementsByClassName()` pour récupérer les objets de ma classe.

```javascript
function defineHeading4() {
    let querys = document.getElementsByClassName('firstOrLast');
}
```

### 7. Comment avez-vous déterminé si un nombre est pair ?

7. J’ai utilisé l’opérateur modulo `%` pour déterminer si un nombre est pair.

```javascript
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
```

## 6.2 Les propriétés `innerHTML`, innerText ettextContent

Ajoutez à votre page une balise `<div>` contenant une balise `<p>` contenant elle-même un petit texte
(de 3 mots minimum) dont une partie est entourée par une balise `<span>`.
Ajoutez à votre page un deuxième ensemble de balise identique au précédent mais dont seul le
texte change.
Ecrivez une fonction `swapInnerHTML()` qui échange le contenu des deux balises `<p>`.
On pourra faire l’hypothèse qu’il n’y a que nos 2 balises `<p>` dans toute la page.

### 1. Quelles différences existe-t-il entre les 3 propriétés `innerHTML`, `innerText` et `textContent` ?

1. La propriété `innerHTML` renvoie le contenu HTML de l’élément, la propriété `innerText` renvoie le contenu textuel de
   l’élément et la propriété `textContent` renvoie le contenu textuel de l’élément.

```javascript
function swapInnerHTML() {
    let querys = document.querySelectorAll('p');
    let temp = querys[0].innerHTML;
    querys[0].innerHTML = querys[1].innerHTML;
    querys[1].innerHTML = temp;
}
```

## 6.3 La propriété document.lastModified

Une des choses importantes pour une page web est de savoir quand celle-ci a été mise à jour et par qui.
Si on peut retrouver ces informations facilement aux travers des métadonnées associées à un fichier,
cela n’est pas forcément facile à faire pour tout le monde.
Voyons comment faire cela facilement avec une petite fonction JavaScript.
Ajoutez à votre page les balises `<meta />` pour l’auteur, la description et les mots clés.
Ajoutez une balise `<div>` vide à la fin de votre page. Celle-ci aura l’id « update-date ».
Ecrivez une fonction `dateAlter()`, qui automatiquement, au chargement de la page, ajoute un
texte du type « Dernière modification : le vendredi 18 janvier 2021 par Nom Prénom » dans la
`<div>` ( en lieu et place du texte existant, s’il y en a un).
La date sera récupérée via une propriété de l’objet document. L’auteur lui sera identifié à l’aide de
la balise `<meta />`.
Pour cela vous aurez besoin d’un objet Date. Voici une rapide présentation ( mais partielle) de
celui-ci extraite du site de Mozilla.org :

```javascript
// Constructeurs :
new Date();
new Date(milliseconds);
new Date(dateString);
new Date(year, month, day [hour, minute, second, millisecond]);

// Méthodes :
Date.prototype.getDate()

// Renvoie le jour du mois (entre 1 et 31) pour la date donnée, selon le temps local.
Date.prototype.getDay()

// Renvoie le jour de la semaine (entre 0 et 6) pour la date donnée, selon le temps local.
Date.prototype.getFullYear()

// Renvoie l'année (sans chiffre implicite, 1999 sera renvoyé et pas 99 par exemple) pour la date donnée, selon le temps local.
Date.prototype.getHours()

// Renvoie l'heure (entre 0 et 23) pour la date donnée, selon le temps local.
Date.prototype.getMilliseconds()

// Renvoie les millisecondes (entre 0 et 999) pour la date donnée, selon le temps local.
Date.prototype.getMinutes()

// Renvoie les minutes (entre 0 et 59) pour la date donnée, selon le temps local.
Date.prototype.getMonth()

// Renvoie le mois (entre 0 et 11) pour la date donnée, selon le temps local.
Date.prototype.getSeconds()

// Renvoie les secondes (entre 0 et 59) pour la date donnée, selon le temps local.
Date.prototype.getTime()

// Renvoie la valeur numérique de la date donnée, exprimée en nombre de millisecondes écoulées depuis 
// le premier janvier 1970, 00:00:00 UTC (pour les temps antérieurs, ce sont des valeurs négatives qui seront renvoyées).
```

Lorsque plusieurs personnes éditent un même fichier, il est possible d’avoir plusieurs auteurs et
donc plusieurs balise `<meta />` avec l’attribut `name="author"`.

### 1. Comment modifier votre code pour qu’il permette de sélectionner le 1er auteur de la liste ?

1. J’ai utilisé la méthode `querySelectorAll()` pour sélectionner tous les auteurs et j’ai utilisé la
   méthode `getAttribute()`
   pour récupérer le premier auteur.

```javascript
function dateAlter() {
    let date = new Date(document.lastModified);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let author = document.querySelectorAll('meta[name="author"]')[0].getAttribute('content');
    let div = document.getElementById('update-date');
    div.innerHTML = 'Dernière modification : le ' + day + ' ' + month + ' ' + year + ' par ' + author;
}
```

### 2. Même question avec le dernier auteur de la liste.

1. J’ai utilisé la méthode `querySelectorAll()` pour sélectionner tous les auteurs et j’ai utilisé la
   méthode `getAttribute()`
   pour récupérer le dernier auteur.

```javascript
function dateAlter() {
    let date = new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })
    let author = document.head.querySelector("meta[name='author']").content
    document.getElementById("update-date").innerHTML = "Derniere modif : " + date + " par : " + author;
}
```

## 7 Exercice 2 : l’objet Date

Comme nous avons déjà commencé à utiliser l’objet Date, continuons un peu à étudier son
fonctionnement.
Ajoutez une balise paragraphe dans votre page. Celle-ci contiendra le texte suivant : « il reste xxx
jours avant le 19 juillet 202X » (202x étant année en cours). Ajoutez une fonction `getNbDays()`
qui calcule le nombre de jour restant quand on clique sur la balise paragraphe et qui remplace les
xxx par la valeur. On pensera également à supprimer le « s » de jours quand cela sera nécessaire

### 1. Comment obtenez-vous le nombre de jours ?

1. J'ai pris la date actuelle et la date de fin j'ai fais la différence entre la date visée et la date
   actuelle. Puis j'ai divisé par 1000 pour avoir le nombre de secondes puis par 60 pour avoir le nombre de minutes puis
   par 60 pour avoir le nombre d'heures puis par 24 pour avoir le nombre de jours.

```javascript
function getNbDays2() {
    let currentYear = new Date().getFullYear();
    let targetDate = new Date(`July 19, ${currentYear}`);
    let today = new Date();
    let nbDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
}
```

### 2. Comment faites-vous la mise à jour du texte ?

1. J'ai utilisé la méthode `getElementById()` pour sélectionner l'élément et j'ai utilisé la méthode
   `innerHTML` pour modifier le texte.

```javascript
function getNbDays2() {
    let currentYear = new Date().getFullYear();
    let targetDate = new Date(`July 19, ${currentYear}`);
    let today = new Date();
    let nbDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

    let display = document.getElementById("countdown");
    display.innerHTML = `Il reste ${nbDays} jour${nbDays !== 1 ? 's' : ''} avant le 19 juillet ${currentYear}`;
}
```

## 7.1 setInterval() et setTimeout()

Ajoutez une nouvelle balise paragraphe avec l’id « clock » à votre page. Dès le chargement de votre page,
cette balise devra contenir l’heure au format « hh:mm:ss ».
Pour cela vous créerez deux fonctions `updateClock1()` et `updateClock2()`. La première devra
utiliser la méthode `setInterval()`, la deuxième la méthode `setTimeout()`.
Pour cela vous aurez besoin d’un peu de documentation.
Voici une rapide présentation (mais partielle) des ces deux fonctions :

```javascript
window.setInterval()
// Appelle une fonction de manière répétée, avec un certain délai fixé entre chaque appel.
intervalID = window.setInterval(fonction, delai[, param1, param2, ...
])
;
intervalID = window.setInterval(code, delai);

// où 

intervalID // est un ID unique d'intervalle qui peut être passé à
window.clearInterval() // fonction est la fonction qui doit être appelée de manière répétée.

code //, dans la syntaxe alternative, est une chaîne représentant le code à exécuter de manière répétée. 

delai // est le nombre de millisecondes (millièmes de seconde) que s
setInterval() // doit attendre avant chaque appel de fonction.
```

https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval

```javascript
window.setTimeout()
// Exécute un morceau de code ou une fonction après un délai déterminé.

timeoutID = window.setTimeout(fnct, delay[, param1, param2, ...
])
;
timeoutID = window.setTimeout(code, delay);

// où

timeoutID // est l'identificateur numerique du timeout, qui peut être utilisé avec 
window.clearTimeout

fnct // est la fonction que vous désirez exécuter après delai millisecondes.

code // est, dans la syntaxe alternative, une chaîne contenant le code à exécuter après delai millisecondes. 
// (L'utilisation de cette syntaxe n'est pas 
// recommandée pour les mêmes raisons que l'utilisation d'eval()).

delay // est le nombre de millisecondes (millièmes de seconde) après lequel la
// fonction doit être appelée. Le délai réel peut s'avérer plus long ( cf.
// documentation.

```

https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout

### 1. Laquelle des deux méthodes de l’objet window avez-vous utilisé ? Pourquoi ?

1. J'ai utilisé la méthode `setInterval()` car elle permet de répéter une fonction à un intervalle
   donné. Cela permet de mettre à jour l'heure toutes les secondes.

```javascript
function getClock() {
    const display = document.getElementById("clock");
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    display.innerHTML = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function updateClock1() {
    getClock();
    setInterval(updateClock1, 1000);
}

function updateClock2() {
    getClock();
    setTimeout(updateClock2, 1000);
}
```

Une fois que votre horloge fonctionne avec les deux méthodes, ajoutez une balise div avec l’id
« graphic-clock ». Cette balise contiendra le texte et les balise <img /> que vous souhaitez.
Vous devez maintenant écrire une fonction updateGraphicClock() qui affiche de manière
graphique une horloge dans cette balise. Pour cela vous utiliserez les images du dossier
assets/images/ fourni.

```javascript
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
```

## 8. Exercice 3: HTML, CSS et Javascript (obligatoire)

### 8.1 Champ de Texte et Couleur d'arrière-plan

Ajoutez un champ texte de saisie ( `input` avec `type="text"` dans un formulaire) avec un fond de
couleur blanc.
On rappelle que la mise en forme doit être gérée par des instructions CSS qui seront, de
préférence, contenues dans un fichier différent du fichier de la page HTML.
Pour cela préparer trois classes de styles CSS comme dans l’exemple ci-dessous :

```css

.white {
    background-color: rgb(255, 255, 255);
}

.green {
    background-color: rgb(150, 255, 150);
}

.red {
    background-color: rgb(255, 150, 150);
}

```

Faites-en sorte que la zone de texte devienne rouge si le texte entré n'est pas un nombre et si
l'utilisateur tape un nombre, alors le fond doit devenir vert.
Attention, si la zone de texte est vide, elle doit être de couleur blanche.

### 1. Quel événement avez-vous utilisé ?

1. J'ai utilisé l'événement `input` qui est déclenché lorsque la valeur de l'élément est
   modifiée.

```javascript
document.getElementById("texte").addEventListener("input", checkInput);
```

### 2. Comment avez-vous fait changer la couleur du champ texte ?

```javascript
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
```

### 8.2 Menu déroulant

```javascript
// Rappel :
// La propriété CSS display, peut prendre (entre autre) une des valeurs
// suivantes :

none // : le bloc ne sera pas affiché.

inline // : le bloc sera considéré comme étant une seule ligne.

block // : spécifie un bloc.

```

```html

<aside id="menu">
    <div>
        <a>
            <img src="assets/images/minus.gif" alt="minus" width="13" height="13">
            Informations Générales
        </a>
        <ul>
            <li>Accueil</li>
            <li>CV</li>
        </ul>
    </div>

    <div>
        <a>
            <img src="assets/images/minus.gif" alt="minus" width="13" height="13">
            Recherche
        </a>
        <ul>
            <li>Activités</li>
            <li>Rayonnement Scientifique</li>
            <li>Projets en cours</li>
            <li>Anciens projets</li>
            <li>Publications</li>
        </ul>
    </div>

    <div>
        <a>
            <img src="assets/images/minus.gif" alt="minus" width="13" height="13">
            Enseignement
        </a>
        <ul>
            <li>Département Informatique</li>
            <li>LP SIL</li>
            <li>Polytech Nice-Sophia</li>
            <li>Autres</li>
            <li>Stages et Projets</li>
        </ul>
    </div>

    <div>
        <a>
            <img src="assets/images/minus.gif" alt="minus" width="13" height="13">
            Personnels
        </a>
        <ul>
            <li>Equipe</li>
            <li>Recrutement</li>
        </ul>
    </div>
</aside>
```

```css
aside {
    padding: 10px;
    background-color: aquamarine;
    width: 500px;
}

aside div {
    width: 100%;
    margin: 10px;
}

aside a {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: block;
    width: 100%;
    background-color: blue;
    color: white;
    font-size: larger;
    font-weight: bolder;
}

aside a img {
    /* Set the color of the image white */
    margin-left: 10px;
    filter: invert(100%);
}

aside ul {
    width: 100%;
    list-style: none;
    background-color: black;
    color: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

aside ul li {
    margin-left: 10px;
}
```

```javascript
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
```

## 9. Exercice 4: parcours de l'arbre DOM

Pour finir ce TD, nous allons écrire une fonction « `search()` » qui se déclenchera au clic sur un
bouton. Elle ira lire le contenu d’un champ texte et surlignera dans la page tous les mots
correspondant au texte de ce champtexte.<br><br>
Commencez par ajouter un paragraphe qui contiendra le champ texte et le bouton.<br><br>
Votre fonction recherche devra, si c’est sa première utilisation, faire une sauvegarde de la page (on
va dire seulement du corps de celle-ci) dans une variable. Si ce n’est pas la première utilisation,
elle restaurera la page des modifications apportées préalablement.<br><br>
Ensuite vous allez devoir parcourir le DOM pour recherche le texte souhaité dans toute le page et
le remplacer par une balise `<span>`.<br><br>
Attention, il ne faut remplacer que le texte et pas les balises HTML. Notre nouvelle balise `<span>`
sera de la classe CSS « `select` » et contiendra le texte recherché.<br><br>
La classe CSS « `select` » devra mettre l’arrière-plan de la balise en jaune.<br><br>
Pour faire cet exercice, vous aurez besoin d’utiliser les méthodes de gestion des nœuds, ainsi que
les propriétés « `childNodes` » et « `nodeType` » :<br>
https://developer.mozilla.org/fr/docs/Web/API/Node/childNodes <br>
https://developer.mozilla.org/fr/docs/Web/API/Node/nodeType <br>
https://developer.mozilla.org/fr/docs/Web/API/NodeList <br><br>
Une fois que cela fonctionne, ajoutez un deuxième champ texte à votre page. A chaque lettre
saisie, il appellera une fonction « interactiveSearch() » dont le but est similaire à la fonction
« `search()` » précédente.

```javascript
let backupBody;
let hasBackup = false;

function onLoad() {
   // Your JavaScript code goes here !
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
```