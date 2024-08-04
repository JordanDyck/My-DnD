import {useState} from "react"

const InventoryCounter = ({quantity, item}) => {
  const [counter, setCount] = useState(quantity)

  return (
    <div className="counter-container">
      <label className="item-count">{counter}</label>
      <button
        onClick={() => {
          setCount((prev) => prev + 1)
        }}
      >
        +
      </button>
      <button
        disabled={counter <= 1}
        onClick={() => {
          setCount((prev) => prev - 1)
        }}
      >
        -
      </button>
    </div>
  )
}
export default InventoryCounter
