'use strict'

const regionContainer = document.querySelector('.regions-el')
const countriesContainer = document.querySelector('.countries-container')
const countries = document.querySelector('.country')
const searchedCountry = document.querySelector('.search-coutry-el')
const searchedRegionContainer = document.querySelector(
  '.search-region-container'
)
const countriesDetailsContainer = document.querySelector(
  '.countries-details-container'
)

const btnToggleDarkMode = document.querySelector('.btn-light-mode')

// Functions
const renderCountry = function (r) {
  const html = `
      <div
      class="aspect-w-1 aspect-h-1 flex flex-col country cursor-pointer drop-shadow-xl dark:drop-shadow"
      data-country-code="${r.alpha3Code}"
    >
      <div class="w-full">
        <img
          src="${r.flag}"
          alt="flag"
          class="rounded-t-md w-full aspect-[16/9] object-cover"
        />
      </div>
      <div class="text-black dark:text-white bg-white dark:bg-[#2B3844] pt-7 pl-5 pb-12 h-full">
        <h3 class="font-bold text-xl tracking-wide">${r.name}</h3>
        <h4 class="mt-5 tracking-wide">
          <span class="font-medium text-lg">Population</span>:
          <span class="text-base">${r.population.toLocaleString()}</span>
        </h4>
        <h4 class="mt-2 tracking-wide">
          <span class="font-medium text-lg">Region</span>:
          <span class="text-base">${r.region}</span>
        </h4>
        <h4 class="mt-2 tracking-wide">
          <span class="font-medium text-lg">Capital</span>:
          <span class="text-base">${r.capital}</span>
        </h4>
      </div>
    </div>
     `
  countriesContainer.insertAdjacentHTML('beforeend', html)
}

const renderCountryDetails = function (country) {
  const html = `
  <div class="mt-12 flex-col gap-16 ml-3 mr-3 mb-5 flex">
  <div
    class="text-black dark:text-white flex shadow-xl max-w-24 items-center justify-center gap-2 pt-1 pb-1 pr-3 pl-3 bg-white dark:bg-[#2B3844]"
  >
    <img src="./images/call-made_light.svg" alt="" class="btn-back_light"/>
    <img src="./images/call-made.svg" alt="" class="hidden"/>
    <button class="btn-back">Back</button>
  </div>
  <div
    class="flex flex-col gap-16 lg:items-center lg:justify-start xl:gap-28 min-[900px]:flex-row min-[900px]:gap-10 lg:gap-16"
  >
    <div class="lg:max-w-[560px]">
      <img src="${country.flag}" alt="" class="" />
    </div>
    <div
      class="dark:text-white text-black flex flex-col gap-7 lg:gap-4 w-full min-[900px]:gap-2"
    >
      <p class="text-2xl font-semibold">${country.name}</p>
      <div
        class="flex flex-col gap-12 lg:flex-row min-[900px]:flex-row"
      >
        <div
          class="flex flex-col gap-3 lg:gap-2 lg:flex-1 min-[900px]:gap-2"
        >
          <p>
            <span class="font-medium">Native Name:</span>
            <span class="text-sm text-black dark:text-white text-opacity-70"
              >${country.nativeName}</span
            >
          </p>
          <p>
            <span class="font-medium">Population:</span>
            <span class="text-sm text-black dark:text-white text-opacity-70"
              >${country.population.toLocaleString()}</span
            >
          </p>
          <p>
            <span class="font-medium">Region:</span>
            <span class="text-sm text-black dark:text-white text-opacity-70"
              >${country.region}</span
            >
          </p>
          <p>
            <span class="font-medium">Sub Region:</span>
            <span class="text-sm text-black dark:text-white text-opacity-70"
              >${country.subregion}</span
            >
          </p>
          <p>
            <span class="font-medium">Capital:</span>
            <span class="text-sm text-black dark:text-white text-opacity-70">
              ${country.capital}</span
            >
          </p>
        </div>
        <div
          class="flex flex-col gap-2 lg:flex-1 min-[900px]:gap-2 min-[900px]:"
        >
          <p>
            <span class="font-medium"> Top Level Domain:</span>
            <span class="text-sm text-black dark:text-white text-opacity-70"
              >${country.topLevelDomain[0]}</span
            >
          </p>
          <p>
            <span class="font-medium">Currencies:</span>
            <span class="text-sm text-black dark:text-white text-opacity-70"
              >${country.currencies[0].name}</span
            >
          </p>
          <p>
            <span class="font-medium">Languages:</span>
            <span class="text-sm text-black dark:text-white text-opacity-70"
              >${country.languages
                .map(language => language.name)
                .join(', ')}</span>
          </p>
        </div>
      </div>
      <div
        class="mt-2 lg:mt-5 flex flex-col min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-3"
      >
        <p>Border Countries:</p>
        <div
          class="flex gap-3 mt-3 items-center flex-wrap lg:mt-0 min-[900px]:mt-0"
        >
          ${
            country.borders
              ? country.borders
                  .map(
                    border =>
                      `<p class="drop-shadow-xl bg-white dark:bg-[#2B3844] pr-6 pl-6 pt-[5px] pb-[5px] text-sm">
            ${border} 
          </p>`
                  )
                  .join('')
              : (country.borders = `<p class="bg-white drop-shadow-xl dark:bg-[#2B3844] pr-6 pl-6 pt-[5px] pb-[5px] text-sm">
              ${(country.borders = 'None')} 
            </p>`)
          }
        </div>
      </div>
    </div>
  </div>
</div>
      `

  countriesDetailsContainer.insertAdjacentHTML('beforeend', html)
}

const getAllCountriesData = async function () {
  const data = await fetch('./data.json')
  const res = await data.json()
  return res
}

const displayCountries = async function () {
  const data = await getAllCountriesData()
  data.forEach(res => {
    renderCountry(res)
  })
}

const getCountryRegion = function (e) {
  const liEl = e.target
  if (!liEl.classList.contains('region-el')) return
  const selectedRegion = liEl.textContent

  getAllCountriesData().then(responses => {
    const countries = Array.from(countriesContainer.children)
    countries.forEach(country => {
      country.classList.add('hidden')
    })
    responses.forEach(res => {
      if (res.region === selectedRegion) {
        renderCountry(res)
      }
    })
  })
}

const getSearchedCountry = function () {
  let countries

  getAllCountriesData().then(responses => {
    countries = Array.from(countriesContainer.children)
    countries.forEach(country => {
      country.classList.add('hidden')
    })

    responses.forEach(response => {
      if (response.name.toLowerCase().includes(`${searchedCountry.value}`)) {
        renderCountry(response)
      } else {
        countries.forEach(country => {
          country.classList.add('hidden')
        })
      }
    })
  })
}

const getCountryDetails = async function (e) {
  const clicked = e.target

  const countryCode = clicked
    .closest('.country')
    .getAttribute('data-country-code')

  const countries = await getAllCountriesData()

  countries.forEach(country => {
    if (country.alpha3Code === countryCode) {
      countriesDetailsContainer.innerHTML = ''

      searchedRegionContainer.classList.remove('lg:flex')
      searchedRegionContainer.classList.add('hidden')
      countriesContainer.classList.add('hidden')
      countriesDetailsContainer.classList.remove('hidden')
      renderCountryDetails(country)
    }
  })
}

const removeCountryDetails = function (e) {
  const clicked = e.target

  if (clicked.classList.contains('btn-back')) {
    countriesDetailsContainer.classList.add('hidden')
    countriesContainer.classList.remove('hidden')
    searchedRegionContainer.classList.remove('lg:hidden')
    searchedRegionContainer.classList.remove('hidden')
    searchedRegionContainer.classList.add('lg:flex')
  }
}

const toggleLightDarkMode = function () {
  document.documentElement.classList.toggle('dark')

  this.parentElement.children[0].classList.toggle('hidden')
  this.parentElement.children[1].classList.toggle('hidden')

  console.log(this.textContent === ' Dark mode ')
  searchedRegionContainer.children[1].classList.toggle('hidden')
  searchedRegionContainer.children[2].classList.toggle('hidden')

  document.querySelector('.btn-filter').children[0].classList.toggle('hidden')
  document.querySelector('.btn-filter').children[1].classList.toggle('hidden')
  document.querySelector('.btn-back_light')?.classList.toggle('hidden')
  document
    .querySelector('.btn-back_light')
    ?.nextElementSibling.classList.toggle('hidden')
}

// Event handlers
document.addEventListener('load', displayCountries())

// Trying to do wetin pass my power at the moment
// window.matchMedia('(prefers-color-scheme: dark)').matches
//   ? document.documentElement.classList.add('dark')
//   : document.documentElement.classList.remove('dark')

document.querySelector('.btn-filter').addEventListener('click', function () {
  document.querySelector('.regions-el').classList.toggle('hidden')
})

// To get region
regionContainer.addEventListener('click', function (e) {
  getCountryRegion(e)
})

// Get searched country
searchedCountry.addEventListener('input', function () {
  getSearchedCountry()
})

// To get country details
countriesContainer.addEventListener('click', function (e) {
  getCountryDetails(e).then(res => {
    if (document.documentElement.classList.contains('dark')) {
      document.querySelector('.btn-back_light').classList.add('hidden')
      document
        .querySelector('.btn-back_light')
        .nextElementSibling.classList.remove('hidden')
    }
  })
})

// Remove country details
countriesDetailsContainer.addEventListener('click', function (e) {
  removeCountryDetails(e)
})

// Toggle light and dark mode
btnToggleDarkMode.addEventListener(
  'click',
  toggleLightDarkMode.bind(btnToggleDarkMode)
)
