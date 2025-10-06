const container = document.getElementById("container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// get city → coordinates via OpenStreetMap Nominatim
async function getCoords(city) {
  const resp = await fetch(
    `https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`
  );
  const data = await resp.json();
  if (data.length === 0) return null;
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].display_name
  };
}

// get weather via Open-Meteo
async function getWeather(lat, lon) {
  const resp = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  const data = await resp.json();
  return data.current_weather;
}

function showWeather(cityName, weather) {
  const weatherDiv = document.createElement("div");
  weatherDiv.classList.add("weather");

  weatherDiv.innerHTML = `
    <h2>${weather.temperature}°C</h2>
    <small>${cityName}</small><br>
    <small>Wind: ${weather.windspeed} km/h</small>
  `;

  main.innerHTML = "";
  main.appendChild(weatherDiv);
}

function uyariMesaji() {
  const notif = document.createElement("div");
  notif.classList.add("mesaj");
  notif.innerText = "Konum bilgisi bulunmamaktadır !!!";
  container.appendChild(notif);
  setTimeout(() => notif.remove(), 2000);
  main.innerHTML = "";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = search.value.trim();

  if (!city) {
    return uyariMesaji();
  }

  const coords = await getCoords(city);
  if (!coords) {
    return uyariMesaji();
  }

  const weather = await getWeather(coords.lat, coords.lon);
  if (!weather) {
    return uyariMesaji();
  }

  showWeather(coords.name, weather);
});
