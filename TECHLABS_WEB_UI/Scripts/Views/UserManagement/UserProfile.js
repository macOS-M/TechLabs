$(document).ready(function () {
    let userId;
    let inSessionUserRole;
    let nameInput = $("#txtNombre");
    let lastNameInput = $("#txtApellido");
    let secondLastNameInput = $("#txtSegundoApellido");
    let phoneInput = $("#txtTelefono");
    let emailInput = $("#txtEmail");
    let passwordInput = $("#txtPassword");
    let paswordConfirmationInput = $("#txtPasswordCon");
    let emailMFAInput = $("#checkBoxEmail");
    let smsMFAInput = $("#checkBoxSMS");
    let photoInput = $("#photo");

    let userInSession = $("#userSession").prop('value');//"josuelu2@gmail.com"//
    let data = {}
    data.Email = userInSession
    LoadData()

    function LoadData() {
        let service = "/api/User/RetrieveUserData";
        let url = GetUrlApiService(service);

        $.ajax({
            'url': url,
            'type': 'POST',
            'data': data,
            'success': function (data) {
                if (data.Result == "OK") {
                    LoadForm(data.Data)
                }
            }
        });
    };

    function LoadForm(data) {
        userId = data.Id;
        inSessionUserRole = data.DefectRole;
        nameInput.val(data.Name);
        lastNameInput.val(data.LastName);
        secondLastNameInput.val(data.SecondLastName);
        phoneInput.val(data.Phone);
        emailInput.val(data.Email);
        passwordInput.val(data.Password);
        paswordConfirmationInput.val(data.Password);
        photoInput.prop('src', data.PhotoUrl);
        data.EmailActive == 1 ? emailMFAInput.prop('checked', true) : emailMFAInput.prop('checked', false)
        data.SMSActive == 1 ? smsMFAInput.prop('checked', true) : smsMFAInput.prop('checked', false);

    }

    //Event Listener for button to update data
    $("#btnUpdateInfo").click(function () {
        if (validateInputs(nameInput, lastNameInput, secondLastNameInput, phoneInput,
            emailInput, passwordInput, paswordConfirmationInput, emailMFAInput, smsMFAInput) != false) {

            Swal.fire({
                title: '¿Desea actualizar su información?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Si',
                confirmButtonColor: '#334257',
                denyButtonColor: 'red',
                denyButtonText: 'No',
                okButtonColor: 'red'
            }).then((result) => {        
                if (result.isConfirmed) {
                    SubmitChanges()
                } else if (result.isDenied) {
                }
            })
        }
    });

    function SubmitChanges() {
       
        let updatedUser = {};
        updatedUser.Id = userId;
        updatedUser.Name = nameInput.val();
        updatedUser.LastName = lastNameInput.val();
        updatedUser.SecondLastName = secondLastNameInput.val();
        updatedUser.Email = emailInput.val();
        updatedUser.Password = passwordInput.val();
        updatedUser.Phone = phoneInput.val();
        updatedUser.PhotoUrl = photoInput.attr('src');
        updatedUser.Estatus = 1;
        updatedUser.DefectRole = inSessionUserRole;
        updatedUser.SMSActive = smsMFAInput.prop('checked') ? 1 : 0;
        updatedUser.EmailActive = emailMFAInput.prop('checked') ? 1 : 0;

        let service = "/api/User/UpdateSelfProfile"
        let url_API = GetUrlApiService(service);

        $.ajax({
            Headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "PUT",
            url: url_API,
            contentType: "application/json",
            data: JSON.stringify(updatedUser),
            hasContent: true
        }).done(function (response) {
            if (response.Result === "OK") {
                LoadData()
                Swal.fire('Cambios realizados con éxito', '', 'success')
            }
        }).fail(function (response) {
            alert("Hubo un error");
        });
    }

    smsMFAInput.click(function () {
        emailMFAInput.prop('checked', false)
    })
    emailMFAInput.click(function () {
        smsMFAInput.prop('checked', false)
    })

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
            showError("La contraseña dede de tener:<br /> Mínimo 8 caracteres <br />Mayúsculas y minúsculas <br /> Números <br />Caracter especial", passwordInput)
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
            showError("Seleccione un método de autenticación como favorito", emailMFAInput);
            showError("Seleccione un método de autenticación como favorito", smsMFAInput);
            return false;
        }   
        return true;
    };
   
});