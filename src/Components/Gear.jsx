import "../styles/Gear.scss"
import {useState} from "react"
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"
import {RiDeleteBinLine} from "react-icons/ri"

import {filter, handleformat} from "./utilities.js"
import GearItemDesc from "./character sheet/GearItemDesc"
import GearItem from "./character sheet/GearItem"
import {updateCharacter} from "../Store/slices/characterSlice.js"

const Gear = () => {
  const character = useSelector((store) => store.character.value)
  const [showDesc, setShowDesc] = useState([])
  const dispatch = useDispatch()

  const deleteItem = (id) => {
    //finds the item with the id & removes it.
    let updatedGear = character?.gear?.filter(
      (item) => item.find((prop) => prop[0] === "id")[1] !== id
    )
    const updatedCharacter = {
      ...character,
      gear: updatedGear,
    }

    dispatch(updateCharacter(updatedCharacter))
  }

  return (
    <div className="gear-wrapper">
      <div className="tab-header">
        <header>Equipped Gear</header>
      </div>
      {character?.gear?.map((item) => {
        const id = item.find((prop) => prop[0] === "id")?.[1]

        return (
          <div className="gear-item" key={id}>
            <button className="delete-item-btn" onClick={() => deleteItem(id)}>
              <RiDeleteBinLine />
            </button>

            <div className="gear-item-stats">
              {item.map(([key, value], i) => {
                const customizeValue = filter?.[key]?.(value)
                const valueToCheck =
                  customizeValue === undefined ? value : customizeValue

                const renderedValue = handleformat(valueToCheck, key)

                if (key === "desc") {
                  return (
                    // displays description for items in gear tab
                    <GearItemDesc
                      key={`desc_${id}`}
                      id={id}
                      update={setShowDesc}
                      showDesc={showDesc.includes(id)}
                      value={value}
                    />
                  )
                }

                const keysToHide = [
                  "id",
                  "custom",
                  "cost",
                  "str_minimum",
                  "linkedCharacter",
                  "amount",
                ]
                // so the key does not get displayed in gear tab
                if (keysToHide.includes(key)) {
                  return ""
                }

                return (
                  // displays the items in gear tab
                  <GearItem
                    key={`item_${i}${id}`}
                    title={key}
                    id={id}
                    value={renderedValue}
                    type={"gear"}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Gear
