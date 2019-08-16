window.addEventListener('load', ()=> {
    let long;
    let lat;
    // retrieve HTML ID's
    let temperatureDescripition = document.getElementById('description');
    let temperatureDegree = document.getElementById('degree');
    let locationTimezone = document.getElementById('timezone');
    let temperatureSection = document.getElementById('degree-section');
    const temperatureSpan =  document.getElementById('temp-symbol');
    const apiKey = localStorage.getItem('api-key');

    if (!apiKey) {
        alert('Please set your darksky api key in localStorage as "api-key"');
    }

// retrieve loction
    if (navigator.geolocation) {

        

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // proxy and api
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/${apiKey}/${lat},${long}`;
            // get data form API and convert to Json
            fetch(api)
            .then(response => {
                 return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                //set elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescripition.textContent = summary;
                locationTimezone.textContent = data.timezone;

                //formula for converting celcius into Farenheit
                let celcius = (temperature - 32) * (5 / 9);

                //set icons
                setIcons(icon, document.getElementById('icon'));
                // change temp to celsius/Farenheit
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.floor(celcius);
                    } else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;
                    }
                })
        })
        });
    }
// icons
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});