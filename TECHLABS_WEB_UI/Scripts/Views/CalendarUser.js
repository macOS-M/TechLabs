document.addEventListener('DOMContentLoaded', function () {

    let myEvents = [
        {
            id: '1',
            title: 'Endoscopía', // a property!
            start: '2022-11-10T06:30:00',
            end: '2022-11-10T12:59:00',
            description: 'Pruebas generales de laboratorio.',
            instructions: 'N/A',
            sample: 'N/A',
            cost: '₡10500',
            status: 'Completado',
            color: '#54C571',
            lab: 'Labin'


        },
        {
            id: '2',
            title: ' Examen de sangre', // a property!
            start: '2022-11-25T06:30:00',
            end: '2022-11-25T12:30:00',
            description: 'Analisis de sangre que ayuda a comprobar la presencia de determinadas enfermedades y afecciones',
            instructions: '8 horas de ayuno antes de la cita',
            sample: 'N/A',
            cost: '₡8500',
            status: 'Pendiente',
            lab: 'Labin'


        },
        {
            id: '3',
            title: 'Examen de orina', // a property!
            start: '2022-11-25T14:00:00',
            end: '2022-11-25T16:00:00',
            description: 'Pruebas generales de laboratorio.',
            instructions: 'Orine una cantidad pequeña en la taza del inodoro y luego detenga el flujo de orina. Después, recolecte una muestra de orina dentro del recipiente limpio o estéril, hasta que esté medio lleno. Puede terminar de orinar en la taza del inodoro.',
            sample: 'Frasco de orina',
            cost: '₡8500',
            status: 'Pendiente',
            lab: 'Labin'
        }

    ]
    
    var eventId;
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 750,
        displayEventTime: true,
        locale: 'es',
        displayEventEnd: false,
        eventClick: function (info) {
            var eventObj = info.event;

            if (eventObj.url) {

                info.jsEvent.preventDefault();

            } else {
                $("#txtName").text(eventObj.title);
                $("#txtDescription").text(eventObj.extendedProps.description);
                $("#txtSample").text(eventObj.extendedProps.sample);
                $("#txtCost").text(eventObj.extendedProps.cost);
                $("#txtId").text(eventObj.id);
                $("#txtStatus").text(eventObj.extendedProps.status);
                $("#txtInst").text(eventObj.extendedProps.instructions);
                $("#txtLab").text(eventObj.extendedProps.lab);
                $("#infoModal").modal("show");
                eventId = $("#txtId").text();

            }


        },


    });


    calendar.render();
    myEvents.forEach(tempEvents => calendar.addEvent(tempEvents))


    $("#cancel").click(function () {


        showSucessCalendar();


    })
    $("#submit").click(function () {
        if ($("#txtResults").val() == "") {
            showError("No puede enviar un resultado vacío");
        } else {
            showSucessCalendar("Resultados enviados");
        }

    });

    function showSucessCalendar(msj) {
        Swal.fire({
            title: '¿Desea cancelar la cita?',
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
                Swal.fire('Cita cancelada', '', 'success')
                $("#infoModal").modal("hide");
                calendar.getEventById(eventId).remove();
                calendar.render();
            } else if (result.isDenied) {
                Swal.fire('Cambios no realizados', '', 'info')
            }
        })
    }
});


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