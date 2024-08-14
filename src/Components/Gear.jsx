import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {v4 as uuid} from "uuid"
import {useDispatch} from "react-redux"
import {RiDeleteBinLine} from "react-icons/ri"

import {setGear} from "../Store/slices/gearSlice"
import {filter, handleformat} from "./utilities.js"
import GearItemDesc from "./character sheet/GearItemDesc"
import GearItem from "./character sheet/GearItem"

const Gear = () => {
  const gear = useSelector((store) => store.gear.value)
  const character = useSelector((store) => store.character.value)
  const [showDesc, setShowDesc] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    // sets inventory to sync up to localStorage when localStorage changes.
    dispatch(setGear(character.gear))
  }, [character.gear, dispatch])

  const deleteItem = (id) => {
    //finds the id of item & removes it. setGear replaces gear array with new updated array
    let updatedGear = gear.filter(
      (item) => item.find((prop) => prop[0] === "id")[1] !== id
    )

    dispatch(setGear(updatedGear))
  }

  return (
    <div className="gear-wrapper">
      <div className="tab-header">
        <header>Gear</header>
      </div>
      {gear.map((item) => {
        const id = item.find((prop) => prop[0] === "id")?.[1]
        return (
          <div className="gear-item" key={uuid()}>
            <button className="delete-item-btn" onClick={() => deleteItem(id)}>
              <RiDeleteBinLine />
            </button>
            <div className="gear-item-stats">
              {item.map(([key, value]) => {
                const customizeValue = filter?.[key]?.(value)
                const valueToCheck =
                  customizeValue === undefined ? value : customizeValue

                const renderedValue = handleformat(valueToCheck, key)

                if (key === "desc") {
                  return (
                    // displays description for items in gear tab
                    <GearItemDesc
                      key={uuid()}
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
                ]
                // so the key does not get displayed in gear tab
                if (keysToHide.includes(key)) {
                  return ""
                }

                return (
                  // displays the items in gear tab
                  <GearItem key={uuid()} title={key} value={renderedValue} />
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
