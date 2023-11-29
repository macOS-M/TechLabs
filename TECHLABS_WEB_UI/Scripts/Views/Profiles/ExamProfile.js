$(document).ready(function () {
   // LoadData();

    $("#agregarCarrito").click(function () {

        Swal.fire('Listo', 'Prueba agregada a carrito', 'success')

    })


})

/*
function LoadData() {

    var id = getid();

    console.log(urlparams)

    let service = '' + urlparams[2];
    let url = GetUrlApiService(service)


    console.log(url)
}


function getid() {
    var id = getParameterByName('id');
    return id;
}


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}*/