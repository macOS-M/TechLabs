$(document).ready(function () { 

$("#empieza-aqui").click(function () {
    window.location.replace(GetUrlLocalService("/Home/UserRegistration"));


});





    $("#empieza-socio").click(function () {
        window.location.replace(GetUrlLocalService("/Home/UserRegistration?TYPE=LABADMIN"));


    });

});