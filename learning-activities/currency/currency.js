// Api request (USD example) - ` https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const API_KEY = "cce90ec3416e16506e48a923";
const USD = "USD";
const GBP = "GBP";
const EUR = "EUR";
const CNY = "CNY";

async function getCurrencyData(currency) {
//   const url = ` https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency}`;    
//   let response = await fetch(url);
//   let json = await response.json();
//   let rubles = json.conversion_rates.RUB;
//   return rubles
    return "111"
}

function displayCurrency() {
    document.querySelector(".currency-container").innerHTML = `
    
    `
}
getCurrencyData(USD);
getCurrencyData(GBP);
getCurrencyData(EUR);
getCurrencyData(CNY);