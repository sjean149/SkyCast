// Get the city name from the input field
let cityName =
  document.getElementById("city-name").value ||
  localStorage.getItem("cityName");
localStorage.setItem("cityName", cityName);
let apiKey = `88568732ff16cb3b546a378ae03d1482`;

//runs GeoCoding Api: Turns city names to lattitude coordinates
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

//Uses lattitude and longitude to get forecast for the next 5 days
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
      let currentDate = data.list[0].dt_txt.split(" ");
      let currentTemp = data.list[0].main.temp;
      let currentWind = data.list[0].wind.speed;
      let currentHumidity = data.list[0].main.humidity;

      document.getElementById(
        "current-date"
      ).innerText = `${cityName} (${currentDate[0]})`;
      document.getElementById("current-temp").textContent += `${currentTemp}`;
      document.getElementById("current-wind").textContent += `${currentWind}`;
      document.getElementById(
        "current-humidity"
      ).textContent += `${currentHumidity}`;

      let date;
      let icon;
      let temp;
      let wind;
      let humidity;

      //Deletes all previous cards before creating 5 weather cards
      const cardContainer = document.getElementById("card-container");
      while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
      }

      for (let i = 1; i < 6; i++) {
        date = data.list[i].dt_txt.split(" ");
        icon = data.list[i].weather[0].icon;
        temp = data.list[i].main.temp;
        wind = data.list[i].wind.speed;
        humidity = data.list[i].main.humidity;

        console.log(
          `Date: ${date}, Icon: ${icon}, Temperature: ${temp}°C, Wind Speed: ${wind} m/s, Humidity: ${humidity}%`
        );

        //Creates and adds a card for each day into the html
        const newCard = createCard(date[0], icon, temp, wind, humidity);
        addCardToPage(newCard);
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

// Function to create a new card element
function createCard(date, icon, temp, wind, humidity) {
  // Create the card container
  const card = document.createElement("div");
  card.className = "card";

  // Create and add the date
  const cardDate = document.createElement("h3");
  cardDate.textContent = `Date: ${date}`;
  card.appendChild(cardDate);

  // Create and add the icon
  const cardIcon = document.createElement("p");
  cardIcon.textContent = `Icon: ` + icon;
  card.appendChild(cardIcon);

  // Create and add the temp
  const cardTemp = document.createElement("p");
  cardTemp.textContent = `Temperature: ` + temp;
  card.appendChild(cardTemp);

  // Create and add the wind
  const cardWind = document.createElement("p");
  cardWind.textContent = `Wind: ` + wind;
  card.appendChild(cardWind);

  const cardHumidity = document.createElement("p");
  cardHumidity.textContent = `Humidity: ` + humidity;
  card.appendChild(cardHumidity);

  // Return the card element
  return card;
}

// Function to insert a new card into the DOM
function addCardToPage(card) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.appendChild(card);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //Starts GeoCoding API which calls forecase APi
  runGeoCodingAPI(event);
});

document.addEventListener("DOMContentLoaded", () => {
  const savedCityName = localStorage.getItem("cityName");

  if (savedCityName) {
    document.getElementById("city-name").value = savedCityName;
    runGeoCodingAPI(new Event("submit")); // Simulate the form submission
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Get all elements with the class 'city'
  const cityElements = document.querySelectorAll(".city");

  // Add click event listeners to each city element
  cityElements.forEach((cityElement) => {
    cityElement.addEventListener("click", (event) => {
      // Get the text content of the clicked city
      const cityName = event.target.textContent.trim();

      // Set the city name into the search bar input
      document.getElementById("city-name").value = cityName;
    });
  });
});
