import {v4 as uuid} from "uuid"
import {useState} from "react"
import {RxDropdownMenu} from "react-icons/rx"

import InventoryCounter from "./InventoryCounter"
import {filter, handleformat} from "./utilities"
import GearItem from "./character sheet/GearItem"
import DeleteInventoryBtn from "./DeleteInventoryBtn"

const InventoryItem = ({item, quantity, id, inventory}) => {
  const [activeDetails, setActiveDetails] = useState({})

  const showDetails = (id) => {
    setActiveDetails((prev) => ({
      ...prev,
      [id]: !prev[id], // <-- update value by index key
    }))
  }

  return (
    <div className="inventory-item-container">
      <div className="inventory-item">
        <button
          className="inventory-details-btn"
          onClick={() => showDetails(id)}
        >
          <RxDropdownMenu />
        </button>
        <h5>{item[0][1]}</h5>
        <InventoryCounter quantity={quantity} />
        <DeleteInventoryBtn
          inventory={inventory}
          id={id}
          setActiveDetails={setActiveDetails}
          activeDetails={activeDetails}
        />
      </div>
      <div
        className={
          activeDetails[id]
            ? "inventory-detail-container"
            : "inventory-detail-container hidden"
        }
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
          if (key === "Quantity") {
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
