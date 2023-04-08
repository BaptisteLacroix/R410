// Pour cet exercice, vous allez récupérer les informations d’une page externe grâce à Ajax et
// charger dynamiquement des faux produits en fonction d’un champ. Cela vous permettra de
// comprendre ce que l’on peut faire avec. Vous pourriez par exemple tenir sur votre site la
// météo à jour en temps réel, mais nous allons ici prendre un autre exemple.
// Vous n’avez pas besoin de modifier la page HTML pour cet exercice, vous n’avez que du
// JavaScript à faire !
// Nous allons utiliser le site https://dummyjson.com/ qui nous permet d’avoir des fausses
// données JSON.
// 1) Créez une boucle avec i allant de 1 à 3 et faisant à chaque fois une requête vers
// https://dummyjson.com/products/{i}

$(document).ready(function () {
    for (let i = 1; i <= 3; i++) {
        $.ajax({
            url: "https://dummyjson.com/products/" + i, type: 'GET', success: function (data) {
            }
        });
    }
});

// 2) À chaque succès de la requête, clonez l’élément .product-template, supprimez la classe
// .product-template, rajoutez une classe product-{i} et rajoutez le à la fin du body

/*
$(document).ready(function () {
    for (let i = 1; i <= 3; i++) {
        $.ajax({
            url: "https://dummyjson.com/products/" + i, type: 'GET', success: function (data) {
                let product = $('.product-template').clone();
                product.removeClass('product-template');
                product.addClass('product-' + i);
                $('body').append(product);
            }
        });
    }
});
*/
// 3) Remplacez les données .img (src + alt), .title, .brand, .price, .old-price et .stock en
// utilisant le résultat JSON récupéré par la requête Ajax et en respectant la forme du
// template.
// Boucle de 1 à 3 pour récupérer les produits
for (let i = 1; i <= 3; i++) {
    $.ajax({
        url: `https://dummyjson.com/products/${i}`, dataType: "json", success: function (data) {
            // Clonage de l'élément .product-template et ajout de la classe product-{i}
            const newProduct = $(".product-template").clone().removeClass("product-template").addClass(`product-${i}`);
            // Ajout du nouvel élément à la fin du body
            $("body").append(newProduct);
            console.log(data);
            // Remplacement des données dans le template
            $(`.product-${i} .img`).attr("src", data.img).attr("alt", data.title).attr('src', data.images[0]);
            $(`.product-${i} .title`).text(data.title);
            $(`.product-${i} .brand`).text(data.brand);
            $(`.product-${i} .price`).text(data.price);
            let discountPercentage = data.discountPercentage;
            let price = data.price;
            let oldPrice = Math.round(price / (1 - discountPercentage / 100));
            $(`.product-${i} .old-price`).text(oldPrice);
            $(`.product-${i} .stock`).text(data.stock);
        }, error: function () {
            console.log("Une erreur est survenue lors de la requête Ajax.");
        }
    });
}

// 4) Améliorez votre code pour rajouter un évènement sur le bouton « Générer » qui génère
// un nouveau produit (qui n’a pas déjà été rajouté sur la page) avec un id aléatoire compris
// entre 1 et 100 (si les 100 produits ont déjà été générés, le bouton se mettra en
// « disabled »).

// Liste des produits déjà générés
const products = document.getElementsByClassName('product');

// Fonction pour vérifier si un produit a déjà été généré
function isProductGenerated(id) {
    console.log("\n\n")
    for (let i = 0; i < products.length; i++) {
        console.log(products[i].classList + " " + id);
        if (products[i].classList.contains(`product-${id}`)) {
            console.log("true");
            return true;
        }
    }
    console.log("false");
    return false;
}

// Fonction pour générer un nouveau produit
function generateProduct() {
    // Génération d'un id aléatoire entre 1 et 100
    const id = Math.floor(Math.random() * 100) + 1;
    // Vérification si le produit a déjà été généré
    if (!isProductGenerated(id)) {
        // Ajout de l'id à la liste des produits générés
        // Requête Ajax pour récupérer les données du produit
        $.ajax({
            url: `https://dummyjson.com/products/${id}`, dataType: "json", success: function (data) {
                // Clonage de l'élément .product-template et ajout de la classe product-{id}
                const newProduct = $(".product-template").clone().removeClass("product-template").addClass(`product-${id}`);
                // Ajout du nouvel élément à la fin du body
                $("body").append(newProduct);

                // Remplacement des données dans le template
                $(`.product-${id} .img`).attr("src", data.images[0]).attr("alt", data.title);
                $(`.product-${id} .title`).text(data.title);
                $(`.product-${id} .brand`).text(data.brand);
                $(`.product-${id} .price`).text(data.price);
                let discountPercentage = data.discountPercentage;
                let price = data.price;
                let oldPrice = Math.round(price / (1 - discountPercentage / 100));
                $(`.product-${id} .old-price`).text(oldPrice);
                $(`.product-${id} .stock`).text(data.stock);

                // Désactivation du bouton si tous les produits ont été générés
                if (products.length === 100) {
                    $("#product-generation").attr("disabled", true);
                }
            }, error: function () {
                console.log("Une erreur est survenue lors de la requête Ajax.");
            }
        });
    }
}

// Événement de clic sur le bouton "Générer"
$("#product-generation").on("click", generateProduct);
