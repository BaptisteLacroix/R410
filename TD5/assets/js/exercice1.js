// Avec jQuery, rajoutez un évènement lorsque le formulaire est soumis qui permet de :
// - Stopper l’envoi du formulaire
// - Récupérer les champs du formulaire
// - Envoyer une requête ajax en POST avec les deux champs soumis vers l’URL du
// formulaire
/*
$(document).ready(function () {
    $('#form').submit(function (e) {
        e.preventDefault();
        let name = $('#name').val();
        let email = $('#email').val();
        $.ajax({
            url: $(this).attr('action'), type: 'POST', data: {
                name: name, email: email
            }, success: function (data) {
                console.log(data);
            }
        });
    });
});

 */

// 3) Rajoutez un évènement à la saisie sur chaque champ :
// - qui enlève la couleur rouge des bords du champ si au moins une lettre est saisie et la
// remet si le champ est vide à nouveau
// - qui met les bords en rouge si le nombre de caractères saisis est > à 255

$('#username').keyup(function () {
    if ($(this).val().length > 0 && $(this).val().length < 255) {
        $(this).css('border-color', 'green');
    } else {
        $(this).css('border-color', 'red');
    }
});

$('#password').keyup(function () {
    if ($(this).val().length > 0 && $(this).val().length < 255) {
        $(this).css('border-color', 'green');
    } else {
        $(this).css('border-color', 'red');
    }
});

//  La requête Ajax devra traiter le cas d’un message d’erreur ou de succès. En cas d’erreur, le
// message devra être affiché en rouge au-dessus du formulaire et ne pas s’accumuler (si on
// renvoie le formulaire, seul le dernier message est affiché). En cas de succès, on remplace le
// formulaire par le message de succès en vert.

$('#form').submit(function (e) {
    e.preventDefault();
    let name = $('#username').val();
    let pass = $('#password').val();
    $.ajax({
        url: $(this).attr('action'), type: 'POST', data: {
            username: name, password: pass
        }, success: function (data) {
            // parse the data json to object
            // and get the success key and the message key
            data = JSON.parse(data);
            if (data.success === false) {
                $('#alert').html(data.message).css('color', 'red');
            } else {
                $('#alert').html(data.message).css('color', 'green');
            }
        }, error: function () {
            console.log("Error when sending the form");
        }
    });
});