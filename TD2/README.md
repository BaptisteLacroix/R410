# M413 - TD2 : Réponses aux Questions

## 6 Exercice 1 : Les évènements (obligatoire)

Pour cet exercice vous devez partir d’une page XHTML5 valide qui contiendra au moins :
− une balise `<h1>`,
− deux balises `<h2>`,
− quelques balises `<div>`, `<p>`, `<ul>` ou `<ol>`, `<li>`, `<a>` et `<span>`.
Un objet devra avoir une couleur d’arrière-plan spécifiée par son id, d’autres par des classes CSS
et d’autres encore par leur type de balises.
Au besoin, vous pouvez utiliser « [Lorem Ipsum](https://fr.lipsum.com/) » pour générer de faux contenu pour votre page.

### 6.1 Sélection d'un Objet

L’objectif final de notre exemple sera de pouvoir sélectionner un objet (i.e. HTMLElement) dans
notre page via un simple clic souris.
La sélection de l’objet sera indiquée à l’utilisateur par un changement de la couleur de son arrière plan (en rouge par
exemple).
Une façon simple de faire cela est d’abonner l’élément de plus haut niveau de notre page à
l’évènement « `click` ».
Ecrivez une fonction `initSelect()` qui aura pour but de faire cela.
L’ajout d’un écouteur d’évènements « `click` » qui déclenchera une fonction `select()` devra se faire
en JavaScript.
Ajoutez un id= « title » à votre `<h1>`.

#### ➢ Comment avez-vous ajouté l'écouteur d'évènement et sur quel objet ?

J'ai ajouté l'écouteur d'évènement sur l'objet `document` avec la fonction `addEventListener` et l'évènement `click`.

````javascript
function initSelect() {
    document.addEventListener('click', select);
}

function select(event) {
    event.target.style.backgroundColor = 'red';
}
````

Maintenant on souhaite écrire la fonction `select()` qui va mettre en couleur le fond de notre lors du
premier clic, et le supprimer lors du clic suivant.
Sur le paramètre de type évènement de votre fonction de « callback », la propriété `.target` vous
indique l’objet qui a reçu l’évènement [[MDN](https://developer.mozilla.org/fr/docs/Web/API/Event/target)].
Attention, à ne pas confondre avec l’objet qui à l’écouteur d’évènement.

#### ➢ Que se passe-t-il si vous utilisez currentTarget en lieu et place de target ?

Si on utilise `currentTarget` à la place de `target`, la couleur de fond de l'élément sélectionné ne change pas.

Notes :
− Pour tester si une variable est déjà définie, on peut comparer son type avec la chaine de
caractères « **`undefined`** ».
− Pour supprimer une variable de la mémoire (elle sera alors de type non définie), on peut
utiliser la fonction **`delete(variable)`**.

### 6.2 Insertion d'objets

Ajoutez la <div> suivante au début du <body> de votre page au chargement de votre page, donc
dynamiquement en JavaScript

````javascript
<div id="insert-div">
    <select id="insert-type" name="type">
        <option value="div">div</option>
        <option value="p">p</option>
        <option value="span">span</option>
    </select>
    <input type="text" id="insert-text" value="My New Text Element">
</div>
````

Ecrivez une fonction `select2()`, qui fonctionne comme la fonction `select()` sauf que :
− `select2()` ne permet de sélectionner d’un seul élément à la fois.
On mettra le fond en bleu pour différencier les 2 fonctions.
− `select2()` ne permet pas de sélectionner la `<div>` ci-dessus ainsi que les éléments qu’elle
contient.
Ecrivez maintenant la fonction `insertElement(target)` qui insert avant l’élément sélectionné, c’est
à dire l’élément « `target` » de la fonction `select2()`, un élément dont le type est donné par le
`<select>` de la `<div>` « `insert-div` » et qui contient le texte fourni par la valeur de l’`<input />` de
type « `text` » de la `<div>` « `insert-div` ».
Les éléments ainsi ajoutés à votre page, pourront ensuite eux-même être sélectionnés…

#### ➢ Comment avez-vous ajouté l’élément ?

J'ai utilisé la fonction `insertBefore` pour ajouter l'élément avant l'élément sélectionné.

````javascript
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
````

#### ➢ Comment avez-vous fait pour que la fonction `select2()` ignore les évèments de la `<div>` donnée ci-dessus ?

J'ai utilisé la fonction `closest` pour vérifier si l'élément sélectionné est la div d'insertion ou un de ses enfants.

````javascript
function select2(event) {
    // Vérification que l'élément sélectionné n'est pas la div d'insertion
    if (event.target.id !== 'insert-div' && !event.target.closest('#insert-div')) {
        // Désélection des éléments précédemment sélectionnés
        if (latestSelected) {
            latestSelected.style.backgroundColor = '';
        }
        latestSelected = event.target;
        event.target.style.backgroundColor = 'blue';
    }
}
````

## 7. Exercice 2 :  parcours de l’objet document (obligatoire)

Revenons maintenaint sur le dernier exercice du TD1.
Ajoutez y les balises ci-dessous à votre programme et essayez de rechercher le texte « `ornare` ».
Si l’ensemble des occurrences n’est pas bien sélectionné ( il y en a 8 dans les balises ci-dessous),
corrigez votre programme !

## 8. Exercice 3 : parcours (optionnel)

En repartant de l’exercice 1, ajoutez les fonctionnalités suivantes :
− Quand je sélectionne un HTMLElement via un clic, l’arrière-plan de l’objet passe en
rouge, celui de son père en orange.
− Si je sélectionne un HTMLElement O1, puis son père PO1, O1 et PO1 ont un arrière-plan
rouge et l’arrière-plan du père de PO1 est en orange.
Maintenant, si je resélectionne PO1, son arrière-plan doit revenir orange.

