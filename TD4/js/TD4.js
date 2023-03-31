// Exercice 1 : Création et manipulation d'un objet

// Dans cette exercice nous allons créer un objet littéral, voir les propriétés et méthodes rattachés à
// un objet, créer un objet en cascade, parcourir et afficher les champs d’un objet

// 1.1 Creation d'un objet littéral

// a. Créer un objet littéral const personne ayant les propriétés nom, prenom, age, taille.
const personne = {
    nom: "", prenom: "", age: 0, taille: 0
}

// b. Créer le même objet en partant de const personne = {} et en lui ajoutant les mêmes propriétés.
personne.nom = "";
personne.prenom = "";
personne.age = 0;
personne.taille = 0;

// c. Créér un objet x égal à personne, que se passe-t-il lorsque les champs de x sont modifiés. Que signifie ceci pour x ?
const x = personne;
x.nom = "Dupont";
x.prenom = "Jean";
x.age = 30;
x.taille = 1.80;

console.log(personne.nom); // Dupont
console.log(personne.prenom); // Jean
console.log(personne.age); // 30
console.log(personne.taille); // 1.8

// cela change aussi les valeurs de personne car x est une référence vers personne

// 1.2 Accès aux propriétés d'un objet

// a. Utilisez les 3 méthodes d’accès aux propriétés de l’objet personne pour afficher son
// contenu.
console.log(personne.nom);
console.log(personne["nom"]);
console.log(Object.values(personne)[0]);


// b. Utilisez l’instruction for (let variable in object) pour parcourir et afficher le contenu de
// l’objet personne.
for (let informations in personne) {
    console.log(personne[informations]);
}

// c. Ajoutez un champ poids à l’objet personne.
personne.poids = 0;

// d. Supprimer le champ poids de l’objet personne. On notera que si personne héritait d’un autre
// objet, delete ne pourra pas s’appliquer sur les propriétés de l’objet parent.
delete personne.poids;

// 1.3 Objets imbriqués	(nested	en	anglais)

// a. Ajoutez une propriété « sports » à l’objet personne, sports sera lui-même un objet constitué
// des propriétés « sport1 », « sport2 », « sport3 ».
let sports = {
    sport1: "1", sport2: "2", sport3: "3"
}

personne.sports = sports;

// b. Affichez les champs de la propriété sports en partant de l’objet personne à l’aide de « . », de
// « [] » ou de la combinaison des deux.
console.log(personne.sports.sport1);
console.log(personne.sports["sport1"]);
console.log(personne["sports"].sport1);
console.log(personne["sports"]["sport1"]);

// c. Utilisez l’instruction for (let i in myObj.sports) { …} pour afficher le contenu de la
// propriété sports.
for (let i in personne.sports) {
    console.log(personne.sports[i]);
}


// d. Reprenez l’exercice en affectant à la propriété sports un tableau constitué lui-même par des
// objets du type {nom : …, equipements : [ ]}.
// Exemple {nom : "Tennis", equipements : [ "raquette","balle","filet"]}
// Utilisez for (let i in myObj.sports) pour afficher le contenu de la propriété sports.
sports = [{nom: "Tennis", equipements: ["raquette", "balle", "filet"]}, {
    nom: "Football", equipements: ["ballon", "chaussures", "maillot"]
}, {nom: "Basket", equipements: ["ballon", "chaussures", "maillot"]}]

personne.sports = sports;

for (let i in personne.sports) {
    console.log(personne.sports[i]);
}


// 1.4 Les	méthodes
// a. Rajoutez une méthode « qui » à personne qui permettra d’afficher son nom et son prénom à
// l’aide du mot clé « this ».
personne.qui = function () {
    console.log(this.nom + " " + this.prenom);
}

// b. Rajoutez une méthode « quimaj » qui permettra d’affichez le nom et le prénom à l’aide de
// la méthode « toUpperCase() » inhérante à une chaine de caractère.
personne.quimaj = function () {
    console.log(this.nom.toUpperCase() + " " + this.prenom.toUpperCase());
}

// 1.5 Affichage

// a. Utilisez Object.values(personne) pour affichez les propriétés de personnes dans une div.
let div = document.getElementById("div");
div.textContent = Object.values(personne);

// b. Affichez le contenu des propriétés de personne en utilisant JSON.stringify() qui transforme
// les champs de personne en chaine de caractère.
div.textContent = JSON.stringify(Object.values(personne));

// c. Ajoutez une champ datenaissance à personne en se servant de Date(). Réutilisez
// JSON.stringify() pour observer ce qui est affiché.
personne.dateNaissance = new Date();
div.textContent = JSON.stringify(Object.values(personne));

// d. Ajoutez une méthode age à personne qui retourne son age et utilisez JSON.stringify().

console.log("\n\n---------")

personne.age = function () {
    return new Date().getFullYear() - this.dateNaissance.getFullYear()
}
console.log(personne.age);
console.log(personne.age());
console.log(JSON.stringify(personne.age));
console.log(JSON.stringify(personne.age()));
console.log(personne.age.toString());
console.log(personne.age().toString());
div.textContent = JSON.stringify(Object.values(personne));

// Que se passe-t-il ?
// JSON.stringify() ne peut pas convertir une fonction en chaine de caractère.

// Comment éviter cette erreur en utilisant la méthode inhérante « toString() »
personne.age = function () {
    return this.dateNaissance.toString();
}
console.log("\n\n---------")

// 2. Exercice 2 : Les Accesseurs & Constructeurs

// 2.1 Mise en place de setter et getter

// On continue à travailler avec l’objet personne, on lui ajoute les propriétés « langue ».

// a. Rajouter un getter get lang() permettant d’afficher la langue parlée par personne.
personne.lang = "français";
Object.defineProperty(personne, "lang", {
    get: function () {
        return this.lang;
    }
});

// b. Rajouter un setter set lang() permettant de modifier le champ « langue » de personne.
Object.defineProperty(personne, "lang", {
    set: function (lang) {
        this.lang = lang;
    }
});

// c. Quelle est la différence entre le champ :
// • get fullName() { .. } permettant d’afficher le nom et prénom de l’objet personne,
// • et le champ fullName : function () { .. } permettant d’afficher le nom et prénom de
// l’objet personne ?

// get fullName() est un getter qui permet d’afficher le nom et prénom de l’objet personne
// fullName : function () { .. } est une méthode qui permet d’afficher le nom et prénom de


// d. A l’aide de la fonction objet.defineProperty() ajouter des getter et des setter à l’objet défini
// par : const obj = {counter : 0} ;
// • On ajoutera 3 getter dont un met à zero le conteur « reset », le second l’incrémente
// « inc » et le troisième le décrémente « dec ».
// • On ajoutera 2 setter un qui ajoute une valeur « add » et l’autre qui la soustrait
// « subs ».

const obj = {counter: 0};

Object.defineProperty(obj, "reset", {
    get: function () {
        return this.counter = 0;
    }
});

Object.defineProperty(obj, "inc", {
    get: function () {
        return this.counter++;
    }
});

Object.defineProperty(obj, "dec", {
    get: function () {
        return this.counter--;
    }
});

Object.defineProperty(obj, "add", {
    set: function (value) {
        return this.counter += value;
    }
});

Object.defineProperty(obj, "subs", {
    set: function (value) {
        return this.counter -= value;
    }
});


// 2.2 Les constructeurs

// a. Créez un constructeur pour l’objet personne défini par le nom, le prénom, l’âge et la
// couleur des yeux.
function Personne(nom, prenom, age, couleurYeux) {
    this.nom = nom;
    this.prenom = prenom;
    this.age = age;
    this.couleurYeux = couleurYeux;
}

// b. Créez deux objets « père » et « mere » à l’aide de la fonctionnalité new.
let pere = new Personne("Dupont", "Jean", 45, "bleu");

// c. Ajoutez une méthode name au constructeur permettant d'énoncer le nom et prénom de
// personne.
Personne.prototype.name = function () {
    return this.nom + " " + this.prenom;
}

// d. Ajoutez une autre méthode au constructeur permettant de changer le nom de la personne.
Personne.prototype.changeName = function (nom) {
    this.nom = nom;
}

// e. Les constructeurs natifs à Javascript sont :
// • new String() // A new String object
// • new Number() // A new Number object
// • new Boolean() // A new Boolean object
// • new Object() // A new Object object
// • new Array() // A new Array object
// • new RegExp() // A new RegExp object
// • new Function() // A new Function object
// • new Date() // A new Date object
// Les objets ci-dessus étant natifs, utiliser la déclaration let x1 = "Hello"; fait que Javascript
// pourra voir la variable x1 comme un objet x1 = new String("Hello"). Partant de cette
// remarque déclarez des variables et vérifiez pour chacune qu’elle se comporte comme des
// objets. Par exemple x1.length donnera la longueur de x1 soit 5.

let x1 = "Hello";
console.log(typeof x1); // string
console.log(x1.length); // 5
console.log(x1.toUpperCase()); // "HELLO"

console.log("\n");

let x2 = true;
console.log(typeof x2); // boolean
console.log(x2.valueOf()); // true

console.log("\n");

let x3 = 123;
console.log(typeof x3); // number
console.log(x3.toFixed(2)); // "123.00"

console.log("\n");

let x4 = ["apple", "banana", "orange"];
console.log(typeof x4); // object
console.log(x4.length); // 3
console.log(x4[1]); // "banana"

console.log("\n");

let x5 = /hello/;
console.log(typeof x5); // object
console.log(x5.test("Hello World")); // false
console.log(x5.test("hello")); // true

console.log("\n");

let x6 = function (a, b) {
    return a + b;
};
console.log(typeof x6); // function
console.log(x6(2, 3)); // 5

console.log("\n");

let x7 = new Date();
console.log(typeof x7); // object
console.log(x7.getFullYear()); // current year

console.log("\n");

// f. Le constructeur pour un objet Math(), pourtant intégré à Javascript ne fait pas partie de la
// liste ci-dessus. Ceci est dû au fait que Math() est un objet global sur lequel new ne peut pas
// être utilisé. Donnez quelques exemples d’utilisation de Math()
console.log(Math.PI); // 3.141592653589793
console.log(Math.round(3.14)); // 3
console.log(Math.pow(2, 3)); // 8
console.log(Math.sqrt(9)); // 3
console.log(Math.abs(-5)); // 5
console.log(Math.ceil(3.14)); // 4


// 3. Exercice 3 : Les Prototypes

// Toute fonction en JavaScript a une propriété prototype qui pointe vers un objet prototype
// créé automatiquement. On peut y stocker des méthodes et des propriétés.
// Une fonction constructrice produit des objets qui partagent son objet prototype.
// Les prototypes sont chaînables.
// Si aucun résultat n'est trouvé, une recherche est effectuée dans la chaîne des prototypes. Cette
// recherche ne fonctionne qu'en lecture. En écriture, la valeur est toujours mise à jour dans l'objet
// lui-même !
// Tous les objets JavaScript héritent des propriétés et des méthodes d'un prototype :
// • Les objets de date héritent de Date.prototype
// • Les objets tableau héritent de Array.prototype
// • Les objets Personne héritent de Personne.prototype
// L'Object.prototype est au sommet de la chaîne d'héritage du prototype :
// Les objets Date, les objets Array et les objets Personne héritent de Object.prototype.


// a. En partant du constructeur de l’objet Personne contenant les propriété nom, prenom, age,
// couleuryeux utilisez la fonctionnalité prototype pour rajouter une propriété nationalite.
Personne.prototype.nationalite = "française";

// b. Même chose pour ajouter une méthode name permettant d’énoncer le nom et prénom de
// Personne.
Personne.prototype.name = function () {
    return this.nom + " " + this.prenom;
}

// Remarque : On ne peut modifier que les prototype d’un objet que l’on a créé et pas ceux d’un
// objet dont hétirait l’objet que l’on a créé.

// 3.1 Tâche 1
// a. Programmez le constructeur d’un objet personne comportant les propriétés nom, prenom,
// estomac. La propriété estomac sera un tableau vide à l’initialisation.
function Personne(nom, prenom) {
    this.nom = nom;
    this.prenom = prenom;
    this.estomac = [];
}

// b. Ajouter la méthode manger(« nourriture ») à personne, de telle sorte qu’à chaque
// consommation la nourriture est empilée, mais on ne peut pas empiler plus de 10
// nourritures.
Personne.prototype.manger = function (nourriture) {
    if (this.estomac.length < 10) {
        this.estomac.push(nourriture);
    }
}

// c. Ajouter la méthode digestionOK() qui permet de vider l’estomac.
Personne.prototype.digestionOK = function () {
    this.estomac = [];
}

// d. Ajouter la méthode name() qui permet de citer le nom et prénom de la personne
Personne.prototype.name = function () {
    return this.nom + " " + this.prenom;
}

// 3.2 Tâche 2

// a. Programmez le contructeur d’un objet Car avec les propriétés modele, conso100km,
// reservoirlitre (initialisé à 0), compteurkm (initialisé à 0).
function Car(modele, conso100km) {
    this.modele = modele;
    this.conso100km = conso100km;
    this.reservoirlitre = 0;
    this.compteurkm = 0;
}

// b. Ajoutez la méthode addfuel(nblt) qui permet de rajouter au réservoir nblt de carburant.
Car.prototype.addfuel = function (nblt) {
    this.reservoirlitre += nblt;
}

// c. Ajoutez la methode drive(nbkm) qui permet de faire parcourir nbkm à la voiture et donc de
// mettre à jour son compteur kilometrique et son resevoir. De plus dans le cas où le réservoir
// ne serait pas suffisant pour la distance parcourue, la chaine de caractère « Je serai à cours de carburant dans xx km » doit s’afficher, le réservoir doit être mis à 0 et le compteur doit
// être incrémenté de la distance que pouvait parcourir la voiture.
Car.prototype.drive = function (nbkm) {
    let distance = nbkm;
    if (this.reservoirlitre * 100 / this.conso100km < nbkm) {
        distance = this.reservoirlitre * 100 / this.conso100km;
        this.reservoirlitre = 0;
        console.log("Je serai à cours de carburant dans " + distance + " km");
    } else {
        this.reservoirlitre -= nbkm * this.conso100km / 100;
    }
    this.compteurkm += distance;
}

// 3.3 Tâche 3

// a. Programmez un constructeur Baby qui hérite de Personne.
function Baby(nom, prenom) {
    Personne.call(this, nom, prenom);
}

// b. Le bébé aura en plus la propriété jouetFavori à initialiser.
Baby.prototype = Object.create(Personne.prototype);
Baby.prototype.constructor = Baby;
Baby.prototype.jouetFavori = "";

// c. Le bébé aura en plus des méthodes de l’objet Personne, la méthode jouer() qui retournera la
// chaîne « Je joue avec mon jouet favorit x », x étant le contenu de la propriété jouetFavori.
Baby.prototype.jouer = function () {
    return "Je joue avec mon jouet favori " + this.jouetFavori;
}

// 4. Exercice 4 : Les Itérables

// Le protocole itérable définit la façon de produire une séquence de valeurs à partir d'un objet.
// Un objet devient un itérateur lorsqu'il implémente une méthode next().
// La méthode next() doit renvoyer un objet avec deux propriétés :
// • value (la valeur suivante)
// • done (true ou false)
// value : La valeur renvoyée par l'itérateur (Peut être omise si done est vrai)
// done : est true si l'itérateur a terminé et false si l'itérateur a produit une nouvelle valeur.

// a. Créer un itérable myNumbers qui renvoie 10, 20, 30, 40, … chaque fois que next() est
// appelé.
let myNumbers = {
    [Symbol.iterator]() {
        let value = 0;
        return {
            next() {
                value += 10;
                return {value, done: false};
            }
        };
    }
};

// b. Le problème d’un itérable « handmade » comme ci-dessus est qu’il ne permet pas d’être
// parcouru par l’expression for (const x of iterable) { … }. Un itérable Javascript est un objet
// qui a une fonction Symbol.iterator ; Symbol.iterator est une fonction qui retourne une
// fonction next(). Reprendre l’exercice précédent en rendant à myNumbers la possibilité
// d’être parcouru par for (const x of iterable).
myNumbers[Symbol.iterator] = function () {
    let value = 0;
    return {
        next() {
            value += 10;
            return {value, done: false};
        }
    };
};

// Utilisation de l'itérable avec la boucle for...of
for (const x of myNumbers) {
    if (x > 100) break;
    console.log(x);
}


// c. On a vu que l’expression for (const x of iterable) appelait automatiquement la méthode
// Symbol.iterator. Cependant, cet appel peut également être fait manuellement. Créer un
// iterateur à partir de myNumbers[Symbol.iterator](); Le placer dans une boucle while(true)
// duquel on ne sortira que si la fin de l’itérateur est atteinte.
myNumbers[Symbol.iterator] = function () {
    let value = 0;
    return {
        next() {
            value += 10;
            if (value > 200) return {done: true};
            return {value, done: false};
        }
    };
};
let iter = myNumbers[Symbol.iterator]();
while (true) {
    let {value, done} = iter.next();
    if (done) break;
    console.log(value);
}

console.log("\n\n------- Exercice 5 -------");

// 5. Exercice 5 : Les Sets
// En JavaScript Set est une collection de valeurs uniques.
// Chaque valeur ne peut apparaître qu'une seule fois dans un ensemble.
// Un ensemble peut contenir n'importe quelle valeur de n'importe quel type de données.
// L’objet new possède les méthodes suivantes :
// • new Set() : Crée un nouvel ensemble
// • add() : Ajoute un nouvel élément à l'Ensemble
// • delete() : Supprime un élément d'un Set
//  has() : Renvoie vrai si une valeur existe
// • clear() : Supprime tous les éléments d'un Set
// • forEach() : Invoque un rappel pour chaque élément
// • values() : Renvoie un itérable avec toutes les valeurs d'un Set
// • keys() : Identique à values()
// • entrées() : Renvoie un itérateur avec les paires [valeur, valeur] d'un ensemble
// a. Créer un objet set appelé lettres avec une table contenant les valeurs "a","b","c".
let lettres = new Set(["a", "b", "c"]);

// b. Créer un objet set appelé lettres vide et utiliset la methode add() pour lui ajouter les valeurs
// ci-dessus.
lettres = new Set();
lettres.add("a");
lettres.add("b");
lettres.add("c");

console.log(lettres);
console.log("\n")

// c. Il est possible de faire la même chose qu’en b en utilisant des variables au lieu des valeurs,
// traitez aussi ce cas. Vérifiez qu’ajouter avec add() la même variable ou la même valeur
// deux fois ne modifie pas l’objet lettres.
let a = "a";
let b = "b";
let c = "c";
lettres.add(a);
lettres.add(b);
lettres.add(c);

console.log(lettres);
console.log("\n")

// d. Utilisez la méthode forEach() pour addicher le contenu de lettres.
lettres.forEach((value) => console.log(value));
console.log("\n")

// e. La méthode values() renvoie un objet itérable contenant toutes les valeurs d'un Set. Obtenez
// un itérable à partir de lettres et affichez les valeur de cet objet à l’aide de l’instruction for (
// … of …) associée à un itérateur.
for (const value of lettres.values()) {
    console.log(value);
}
console.log("\n")

// f. Un Set n'a pas de clés, la méthode keys() renvoie la même chose que values() et rend un Set
// compatible avec un objet Maps que l’on verra dans l’exercice suivant. Afficher le résultat
// de keys() appliqué à lettres.
for (const value of lettres.keys()) {
    console.log(value);
}
console.log("\n")

// g. Un ensemble n'a pas de clés, la méthode entries() renvoie des paires [valeur, valeur] au lieu
// de paires [clé, valeur]. Cela rend les objet Set compatibles avec les Maps. Obtenez un
// itérateur à partir de letters et de la methode entries(), listez l’ensemble des entrées de cet
// itérateur à l’aide d’une boucle for ( … of …).
for (const [key, value] of lettres.entries()) {
    console.log(key, value);
}
console.log("\n")

