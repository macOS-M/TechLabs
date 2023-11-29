$(document).ready(function () {

    let linkRegister = $("#registrarse");

    
    let recuperar = $("#recuperar");
    

    const QUERY_STRING = window.location.search;
    console.log(QUERY_STRING)

    const urlParams = new URLSearchParams(QUERY_STRING);

    if (urlParams.has('EMAIL') && urlParams.has('PASSWORD')) { 

    const USER_EMAIL = urlParams.get('EMAIL');
    const USER_PASSWORD = urlParams.get('PASSWORD');

    console.log(USER_EMAIL + "  " + USER_PASSWORD)

    $("#txtEmail").val(USER_EMAIL)
    $("#txtPassword").val(USER_PASSWORD)
    }


    recuperar.click(function () {
        window.location.replace(GetUrlLocalService("/Home/OTPRecuperar"));

    });

    linkRegister.click(function () {

        Swal.fire({
            title: 'Seleccione una opción',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonColor: '#334257',
            cancelButtonColor: '#3085d6',
            denyButtonColor: '#548ca8',
            confirmButtonText: 'Suscribirme como socio ',
            denyButtonText: `Registrarme como cliente`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                window.location.replace(GetUrlLocalService("/Home/LabAdminRegistration"));
               
            } else if (result.isDenied) {
                window.location.replace(GetUrlLocalService("/Home/UserRegistration"));
               
            }
        })


    })

});




