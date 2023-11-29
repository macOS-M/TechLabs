$(document).ready(function () {
    LoadData();
})

function LoadData() {

    var urlparams = getUrlData();

    console.log(urlparams)

    let service = '/api/search/' + urlparams[2];
    let url = GetUrlApiService(service)


    console.log(url)
}

function getUrlData(){
    var type = getParameterByName('Type');
    var info = getParameterByName('Info');
    var search = getParameterByName('Search');
    var urlinfo = [type, info, search];

    console.log(type, info, search);

    return urlinfo;
}


function getParameterByName(name, url = window.location.href){
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}