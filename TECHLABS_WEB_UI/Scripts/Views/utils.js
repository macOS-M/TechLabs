this.localURL ="https://localhost:44368"
this.appApiURL = "https://localhost:44308";
this.appApiURL_Azure = "";
this.appUIURL_Azure = "";

const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
const phoneRegex = /^((((\+[\d\-.]{1,5})?[ \-.]?\d{3})|(\+[\d\-.]{1,5})?[ \-.]?\((\d{3}\)))?[ \-.]?\d{3}[ \-.]?\d{4}\s?(e?x?t?\.?\s?\d{1,7})?)?$/i;


GetUrlApiService = function (service) {
    var hostname = $(location).attr('hostname');
    if (hostname === 'localhost')
        return this.appApiURL + service;
    else
        return this.appApiURL_Azure + service;
}

GetUrlLocalService = function (service) {
    var hostname = $(location).attr('hostname');
    if (hostname === 'localhost')
        return this.localURL + service;
    else
        return this.appUIURL_Azure + service;
}



showError = function (msj, pParam) {
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

showSucess =function showSucess(msj) {
    Swal.fire({
        title: '¿Desea confirmar el registro?',
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
            Swal.fire(msj, '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Registro confirmado', '', 'info')
        }
    })


}


