import {useSelector, useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"
import {RiDeleteBinLine} from "react-icons/ri"
import {useState} from "react"

import {setInventory} from "../../Store/slices/inventorySlice"
import InventoryCounter from "../InventoryCounter"

const Inventory = () => {
  const inventory = useSelector((store) => store.inventory)
  const dispatch = useDispatch()

  const deleteItem = (id) => {
    //finds the id of item & removes it. setGear replaces gear array with new updated array
    let updatedGear = inventory.value.filter(
      (item) => item.find((prop) => prop[0] === "id")[1] !== id
    )
    dispatch(setInventory(updatedGear))
  }

  return (
    <div className="inventory-wrapper">
      <div className="tab-header">
        <header>Inventory</header>
      </div>
      {inventory.value.map((item) => {
        const id = item.find((prop) => prop[0] === "id")?.[1]

        return (
          <div className="inventory-item" key={`inventoryId${uuid()}`}>
            <h5>{item[0][1]}</h5>
            <InventoryCounter />
            <button className="delete-item-btn" onClick={() => deleteItem(id)}>
              <RiDeleteBinLine />
            </button>
          </div>
        )
      })}
    </div>
  )
}
export default Inventory
