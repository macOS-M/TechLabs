$(document).ready(function () {

    const btnAddToCart = $("#agregarCarrito")

    //Placeholder
    const userId = 40;
    const testID = 19;
    const cLabId = 15;
    let Order = {};



    btnAddToCart.click(function () { 
     
        $.get(GetUrlApiService("/api/Order/GetOrderData?userId=" + userId), function (data, status) {
            Order = data.Data;
            console.log(Order)
        });

        Order.LabId == cLabId ? updateCart(Order.OrderId, testID) : showDeleteCartMessage(Order.OrderId, userId);

    })


    function updateCart(pOrderId, pTestId) {

        var Order = {};
        order.UserId = pUserId;
        order.OrderId = pOrderId;
        order.CoreTestId = pTestId;

        let service = "/api/Order/UpdateCart"
        let url_API = GetUrlApiService(service);

        $.ajax({
            Headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "PUT",
            url: url_API,
            contentType: "application/json",
            data: JSON.stringify(Order),
            hasContent: true
        }).done(function (response) {
            if (response.Result === "OK") {

                Swal.fire('¡Listo!', 'Examen agregado a tu carrito', 'success')
            }
        }).fail(function (response) {
            alert("Hubo un error");
        });



    }




    function showDeleteCartMessage(pOrderId, pUserId) {

        Swal.fire({
            title: 'No es posible agregar exámenes de diferentes laboratorios al carrito.<br /> ¿Deseas eliminar tu carrito actual y crear uno nuevo?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Si',
            confirmButtonColor: '#334257',
            denyButtonColor: 'red',
            denyButtonText: 'No',
            okButtonColor: 'red'
        }).then((result) => {
            if (result.isConfirmed) {
              CreateNewOrder(pOrderId, pUserId, testID)

            } else if (result.isDenied) {
                Swal.fire('Cambios no realizados', '', 'info')
            }
        })
    }

    function CreateNewOrder(pOrderId, pUserId, testID) {

        var Order = {};
        order.UserId = pUserId;
        order.OrderId = pOrderId;
        order.CoreTestId = testID;

        let service = "/api/Order/CreateNewOrder"
        let url_API = GetUrlApiService(service);

        $.ajax({
            Headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "PUT",
            url: url_API,
            contentType: "application/json",
            data: JSON.stringify(Order),
            hasContent: true
        }).done(function (response) {
            if (response.Result === "OK") {
                
                Swal.fire('¡Listo!', 'Examen agregado a tu carrito', 'success')
            }
        }).fail(function (response) {
            alert("Hubo un error");
        });



    }






  








});