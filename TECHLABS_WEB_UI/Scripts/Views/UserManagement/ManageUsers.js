$(document).ready(function () {

    let userInSession = $("#userSession").val();

    LoadData();
    $('[data-toggle="tooltip"]').tooltip();

    

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
    let statusDropdown = $("#status-list")
    let roleDropdown = $("#role-list");
    let Userid;
    let photo;
    let userRole;

    //Permissions;
    let labId;
    let cbManageLabs = $("#checkBoxLaboratorios");
    let cbManageEmployees = $("#checkBoxEmpleados");
    let cbManageExams = $("#checkBoxExamenes");



    

   /* $.get(GetUrlApiService("/api/User/RetrieveAllUsers"), function (data, status) {
        console.log(data);
        LoadData(data)
    });*/

    function transformData(data) {

        data.forEach((item, index) => {

            item.Id = item.Id;
            item.Name = item.Name;
            item.LastName = item.LastName;
            item.Phone = item.Phone;
            item.Email = item.Email;
            item.DefectRole = transformRoleToName(item.DefectRole);
            item.Estatus = item.Estatus == 1 ? 'Activo' : 'Inactivo';
            
        });
        return { 'data': data };
    }

    function transformRoleToName(pRole) {
        let roleName;
        switch (pRole) {
            case 0:
                roleName = 'Cliente';
                break;
            case 1:
                roleName = 'Empleado';
                break;
            case 2:
                roleName = 'Administrador';
                break;
            case 3:
                roleName = 'Super Admin';
                break;
        }

        return roleName;
    }

        
   
    function LoadData() {
        var colData = [];
        colData[0] = { 'data': 'Id' };
        colData[1] = { 'data': 'Name' };
        colData[2] = { 'data': 'LastName' };
        colData[3] =  { 'data': 'Phone' };
        colData[4] = { 'data': 'Email' };
        colData[5] = { 'data': 'DefectRole'}
        colData[6] = { 'data': 'Estatus' };
        colData[7] = { 'defaultContent': "<button data-toggle='tooltip' data-placement='top' title='Editar' class='btn btn-outline-secondary btn-sm me-2' type='button' id='editar'><i class='fa-solid fa-user-pen'></i></button><button data-toggle='tooltip' data-placement='top' title='Eliminar' class='btn btn-outline-secondary btn-sm me-2' type='button' id= 'eliminar'><i class='fa-solid fa-trash-can'></i></button><button data-toggle='tooltip' data-placement='top' title='Desactivar'class='btn btn-outline-secondary btn-sm' type='button' id= 'desa'><i class='fa-solid fa-toggle-off'></i></button>" };

        let service = "/api/User/RetrieveAllUsers" + "?email=" + userInSession ;
        let url = GetUrlApiService(service);

        $('#tblUsers').DataTable({
            
            ajax: {
                method: "GET",
                url: url,
                contentType: "application/json;charset=utf-8",
                dataSrc: function (json) {
                    //var json = { 'data': json }
                    var json = transformData(json);
                    console.log(json.data)
                    return json.data;               
                }
            
            },
            columns: colData,                                 
        })
        
        $('#tblUsers tbody').on('click', '#editar', function () {
            var tr = $(this).closest('tr');
            var data = $('#tblUsers').DataTable().row(tr).data();
            loadModalOnEdit(data)
            Userid = data.Id;
            photo = photoInput.prop('src', data.PhotoUrl); 
            labId = data.userPermissions.LabId
            //userRole = data.DefectRole;
           
            //CheckRole()
            $("#editUserModal").modal("show");           
            console.log(data)
        
        });

        $('#tblUsers tbody').on('click', '#eliminar', function () {
            var tr = $(this).closest('tr');
            var data = $('#tblUsers').DataTable().row(tr).data();

            Swal.fire({
                title: '¿Desea eliminar el usuario?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Si',
                confirmButtonColor: '#334257',
                denyButtonColor: 'red',
                denyButtonText: 'No',
                okButtonColor: 'red'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Usuario eliminado', '', 'success')
                    //SubmitChanges()
                } else if (result.isDenied) {
                    Swal.fire('Cambios no realizados', '', 'info')
                }
            })

            console.log("Eliminar" + data.Id)
     
        });

        $('#tblUsers tbody').on('click', '#desa', function () {
            var tr = $(this).closest('tr');
            var data = $('#tblUsers').DataTable().row(tr).data();

            Swal.fire({
                title: '¿Desea desactivar el usuario?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Si',
                confirmButtonColor: '#334257',
                denyButtonColor: 'red',
                denyButtonText: 'No',
                okButtonColor: 'red'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Usuario desactivado', '', 'success')
                    //SubmitChanges()
                } else if (result.isDenied) {
                    Swal.fire('Cambios no realizados', '', 'info')
                }
            })


            console.log("desa" + data.Id)     
        });
       
    }

    function loadModalOnEdit(pData) {

        $("#client-option").prop('disabled', true);
        $("#employee-option").prop('disabled', true);
        $("#labAdmin-option").prop('disabled', true);
        $("#superAdmin-option").prop('disabled', true);

        $("#active-option").prop('disabled', false);
        $("#inactive-option").prop('disabled', false);



        $("#lbl-permissions").hide();
        $('#div-permissions').children().hide();


        statusDropdown.prop('disabled', false)


        switch (pData.DefectRole) {
            case "Cliente":
                roleDropdown.val(pData.DefectRole)
               // roleDropdown.prop('disabled', true)
                //statusDropdown.prop('disabled', false)
                $("#client-option").prop('disabled', false);
             
               

               // $("#lbl-permissions").hide();
                //$('#div-permissions').children().hide();
                break;
            case "Empleado":
                roleDropdown.val(pData.DefectRole);

                //roleDropdown.prop('disabled', false);
               // $("#client-option").prop('disabled', true);
               // $("#superAdmin-option").prop('disabled', true);
                $("#lbl-permissions").show();
                $('#div-permissions').children().show();
                $('#div-permissions').children().prop('disabled', false);
                $('#div-permissions').children().prop('checked', false);


                pData.userPermissions.ManageLabs == 1 ? cbManageLabs.prop('checked', true) : cbManageLabs.prop('checked', false);
                pData.userPermissions.ManageEmployees == 1 ? cbManageEmployees.prop('checked', true) : cbManageEmployees.prop('checked', false);
                pData.userPermissions.ManageTests == 1 ? cbManageExams.prop('checked', true) : cbManageExams.prop('checked', false);

                $("#employee-option").prop('disabled', false);
                $("#labAdmin-option").prop('disabled', false);

                break;
            case "Administrador":
                roleDropdown.val(pData.DefectRole)
                //roleDropdown.prop('disabled', false)
                //statusDropdown.prop('disabled', false)
                //roleDropdown.prop('disabled', false)

              
                $("#employee-option").prop('disabled', false);
                $("#labAdmin-option").prop('disabled', false);

                //$("#lbl-permissions").show();
                //$('#div-permissions').children().show();
                //$('#div-permissions').children().prop('checked', true)
                //$('#div-permissions').children().prop('disabled', true)

                pData.userPermissions.ManageLabs == 1 ? cbManageLabs.prop('checked', true) : cbManageLabs.prop('checked', false);
                pData.userPermissions.ManageEmployees == 1 ? cbManageEmployees.prop('checked', true) : cbManageEmployees.prop('checked', false);
                pData.userPermissions.ManageTests == 1 ? cbManageExams.prop('checked', true) : cbManageExams.prop('checked', false);

                $("#employee-option").prop('disabled', false);
                $("#labAdmin-option").prop('disabled', false);

                break;
            case "Super Admin":
                roleDropdown.val(pData.DefectRole)
                //roleDropdown.prop('disabled', true)
                $("#superAdmin-option").prop('disabled', false);

               // $("#lbl-permissions").show();
               // $('#div-permissions').children().show();
               // $('#div-permissions').children().prop('checked', true)

                pData.userPermissions.ManageLabs == 1 ? cbManageLabs.prop('checked', true) : cbManageLabs.prop('checked', false);
                pData.userPermissions.ManageEmployees == 1 ? cbManageEmployees.prop('checked', true) : cbManageEmployees.prop('checked', false);
                pData.userPermissions.ManageTests == 1 ? cbManageExams.prop('checked', true) : cbManageExams.prop('checked', false);

                $("#inactive-option").prop('disabled', true);
                //$('#div-permissions').children().prop('disabled', true)
                //statusDropdown.prop('disabled', true)
                break;
        } 


        $("#editingUserName").text(pData.Name + " " + pData.LastName)
        nameInput.val(pData.Name);
        lastNameInput.val(pData.LastName);
        secondLastNameInput.val(pData.SecondLastName);
        phoneInput.val(pData.Phone);
        emailInput.val(pData.Email);
        passwordInput.val(pData.Password);

        if (pData.SMSActive == 1) {
            smsMFAInput.prop('checked', true);
        }
        if (pData.EmailActive == 1) {
            smsMFAInput.prop('checked', true);
        }

        statusDropdown.val(pData.Estatus);
        roleDropdown.val(pData.DefectRole)
     
        
            
       
    }

    ///>Toggle de seleccion de preferencia de MFA
    smsMFAInput.click(function () {
        emailMFAInput.prop('checked', false)
    })
    emailMFAInput.click(function () {
        smsMFAInput.prop('checked', false)
    })

    $("#link-resgiterEmpolyee").click(function () {
        window.location.replace(GetUrlLocalService("/home/Employeeregistration"));
    });

    //Tipo Usuario on Chnage
    roleDropdown.change(function () {

        if (roleDropdown.val() == 'Empleado') {

            $("#lbl-permissions").show();
            $('#div-permissions').children().show();
            $('#div-permissions').children().prop('disabled', false);
            //$('#div-permissions').children().prop('checked', false);
        } else {
            $("#lbl-permissions").hide();
            $('#div-permissions').children().hide();


        }


    });



    $("#btnConfirmChanges").click(function () {
        if (validateInputs(nameInput, lastNameInput, phoneInput, emailInput, passwordInput, emailMFAInput, smsMFAInput) != false) {


            Swal.fire({
                title: '¿Desea actualizar el usuario ' +nameInput.val()  + '?',
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
        updatedUser.Id = Userid;
        updatedUser.Name = nameInput.val();
        updatedUser.LastName = lastNameInput.val();
        updatedUser.SecondLastName = secondLastNameInput.val();
        updatedUser.Email = emailInput.val();
        updatedUser.Password = passwordInput.val();
        updatedUser.Phone = phoneInput.val();
        updatedUser.PhotoUrl = photoInput.attr('src');
        updatedUser.Estatus = statusDropdown.val() == 'Activo' ? 1 : 0;
        updatedUser.DefectRole = transformRoleToNumber(roleDropdown.val());
        updatedUser.SMSActive = smsMFAInput.prop('checked') ? 1 : 0;
        updatedUser.EmailActive = emailMFAInput.prop('checked') ? 1 : 0;

        if (updatedUser.DefectRole == 1) {
            let permissionsUser = {};
            permissionsUser.ManageLabs = cbManageLabs.prop('checked') ? 1 : 0;
            permissionsUser.ManageTests = cbManageExams.prop('checked') ? 1 : 0;
            permissionsUser.ManageEmployees = cbManageEmployees.prop('checked') ? 1 : 0;
            permissionsUser.LabId = labId;

            updatedUser.userPermissions = permissionsUser;



        }

        let service = "/api/User/UpdateUser"
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
                
               // $("#editUserModal").modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                location.reload();
               
               
            }
            
        }).fail(function (response) {
            alert("Hubo un error");
        });

        
    }

    function transformRoleToNumber(pRole) {
        let roleNumber;
        switch (pRole) {
            case 'Cliente':
                roleNumber =  0;
                break;
            case 'Empleado':
                roleNumber =  1;
                break;
            case 'Administrador':
                roleNumber =  2;
                break;
            case 'Super Admin':
                roleNumber =  3;
                break;
        }

        return roleNumber;
    }


   
    function validateInputs(nameInput, lastNameInput, phoneInput, emailInput, passwordInput, emailMFAInput, smsMFAInput) {
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
            showError("Error! Formato de correo electrónico no es válido", emailInput);
            return false;
        }
        if (passwordInput.val() == '' || passwordInput.val() == null || passwordInput.val() == undefined) {
            showError("Error! Por favor ingrese una contraseña", passwordInput);
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