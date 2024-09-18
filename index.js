let card = document.querySelector(".countries-container");
let btnSort = document.querySelectorAll(".btnSort");
let countries = [];
let sortMethod = "maxToMin";
//console.log(btnSort);

async function fetchCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));
}

async function countriesDisplay() {
  await fetchCountries();
  //console.log(countries);

  card.innerHTML = countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase() //pour tout mettre en minuscule a ajouter à la value pour être sur de trouver malgré les maj
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `<div class="box">
              <img src="${country.flags.svg}" alt="Flag from ${
          country.translations.fra.common
        }">
              <h3>${country.translations.fra.common} </h3>
              <h6>${country.capital}</h6>
              <p>Population : ${country.population.toLocaleString()}</p>
          </div>`
    )
    .join("");
}

window.addEventListener("load", countriesDisplay);

inputSearch.addEventListener("input", countriesDisplay);

inputRange.addEventListener("input", (e) => {
  //console.log(e.target.value);
  rangeValue.innerHTML = e.target.value;
  countriesDisplay(e.target.value);
});

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
