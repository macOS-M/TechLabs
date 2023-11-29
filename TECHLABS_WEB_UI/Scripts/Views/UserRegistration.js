$(document).ready(function () {
    //Validators
    let phoneIsValidated = false;
    let emailIsValidated = false;
    let OTPTryCount = 0;
    //const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    //const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    //const phoneRegex = /^((((\+[\d\-.]{1,5})?[ \-.]?\d{3})|(\+[\d\-.]{1,5})?[ \-.]?\((\d{3}\)))?[ \-.]?\d{3}[ \-.]?\d{4}\s?(e?x?t?\.?\s?\d{1,7})?)?$/i;

    //Buttons
    let btnValidatePhone = $("#btn-phone-validation");
    let btnValidateEmail = $("#btn-email-validation")
    btnValidatePhone.hide();
    btnValidateEmail.hide();

    //User Inputs
    let nameInput = $("#txtNombre");
    let lastNameInput = $("#txtApellido");
    let secondLastNameInput = $("#txtSegundoApellido");
    let phoneInput = $("#txtTelefono");
    let emailInput = $("#txtEmail");
    let passwordInput = $("#txtPassword");
    let paswordConfirmationInput = $("#txtPasswordCon");
    let emailMFAInput = $("#checkBoxEmail");
    let smsMFAInput = $("#checkBoxSMS");
    let emailOTPInput = $("#email-otp-input");
    let phoneOTPInput = $("#phone-otp-input");
    let photoInput = $("#photo");

    //On change show button to validate
    phoneInput.change(function () {
        if (phoneRegex.test(phoneInput.val()) == false) {
            showError("Número no válido, intente de nuevo", phoneInput);
            return false;
        }
       ShowValidationBtns(phoneIsValidated, btnValidatePhone);
    });
    emailInput.change(function () {
        if (emailRegex.test(emailInput.val()) == false) {
            showError("Error! Formato de correo electrónico no es válido", emailInput);
            return false;
        }
        ShowValidationBtns(emailIsValidated, btnValidateEmail);
    });
    //Show validation buttons and change format
    function ShowValidationBtns(isValid,btn) {
        if (isValid != true) {
            btn.show();
            btn.removeClass("btn btn-outline-secondary btn-sm mt-2")
            btn.addClass("btn btn-outline-danger btn-sm mt-2")
        }
    }

    //*****Send OTP via SMS*****///// 
    btnValidatePhone.click(function () {
        var service = "/api/User/GenerateOTP?method=SMS&contact=" + phoneInput.val();
        var url_API = GetUrlApiService(service);
        RequestOTP(url_API);       
    });

    //*****Send OTP via Email*****///// 
    btnValidateEmail.click(function () {
        var service = "/api/User/GenerateOTP?method=EMAIL&contact=" + emailInput.val()
        var url_API = GetUrlApiService(service);
        RequestOTP(url_API); 
    });

    function RequestOTP(url_API) {

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: url_API,
            ContentType: "application/json",
            data: null,/*{
             * "Metodo":"EMAIL",
             * "Contacto: "emailInput.val()
             * 
             * 
             * } */
            hasContent: false
        }).done(function (response) {
            if (response.Result === "OK") {
                alert(response.Message);
            }
            else {
                var mens = "Hubo un error" + response.Message;
                alert(mens)
            }
        }
        ).fail(function () {
            alert('Hubo al generar el OTP');

        });
    };

    $("#btn-confirm-phone-validation").click(function () {
        let service = "/api/User/ProcessOTPValidation?otp=" + phoneOTPInput.val();
        let url_API = GetUrlApiService(service);

        $.ajax({
            type: "GET",
            url: url_API,
            ContentType: "application/json",
            data: null,
            hasContent: false
        }).done(function (response) {
            if (response.Result === "OK") {
                alert(response.Message);
                PhoneConfirmed();
            }
            else {
                var mens = "Hubo un  " + response.Message;
                alert(mens)
                PhoneNotConfirmed()
            }
        }
        ).fail(function () {
            alert('Hubo al generar al procesar el OTP');

        });
    });

    function PhoneConfirmed() {
        $("#btn-phone-validation").removeClass("btn btn-outline-danger btn-sm mt-2");
        $("#btn-phone-validation").addClass("btn btn-success btn-sm mt-2");
        $("#btn-phone-validation").text("Correo electrónico validado");
        $("#btn-phone-validation").prop('disabled', true)
        phoneInput.prop('disabled', true)
        phoneIsValidated = true;

        $("#phone-otp-lbl").text("Correo electrónico validado con éxito.");
        $("#phone-otp-input").hide();
        $("#btn-confirm-phone-validation").hide();
    }

    function PhoneNotConfirmed() {
        OTPTryCount = OTPTryCount + 1;
        showError("OTP incorrecto, por favor intentar nuevamente", phoneOTPInput);
        console.log(OTPTryCount)
        if (OTPTryCount >= 3) {
            $("#emailModal").modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

            OTPTryCount = 0;
        }
    }

    $("#btn-confirm-email-validation").click(function () {

        let service = "/api/User/ProcessOTPValidation?otp=" + emailOTPInput.val();
        let url_API = GetUrlApiService(service);

        $.ajax({
            type: "GET",
            url: url_API,
            ContentType: "application/json",
            data: null,
            hasContent: false
        }).done(function (response) {
            if (response.Result === "OK") {
                alert(response.Message);
                EmailConfirmed();
            }
            else {
                var mens = "Hubo un  " + response.Message;
                alert(mens)
                EmailNotConfirmed()
            }
        }
        ).fail(function () {
            alert('Hubo al generar al procesar el OTP');

        });

    });

    function EmailConfirmed() {
        $("#btn-email-validation").removeClass("btn btn-outline-danger btn-sm mt-2");
        $("#btn-email-validation").addClass("btn btn-success btn-sm mt-2");
        $("#btn-email-validation").text("Correo electrónico validado");
        $("#btn-email-validation").prop('disabled', true)
        emailInput.prop('disabled', true)
        emailIsValidated = true;

        $("#email-otp-lbl").text("Correo electrónico validado con éxito.");
        $("#email-otp-input").hide();
        $("#btn-confirm-email-validation").hide();
    }

    function EmailNotConfirmed() {
        OTPTryCount = OTPTryCount + 1;
        showError("OTP incorrecto, por favor intentar nuevamente", emailOTPInput);
        console.log(OTPTryCount)
        if (OTPTryCount >= 3) {
            $("#emailModal").modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

            OTPTryCount = 0;
        }
    }

    //Validacion
    function validateInputs(nameInput, lastNameInput, secondLastNameInput, phoneInput, emailInput, passwordInput, paswordConfirmationInput, emailMFAInput, smsMFAInput) {

        if (nameInput.val() == '' || nameInput.val() == null || nameInput.val() == undefined) {
            showError("Error! Por favor ingrese su nombre", nameInput);
            return false;
        }

        if (lastNameInput.val() == '' || lastNameInput.val() == null || lastNameInput.val() == undefined) {
            showError("Error! Por favor ingrese su apellido", lastNameInput);
            return false;
        }

        if (phoneInput.val() == '' || phoneInput.val() == null || phoneInput.val() == undefined) {
            showError("Error! Por favor ingrese su número de teléfono", phoneInput);
            return false;
        }

        if (emailInput.val() == '' || emailInput.val() == null || emailInput.val() == undefined) {
            showError("Error! Por favor ingrese un correo electrónico", emailInput);
            return false;
        }

        if (emailRegex.test(emailInput.val()) == false) {
            showError("Error! Formato de correo electrónico no es valido", emailInput);
            return false;
        }


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

        if (!emailMFAInput.prop('checked') && !smsMFAInput.prop('checked')) {
            showError("Seleccione un método de autneticación como favorito", emailMFAInput);
            showError("Seleccione un método de autneticación como favorito", smsMFAInput);
            return false;
        }

        if (phoneIsValidated == false) {
            showError("Debe de validar el número de teléfono", phoneInput);
            return false;
        }

        if (emailIsValidated == false) {
            showError("Debe de validar correo electrónico", emailInput);
            return false;
        }

        return true;
    };

    ///>Toggle de seleccion de preferencia de MFA
    $("#checkBoxSMS").click(function () {
        emailMFAInput.prop('checked', false)
    });

    $("#checkBoxEmail").click(function () {
        smsMFAInput.prop('checked', false)
    });

    $("#btnUpdateInfo").click(function () {
        if (validateInputs(nameInput, lastNameInput, secondLastNameInput, phoneInput,
            emailInput, passwordInput, paswordConfirmationInput, emailMFAInput, smsMFAInput) != false) {
            
            let smsCheck = 0;
            let emailCheck = 0;
            if ($("#checkBoxSMS").prop('checked')) {
                smsCheck = 1;
                emailCheck = 0;
            } else {
                smsCheck = 0;
                emailCheck = 1;
            }

            let newUser = {};
            newUser.Name = nameInput.val();
            newUser.LastName = lastNameInput.val();
            newUser.SecondLastName = secondLastNameInput.val();
            newUser.Email = emailInput.val();
            newUser.Password = passwordInput.val();
            newUser.Phone = phoneInput.val();
            //Probar esta linea
            newUser.PhotoUrl = photoInput.attr('src');
            newUser.Estatus = 1;
            newUser.DefectRole = 0;
            newUser.SMSActive = smsCheck;
            newUser.EmailActive = emailCheck;
            newUser.DefectRole = 0;
            

            console.log(newUser);

            
            let service = "/api/User/UserRegistration"
            let url_API = GetUrlApiService(service);

            $.ajax({
                Headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "POST",
                url: url_API,
                contentType: "application/json",
                data: JSON.stringify(newUser),
                hasContent: true
            }).done(function (response) {
                if (response.Result === "Ok") {
                    alert('show sucess')
                }
                else {
                    let msg = "Ha ocurrido un error: " + response.Message;
                    alert("Error");
                }

            }).fail(function () {
                alert("Hubo un error");
            });


            var msj = "Listo!"
            showSucess(msj)

            console.log(newUser);
            //$(window).prop("href", "https://localhost:44368/Home/login");
            //window.location.assign("https://localhost:44368/Home/login");

        }
    });




});





