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
    let cbLabs = $("#checkBoxLaboratorios");
    let cbEmployees = $("#checkBoxEmpleados");
    let cbTests = $("#checkBoxExamenes");
    const usr = $("#inputUser").val();
    const Lab = $("#inputLab");



    $.get(GetUrlApiService("/api/labs/ReturnLabsForList?username=" + usr), function (data, status) {
        insertLabs(data);
    });

    const insertLabs = (lista) => {
        let options = "<option disabled selected>Elige un laboratorio</option>";
        lista.forEach(element => {
            options += `<option value="${element.Id}"> ${element.Name} </option>`
        });
        document.querySelector("#inputLab").innerHTML = options;
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

 

    //Validacion
    function validateInputs(nameInput, lastNameInput,phoneInput, emailInput, emailMFAInput, smsMFAInput) {

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

        if (!emailMFAInput.prop('checked') && !smsMFAInput.prop('checked')) {
            showError("Seleccione un método de autneticación como favorito", emailMFAInput);
            showError("Seleccione un método de autneticación como favorito", smsMFAInput);
            return false;
        }
        return true;
    };

    smsMFAInput.click(function () {
        emailMFAInput.prop('checked', false)
    })
    emailMFAInput.click(function () {
        smsMFAInput.prop('checked', false)
    })

    $("#btnUpdateInfo").click(function () {
        if (validateInputs(nameInput, lastNameInput, phoneInput, emailInput, emailMFAInput, smsMFAInput) != false) {
    
            Swal.fire({
                title: '¿Desea confirmar el registro de ' + nameInput.val() + '?',
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
                   
                    SubmitChanges()
                } else if (result.isDenied) {
                    Swal.fire('Cambios no realizados', '', 'info')
                }
            })   
        }
    });

    function SubmitRegistration() {

        let permissionsUser = {};
        permissionsUser.ManageLabs = cbLabs.prop('checked') ? 1 : 0;
        permissionsUser.ManageTests = cbEmployees.prop('checked') ? 1 : 0;
        permissionsUser.ManageEmployees = cbTests.prop('checked') ? 1 : 0;
        permissionsUser.LabId = Lab.val();

        let newUser = {};
        newUser.Name = nameInput.val();
        newUser.LastName = lastNameInput.val();
        newUser.SecondLastName = secondLastNameInput.val();
        newUser.Email = emailInput.val();
        newUser.Phone = phoneInput.val();
        newUser.PhotoUrl = photoInput.attr('src');
        newUser.Estatus = 1;
        newUser.DefectRole = 1;
        newUser.SMSActive = smsMFAInput.prop('checked') ? 1 : 0;
        newUser.EmailActive = emailMFAInput.prop('checked') ? 1 : 0;
        newUser.userPermissions = permissionsUser;
        newUser.Password = "WelcomeUser1";


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
                setTimeout(() => {
                    window.location.replace(GetUrlLocalService("/Home/ManageUsers"));
                }, 4000)

            }
            else {
                Swal.fire('! ' + response.Message, 'info')
            }

        }).fail(function () {
            Swal.fire('Error', 'Ocurrió un erro inesperado, por favor intente de nuevo', 'warning')

        });
    }
});





