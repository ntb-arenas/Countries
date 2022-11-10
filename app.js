const countryList = document.querySelector("#country-list");
const searchBar = document.querySelector("#searchBar");

let countryItems = new Array();

let countries;
let sortOrder = 1;

let isCurrentPage;

searchBar.addEventListener("keyup", () => {
  //Get user input every keypress and filter countries if user input is included or exists in country.name and country.capital.
  const searchStr = searchBar.value.toLowerCase();

  const filteredCountry = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchStr) || country.capital[0].toLowerCase().includes(searchStr);
  });

  //Reset countryItems array. If not reseted, then calling displayCountries(countries) function will push a new array to countryItems variable and duplicate.
  countryItems = new Array();
  isCurrentPage = true;

  // Call functions to display filtered array.
  displayCountries(filteredCountry);
});

function filterCountryByCont() {
  let selectedOpt = document.querySelector(".sort-by-continent").value;

  const filteredCountryByCont = countries.filter((country) => {
    return selectedOpt === "world" ? country.continents[0] : country.continents[0].toLowerCase().includes(selectedOpt);
  });

  //Reset countryItems array. If not reseted, then calling displayCountries(countries) function will push a new array to countryItems variable and duplicate.
  countryItems = new Array();
  isCurrentPage = true;

  // Call functions to display filtered array.
  displayCountries(filteredCountryByCont);
}

function sortCountry() {
  // get select value.
  let selectedOpt = document.querySelector(".sort-countries").value;

  if (selectedOpt === "alphabetical") {
    sortOrder = 1;
  } else if (selectedOpt === "sortUp") {
    sortOrder = 2;
  } else if (selectedOpt === "sortDown") {
    sortOrder = 3;
  }

  //Reset Array. If not reseted, then calling displayCountries(countries) function will push a new array to countryItems variable and duplicate.
  countryItems = new Array();
  // Call functions to display new array order.
  displayCountries(countries);
  filterCountryByCont();
}

async function loadCountries() {
  // fetch restAPI countries
  const response = await fetch("https://restcountries.com/v3.1/all");
  countries = await response.json();

  // Call functions to display array.
  filterCountryByCont();
}

function displayCountries(countries) {
  // sort, map and push countries array into a new array.
  countries
    .sort(function (a, b) {
      if (sortOrder === 1) {
        // If sortOrder === Alphabetical.
        let countryA = a.name.common;
        let countryB = b.name.common;
        return countryA < countryB ? -1 : countryA > countryB ? 1 : 0;
      } else if (sortOrder === 2) {
        // If sortOrder === Crescending order.
        return b.population - a.population;
      } else if (sortOrder === 3) {
        // If sortOrder === Descending order.
        return a.population - b.population;
      }
    })
    .map((country) => {
      // If country.capital === undefined, then country.capital === "NaN", there are countries that doesn't have a capital like antarctica.
      country.capital === undefined ? (country.capital = "NaN") : country.capital;
      // map countries array. Return and push HTML into a new array called countryItems[].

      // countryItems array variable will look like this
      // countryItems = [
      //     `<div class="country-flag">
      //       <img src="${country.flags.png}"   alt="">
      //     </div>
      //     <div class="country-desc">
      //       <h4>${country.name.common}</h4>
      //       <p class="m-0"><strong>Capital:</strong> ${country.capital}</p>
      //       <p class="m-0"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      //       <p class="m-0"><strong>Land Area (Km<sup>2</sup>):</strong> ${country.area.toLocaleString()}</p>
      //     </div>`,

      //     `<div class="country-flag">
      //       <img src="${country.flags.png}"   alt="">
      //     </div>
      //     <div class="country-desc">
      //       <h4>${country.name.common}</h4>
      //       <p class="m-0"><strong>Capital:</strong> ${country.capital}</p>
      //       <p class="m-0"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      //       <p class="m-0"><strong>Land Area (Km<sup>2</sup>):</strong> ${country.area.toLocaleString()}</p>
      //     </div>`,
      //     and so on...
      // ]

      return countryItems.push(`
          <div class="country-flag">
            <img src="${country.flags.png}" loading="lazy" alt="">
          </div>
          <div class="country-desc">
            <h4>${country.name.common}</h4>
            <p class="m-0"><strong>Capital:</strong> ${country.capital}</p>
            <p class="m-0"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p class="m-0"><strong>Land Area (Km<sup>2</sup>):</strong> ${country.area.toLocaleString()}</p>
          </div>`);
    });
  pagination();
}

const paginationElement = document.getElementById("pagination");

//Set current page we are on. Ex: Page 1.
let currentPage = 1;
//Set the amount of rows or the amount of times you want to display per page.
let rows = 12;

function pagination() {
  displayList(countryItems, countryList, rows, currentPage);
  setupPagination(countryItems, paginationElement, rows);

  function displayList(items, wrapper, rowsPerPage, page) {
    // Reset wrapper when navigated through pages because every time we call displayList function, we want to make sure there's nothing already inside the countryList wrapper element else it's going to add items on top of each other.
    wrapper.innerHTML = "";

    // Set page to -1 because our page starts at 1 but our array starts at 0.
    page--;

    let start = rowsPerPage * page;
    let end = start + rowsPerPage;

    if (isCurrentPage) {
      currentPage = 1;
      start = 0;
      end = start + rowsPerPage;
      isCurrentPage = false;
    }

    let paginatedItems = items.slice(start, end); //slice(0, 12)

    // Loop through each array and print
    paginatedItems.forEach((item) => {
      let countryContents = document.createElement("div");
      countryContents.classList.add("country-contents");
      countryContents.innerHTML = item;
      wrapper.appendChild(countryContents);
    });
  }

  function setupPagination(items, wrapper, rowsPerPage) {
    wrapper.innerHTML = "";

    let page_count = Math.ceil(items.length / rowsPerPage);
    for (let i = 1; i < page_count + 1; i++) {
      let btn = paginationBtn(i, items);
      wrapper.appendChild(btn);
    }
  }

  function paginationBtn(page, items) {
    let button = document.createElement("button");
    button.innerText = page;

    if (currentPage === page) {
      button.classList.add("active");
    }

    if (items.length <= 12) button.parentNode.removeChild(button);

    button.addEventListener("click", function () {
      currentPage = page;
      displayList(items, countryList, rows, currentPage);

      let current_btn = document.querySelector(".pagenumbers button.active");
      current_btn.classList.remove("active");
      button.classList.add("active");
    });

    return button;
  }
}

loadCountries();
