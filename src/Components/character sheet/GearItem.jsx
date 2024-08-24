import {useDispatch, useSelector} from "react-redux"
import {updateCharacter} from "../../Store/slices/characterSlice"

const GearItem = ({title, value, id, type}) => {
  const character = useSelector((store) => store.character.value)
  const dispatch = useDispatch()
  const moveToInventory = (id) => {
    // moves gear item into inventory
    let filteredGear = character?.gear?.filter(
      (item) => item.find((prop) => prop[0] === "id")[1] !== id
    )
    let getItem = character?.gear?.filter(
      (item) => item.find((prop) => prop[0] === "id")[1] === id
    )
    const updatedInventory = [...character.inventory, getItem[0]]
    const newInventory = {
      ...character,
      inventory: updatedInventory,
      gear: filteredGear,
    }

    if (type === "gear") {
      return dispatch(updateCharacter(newInventory))
    } else return ""
  }
  return (
    <div
      className={`gear-info key_${title}`}
      key={`gearInfo_${title}_at_${id}`}
      onClick={() => moveToInventory(id)}
    >
      <h4>
        {title.replaceAll("_", " ")}
        {value ? ":" : ""}
      </h4>
      {value}
    </div>
  )
}
export default GearItem
