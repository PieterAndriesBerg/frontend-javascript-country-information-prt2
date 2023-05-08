import axios from "axios";

// [IMAGE: flag]
// [country-name]
// [country-naam] is situated in [subarea-name]. It has a population of [amount] people.
// The capital is [city] and you can pay with [currency]'s

//https://restcountries.com/v3.1/all

async function fetchCountries(name) {


    try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

        console.log(response.data[0]);

        showCountryData(response.data[0]);

        // maak searchField leeg na elke zoek opdracht
        document.getElementById("searchField").value = "";
    } catch (error) {
        console.error(error.response.status);

        if (error.response.status === 404) {
            const errorElement = document.getElementById("inject_country");
            errorElement.innerHTML = `
            
            <p style="color:red">Dit land konden we niet vinden probeer opnieuw!</p>
            `
        }
    }
}

function showCountryData(country) {
    const injectCountryElement = document.getElementById("inject_country")
    injectCountryElement.innerHTML =
        `
            <h2><span><img src="${country.flags.svg}" alt="Flag of ${country.name.common}"></span>${country.name.common}</h2>
            <p>${country.name.common} is situated in ${country.subregion}. It has a population of ${country.population} people.</p>
            <p>The Capital is ${country.capital} ${currencyString(country.currencies)}</p>
            `

}



function currencyString(currencies){
    // const currencyArray = Object.values(data.currencies)
    // console.log(currencyArray[0].name)
    const currencyArray = Object.values(currencies);

    if (currencyArray.length <= 1) {
        return `and you can pay with ${currencyArray[0].name}`
    } if (currencyArray.length > 1) {
        return `and you can pay with ${currencyArray[0].name} and ${currencyArray[1].name}`
    } else {
        return "does it have a currency? or more than 2?"
    }

}

// gebruik de value van de user in de fetchCountries function
function searchForCountry() {
    const countryName = document.getElementById("searchField").value
    void fetchCountries(countryName);
}


// Zoek button eventListener
document.getElementById("searchBtn").addEventListener("click",searchForCountry);


// OnKeyDown (Enter) eventListener
document.getElementById("searchField").addEventListener("keydown", function (e){
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        searchForCountry();
    }
} )
