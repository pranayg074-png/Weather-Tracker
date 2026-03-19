const apiKey = "8d2099ae09c017c82387e839c6c671a9";

function log(msg) {
  console.log(msg);
  document.getElementById("consoleBox").innerHTML += msg + "<br>";
}

async function getWeather(cityParam) {

  const input = document.getElementById("cityInput");
  const city = cityParam || input.value;

  if (city === "") {
    alert("please enter city");
    return;
  }

  log("start function");

  document.getElementById("weatherResult").innerHTML = "<span class='loading'>Loading...</span>";

  try {

    log("before fetch");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    log("after fetch");

    if (!response.ok) {
      throw new Error("city not found");
    }

    const data = await response.json();

    log("data received");

    document.getElementById("weatherResult").innerHTML = `
      City: ${data.name} <br>
      Temp: ${data.main.temp} °C <br>
      Weather: ${data.weather[0].main}
    `;

    saveHistory(city);

  } catch (err) {

    log("error happened");
    document.getElementById("weatherResult").innerText = err.message;

  }

  log("end function");
}

function saveHistory(city) {

  let arr = JSON.parse(localStorage.getItem("cities")) || [];

  if (arr.indexOf(city) === -1) {
    arr.push(city);
    localStorage.setItem("cities", JSON.stringify(arr));
  }

  showHistory();
}

function showHistory() {

  let arr = JSON.parse(localStorage.getItem("cities")) || [];
  let div = document.getElementById("history");
  div.innerHTML = "";

  arr.forEach(function (c) {
    let btn = document.createElement("button");
    btn.innerText = c;
    btn.onclick = function () {
      getWeather(c);
    };
    div.appendChild(btn);
  });
}

function testPromise() {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(res => res.json())
    .then(data => log("promise then executed"))
    .catch(err => log("promise error"));
}

showHistory();
testPromise();