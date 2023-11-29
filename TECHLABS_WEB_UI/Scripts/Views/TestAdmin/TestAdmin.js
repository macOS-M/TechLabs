'use strict';
const btnUpdate = document.querySelector("#btnConfirmChanges");
const Id = $("#inputId");
const Name = $("#inputName");
const Description = $("#inputDescription");
const SampleReq = $("#inputSampleRequired");
const Instructions = $("#inputInstrucions");
const Method = $("#inputMethod");
const Reference = $("#inputReference");
const Cost = $("#inputCost");
//const Category = $("#inputCatergory");
//const Lab = $("#inputLab");
const usr = $("#inputUser");

function transformData(data) {

    data.forEach((test, index) => {


    });
    return { 'data': data };
}


$("#link-resgiterTest").click(function () {
    window.location.replace(GetUrlLocalService("/home/testregister"));
});


function LoadData() {
    var colData = [];
    colData[0] = { 'data': 'Id' };
    colData[1] = { 'data': 'Name' };
    colData[2] = { 'data': 'Description' };
    colData[3] = { 'data': 'SampleReq' };
    colData[4] = { 'data': 'Instructions' };
    colData[5] = { 'data': 'Method' }
    colData[6] = { 'data': 'Reference' };
    colData[7] = { 'data': 'Cost' };
    colData[8] = { 'data': 'Category' };
    colData[9] = { 'data': 'Lab' };
    colData[10] = { 'defaultContent': "<button data-toggle='tooltip' data-placement='top' title='Editar' class='btn btn-outline-secondary btn-sm me-2' type='button' id='editar'><i class='fa-solid fa-user-pen'></i></button><button data-toggle='tooltip' data-placement='top' title='Eliminar' class='btn btn-outline-secondary btn-sm me-2' type='button' id= 'eliminar'><i class='fa-solid fa-trash-can'></i></button>" };


    let service = "/api/Test/GetTestsForAdmin" + "?user=" + usr.val();
    let url = GetUrlApiService(service);

    $('#tblTests').DataTable({

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

    $('#tblTests tbody').on('click', '#editar', function () {
        var tr = $(this).closest('tr');
        var data = $('#tblTests').DataTable().row(tr).data();
        loadModalOnEditLab(data)
        //Userid = data.Id;
        //photo = photoInput.prop('src', data.PhotoUrl);
        //userRole = data.DefectRole;

        //CheckRole()
        $("#editUserModal").modal("show");
        console.log(data)

    });

    $('#tblTests tbody').on('click', '#eliminar', function () {
        var tr = $(this).closest('tr');
        var data = $('#tblTests').DataTable().row(tr).data();
        eliminarTest(data);


    });

    $('#tblTests tbody').on('click', '#desa', function () {
        var tr = $(this).closest('tr');
        var data = $('#tblTests').DataTable().row(tr).data();

        console.log("desa" + data.Id)
    });

}

function eliminarTest(data) {
    Swal.fire({
        title: '¿Desea eliminar la prueba?',
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
            var test = {}
            test.Id = data.Id;

            var urlAPI = GetUrlApiService("/api/Test/DeleteTest");

            $.ajax({
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "DELETE",
                url: urlAPI,
                contentType: "application/json",
                data: JSON.stringify(test),
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

    Id.val(pData.Id);
    Name.val(pData.Name);
    Description.val(pData.Description);
    SampleReq.val(pData.SampleReq);
    Instructions.val(pData.Instructions);
    Method.val(pData.Method);
    Reference.val(pData.Reference);
    Cost.val(pData.Cost);
    //Category.val(pData.Category);
    //Lab.val(pData.Lab);


}

function SubmitChanges() {

    var test = {}
    test.Id = Id.val();
    test.Name = Name.val();
    test.Description = Description.val();
    test.SampleReq = SampleReq.val();
    test.Instructions = Instructions.val();
    test.Method = Method.val();
    test.Reference = Reference.val();
    test.Cost = Cost.val();
    //test.Category = Category.val();
    //test.Lab = Lab.val();

    var urlAPI = GetUrlApiService("/api/Test/UpdateTest");

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        method: "PUT",
        url: urlAPI,
        contentType: "application/json",
        data: JSON.stringify(test),
        hasContent: true,
    }).done(function () {
        location.reload();
    }).fail(function () {
        alert('Hubo un problema')
    });
}

function validateInputs() {
    if (Name.val() == '' || Name.val() == null || Name.val() == undefined) {
        showError("Por favor complete los campos resaltados en rojo", Name)
        return false;
    }
    if (Description.val() == '' || Description.val() == null || Description.val() == undefined) {
        showError("Por favor complete los campos resaltados en rojo", Description)
        return false;
    }
    if (SampleReq.val() == '' || SampleReq.val() == null || SampleReq.val() == undefined) {
        showError("Por favor complete los campos resaltados en rojo", SampleReq)
        return false;
    }
    if (Instructions.val() == '' || Instructions.val() == null || Instructions.val() == undefined) {
        showError("Por favor complete los campos resaltados en rojo", Instructions)
        return false;
    }
    if (Method.val() == '' || Method.val() == null || Method.val() == undefined) {
        showError("Por favor complete los campos resaltados en rojo", Method)
        return false;
    }
    if (Reference.val() == '' || Reference.val() == null || Reference.val() == undefined) {
        showError("Por favor complete los campos resaltados en rojo", Reference)
        return false;
    }
    if (Cost.val() == '' || Cost.val() == null || Cost.val() == undefined) {
        showError("Por favor complete los campos resaltados en rojo", Cost)
        return false;
    }
    //if (Category.val() == '' || Category.val() == null || Category.val() == undefined) {
    //    showError("Por favor complete los campos resaltados en rojo", Category)
    //    return false;
    //}
    //if (Lab.val() == '' || Lab.val() == null || Lab.val() == undefined) {
    //    showError("Por favor complete los campos resaltados en rojo", Category)
    //    return false;
    //}
    return true;
};

$(document).ready(function () {
    LoadData();
    $('[data-toggle="tooltip"]').tooltip();
});

function updateLab() {
    if (validateInputs() != false) {


        Swal.fire({
            title: '¿Desea actualizar la prueba?',
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

btnUpdate.addEventListener('click', updateLab);