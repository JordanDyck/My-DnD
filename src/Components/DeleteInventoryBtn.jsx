import {RiDeleteBinLine} from "react-icons/ri"
import {useDispatch} from "react-redux"

import {setInventory} from "../Store/slices/inventorySlice"

const DeleteInventoryBtn = ({
  inventory,
  id,
  activeDetails,
  setActiveDetails,
}) => {
  const dispatch = useDispatch()

  const deleteItem = (id) => {
    //finds the id of item & removes it. setGear replaces gear array with new updated array
    let updatedGear = inventory.value.filter(
      (item) => item.find((prop) => prop[0] === "id")[1] !== id
    )
    //
    const activeDetailsCopy = {...activeDetails}
    delete activeDetailsCopy[id]
    // updates inventory with new items
    setActiveDetails(activeDetailsCopy)
    dispatch(setInventory(updatedGear))
  }

  return (
    <button className="delete-item-btn" onClick={() => deleteItem(id)}>
      <RiDeleteBinLine />
    </button>
  )
}
export default DeleteInventoryBtn
