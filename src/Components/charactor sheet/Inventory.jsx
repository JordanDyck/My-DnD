import {useState} from "react"

const Inventory = () => {
  const [items, setItems] = useState([])
  const [inputValue, setInputValue] = useState("")

  const handleItems = () => {
    if (inputValue.length > 0) {
      setItems((prev) => [...prev, inputValue])
      setInputValue("")
    }
  }

  const deleteItem = (index) => {
    setItems((prev) => {
      return prev.filter((_, i) => i !== index)
    })
  }

  return <div className="inventory-wrapper"></div>
}
export default Inventory
