$(document).ready(function () { 

//Cloudinary Service
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