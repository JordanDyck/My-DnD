import {useState} from "react"

const Inventory = () => {
  const [items, setItems] = useState([])
  const [inputValue, setInputValue] = useState("")

  const [showInput, setShowInput] = useState(false)

  const handleItems = () => {
    if (inputValue.length > 0) {
      setItems((prev) => [...prev, inputValue])
      setInputValue("")
    }
    setShowInput(!showInput)
  }

  const deleteItem = (index) => {
    setItems((prev) => {
      return prev.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="inventory-wrapper">
      <div className="show-input-wrapper">
        <button
          className="show-input-btn"
          onClick={() => setShowInput(!showInput)}
        >
          +
        </button>
        {showInput && (
          <div className="item-input-container">
            <input onChange={(e) => setInputValue(e.target.value)} />
            <button className="add-btn" onClick={handleItems}>
              add
            </button>
          </div>
        )}
      </div>

      {items.length
        ? items.map((item, index) => (
            <div className="item-container" key={index}>
              <h4 className="item">{item}</h4>
              <button onClick={() => deleteItem(index)}>x</button>
            </div>
          ))
        : ""}
    </div>
  )
}
export default Inventory
