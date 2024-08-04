import {RiDeleteBinLine} from "react-icons/ri"
import {useDispatch, useSelector} from "react-redux"

import {setInventory} from "../Store/slices/inventorySlice"
import {setLocalStorage} from "./utilities"

const DeleteInventoryBtn = ({id, activeDetails, setActiveDetails}) => {
  const inventory = useSelector((store) => store.inventory.value)
  const character = useSelector((store) => store.character.value)
  const dispatch = useDispatch()

  const deleteItem = (id) => {
    //finds the id of item & removes it. setGear replaces gear array with new updated array
    const filteredInventory = inventory.filter(
      (item) => item.find((prop) => prop[0] === "id")[1] !== id
    )
    const updatedCharacter = {
      ...character,
      inventory: filteredInventory,
    }
    const activeDetailsCopy = {...activeDetails}
    delete activeDetailsCopy[id]

    setLocalStorage(character.characterName, updatedCharacter)
    dispatch(setInventory(filteredInventory))
    setActiveDetails(activeDetailsCopy)
  }

  return (
    <button className="delete-item-btn" onClick={() => deleteItem(id)}>
      <RiDeleteBinLine />
    </button>
  )
}
export default DeleteInventoryBtn
