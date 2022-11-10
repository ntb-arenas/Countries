const countryList = document.querySelector("#country-list");
const searchBar = document.querySelector("#searchBar");

let countries;
let sortOrder = 1;

searchBar.addEventListener("keyup", () => {
  const searchStr = searchBar.value.toLowerCase();

  const filteredCountry = countries
    .filter((c) => !!c.capital)
    .filter((country) => {
      return country.name.common.toLowerCase().includes(searchStr) || country.capital[0].toLowerCase().includes(searchStr);
    });

  displayCountries(filteredCountry);
});

function sortCountry() {
  let selectedOpt = document.querySelector("select").value;

  if (selectedOpt === "alphabetical") {
    sortOrder = 1;
  } else if (selectedOpt === "sortUp") {
    sortOrder = 2;
  } else {
    sortOrder = 3;
  }

  displayCountries(countries);
}

async function loadCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  countries = await response.json();
  console.log(countries.length);
  displayCountries(countries);
}

function displayCountries(countries) {
  const printHtml = countries
    .sort(function (a, b) {
      if (sortOrder === 1) {
        let countryA = a.name.common;
        let countryB = b.name.common;
        return countryA < countryB ? -1 : countryA > countryB ? 1 : 0;
      } else if (sortOrder === 2) {
        return b.population - a.population;
      } else {
        return a.population - b.population;
      }
    })
    .map((country) => {
      country.capital === undefined ? (country.capital = "NaN") : country.capital;
      return `
        <div class="country-contents">
          <div class="country-flag">
            <img src="${country.flags.png}"   alt="">
          </div>
          <div class="country-desc">
            <h4>${country.name.common}</h4>
            <p class="m-0"><strong>Capital:</strong> ${country.capital}</p>
            <p class="m-0"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p class="m-0"><strong>Land Area (Km<sup>2</sup>):</strong> ${country.area.toLocaleString()}</p>
          </div>
        </div>`;
    })
    .join("");

  countryList.innerHTML = printHtml;
}

loadCountries();
