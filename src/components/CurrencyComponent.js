import React from "react";
import "./CurrencyComponent.css";

const CurrencyComponent = ({
  currencyChoice,
  selectCurrency,
  changeCurrency,
  amount,
  onChangeAmount,
}) => {
  return (
    <div className="currency">
      <select value={selectCurrency} onChange={changeCurrency}>
        {currencyChoice.map((el, idx) => (
          <option key={idx} value={el}>
            {el}
          </option>
        ))}
      </select>
      <input type="number" value={amount} onChange={onChangeAmount} />
    </div>
  );
};

export default CurrencyComponent;
