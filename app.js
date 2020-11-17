// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// key: aff11d30b0c98d57fd78cc74bb6fa6ad
const apiKey = 'aff11d30b0c98d57fd78cc74bb6fa6ad'
let cityName = 'tokyo'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`

fetch(url).then(
    function(response){
        return response.json();
    }
).then(
    function(data){
        console.log(data)
    }
)