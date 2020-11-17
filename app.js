


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
    let errorMessage = document.querySelector('.error')
    fetch(url).then(
        function(response){
            return response.json();
        }
    ).then(
        function(data){
            console.log(data)
            // deklarera all data jag behöver som variblar
            let name = data.name;
            let icon = data.weather[0].icon;
            let description = data.weather[0].description;
            let temp = data.main.temp;
            let windSpeed = data.wind.speed;
            let humidity = data.main.humidity;

            addDataToDom(name,icon,description,temp,windSpeed,humidity);

            errorMessage.innerText = ""

        }
    ).catch(function(error){
        console.log('the city was not found, check spelling')
        
        errorMessage.innerText = "the city was not found, check spelling"
    
    });

})


   
//selecta element i DOM och lägg till den hämtade datan i dem
function addDataToDom(n,i,d,t,ws,h){
    //temperatur
    let tempBig = document.querySelector('.header .temp');
    let tempSmall = document.querySelector('.info-list .temp');
    tempBig.innerHTML = `${t}<span>°</span>`;
    tempSmall.innerText = t;

    //vädrets beskrivning
    let weatherElement = document.querySelector('.weather');
    weatherElement.innerText = d;

    //stadens namn
    let nameElement = document.querySelector('.city-name');
    nameElement.innerText = n;

    //väder ikonen
    let iconElement = document.querySelector('.title .icon');
    iconElement.src = `http://openweathermap.org/img/wn/${i}@2x.png`

    //vind hastighet
    let windElement = document.querySelector('.wind');
    windElement.innerText = ws + 'm/s'

    //luftfuktighet
    let humidityElement = document.querySelector('.humidity');
    humidityElement.innerText = h + '%';
}