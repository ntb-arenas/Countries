const countryList = document.querySelector("#country-list");
const searchBar = document.querySelector("#searchBar");

let countries;

searchBar.addEventListener("keyup", () => {
  const searchStr = searchBar.value.toLowerCase();

  const filteredCountry = countries
    .filter((c) => !!c.capital)
    .filter((country) => {
      return country.name.common.toLowerCase().includes(searchStr) || country.capital[0].toLowerCase().includes(searchStr);
    });

  displayCountries(filteredCountry);
});

async function loadCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  countries = await response.json();
  displayCountries(countries);
}

function displayCountries(countries) {
  const printHtml = countries
    .sort((countryA, countryB) => countryA.name.common - countryB.name.common)
    .map((country) => {
      if (country.capital === undefined) {
        country.capital = "N/A";
      }
      return `
        <div class="country-contents">
          <div class="country-flag">
            <img src="${country.flags.png}"   alt="">
          </div>
          <div class="country-desc">
            <h1>${country.name.common}</h1>
            <p>Capital: ${country.capital}</p>
          </div>
        </div>`;
    })
    .join("");

  countryList.innerHTML = printHtml;
}

loadCountries();
