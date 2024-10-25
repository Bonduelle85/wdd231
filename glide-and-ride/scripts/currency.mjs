// Api request (USD example) - ` https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const API_KEY = "cce90ec3416e16506e48a923";
const USD = "USD";
const GBP = "GBP";
const EUR = "EUR";
const CNY = "CNY";

let usdRate;
let eurRate;
let gbpRate;
let cnyRate;

fetchAllCurrencies();

async function fetchAllCurrencies() {
    await Promise.all([
      getCurrencyData(USD),
      getCurrencyData(GBP),
      getCurrencyData(EUR),
      getCurrencyData(CNY)
    ]);
    displayCurrency();
  }

async function getCurrencyData(currency) {
    // let url = ` https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      let json = await response.json();
      let data = json.conversion_rates.RUB;
      switch (currency) {
        case "USD":
          usdRate = data;
          break;
        case "GBP":
          gbpRate = data;
          break;
        case "EUR":
          eurRate = data;
          break;
        case "CNY":
          cnyRate = data;
          break;
        default:
          break;
      }
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayCurrency() {
  document.querySelector(".exchange-rate-card").innerHTML = `
        <h3>Exchange Rate</h3><hr>
        <div class = "info-weather-currency">
            <p>
                <img src="https://bonduelle85.github.io/wdd231/glide-and-ride/images/currency/us.svg" width="28" height="28" alt="USA flag" loading="lazy"/>
                1$  = <span>${Math.ceil(usdRate)}</span>₽ 
                <img src="https://bonduelle85.github.io/wdd231/glide-and-ride/images/currency/ru.svg" width="28" height="28" alt="RU flag" loading="lazy"/>
            </p>
            <p>
                <img src="https://bonduelle85.github.io/wdd231/glide-and-ride/images/currency/eu.svg" width="28" height="28" alt="EU flag" loading="lazy"/>
                1€  = <span>${Math.ceil(eurRate)}</span>₽ 
                <img src="https://bonduelle85.github.io/wdd231/glide-and-ride/images/currency/ru.svg" width="28" height="28" alt="RU flag" loading="lazy"/>
            </p>
            <p>
                <img src="https://bonduelle85.github.io/wdd231/glide-and-ride/images/currency/gb.svg" width="28" height="28" alt="GB flag" loading="lazy"/>
                1£  = <span>${Math.ceil(gbpRate)}</span>₽ 
                <img src="https://bonduelle85.github.io/wdd231/glide-and-ride/images/currency/ru.svg" width="28" height="28" alt="RU flag" loading="lazy"/>
            </p>
            <p>
                <img src="https://bonduelle85.github.io/wdd231/glide-and-ride/images/currency/cn.svg" width="28" height="28" alt="CN flag" loading="lazy"/>
                1¥  = <span>${Math.ceil(cnyRate)}</span>₽ 
                <img src="https://bonduelle85.github.io/wdd231/glide-and-ride/images/currency/ru.svg" width="28" height="28" alt="RU flag" loading="lazy"/>
            </p>
        </div>   
    `;
}

export default displayCurrency;
