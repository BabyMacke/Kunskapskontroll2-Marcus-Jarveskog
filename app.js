
//selecta form och sätt en event listner på den
let form = document.querySelector('#city-form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    //gör så att det användaren skriver in i sökfältet används för att hämta data från API
    let cityNameInput = document.querySelector('#city-name')

    let cityName = cityNameInput.value;

    const apiKey = 'aff11d30b0c98d57fd78cc74bb6fa6ad'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`


    // selecta textrutan där error medelanden ska visas
    let errorMessage = document.querySelector('.error');
    //kalla på och hämta data från APIn
    fetch(url).then(
        function(response){
            //sätt error medelandet som tomt
            errorMessage.innerText = "";
             // kolla ifall allt har gått bra i koden
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
        
            // när status kod 404 kommer så betyder det att staden är felstavad eller ej finns
            else if (response.status === 404) {
                throw "!City not found, check spelling!";
            }
        
            //401 kommer när det är något fel med api key
            else if (response.status === 401) {
                throw "API error";
            }

        }
    ).then(
        function(data){
            // deklarera all data jag behöver som variblar
            let name = data.name;
            let icon = data.weather[0].icon;
            let description = data.weather[0].description;
            let temp = Math.floor(data.main.temp);
            let windSpeed = data.wind.speed;
            let humidity = data.main.humidity;

            addDataToDom(name,icon,description,temp,windSpeed,humidity);
            changeBackground(temp);
            //ta bort error text ifall där är någon
            /* errorMessage.innerText = "" */
            
        }
    ).catch(function(error){
        
        //lägg till en error text
        errorMessage.innerText = error;
    
    });

})


//selecta element i DOM och lägg till den hämtade datan i dem
function addDataToDom(n,i,d,t,ws,h){
    //temperatur
    let tempBig = document.querySelector('.header .temp');
    let tempSmall = document.querySelector('.info-list .temp');
    tempBig.innerHTML = `${t}<span>°</span>`;
    tempSmall.innerText = t + "°C";

    //vädrets beskrivning
    let weatherElement = document.querySelector('.weather');
    weatherElement.innerText = d;

    //stadens namn
    let nameElement = document.querySelector('.city-name');
    nameElement.innerText = n;

    //väder ikonen
    let iconElement = document.querySelector('.title .icon');
    iconElement.src = `http://openweathermap.org/img/wn/${i}@2x.png`
    iconElement.style.display = 'block';

    //vind hastighet
    let windElement = document.querySelector('.wind');
    windElement.innerText = ws + 'm/s'

    //luftfuktighet
    let humidityElement = document.querySelector('.humidity');
    humidityElement.innerText = h + '%';
}



// en funktion som byter bakgrund beroende på vad temperaturen är
function changeBackground(temp){
    let appContainer = document.querySelector('.app-container');
    if(temp <= 5){
        appContainer.style.backgroundImage = "url('./img/cold-img.jpg')"
    } else if(temp > 5 && temp <= 20){
        appContainer.style.backgroundImage = "url('./img/autumn-img.jpg')"
    } else if(temp > 20){
        appContainer.style.backgroundImage = "url('./img/summer-img.jpg')"
    }
}
