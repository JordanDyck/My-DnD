import {useState} from "react"

const InventoryCounter = () => {
  const [counter, setCount] = useState(1)

  return (
    <div className="counter-container">
      <label className="item-count">{counter}</label>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
    </div>
  )
}
export default InventoryCounter
