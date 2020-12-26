import React, {useState} from "react";
import './App.css';


function App() {
    const [count, setCount] = useState(0);
    const [showError, changeShowError] = useState(false);
    const increaseCount = () => {
        changeShowError(false);
        setCount(count + 1);
    };
    const decreaseCount = () => {
        if (count !== 0) {
            setCount(count - 1);
        } else {
            changeShowError(true);
        }
    };
  return (
    <div data-test="component-app">
        <h1 data-test="counter-display">
            the counter is currently&nbsp;
            <span data-test="count">{count}</span>
        </h1>
        {showError && <h3 className="error-message" data-test="error-message">the counter can't go below zero</h3>}
        <button
            data-test="increment-button"
            onClick={() => increaseCount()}
        >Increment counter</button>
        <button
            data-test="decrement-button"
            onClick={() => decreaseCount()}
        >Decrement button</button>
    </div>
  );
}

export default App;
