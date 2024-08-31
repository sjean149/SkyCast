//const { getEventListeners } = require("events");
//const { response } = require("express");
//const { error } = require("console");

//const { response } = require("express");

//GeoCoding Api: Turns city names to lattitude coordinates

// Get the city name from the input field
let cityName = document.getElementById("city-name").value;
let apiKey = `88568732ff16cb3b546a378ae03d1482`;

//Get lattitude and longitude from city name. This is necessary for 5 day weather API
function runGeoCodingAPI(event) {
  event.preventDefault();
  cityName = document.getElementById("city-name").value;

  // Construct the URL with the city name
  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    cityName
  )}&limit=5&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
  
      if (!response.ok) {
        throw new Error(
          "Network was unable to find coordinates for city" +
            response.statusText
        );
      }
      return response.json();
    })
    .then((data) => {
        let lat = data[0].lat;
        let lon = data[0].lon;
        
      forecastAPI(lat, lon);
  
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

}


const forecastAPI = async (lat, lon) => {
  const apiKey = `88568732ff16cb3b546a378ae03d1482`;
  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  console.log(url);

  await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Network was unable to fetch the forecast data: " +
            response.statusText
        );
      }
      return response.json();
    })
    .then((data) => {
      
      let date;
      let icon; 
      let temp;
      let wind;
      let humidity;

      for (let i = 0; i < 2; i++){
        date = data.list[i].dt_txt;
        icon = data.list[i].weather[0].icon;
        temp = data.list[i].main.temp;
        wind = data.list[i].wind.speed;
        humidity = data.list[i].main.humidity;
        console.log(`Date: ${date}, Icon: ${icon}, Temperature: ${temp}°C, Wind Speed: ${wind} m/s, Humidity: ${humidity}%`);
        const newCard = createCard(date, icon, temp, wind, humidity);
      }jh

            


    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

// Function to create a new card element
function createCard(date, icon, temp, wind, humidity) {
  // Create the card container
  const card = document.createElement('div');
  card.className = 'card';

  // Create and add the date
  const cardDate = document.createElement('h3');
  cardDate.textContent = `Date: ${date}`;
  card.appendChild(cardDate);

    // Create and add the icon
    const cardIcon= document.createElement('p');
    cardIcon.textContent = `Icon: ` + icon;
    card.appendChild(cardIcon);

  // Create and add the temp
  const cardTemp = document.createElement('p');
  cardTemp.textContent = `Temperature: ` + temp;
  card.appendChild(cardTemp);

  // Create and add the wind
  const cardWind = document.createElement('p');
  cardWind.textContent = `Wind: ` + wind;
  card.appendChild(cardWind);


  const cardHumidity = document.createElement('p');
  cardHumidity.textContent = `Humidity: ` + humidity;
  card.appendChild(cardHumidity);

  // Return the card element
  return card;
}

// Function to insert a new card into the DOM
function addCardToPage(card) {
  const cardContainer = document.getElementById('card-container');
  cardContainer.appendChild(card);
}

/*
// Example usage: creating and adding a card dynamically
document.addEventListener('DOMContentLoaded', () => {
  const newCard = createCard('Dynamic Card Title', 'This is the dynamic content of the card.');
  addCardToPage(newCard);

  // You can create and insert more cards dynamically as needed
  const anotherCard = createCard('Another Card', 'This card was also added dynamically.');
  addCardToPage(anotherCard);
});
*/


function formatDate(unixTimeStamp) {
    //Convert to milliseconds and
    let dateObject = new Date(unixTimeStamp * 1000);

    //Make human readable
    let humanDateFormat = dateObject.toLocaleDateString();

    return humanDateFormat;
}

//form.addEventListener("submit", runGeoCodingAPI);



form.addEventListener("submit", (event) => {
  event.preventDefault();

  runGeoCodingAPI(event);
  //const newCard = createCard('Dynamic Card Title', 'This is the dynamic content of the card.');
})
