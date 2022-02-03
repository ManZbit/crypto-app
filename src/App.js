import axios from "axios";
import { useState, useEffect } from "react";
import Coins from "./Components/Coins";
import "./App.css";

function App() {
  const [coinsArray, setCoinsArray] = useState([]);
  const [searchCoin, setSearchCoin] = useState("");
  const [searchSymbol, setSearchSymbol] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.coinstats.app/public/v1/coins?skip=0&limit=100"
      );
      setCoinsArray(response.data.coins);
    };
    fetchData().catch(console.error);
    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  console.log(coinsArray);

  const filteredCoins = coinsArray.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(searchCoin.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchSymbol.toLowerCase())
    );
  });

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Search cryptocurrencies"
          onChange={(e) => {
            setSearchCoin(e.target.value);
            setSearchSymbol(e.target.value);
          }}
        />
        <div className="coin__header">
          <p>#</p>
          <p className="name">Name</p>
          <p className="price">Price</p>
          <p className="24h">24 h</p>
          <p className="7d">7 d</p>
          <p className="marketcap">Market cap</p>
        </div>
      </div>
      <section className="card__container">
        {filteredCoins?.map((coin) => {
          return (
            <Coins
              key={coin.id}
              name={coin.name}
              rank={coin.rank}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
              priceChange1d={coin.priceChange1d}
              priceChange1w={coin.priceChange1w}
              marketCap={coin.marketCap}
            />
          );
        })}
      </section>
    </div>
  );
}

export default App;
