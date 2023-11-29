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
    //let btnPayment = $("#PayModal");
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
    function ShowValidationBtns(isValid, btn) {
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
            hasContent: false
        }).done(function (response) {
            if (response.Result === "OK") {
            }
            else {
                Swal.fire('Error', '', 'warning')
            }
        }
        ).fail(function () {
            Swal.fire('Error', '', 'warning')

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
                PhoneConfirmed();
            }
            else {
                Swal.fire('Error', 'Hubo un Error al procesar el OTP', 'warning')
                PhoneNotConfirmed()
            }
        }
        ).fail(function () {           
            Swal.fire('Error', 'OTP incorrecto, por favor intente de nuevo', 'warning')
        });
    });

    function PhoneConfirmed() {
         $("#btn-phone-validation").removeClass("btn btn-outline-danger btn-sm mt-2");
         $("#btn-phone-validation").addClass("btn btn-success btn-sm mt-2");
         $("#btn-phone-validation").text("Validado");
         $("#btn-phone-validation").prop('disabled', true)
         phoneInput.prop('disabled', true)
         phoneIsValidated = true;
 
        $("#phone-otp-lbl").text("Número de teléfono móvil  validado con éxito.");
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
                 EmailConfirmed();
             }
             else {
                 Swal.fire('Error', 'Hubo un Error al procesar el OTP', 'warning')               
                 EmailNotConfirmed()
             }
         }
         ).fail(function () {
             Swal.fire('Error', 'OTP incorrecto, por favor intente de nuevo', 'warning') 
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
function validateInputs(nameInput, lastNameInput, phoneInput, emailInput, passwordInput, paswordConfirmationInput,
    emailMFAInput, smsMFAInput) {

        if (nameInput.val() == '' || nameInput.val() == null || nameInput.val() == undefined) {
            showError("Error! Por favor ingrese el nombre", nameInput);
            return false;
        }
        if (lastNameInput.val() == '' || lastNameInput.val() == null || lastNameInput.val() == undefined) {
            showError("Error! Por favor ingrese el apellido", lastNameInput);
            return false;
        }
        if (phoneInput.val() == '' || phoneInput.val() == null || phoneInput.val() == undefined) {
            showError("Error! Por favor ingrese el número de teléfono", phoneInput);
            return false;
        }
        if (emailInput.val() == '' || emailInput.val() == null || emailInput.val() == undefined) {
            showError("Error! Por favor ingrese el correo electrónico", emailInput);
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
        if (validateInputs(nameInput, lastNameInput, phoneInput, emailInput, passwordInput, paswordConfirmationInput,
            emailMFAInput, smsMFAInput) != false) {
     

            Swal.fire({
                title: '¿Desea confirmar su registro ?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Si',
                confirmButtonColor: '#334257',
                denyButtonColor: 'red',
                denyButtonText: 'No',
                okButtonColor: 'red'
            }).then((result) => {          
                if (result.isConfirmed) {
                    SubmitRegistration()
                    
                } else if (result.isDenied) {
                    Swal.fire('Cambios no realizados', '', 'info')
                }
            })
        }
    });

    function SubmitRegistration() {

        let newUser = {};
        newUser.Name = nameInput.val();
        newUser.LastName = lastNameInput.val();
        newUser.SecondLastName = secondLastNameInput.val();
        newUser.Email = emailInput.val();
        newUser.Password = passwordInput.val();
        newUser.Phone = phoneInput.val();
        newUser.PhotoUrl = photoInput.attr('src');
        newUser.Estatus = 1;
        newUser.DefectRole = 2;
        newUser.SMSActive = smsMFAInput.prop('checked') ? 1 : 0;
        newUser.EmailActive = emailMFAInput.prop('checked') ? 1 : 0;
        newUser.Password = passwordInput.val();


        


        let service = "/api/User/UserRegistration";
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
            if (response.Result === "OK") {
                Swal.fire('Registro confirmado', '', 'success')
            }
            else {
                Swal.fire('! ' + response.Message, 'info')
            }

        }).fail(function () {
            Swal.fire('Error', 'Ocurrió un erro inesperado, por favor intente de nuevo', 'warning') 
        });

    }

    const boton_foto = document.querySelector('#btn-foto');
    const imagen = document.querySelector('#photo');


    let widget_cloudinary = cloudinary.createUploadWidget({
        cloudName: 'dt4umsdjp',
        uploadPreset: 'preset_alex'
    }, (err, result) => {
        if (!err && result && result.event === 'success') {
            console.log('Imagen subida con éxito', result.info);
            imagen.src = result.info.secure_url;
        }
    });

    boton_foto.addEventListener('click', () => {
        widget_cloudinary.open();
    }, false);

});





