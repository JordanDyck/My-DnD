import {v4 as uuid} from "uuid"

import {useState} from "react"
import InventoryCounter from "./InventoryCounter"
import {filter, handleformat} from "./utilities"
import GearItem from "./charactor sheet/GearItem"
import DeleteInventoryBtn from "./DeleteInventoryBtn"

const InventoryItem = ({item, id, inventory}) => {
  const [activeDetails, setActiveDetails] = useState({})
  const showDetails = (id) => {
    setActiveDetails((prev) => ({
      ...prev,
      [id]: !prev[id], // <-- update value by index key
    }))
  }

  return (
    <div className="inventory-container">
      <div className="inventory-item">
        <h5>
          {item[0][1]}
          <button onClick={() => showDetails(id)}>details</button>
        </h5>
        <InventoryCounter />
        <DeleteInventoryBtn
          inventory={inventory}
          id={id}
          setActiveDetails={setActiveDetails}
          activeDetails={activeDetails}
        />
      </div>
      <div
        className={activeDetails[id] ? "inventory-detail-container" : "hidden"}
      >
        {item.map(([key, value]) => {
          const customizeValue = filter?.[key]?.(value)
          const valueToCheck =
            customizeValue === undefined ? value : customizeValue

          const renderedValue = handleformat(valueToCheck, key)

          // so the key does not get displayed in gear tab
          if (key === "id") {
            return ""
          }
          if (key === "custom") {
            return ""
          }
          if (key === "cost") {
            return ""
          }
          if (key === "str_minimum") {
            return ""
          }

          return (
            // displays the items details
            <div className="inventory-detail" key={uuid()}>
              <GearItem title={key} value={renderedValue} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default InventoryItem
