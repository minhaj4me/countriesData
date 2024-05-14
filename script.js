const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");

const searchInput = document.querySelector(".search-container input")


// darkToggling
const body = document.querySelector("body")
const darkToggling = document.querySelector(".header-content p")

let theme;
let themeText;
body.classList.value = localStorage.getItem("theme") || ''
darkToggling.innerHTML = localStorage.getItem("themeText") || `<i class="fa fa-moon-o"></i> &nbsp;Dark Mode`



darkToggling.addEventListener("click", () => {

    body.classList.toggle("dark")

    if (body.classList.value === "dark") {
        themeText = `<i class="fa fa-sun-o"></i> &nbsp;Light Mode`
        darkToggling.innerHTML = themeText
        // console.log("1");
        theme = body.classList.value
        localStorage.setItem("theme", theme)
        localStorage.setItem("themeText", themeText)
    }
    if (body.classList.value === "") {
        themeText = `<i class="fa fa-moon-o"></i> &nbsp;Dark Mode`
        darkToggling.innerHTML = themeText
        // console.log("2");
        theme = " "

        localStorage.setItem("theme", theme)
        localStorage.setItem("themeText", themeText)
    }
})



let allCountriesData;

fetch('https://restcountries.com/v3.1/all').then((res) => { return res.json() }).then((data) => {
    getCountries(data)
    allCountriesData = data;
})



filterByRegion.addEventListener("change", (e) => {
    console.log(e.target.value);
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`).then((res) => { return res.json() }).then(
        getCountries
    )

})


// getCountries Function will be respsible for showing the country details in the form of card

function getCountries(data) {
    countriesContainer.innerHTML = ''
    data.forEach(country => {

        //every card is an hyperLink

        const countryCard = document.createElement('a');

        countryCard.classList.add("country-card");


        //storing href based on country name so that to get in a another js file as a URLPattern

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



// inputBox 

searchInput.addEventListener("input", (e) => {
    // console.log(e.target.value);
    // console.log(allCountriesData);
    const filteredCountry = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    getCountries(filteredCountry) //filteredCountry is an array returned from filter() and passes as a parameter in getCountries function
})