import { useEffect, useState } from "react";
import CurrencyComponent from "./components/CurrencyComponent";
import money from "./img/money.png";

function App() {
  const url = `https://api.exchangerate-api.com/v4/latest/usd`;

  const [currencyChoice, setCurrencyChoice] = useState([]);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("THB");

  const [amount, setAmount] = useState(1);
  const [exChangeRate, setExChangeRate] = useState(0);

  const [checkfromCurrency, setCheckFromCurrency] = useState(true);

  let fromAmount, toAmount;

  if (checkfromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exChangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exChangeRate).toFixed(2);
  }

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCurrencyChoice([...Object.keys(data.rates)]);
        setExChangeRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  const amountFromCurrency = e => {
    setAmount(e.target.value);
    setCheckFromCurrency(true);
  };

  const amountToCurrency = e => {
    setAmount(e.target.value);
    setCheckFromCurrency(false);
  };

  return (
    <div>
      <img src={money} alt="logo" className="money-img" />
      <h1>แอพแปลงสกุลเงิน (API)</h1>
      <div className="container">
        <CurrencyComponent
          currencyChoice={currencyChoice}
          selectCurrency={fromCurrency}
          changeCurrency={e => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={amountFromCurrency}
        />
        <div className="equal"> = </div>
        <CurrencyComponent
          currencyChoice={currencyChoice}
          selectCurrency={toCurrency}
          changeCurrency={e => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={amountToCurrency}
        />
      </div>
    </div>
  );
}

export default App;
