$(document).ready(function () {
    let usersTile = $("#users-tile")
    let appointmentTile = $("#appointment-tile")
    let dashBoardTile = $("#dashboard-tile")
    let labTile = $("#labs-tile");
    let testTile = $("#test-tile");
    let logsTile = $("#logs-tile");
    


    testTile.click(function () {
        window.location.replace(GetUrlLocalService("/Home/testadmin"));
    })

    labTile.click(function () {
        window.location.replace(GetUrlLocalService("/Home/labsadmin"));
    })

    usersTile.click(function () {
        window.location.replace(GetUrlLocalService("/Home/ManageUsers"));
    })

    appointmentTile.click(function () {
        window.location.replace(GetUrlLocalService("/Home/Citas"));
    })

    dashBoardTile.click(function () {
        window.location.replace(GetUrlLocalService("/Home/DashBoard"));
    })

 
    logsTile.click(function () {
        window.location.replace(GetUrlLocalService("/Home/RegistroMovimientos"));
    })

});