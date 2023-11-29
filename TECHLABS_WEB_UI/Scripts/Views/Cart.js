//Inicializacion las funciones:
$(document).ready(function () {
    //pagoPaypal(pagoFinal);
    DatosCompras();



    ///Este es el mas actualizado


    //Llena los valores de la tabla:

    function DatosCompras() {



        //Esto se va a reemplazar por el AJAX en futura iteracion para poderlo implementar facilemnte 
        var objetoPrueba = {
            Producto: "Examen Calcio Orina",
            Precio: 12900
        }


        var precioAmomulador = objetoPrueba.Precio;

        llenadoDatos(objetoPrueba.Producto, precioAmomulador);


    }




    //Funcion que llena los datos, esto se tiene que arreglar con un array cuando ya se implemente la DB

    function llenadoDatos(objectoProducto, objectoPrecio) {
        var tablaCompras = $('#tblOfertas');
        var pagoFinal = $('#pago-final');

        let inputCant = "";

        var row = $("<tr id='table-row'>" +
            "<td id='nombreProducto'>" + objectoProducto + "</td>" +
            "<td id='precioID' >" + objectoPrecio + "</td>");

        var input = $("<input class='input-group mb-3' value='1' type='number' style='max-width: 45px; margin-left: 15px; margin-top: 25px;' min='0'; max = '9'; />");
        input.attr("id", "IDCantidad");
        input.addClass('form-control');


        row.append(input);
        var cambioCant = $(input);



        $(cambioCant).change(function () {

            var multiplier = objectoPrecio * cambioCant.val();

            if (cambioCant.val() == 0) {
                swalDelete(row);
                pagoFinal.text(multiplier);
                pagoFinal.val(multiplier);

            } else {
                pagoFinal.text(multiplier);
                pagoFinal.val(multiplier);
                console.log(cambioCant.val(), pagoFinal.val());
               
            }

        });

        tablaCompras.append(row);

        var precioDescontado = cuponDescuento(pagoFinal);

        pagoFinal.val(precioDescontado);
        pagoFinal.text(precioDescontado);

    }



    //Boton de cupon, incluye funcion de validacion y valida que el code sea "banana", aplica el descuento de el parametro precio

    function cuponDescuento(precio) {

        var textCupon = $("#cuponInput");
        var cuponMsj = $("#cuponMessage");

        $("#btn-cupon").click(function (evt) {

            var valor = precio.val();

            var bananaUppercase = textCupon.val().toUpperCase();

            //el input se convierte en Uppercap, para que sin importar aplique el cupon de banana
            var precioDes = valor - (valor * 0.025);


            if (bananaUppercase == "TECHLABS") {
                //Swal popup confirmacion
                swalSucc();

                //Aplica 25% descuento de el parametro ingresado

                //Eso modifica el InnerHTML
                valor = precioDes;
                precio.html(valor);
                precio.val(valor);

                //Mensaje de cupon
                cuponMsj.html("Cupon Correcto");
                cuponMsj.addClass("cuponMessageApproved");

                $("#btn-cupon").prop("onclick", null).off("click");
                return precioDes;

            } else {
                //Swal popup negado
                swalDeny();
                //Mensaje de cupon rechazado
                cuponMsj.removeClass("cuponMessageApproved");
                cuponMsj.html("Cupon Incorrecto");
                cuponMsj.addClass("cuponMessageDeny");
            }
        });
    }






    //Validacion temporaal:

    function swalSucc() {

        Swal.fire({
            title: 'Se ha aplicado su cupón!',
            text: 'Gracias por usar el código "TECHLABS"!',
            confirmButtonColor: '#334257'
        }
        );
    }

    function swalDeny() {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cupón inválido',
            confirmButtonColor: '#334257',
        })
    }



    //Validacion Delete:

    function swalDelete(row) {

        Swal.fire({
            title: 'Desea eliminar el item del carro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#334257',
            cancelButtonColor: '#476072',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Se ha borrado el item!'
                )
                row.remove();
            }
        });

    }
});


