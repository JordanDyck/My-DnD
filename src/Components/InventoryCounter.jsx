import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import {updateCharacter} from "../Store/slices/characterSlice"
const InventoryCounter = ({quantity, item, index, id}) => {
  const character = useSelector((store) => store.character.value)
  const [counter, setCounter] = useState(quantity)
  const dispatch = useDispatch()

  const updateItem = (increment) => {
    let inventoryCopy = [...character.inventory]
    const amountIndex = character?.inventory?.[index]?.findIndex(
      (prop) => prop[0] === "amount"
    )
    if (typeof amountIndex === "number" && amountIndex > -1) {
      // replaces amount with new amount
      const updatedItem = item.with(amountIndex, [
        "amount",
        counter + increment,
      ])

      inventoryCopy[index] = updatedItem

      const updatedChar = {
        ...character,
        inventory: inventoryCopy,
      }
      setCounter((prev) => prev + increment)

      dispatch(updateCharacter(updatedChar))
    }
  }

  return (
    <div className="counter-container">
      <label className="item-count">{counter}</label>
      <button
        onClick={() => {
          updateItem(1)
        }}
      >
        +
      </button>
      <button
        disabled={counter <= 1}
        onClick={() => {
          updateItem(-1)
        }}
      >
        -
      </button>
    </div>
  )
}
export default InventoryCounter
