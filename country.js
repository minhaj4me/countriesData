const countryContainer = document.querySelector(".country-container")
let countryName = new URLSearchParams(location.search).get('name')
// console.log(countryName);

const img = document.querySelector('img')
const countryname = document.querySelector('h1');
const nativeName = document.querySelector(".nativeName");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".subRegion");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".topLevelDomain");
const currency = document.querySelector(".currency");
const language = document.querySelector(".language");
const borderCountries=document.querySelector('.border-countries')


const darkToggling=document.querySelector(".header-content p")

const body=document.querySelector("body")

darkToggling.addEventListener("click",()=>{
    body.classList.toggle("dark")
})


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res) => {
    return res.json()
}).then(
    ([data]) => {
        // console.log(data.flags.svg);
        img.src = data.flags.svg
        countryname.innerText = data.name.common
        if (data.name.nativeName) {
            nativeName.innerText = Object.values(data.name.nativeName)[0].common
        }
        population.innerText = data.population.toLocaleString('en-IN')
        region.innerText = data.region
        if (data.subregion) {
            subRegion.innerText = data.subregion
        }
        if (data.capital) {
            capital.innerText = data.capital
        }
        topLevelDomain.innerText = data.tld.join(', ')
        if (data.currencies) {
            currency.innerText = Object.values(data.currencies).map((currency) => currency.name).join(', ')
        }
        if (data.languages) {
            language.innerText = Object.values(data.languages).join(', ')
        }

        if(data.borders){
            
            data.borders.forEach(borderCountry => {
                fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`).then((res)=>{
                    return res.json()
                }).then(([dataBorderCountry])=>{
                    // console.log(dataBorderCountry.name.common);
                    if(dataBorderCountry){
                        const anchorTag=document.createElement('a');
                    anchorTag.innerText=dataBorderCountry.name.common
                    anchorTag.href=`country.html?name=${dataBorderCountry.name.common}`
                    borderCountries.append(anchorTag)
                    }
                })
                
            });



        }

        



    }
)


