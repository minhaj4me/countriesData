const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");

const searchInput = document.querySelector(".search-container input")


const darkToggling = document.querySelector(".header-content p")

const body = document.querySelector("body")

darkToggling.addEventListener("click", () => {
    body.classList.toggle("dark")
    if (body.classList.value === "dark") {
        darkToggling.innerHTML = `<i class="fa fa-sun-o"></i> &nbsp;Light Mode`
    }
    else {
        darkToggling.innerHTML = `<i class="fa fa-moon-o"></i> &nbsp;Dark Mode`
    }
})


let allCountriesData;



fetch('https://restcountries.com/v3.1/all').then((res) => { return res.json() }).then((data) => {
    getCountries(data)
    allCountriesData = data;
})



filterByRegion.addEventListener("change", () => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`).then((res) => { return res.json() }).then(
        getCountries
    )

})

function getCountries(data) {
    countriesContainer.innerHTML = ''
    data.forEach(country => {
        const countryCard = document.createElement('a');
        countryCard.classList.add("country-card");

        countryCard.href = `country.html?name=${country.name.common}`


        const countryCardContent = `<img src="${country.flags.svg}" alt="${country.name.common} flag">
                <div class="card-text">
                    <h3 class="card-title">
                        ${country.name.common}
                    </h3>
                    <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                    <p><b>Region: </b>${country.region}</p>
                    <p><b>Capital: </b>${country.capital}</p>
                </div>
                </a>`

        countryCard.innerHTML = countryCardContent

        countriesContainer.append(countryCard)
    });
}


searchInput.addEventListener("input", (e) => {
    // console.log(e.target.value);
    // console.log(allCountriesData);
    const filteredCountry = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    getCountries(filteredCountry)
})