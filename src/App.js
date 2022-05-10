import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App(event) {
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);
  const [coins, setCoins] = useState([]);
  const [coinSymbol, setCoinSymbol] = useState("");
  const [input, setInput] = useState("");
  const [selectCoin, setSelectCoin] = useState("");
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=100")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChange = (event) => {
    setInput(event.target.value);
  };
  const onSelectCoin = (event) => {
    setSelectCoin(event.target.value);
    setCoinSymbol(event.target.title);
    setSelecting(true);
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };
  console.log(coins);
  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onSelectCoin}>
          <option>--Please choose Coin--</option>
          {coins.map((coin, index) => (
            <option key={index} value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      {loading ? null : (
        <form onSubmit={onSubmit}>
          <input
            value={input}
            type="number"
            onChange={onChange}
            placeholder="Enter money"
          />
          <button>변환</button>
          <h1>보유 머니 : {input} 원</h1>
          <h1>구매가능 : {selecting ? input / (selectCoin * 1276) : 0} 개</h1>

          <h1>원화 : {selecting ? selectCoin * 1276 : 0} 원</h1>
        </form>
      )}
    </div>
  );
}

export default App;
