



function loadCities(){
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
 var database = firebase.database();
 var ref = database.ref('Cities');

 //get data
ref.on('value', gotData, errData);
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

        var li = document.createElement("li");
        li.innerHTML = city+": "+description+"  "+temperature;
        var listParent = document.getElementById("listOfCities");
        console.log("list items: "+ li);
        listParent.appendChild(li);
    }
    
}
function errData(err){
    console.log("Error");
    console.log(err);
}


loadCities();