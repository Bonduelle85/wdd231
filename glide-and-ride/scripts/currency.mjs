// Api request (USD example) - ` https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const API_KEY = "cce90ec3416e16506e48a923";
const USD = "USD";
const GBP = "GBP";
const EUR = "EUR";
const CNY = "CNY";

async function getCurrencyData(currency) {
  const url = ` https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency}`;    
  let response = await fetch(url);
  let json = await response.json();
  let rubles = json.conversion_rates.RUB;
  return rubles
}

function displayCurrency() {
    document.querySelector(".exchange-rate-card").innerHTML = `
        <h3>Exchange Rate</h3><hr>
        <p>
            <img src="../images/currency/us.svg" width="28" height="28" alt="USA flag" loading="lazy"/>
            1$ USD = <span>${getCurrencyData(USD)}</span>₽ RUB
            <img src="../images/currency/ru.svg" width="28" height="28" alt="RU flag" loading="lazy"/>
        </p>
        <p>
            <img src="../images/currency/eu.svg" width="28" height="28" alt="EU flag" loading="lazy"/>
            1€ EUR = <span>${getCurrencyData(EUR)}</span>₽ RUB
            <img src="../images/currency/ru.svg" width="28" height="28" alt="RU flag" loading="lazy"/>
        </p>
        <p>
            <img src="../images/currency/gb.svg" width="28" height="28" alt="GB flag" loading="lazy"/>
            1£ GBP = <span>${getCurrencyData(GBP)}</span>₽ RUB
            <img src="../images/currency/ru.svg" width="28" height="28" alt="RU flag" loading="lazy"/>
        </p>
        <p>
            <img src="../images/currency/cn.svg" width="28" height="28" alt="CN flag" loading="lazy"/>
            1¥ CNY = <span>${getCurrencyData(CNY)}</span>₽ RUB
            <img src="../images/currency/ru.svg" width="28" height="28" alt="RU flag" loading="lazy"/>
        </p>
    `
}

export default displayCurrency;