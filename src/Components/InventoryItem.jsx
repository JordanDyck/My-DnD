import {useState} from "react"
import {RxDropdownMenu} from "react-icons/rx"

import InventoryCounter from "./InventoryCounter"
import {filter, handleformat} from "./utilities"
import GearItem from "./character sheet/GearItem"
import DeleteInventoryBtn from "./DeleteInventoryBtn"

const InventoryItem = ({item, index, quantity, id}) => {
  const [activeDetails, setActiveDetails] = useState({})

  const showDetails = (id) => {
    setActiveDetails((prev) => ({
      ...prev,
      [id]: !prev[id], // <-- update value by index key
    }))
  }

  return (
    item && (
      <div className="inventory-item-container">
        <div className="inventory-item">
          <button
            className="inventory-details-btn"
            onClick={() => showDetails(id)}
          >
            <RxDropdownMenu />
          </button>
          <h5>{item?.[0][1]}</h5>
          <InventoryCounter quantity={quantity} item={item} index={index} />
          <DeleteInventoryBtn
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
          {item?.map(([key, value], index) => {
            const customizeValue = filter?.[key]?.(value)
            const valueToCheck =
              customizeValue === undefined ? value : customizeValue

            const renderedValue = handleformat(valueToCheck, key)

            const keysToHide = [
              "id",
              "custom",
              "cost",
              "str_minimum",
              "Quantity",
              "linkedCharacter",
              "amount",
            ]

            // so the key does not get displayed in gear tab
            if (keysToHide.includes(key)) {
              return ""
            }

            return (
              // displays the items details
              <div
                className="inventory-detail"
                key={`dropDownFor_${id}${index}`}
              >
                <GearItem title={key} value={renderedValue} id={id} />
              </div>
            )
          })}
        </div>
      </div>
    )
  )
}
export default InventoryItem
