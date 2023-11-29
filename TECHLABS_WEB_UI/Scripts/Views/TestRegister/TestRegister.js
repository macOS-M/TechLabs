'use strict';
const btnRegister = document.querySelector("#btnRegister");
const Name = $("#inputName");
const Description = $("#inputDescription");
const SampleReq = $("#inputSampleRequired");
const Instructions = $("#inputInstrucions");
const Method = $("#inputMethod");
const Reference = $("#inputReference");
const Cost = $("#inputCost");
const Category = $("#inputCatergory");
const Lab = $("#inputLab");
const usr = $("#inputUser");

function showSucessPrueba(msj) {
    Swal.fire({
        title: '¿Desea registrar la prueba?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si',
        confirmButtonColor: '#334257',
        denyButtonColor: 'red',
        denyButtonText: `No`,
        okButtonColor: 'red'
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            sendData();
            Swal.fire(msj, '', 'success')
        }
    })
}

function showError(msj, pParam) {
    Swal.fire({
        title: msj,
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#334257',
        denyButtonText: `Don't save`,
    });

    pParam.addClass("is-invalid")

    setTimeout(function () {
        pParam.removeClass("is-invalid");
    }, 5000);
}

const validateData = (lab) => {
    if (Name.val() == '' || Name.val() == null || Name.val() == undefined) {
        showError("Todos los campos son requeridos", Name)
        return false;
    }
    if (Description.val() == '' || Description.val() == null || Description.val() == undefined) {
        showError("Todos los campos son requeridos", Description)
        return false;
    }
    if (SampleReq.val() == '' || SampleReq.val() == null || SampleReq.val() == undefined) {
        showError("Todos los campos son requeridos", SampleReq)
        return false;
    }
    if (Instructions.val() == '' || Instructions.val() == null || Instructions.val() == undefined) {
        showError("Todos los campos son requeridos", Instructions)
        return false;
    }
    if (Method.val() == '' || Method.val() == null || Method.val() == undefined) {
        showError("Todos los campos son requeridos", Method)
        return false;
    }
    if (Reference.val() == '' || Reference.val() == null || Reference.val() == undefined) {
        showError("Todos los campos son requeridos", Reference)
        return false;
    }
    if (Cost.val() == '' || Cost.val() == null || Cost.val() == undefined) {
        showError("Todos los campos son requeridos", Cost)
        return false;
    }
    if (Category.val() == '' || Category.val() == null || Category.val() == undefined) {
        showError("Todos los campos son requeridos", Category)
        return false;
    }
    if (Lab.val() == '' || Lab.val() == null || Lab.val() == undefined) {
        showError("Todos los campos son requeridos", Category)
        return false;
    }

    return true;
}

const insertCategories = (lista) => {
    let options = "<option disabled selected>Elige una categoría</option>";
    lista.forEach(element => {
        options += `<option value="${element.Id}"> ${element.Category} </option>`
    });
    document.querySelector("#inputCatergory").innerHTML = options;
}

const insertLabs = (lista) => {
    let options = "<option disabled selected>Elige un laboratorio</option>";
    lista.forEach(element => {
        options += `<option value="${element.Id}"> ${element.Name} </option>`
    });
    document.querySelector("#inputLab").innerHTML = options;
}

const sendData = () => {
    var test = {}

    test.Name = Name.val();
    test.Description = Description.val();
    test.SampleReq = SampleReq.val();
    test.Instructions = Instructions.val();
    test.Method = Method.val();
    test.Reference = Reference.val();
    test.Cost = Cost.val();
    test.Category = Category.val();
    test.Lab = Lab.val();

    var urlAPI = GetUrlApiService("/api/Test/RegisterTest");

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        method: "POST",
        url: urlAPI,
        contentType: "application/json",
        data: JSON.stringify(test),
        hasContent: true,
    }).done(function () {
        window.location.replace(GetUrlLocalService("/Home/TestAdmin"));
    }).fail(function () {
        alert('Hubo un problema')
    });
}

const btnRegisterClick = () => {
    if (validateData()) {
        showSucessPrueba("Prueba añadida correctamente");
    }
}



$(document).ready(function () {

    $.get(GetUrlApiService("/api/testcategory/ReturnAllTestCategories"), function (data, status) {
        insertCategories(data);
    });

    $.get(GetUrlApiService("/api/labs/ReturnLabsForTestCreation?username=" + usr.val()), function (data, status) {
        insertLabs(data);
    });




});

btnRegister.addEventListener('click', btnRegisterClick);


//TEST_ID
//NAME
//DESCRIPTION
//SAMPLE_REQUIRED
//INSTRUCTIONS
//METHODOLOGY
//REFERENCE
//COST
//LAB_ID
//CATEGORY_ID
//MESUREMENT_NAME
//MESUREMENT
//STATU__ID 