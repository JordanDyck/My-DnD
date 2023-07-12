import {useState} from "react"
import {useSelector} from "react-redux"
import {v4 as uuid} from "uuid"

const Inventory = () => {
  const [items, setItems] = useState([])
  const inventory = useSelector((store) => store.inventory)

  console.log("inventory ", inventory)

  const deleteItem = (index) => {
    setItems((prev) => {
      return prev.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="inventory-wrapper">
      {inventory.value.map((item) => {
        return (
          <div className="inventory-item" key={`inventoryId${uuid()}`}>
            <h5>{item[0][1]}</h5>
          </div>
        )
      })}
    </div>
  )
}
export default Inventory
