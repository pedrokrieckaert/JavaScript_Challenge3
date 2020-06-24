//My keys no steal >:(
var weatherAPIKey = "730c1f50958233d1c577038889256a68"
var mapboxAPIKey = "pk.eyJ1IjoieXVra2VyIiwiYSI6ImNrYnNqMmk3NzAwaWQzNW42a3VuczJnNWQifQ.e-SrrkKA6eUDriXLuoPb1w";
//Default coordinates for Den Haag
var lat = "52.0705"; 
var lon = "4.3007";

//The function to fetch data from both api's
function fetchData(){
    //An object with query selectors selecting the various <p> elements to dump the data too
    var weatherDisp = {
        country: document.querySelector("#country"),
        weather: document.querySelector("#weather"),
        temperature: document.querySelector("#temp"),
        windSpeed: document.querySelector("#wSpeed"),
        windDegree: document.querySelector("#wDeg"),
        humidity: document.querySelector("#humidity")
    }
    //Query selector for the image element
    var imgMap = document.querySelector("#map");
    //Coordinate inputs
    var inputLat = document.querySelector("#inputLat");
    var inputLon = document.querySelector("#inputLon");

    //Check to see if new coordinates were typed, will default to the declared values above if the input value is null
    if(inputLat.value != "" && inputLon.value != ""){
        lat = inputLat.value;
        lon = inputLon.value;
     }
    
     //The fetch api to fetch data from an api
     //Using template literals to easily adjust the URL to fetch the data
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherAPIKey}`)
        .then(
            function(response) {
                //Convert the response into a JSON
                response.json().then(function(data){
                    weatherDisp.country.innerHTML = `${data.sys.country}, ${data.name}`; //The info displayed from this is an approximation from OpenWeather
                    weatherDisp.weather.innerHTML = `${data.weather[0].main}, ${data.weather[0].description}`;
                    weatherDisp.temperature.innerHTML = `${data.main.temp}&#8451`;
                    weatherDisp.windSpeed.innerHTML = `${data.wind.speed} m/s`;
                    weatherDisp.windDegree.innerHTML = `${data.wind.deg}&deg`;
                    weatherDisp.humidity.innerHTML = `${data.main.humidity}%`;
                });
            }
        )
        //Log an error, shouldn't be one
        .catch(function(error){
            console.log(`oops I died, you probably put in bad coordinates. Oh well here's the error code: ${error}`);
        });

        //The pull from this api returns a jpg file, so rather than writing an entire fetch function all over again, I just change the src attribute with the URL
        //I do miss out on error catching though.
        imgMap.setAttribute("src", `https://api.mapbox.com/styles/v1/yukker/ckbskg4mp001w1imqjub91az3/static/${lon},${lat},12.9 ,0,0/600x600?access_token=${mapboxAPIKey}`);
    }

//query selector and event listner for the main trigger of the script
var submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", fetchData);