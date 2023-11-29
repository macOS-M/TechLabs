document.addEventListener('DOMContentLoaded', function () {
    $("#v-pills-messages-tab").click(function () {
        $('.fc-next-button').click();
        $('.fc-prev-button').click();
    })



   /* $("#confirmar").click(function () {
        showSucess();
        
    })*/
})

function showSucessCita(msj) {
    Swal.fire({
        title: '¿Desea agendar la cita?',
        text:'¡Una vez agendada, no podrá cambiar la fecha!',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si',
        confirmButtonColor: '#334257',
        denyButtonColor: 'red',
        denyButtonText: `No`,
        okButtonColor: 'red'
    }).then((result) => {
       
        if (result.isConfirmed) {
            Swal.fire('Cita agendada', '', 'success')
            $("#agendarModal").modal("hide");
            $('#icon').removeClass('invisible').addClass('visible');
            $('#agendar').hide();
            
        } else if (result.isDenied) {
            Swal.fire('Cambios no realizados', '', 'info')
        }
    })
}
function agendar() {
    $("#agendarModal").modal("show");
    $("#confirmar").click(function () {
        showSucessCita();
        
        
    });    
}