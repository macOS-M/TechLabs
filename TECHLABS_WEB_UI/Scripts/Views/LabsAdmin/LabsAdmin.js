'use strict';
const btnRegister = document.querySelector("#btnConfirmChanges");
const Name = $("#inputName");
const Phone = $("#inputPhone");
const Mail = $("#InputEmail");
const SocialName = $("#inputSocialName");
const CommercialName = $("#inputComercialName");
const OpenTime = $("#inputOpen");
const CloseTime = $("#inputClose");
const Capacity = $("#inputCapacity");
const WebAddress = $("#inputWebAddress");
const Id = $("#labId");

function transformData(data) {

    data.forEach((item, index) => {

        item.Id = item.Id;
        item.Name = item.Name;
        item.Phone = item.Phone;
        item.Mail = item.Mail;
        item.SocialName = item.SocialName;
        item.CommercialName = item.CommercialName;
        item.OpenTime = item.OpenTime.split('T')[1];
        item.CloseTime = item.CloseTime.split('T')[1];
        item.Capacity = item.Capacity;
        item.WebAddress = item.WebAddress;
        item.Photos = item.photosString;
        item.CreatedBy = item.CreatedBy;


        
    });
    return { 'data': data };
    
}

function LoadData() {
    var colData = [];
    colData[0] = { 'data': 'Id' };
    colData[1] = { 'data': 'Name' };
    colData[2] = { 'data': 'Phone' };
    colData[3] = { 'data': 'Mail' };
    //colData[4] = { 'data': 'SocialName' };
    //colData[5] = { 'data': 'CommercialName' }
    colData[4] = { 'data': 'OpenTime' };
    colData[5] = { 'data': 'CloseTime' };
    colData[6] = { 'data': 'Capacity' };
    //colData[9] = { 'data': 'WebAddress' };
    colData[7] = { 'defaultContent': "<button data-toggle='tooltip' data-placement='top' title='Editar' class='btn btn-outline-secondary btn-sm me-2' type='button' id='editar'><i class='fa-solid fa-user-pen'></i></button><button data-toggle='tooltip' data-placement='top' title='Eliminar' class='btn btn-outline-secondary btn-sm me-2' type='button' id= 'eliminar'><i class='fa-solid fa-trash-can'></i></button>" };


    let service = "/api/Labs/ReturnLabsForList" + "?username=" + $("#userSession").val();
    let url = GetUrlApiService(service);

    $('#tblLabs').DataTable({

        ajax: {
            method: "GET",
            url: url,
            contentType: "application/json;charset=utf-8",
            dataSrc: function (json) {
                var json = transformData(json);
                return json.data;
                
            }

        },
        columns: colData,
    })

    $('#tblLabs tbody').on('click', '#editar', function () {
        var tr = $(this).closest('tr');
        var data = $('#tblLabs').DataTable().row(tr).data();
        loadModalOnEditLab(data)
        //Userid = data.Id;
        //photo = photoInput.prop('src', data.PhotoUrl);
        //userRole = data.DefectRole;

        //CheckRole()
        $("#editUserModal").modal("show");
        console.log(data)

    });

    $('#tblLabs tbody').on('click', '#eliminar', function () {
        var tr = $(this).closest('tr');
        var data = $('#tblLabs').DataTable().row(tr).data();
        eliminarLab(data);


    });

    $('#tblLabs tbody').on('click', '#desa', function () {
        var tr = $(this).closest('tr');
        var data = $('#tblLabs').DataTable().row(tr).data();

        console.log("desa" + data.Id)
    });

}

function eliminarLab(data) {
    Swal.fire({
        title: '¿Desea eliminar el laboratorio?',
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
            var lab = {}
            lab.Id = data.Id;

            var urlAPI = GetUrlApiService("/api/Labs/DeleteLab");

            $.ajax({
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "DELETE",
                url: urlAPI,
                contentType: "application/json",
                data: JSON.stringify(lab),
                hasContent: true,
            }).done(function () {
                location.reload();
            }).fail(function () {
                alert('Hubo un problema')
            });

        } else if (result.isDenied) {
            //Swal.fire('Cambios no realizados', '', 'info')
        }
    })
}

function loadModalOnEditLab(pData) {

    Name.val(pData.Name);
    Phone.val(pData.Phone);
    Mail.val(pData.Mail);
    SocialName.val(pData.SocialName);
    CommercialName.val(pData.CommercialName);
    OpenTime.val(pData.OpenTime);
    CloseTime.val(pData.CloseTime);
    Capacity.val(pData.Capacity);
    WebAddress.val(pData.WebAddress);
    Id.val(pData.Id);
}

$("#link-resgiterLab").click(function () {
    window.location.replace(GetUrlLocalService("/home/labregister"));
});

function SubmitChanges() {

    var lab = {}

    lab.Id = Id.val();
    lab.Name = Name.val();
    lab.Phone = Phone.val();
    lab.Mail = Mail.val();
    lab.SocialName = SocialName.val();
    lab.CommercialName = CommercialName.val();
    lab.OpenTime = OpenTime.val();
    lab.CloseTime = CloseTime.val();
    lab.Capacity = Capacity.val();
    lab.WebAddress = WebAddress.val();

    var urlAPI = GetUrlApiService("/api/Labs/UpdateLab");

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        method: "PUT",
        url: urlAPI,
        contentType: "application/json",
        data: JSON.stringify(lab),
        hasContent: true,
    }).done(function () {
        location.reload();
    }).fail(function () {
        alert('Hubo un problema')
    });


}

function validateInputs() {
    if (Name.val() == '' || Name.val() == null || Name.val() == undefined) {
        showError("Error! Por favor ingrese el nombre del laboratorio", Name)
        return false;
    }
    if (Phone.val() == '' || Phone.val() == null || Phone.val() == undefined) {
        showError("Error! Por favor ingrese el número de teléfono", Phone)
        return false;
    }
    if (Mail.val() == '' || Mail.val() == null || Mail.val() == undefined) {
        showError("Error! Por favor ingrese el correo electrónico", Mail)
        return false;
    }
    if (Mail.val() == '' || Mail.val() == null || Mail.val() == undefined) {
        showError("Error! Por favor ingrese el correo electrónico", Mail)
        return false;
    }
    if (SocialName.val() == '' || SocialName.val() == null || SocialName.val() == undefined) {
        showError("Error! Por favor ingrese la Razón Social", SocialName)
        return false;
    }
    if (CommercialName.val() == '' || CommercialName.val() == null || CommercialName.val() == undefined) {
        showError("Error! Por favor ingrese el nombre comercial", CommercialName)
        return false;
    }
    if (OpenTime.val() == '' || OpenTime.val() == null || OpenTime.val() == undefined) {
        showError("Error! Por favor ingrese la hora de apertura", OpenTime)
        return false;
    }
    if (CloseTime.val() == '' || CloseTime.val() == null || CloseTime.val() == undefined) {
        showError("Error! Por favor ingrese la hora de cierre", CloseTime)
        return false;
    }
    if (Capacity.val() == '' || Capacity.val() == null || Capacity.val() == undefined) {
        showError("Error! Por favor ingrese la capacidad", Capacity)
        return false;
    }
    return true;
};

$(document).ready(function () {
    LoadData();
    $('[data-toggle="tooltip"]').tooltip();
});

function updateLab() {
    if (validateInputs() != false) {


        Swal.fire({
            title: '¿Desea actualizar el laboratorio?',
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
                //Swal.fire('Cita cancelada', '', 'success')
                SubmitChanges()
            } else if (result.isDenied) {
                //Swal.fire('Cambios no realizados', '', 'info')
            }
        })
    }
}

btnRegister.addEventListener('click', updateLab);