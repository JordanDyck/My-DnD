import {useState} from "react"
import {RxDropdownMenu} from "react-icons/rx"
import {RiDeleteBinLine} from "react-icons/ri"

import InventoryCounter from "./InventoryCounter"
import {filter, handleformat} from "./utilities"
import GearItem from "./character sheet/GearItem"
// import DeleteInventoryBtn from "./DeleteInventoryBtn"
import {updateCharacter} from "../Store/slices/characterSlice"
import {useDispatch, useSelector} from "react-redux"

const InventoryItem = ({item, index, quantity, id}) => {
  const [activeDetails, setActiveDetails] = useState({})
  const character = useSelector((store) => store.character.value)
  const dispatch = useDispatch()
  const showDetails = (id) => {
    setActiveDetails((prev) => ({
      ...prev,
      [id]: !prev[id], // <-- update value by index key
    }))
  }
  const deleteItem = (id) => {
    //finds the item with the id & removes it.
    let updatedInventory = character?.inventory?.filter(
      (item) => item.find((prop) => prop[0] === "id")[1] !== id
    )
    const updatedCharacter = {
      ...character,
      inventory: updatedInventory,
    }

    dispatch(updateCharacter(updatedCharacter))
  }
  console.log(character)
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
          <button className="delete-item-btn" onClick={() => deleteItem(id)}>
            <RiDeleteBinLine />
          </button>
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
