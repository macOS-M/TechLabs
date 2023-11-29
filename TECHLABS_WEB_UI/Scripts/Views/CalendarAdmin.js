 document.addEventListener('DOMContentLoaded', function () {
     $("#txtResults").attr("readonly", true);
     let myEvents = [
         {
             id: '1',
             title: 'Pruebas de laboratorio ', // a property!
             start: '2022-11-14T18:30:00',
             end: '2022-11-14T19:30:00',
             allDay: false,
             correo: 'asalasa@gmail.com',
             telefono: '88661648',
             cliente: 'Abraham',
             status: 'Completado',
             color: '#54C571'


         },
         {
             id: '2',
             title: 'Analisis de orina ', // a property!
             start: '2022-11-15T12:30:00',
             end: '2022-11-15T13:30:00',
             allDay: false,
             correo: 'keko@gmail.com',
             telefono: '88554433',
             cliente: 'Keko McCree',
             status: 'Completado',
             color: '#54C571'
         },
         {
             id: '3',
             title: 'Examen de sangre', // a property!
             start: '2022-11-18T14:30:00',
             end: '2022-11-18T15:30:00',
             allDay: false,
             correo: 'mmorales99c@gmail.com',
             telefono: '88661648',
             cliente: 'Marcos Morales',
             status: 'Pendiente'
         },
         {
             id: '4',
             title: 'Pruebas Prenatales', // a property!
             start: '2022-11-19T10:30:00',
             end: '2022-11-19T11:30:00',
             allDay: false,
             correo: 'Alex@gmail.com',
             telefono: '88552233',
             cliente: 'Alex',
             status: 'Pendiente'
         }
     ]

            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'timeGridWeek',
                height: 400,
                contentHeight: 400,
                businessHours: {
                    // days of week. an array of zero-based day of week integers (0=Sunday)
                    daysOfWeek: [1, 2, 3, 4,5,6], // Monday - Thursday

                    startTime: '8:00', // a start time (10am in this example)
                    endTime: '20:00', // an end time (6pm in this example)
                },
                eventClick: function (info) {
                    var eventObj = info.event;

                    if (eventObj.url) {
                        alert(
                            'Clicked ' + eventObj.title + '.\n' +
                            'Will open ' + eventObj.url + ' in a new tab'
                        );

                        window.open(eventObj.url);

                        info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
                       

                    } else {
                        $("#txtName").val(eventObj.title);
                        $("#txtClient").val(eventObj.extendedProps.cliente);
                        $("#txtMail").val(eventObj.extendedProps.correo);
                        $("#txtPhone").val(eventObj.extendedProps.telefono);
                        $("#txtId").val(eventObj.id);
                        $("#txtStatus").val(eventObj.extendedProps.status);
                        $("#txtResults").attr("readonly", false);
                    }
                },


            });

            calendar.render();
            myEvents.forEach(tempEvents => calendar.addEvent(tempEvents));
        
           
       
              
            $("#submit").click(function () {
                if ($("#txtResults").val() == "" ){
                    showError("No puede enviar un resultado vacío", $("#txtResulst"));
                } else {
                    showSucess("Resultados enviados");
                    
                }
                    
            });

        });
        function showSucess(msj) {
            Swal.fire({
                title: '¿Desea enviar el reporte?',
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
                    $("#txtResults").val("");

                } else if (result.isDenied) {
                    Swal.fire('Cambios no realizados', '', 'info')
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
