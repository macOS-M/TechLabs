$(document).ready(function () {


    let email = $("#email-recover");
    let btnRecover = $("#btn-recover");
  
    let otpInput = $("#otp-input").hide();
    let confirmOTP = $("#btn-otp-confirm").hide();

    let passwordInput = $("#txtPassword");
    let paswordConfirmationInput = $("#txtPasswordCon");

    let confirmChanges = $("#btnConfirmChanges");


    btnRecover.click(function (e) {
        e.preventDefault();
       
        if (validateInputs(email) != false) { 

            var service = "/api/User/GenerateOTP?method=EMAIL&contact=" + email.val();
            var url_API = GetUrlApiService(service);

            RequestOTP(url_API);
                      
            otpInput.show();
            confirmOTP.show();
        } 
    });

    confirmOTP.click(function (e) {
        e.preventDefault();

        let service = "/api/User/ProcessOTPValidation?otp=" + otpInput.val();
        let url_API = GetUrlApiService(service);

        $.ajax({
            type: "GET",
            url: url_API,
            ContentType: "application/json",
            data: null,
            hasContent: false
        }).done(function (response) {
            if (response.Result === "OK") {
                console.log(response.Result)
                $("#UserModal").modal('show');
            }
            else {
                Swal.fire('Error', 'Hubo un Error al procesar el OTP', 'warning')
               
            }
        }
        ).fail(function () {
            Swal.fire('Error', 'OTP incorrecto, por favor intente de nuevo', 'warning')
        });

    });



    function validateInputs(pEmail) {
        if (pEmail.val() == '' || pEmail.val() == null || pEmail.val() == undefined) {
            showError("Por favor ingrese su correo electrónico", pEmail);
            return false;
        }

        if (emailRegex.test(pEmail.val()) == false) {
            showError("Formato de correo electrónico no es válido", pEmail);
            return false;
        }

        return true;
    }

    confirmChanges.click(function () {
        if (validatePasswordChange(passwordInput, paswordConfirmationInput) != false) {

            var user = {};
            user.Email = email.val()
            user.Password = passwordInput.val();


            let service = "/api/User/ChangePassword"
            let url_API = GetUrlApiService(service);

            $.ajax({
                Headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "PUT",
                url: url_API,
                contentType: "application/json",
                data: JSON.stringify(user),
                hasContent: true
            }).done(function (response) {
                if (response.Result === "OK") {
                    console.log(response.Result)

                    //LoadData()
                    $("#UserModal").modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    Swal.fire('Cambios realizados con éxito', '', 'success')


                    setTimeout(() => {
                        window.location.replace(GetUrlLocalService("/Home/Login"));
                    }, 3000)
                }
            }).fail(function (response) {
                
            });
        } 

        



    })


    function validatePasswordChange(passwordInput, paswordConfirmationInput) {
        if (passwordInput.val() == '' || passwordInput.val() == null || passwordInput.val() == undefined) {
            showError("Error! Por favor ingrese una contraseña", passwordInput);
            return false;
        }

        if (passwordRegex.test(passwordInput.val()) == false) {
            showError("La contraseña dede de tener:<br /> Mínimo 8 caracteres <br />Mayúsculas y minusculas <br /> Números <br />Caracter especial", passwordInput)
            return false;
        }

        if (paswordConfirmationInput.val() == '' || paswordConfirmationInput.val() == null || paswordConfirmationInput.val() == undefined) {
            showError("Error! Por favor confirme su contraseña", paswordConfirmationInput);
            return false;
        }

        if (passwordInput.val() != paswordConfirmationInput.val()) {
            showError("Error! Confirmación de contraseña no coincide, intente de nuevo", paswordConfirmationInput);
            return false;
        }

        return true;
    }

    function RequestOTP(url_API) {

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: url_API,
            ContentType: "application/json",
            hasContent: false
        }).done(function (response) {
            if (response.Result === "OK") {
                Swal.fire('Código enviado a ', email.val() , 'success')
            }
            else {
                Swal.fire('Error', 'Intente de nuevo', 'warning')
            }
        }
        ).fail(function () {
            Swal.fire('Error', 'Intente de nuevo', 'warning')

        });
    };


   

});