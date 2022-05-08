import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  useEffect(() => {
    console.log("i run only once.");
  }, []);
  useEffect(() => {
    console.log("i run when 'keyword' chansges");
  }, [keyword]);
  useEffect(() => {
    console.log("i run when 'counter' chansges");
  }, [counter]);
  useEffect(() => {
    console.log("i run when 'keyword'&'counter' chansges");
  }, [keyword, counter]);
  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />
      <h1 className={styles.title}>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
