var weather;
var apiKey = "&APPID=f383bfdc266ebd093b0890ce6a4ad101";
var api = "http://api.openweathermap.org/data/2.5/weather?q="
//var city = "Chicago";
var units= "&units=imperial"
var url;


function searchWeather(city){
    url = api+city+apiKey+units;
    //console.log(url);
    fetch(url).then(result => {
        return result.json();
    }).then(result=>{
        init(result);
    });
}

function init(resultFromServer){

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA3iYAy7D7o2k8NPVW4eyhffVKi21FpB58",
    authDomain: "weather-app-project-cf9db.firebaseapp.com",
    databaseURL: "https://weather-app-project-cf9db.firebaseio.com",
    projectId: "weather-app-project-cf9db",
    storageBucket: "weather-app-project-cf9db.appspot.com",
    messagingSenderId: "116889006075",
    appId: "1:116889006075:web:fdffb9e4bbf438b3"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }
  //firebase.initializeApp(firebaseConfig);
  console.log(firebase);


    var funnyText = document.getElementById("funnyText");
    if(resultFromServer.weather[0].main =="Clear"){
        document.body.style.backgroundImage = 'url("Images/sunny-clear.jpeg")';
        funnyText.innerText = "Beautiful weather we're having!";
    }
    else if(resultFromServer.weather[0].main =="Clouds"){
        document.body.style.backgroundImage = 'url("Images/cloudy.jpg")';
        funnyText.innerText = "With a chance of meatballs?";
    }
    else if(resultFromServer.weather[0].main =="Rain" || 
    resultFromServer.weather[0].main =="Drizzle"|| 
    resultFromServer.weather[0].main =="Mist"){
        document.body.style.backgroundImage = 'url("Images/rainy_night.jpg")';
        funnyText.innerText = "Eh, could be worse";
    }
    else if(resultFromServer.weather[0].main =="Thunderstorm"){
        document.body.style.backgroundImage = 'url("Images/thunder_storm.jpeg")';
        funnyText.innerText = "Looks like those plans are canceled :("
    }
    else if (resultFromServer.weather[0].main =="Snow"){
        document.body.style.backgroundImage = 'url("Images/snow_forest.jpg")';
        funnyText.innerText = "Just a little chilly!"
    }
    console.log(resultFromServer);

    var weatherDescriptionHeader= document.getElementById("weatherDescriptionHeader");
    var temperatureElement = document.getElementById("temperature");
    var humidityElement = document.getElementById("humidity");
    var windSpeedElement = document.getElementById("windSpeed");
    var cityHeader = document.getElementById("cityHeader");
    var weatherIcon = document.getElementById("documentIconImg");
    

weatherIcon.src = "http://openweathermap.org/img/w/" + resultFromServer.weather[0].icon+".png";
var resultDescription = resultFromServer.weather[0].description;
resultDescription = resultDescription.charAt(0).toUpperCase()+resultDescription.slice(1);
weatherDescriptionHeader.innerText = resultDescription;
var temperature = Math.floor(resultFromServer.main.temp)+"&#176";
temperatureElement.innerHTML = temperature;
windSpeedElement.innerHTML = "Wind speed: "+ Math.floor(resultFromServer.wind.speed *0.000621371*3600)+" mph";
cityHeader.innerHTML = resultFromServer.name;
humidityElement.innerHTML = "Humidity Level: " +resultFromServer.main.humidity+"%";

//push info to firebase
var database = firebase.database();
var ref = database.ref('Cities');

var dataArray= [];



var data = {
    city: resultFromServer.name,
    description: resultDescription,
    temperature: temperature,
}

ref.push(data);

//get data
ref.on('value', gotData, errData);
setPositionforInfo();
}



function gotData(data){
    console.log(data.val());
    var cities = data.val();
    var keys = Object.keys(cities);
    for( var i=0;i<keys.length;i++){
        var k = keys[i];
        var city = cities[k].city;
        var description = cities[k].description;
        var temperature = cities[k].temperature;
    }  
}
function errData(err){
    console.log("Error");
    console.log(err);
}

function setPositionforInfo(){
    var weatherContainer = document.getElementById("weatherContainer");
    var homeContainer = document.getElementById("homeContainer");
    var weatherContainerHeight = weatherContainer.clientHeight;
    var weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50%-${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50%-${weatherContainerHeight/2}px)`;
    weatherContainer.style.visibility = "visible";
    homeContainer.style.visibility = "hidden";
}

document.getElementById("searchForm").addEventListener("submit",function(event){
    event.preventDefault();
    var city = document.getElementById("searchBar").value;
    searchWeather(city);
});