"use strict";
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
let map, mapEvent;

navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position.coords.latitude, position.coords.longitude);
    const coords = [11.2189, 75.7268];
     map = L.map("map").setView(
      [position.coords.latitude, position.coords.longitude],
      10
    );
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.on("click", function (mapE) {
      mapEvent = mapE;
      form.classList.remove("hidden");
      inputDistance.focus();
    });

    L.marker(coords)
      .addTo(map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup();
  },
  function () {
    alert("not working location");
  }
);

form.addEventListener("submit", function (e) {
    e.preventDefault();
    //inputCadence=inputDistance=inputDuration=inputElevation;

  map.on("click", function (e) {
    
    console.log(mapEvent);
    const lat = mapEvent.latlng.lat;
    const lng = mapEvent.latlng.lng;
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup",
        })
      )
      .setPopupContent("work")
      .openPopup();
  });
});

