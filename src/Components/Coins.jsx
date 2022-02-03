import React from "react";

const Coins = ({
  name,
  rank,
  icon,
  price,
  symbol,
  priceChange1d,
  priceChange1w,
  marketCap,
}) => {
  return (
    <div className="card">
      <p className="coin__rank"> {rank} </p>
      <div className="coin__name">
        <img className="coin__img" src={icon} /> {name}
        <span className="coin__symbol"> {symbol} </span>
      </div>
      <p className="coin__price">
        $
        {price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      <p className="price__variation">{priceChange1d.toFixed(2)}%</p>
      <p>{priceChange1w.toFixed(2)}%</p>
      <p className="market__cap">
        $ {Math.round((marketCap * 100) / 100).toLocaleString()}
      </p>
    </div>
  );
};

export default Coins;
