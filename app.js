const countryList = document.querySelector("#country-list");
const searchBar = document.querySelector("#searchBar");

let countries;

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchString);
  });

  displayCountries(filteredCountries);
});

async function loadCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  countries = await response.json();
  console.log(countries);
  displayCountries(countries);
}

function displayCountries(countries) {
  const displayHtml = countries
    .map((country) => {
      return `
      <div class="countries-contents">
        <h1 class="country-name">${country.name.common}</h1>
        <p class="country-capital">Capital: ${country.capital}</p>
        <img src="${country.flags.svg}" class="country-flag" alt="" />
      </div>
      `;
    })
    .sort()
    .join("");

  countryList.innerHTML = displayHtml;
}

loadCountries();
