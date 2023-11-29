$(document).ready(function () {

    let method = $("#user-method-otp").val();
    let contact = $("#user-contact-otp").val();
    let btnresend = $("#resend-otp");

    console.log("Metodo: " + method);
    console.log("Contacto: " + contact);




    btnresend.click(function () {
        var service = "/api/User/GenerateOTP?method="+method+"&contact="+contact
        var url_API = GetUrlApiService(service);
        RequestOTP(url_API);
    });

    function RequestOTP(url_API) {

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: url_API,
            ContentType: "application/json",
            hasContent: false
        }).done(function (response) {
            if (response.Result === "OK") {

            }
            else {
                Swal.fire('Error', '', 'warning')
            }
        }
        ).fail(function () {
            Swal.fire('Error', '', 'warning')

        });
    };







});