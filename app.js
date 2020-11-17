


//selecta form och sätt en event listner på den
let form = document.querySelector('#city-form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    //gör så att det användaren skriver in i sökfältet använda för att hämta data från API
    let cityNameInput = document.querySelector('#city-name')

    let cityName = cityNameInput.value;

    const apiKey = 'aff11d30b0c98d57fd78cc74bb6fa6ad'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`

    //kalla på och hämta data från APIn
    fetch(url).then(
        function(response){
            return response.json();
        }
    ).then(
        function(data){
            console.log(data)
            // deklarera all data jag behöver som variblar
            let name = data.name;
            let icon;
            let description = data.weather[0].description;
            let temp = data.main.temp;
            let windSpeed = data.wind.speed;
            let humidity = data.main.humidity;

            //selecta de element där jag vill lägga till datan i DOM
            //temperatur
            let tempBig = document.querySelector('.header .temp');
            let tempSmall = document.querySelector('.info-list .temp');

            tempBig.innerHTML = `${temp}<span>°</span>`;
            tempSmall.innerText = temp;

            //vädrets beskrivning
            let weatherElement = document.querySelector('.weather');
            weatherElement.innerText = description;

            //stadens namn
            let nameElement = document.querySelector('.city-name');
            nameElement.innerText = name;

            //vind hastighet
            let windElement = document.querySelector('.wind');
            windElement.innerText = windSpeed + 'm/s'

            //luftfuktighet
            let humidityElement = document.querySelector('.humidity');
            humidityElement.innerText = humidity + '%';


        }
    ).catch(function(error){
        console.log('ett fel uppstod med url.', error)
    });


})


   
