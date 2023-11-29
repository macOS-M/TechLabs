$(document).ready(function () {

   

    var data = [
        {
            "Log ID": "1",
            "Usuario": "josuelu2@gmail.com",
            "Fecha": "15/11/2022",
            "Acción": "Modificación de perfil propio"
        },

        {
            "Log ID": "2",
            "Usuario": "coperfield088@gmail.com",
            "Fecha": "16/11/2022",
            "Acción": "Registro de laboratorio ID: 2"
        },

        {
            "Log ID": "3",
            "Usuario": "coperfield088@gmail.com",
            "Fecha": "16/11/2022",
            "Acción": "Creación de sub-usuario"
        },



    ];


    LoadData(data)







    function LoadData(data) {
        var colData = [];
        colData[0] = { 'data': 'Log ID' };
        colData[1] = { 'data': 'Usuario' };
        colData[2] = { 'data': 'Fecha' };
        colData[3] = { 'data': 'Acción' };
        // colData[4] = { 'data': 'Email' };
        //colData[5] = { 'data': 'DefectRole' }
        //colData[6] = { 'data': 'Estatus' };
        //colData[7] = { 'defaultContent': "<button data-toggle='tooltip' data-placement='top' title='Editar' class='btn btn-outline-secondary btn-sm me-2' type='button' id='editar'><i class='fa-solid fa-user-pen'></i></button><button data-toggle='tooltip' data-placement='top' title='Eliminar' class='btn btn-outline-secondary btn-sm me-2' type='button' id= 'eliminar'><i class='fa-solid fa-trash-can'></i></button><button data-toggle='tooltip' data-placement='top' title='Desactivar'class='btn btn-outline-secondary btn-sm' type='button' id= 'desa'><i class='fa-solid fa-toggle-off'></i></button>" };

        //let service = "/api/User/RetrieveAllUsers" + "?email=" + userInSession;
        //let url = GetUrlApiService(service);

        $('#tblLogs').DataTable({

            data: data,
            columns: colData,
        })

    }

});