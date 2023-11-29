'use strict';
const btnRegister = document.querySelector("#btnRegister");
const boton_foto = document.querySelector('#btn-foto');

const Name = $("#inputName");
const Phone = $("#inputPhone");
const Mail = $("#InputEmail");
const SocialName = $("#inputSocialName");
const CommercialName = $("#inputComercialName");
const OpenTime = $("#inputOpen");
const CloseTime = $("#inputClose");
const Capacity = $("#inputCapacity");
const WebAddress = $("#inputWebAddress");

const CreatedBy = $("#inputUser");
const fotoDiv = document.querySelector('#foto-div');


function showSucessLab(msj) {
    Swal.fire({
        title: '¿Desea registrar el laboratorio?',
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
            Swal.fire("Laboratorio registrado correctamente", '', 'success')
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

    if (pParam != null) {
        pParam.addClass("is-invalid")

        setTimeout(function () {
            pParam.removeClass("is-invalid");
        }, 5000);
    }

}

const validateData = (lab) => {

    var photoCount = 0;

    document.querySelectorAll(".photo-div").forEach((div, index) => {
        photoCount += 1;
    });


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
    if (photoCount < 5) {
        showError("¡Error! Por favor, ingrese mínimo 5 fotos", null)
        return false;
    }
    
    return true;
}

const sendData = () => {
    var photosString = "";

    document.querySelectorAll(".photo-div").forEach((div, index) => {
        photosString += div.id + ";";
    });

    console.log(photosString);

    var lab = {}

    lab.Name = Name.val();
    lab.Phone = Phone.val();
    lab.Mail = Mail.val();
    lab.SocialName = SocialName.val();
    lab.CommercialName = CommercialName.val();
    lab.OpenTime = OpenTime.val();
    lab.CloseTime = CloseTime.val();
    lab.Capacity = Capacity.val();
    lab.WebAddress = WebAddress.val();
    lab.Photos = photosString;
    lab.CreatedBy = CreatedBy.val();

    var urlAPI = GetUrlApiService("/api/Labs/RegisterLab");

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        method: "POST",
        url: urlAPI,
        contentType: "application/json",
        data: JSON.stringify(lab),
        hasContent: true,
    }).done(function () {
        window.location.replace(GetUrlLocalService("/Home/LabsAdmin"));
    }).fail(function () {
        alert('Hubo un problema')
    });
}

const btnRegisterClick = () => {
    if (validateData()) {
        showSucessLab("Laboratorio añadido correctamente");
    }   
}



let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'dt4umsdjp',
    uploadPreset: 'preset_alex'
}, (err, result) => {
    if (!err && result && result.event === 'success') {
        fotoDiv.innerHTML += `
                        <div class="photo-div img-wrap d-inline-block" id="${result.info.secure_url}">
                        <i class="fa-solid fa-ban close" onClick="(function(){
                            const element = document.getElementById('${result.info.secure_url}');
                             element.remove();
                                return false;
                            })();return false;">
                        
                        </i>
                        <img src="${result.info.secure_url}" height="80" width="80" />
                    </div>
                    `;
        }
    });

boton_foto.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);







btnRegister.addEventListener('click', btnRegisterClick);
