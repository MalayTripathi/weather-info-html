var apiKey = '3d546e6b751cf5c4aa102366ebe22696';
var xhr = new XMLHttpRequest();

var lat = 0, long = 0;
var response = {};

var apiString = "";

getLocation();

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getWeather, showError);
    }
    else{
        alert("Geo Location Not Supported");
    }
}

function getWeather(position){
    lat = position.coords.latitude;
    long  = position.coords.longitude;
    apiString = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${apiKey}`;
    xhr.open("GET", apiString, false);
    xhr.send();
    if(xhr.statusText === "OK")
    {
        response = JSON.parse(xhr.responseText);
        var city = document.getElementById("location");
        city.innerHTML = `${response.name}, ${response.sys.country}`;
        var temp = document.getElementById("temp");
        temp.innerHTML= response.main.temp;
        var wedef = document.getElementById("weatherdef");
        wedef.innerHTML = response.weather[0].main + ', '+ response.weather[0].description;

        /*Creating Connection To icons.json and Parsing the response in iconobj*/
        var iconsjson = new XMLHttpRequest();
        iconsjson.open("GET", "js/icons.json", false);
        iconsjson.send();
        var iconobj = JSON.parse(iconsjson.responseText);
        /*Calling getIcon function with weather ID and icons JSON object*/
        var iconstring = getIcon(response.weather[0].id, iconobj);
        /*Getting The ID of the icon element*/
        var wicon = document.getElementById("icondiv");
        /*Adding a class to an HTML element using Javascript*/
        wicon.classList.add("wi");
        wicon.classList.add(iconstring);
    }
}

function getIcon(code, icons)
{
    var prefix = 'wi-';
    var icon = icons[code].icon;
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = 'Day-' + icon;
    }
    return prefix+icon;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}