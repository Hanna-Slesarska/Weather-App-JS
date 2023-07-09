

const api = {
  endpoint: "https://api.openweathermap.org/data/2.5/",
  key: "4dc2bc10e092217b4254dce6d5d59ec1"
};

const search = document.querySelector("#input");

let m = 0;
let degrees = document.querySelector("#fahrenheit");
let celcius = document.querySelector("#celcius");
let units = "imperial";
let grad = "F";
let dayOfWeek = null;
let hourOfDay = null;
let cityInput = getIP();

search.addEventListener("keypress", enter);

function enter(e) {
  if (e.key === "Enter") {
    getInfo(cityInput);
  }
}

document.addEventListener("keydown", switchCity);
function switchCity() {
  cityInput = search.value;
}

async function getIP() {
  const resIP = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=97e35a7e3a9f4187828033f72466aafb`); 
  const resultIP = await resIP.json();
  getInfo(resultIP.city);
  cityInput = resultIP.city;
}

const toggle = document.querySelector("#degrees");
let i = 0;

toggle.addEventListener("click", () => {
  if (i === 0) {
    i = 1;
    units = "metric";
    grad = "C";
    getInfo(cityInput);
  } else {
    i = 0;
    units = "imperial";
    grad = "F";
    getInfo(cityInput);
  }
})

async function getInfo(data) {
  const resImp = await fetch(`${api.endpoint}weather?q=${data}&units=${units}&appID=${api.key}`);
  const resultImp = await resImp.json();
  console.log(resultImp);
  displayImperial(resultImp);
  displayBackgroundImage(resultImp);
}

function displayImperial(resultImp) {

  let icon = document.querySelector("#condIcon");
  icon.src = `http://openweathermap.org/img/wn/${resultImp.weather[0].icon}.png`;
  
  let city = document.querySelector("#city");
  
  city.textContent = `${resultImp.name}, ${resultImp.sys.country}`;

  getOurDate(resultImp);

  let temp = document.querySelector("#temp");
  temp.textContent = `${Math.round(resultImp.main.temp)}°${grad}`;

  let feelsLike = document.querySelector("#feelslike");
  feelsLike.textContent = `Feels like: ${Math.round(resultImp.main.feels_like)}°${grad}`;

  getConditions(resultImp);

  let minmax = document.querySelector("#minmax");
  minmax.textContent = `High: ${Math.round(resultImp.main.temp_max)}°${grad} | Low: ${Math.round(resultImp.main.temp_min)}°${grad}`;
  
  let humidity = document.querySelector("#humidity");
  humidity.textContent = `Humidity: ${resultImp.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.textContent =  `Wind: ${Math.round(resultImp.wind.speed)}m/sec`;
}

function getConditions(resultImp) {
  let conditions = document.querySelector("#conditions");
  conditions.textContent = `${resultImp.weather[0].description}`;
 
}

function displayBackgroundImage(resultImp) {
  let conditions = `${resultImp.weather[0].main}`;

  if (conditions === "Clouds") {
      document.body.style.backgroundImage = "url('https://cdn.glitch.global/96ed777e-f3e4-40ca-a83b-9f4a21b1334f/clouds.jpg?v=1676590897936)'";
  }

  else if (conditions === "Clear") {
      document.body.style.backgroundImage = "url('https://cdn.glitch.global/96ed777e-f3e4-40ca-a83b-9f4a21b1334f/clear.jpg?v=1676590888859')";
  }

  else if (conditions === "Snow") {
      document.body.style.backgroundImage = "url('https://cdn.glitch.global/96ed777e-f3e4-40ca-a83b-9f4a21b1334f/snow.jpg?v=1676590956205')";
  }

  else if (conditions === "Rain") {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1428592953211-077101b2021b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80')";
  }

  else if (conditions === "Mist" || conditions === "Fog" || conditions === "Haze" || conditions === "Drizzle" || conditions === "Dust")  {
      document.body.style.backgroundImage = "url('https://cdn.glitch.global/96ed777e-f3e4-40ca-a83b-9f4a21b1334f/mist.jpg?v=1676590938327')";
  }

  else if (conditions === "Thunderstorm")  {
      document.body.style.backgroundImage = "url('https://cdn.glitch.global/96ed777e-f3e4-40ca-a83b-9f4a21b1334f/photo-1512511708753-3150cd2ec8ee.jpg?v=1676590969646')";
  }

  else {
      document.body.style.backgroundImage = "url('https://cdn.glitch.global/96ed777e-f3e4-40ca-a83b-9f4a21b1334f/bg.jpg?v=1667137985659')";
  }
}



function getOurDate(resultImp) {
  let offset = resultImp.timezone;
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = {hour: '2-digit', minute:'2-digit'};

  let d = new Date();
  let localTime = d.getTime();
  let localOffset = d.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let newOffset =  offset / 3600;
  let newTime = utc + (3600000 * newOffset);
  let nd = new Date(newTime);
  dayOfWeek = nd.getDay();
  hourOfDay = nd.getHours();
  
  let date = document.querySelector("#date");
  date.innerHTML = `${nd.toLocaleDateString(undefined, dateOptions)}` + `<br>` + ` ${nd.toLocaleTimeString('en-GB', timeOptions)}`;
}


gsap.from("#header", {y:-300, delay:0.2, duration:3, opacity:0.5, ease:"power4.out"});
gsap.from("#today", {x:300, delay:1.2, duration:3, opacity:0, ease:"power4.out"});
gsap.from(".gsap", {y:-300, delay:2.2, duration:3, opacity:0, ease:"power4.out", stagger: 1});
