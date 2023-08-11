import {useState} from "react"
import {useSelector} from "react-redux"
import {v4 as uuid} from "uuid"
import {useDispatch} from "react-redux"

import {setGear} from "../Store/slices/gearSlice"
import {filter, handleformat} from "./utilities.js"
import GearItemDesc from "./charactor sheet/GearItemDesc"
import GearItem from "./charactor sheet/GearItem"

const Gear = () => {
  const gear = useSelector((store) => store.gear)
  const [showDesc, setShowDesc] = useState([])
  const dispatch = useDispatch()

  const deleteItem = (id) => {
    //finds the id of item & removes it. setGear replaces gear array with new updated array
    let updatedGear = gear.value.filter(
      (item) => item.find((prop) => prop[0] === "id")[1] !== id
    )
    dispatch(setGear(updatedGear))
  }

  return (
    <div className="gear-wrapper">
      <div className="tab-header">
        <header>Gear</header>
      </div>
      {gear.value.map((item) => {
        const id = item.find((prop) => prop[0] === "id")?.[1]
        return (
          <div className="gear-item" key={uuid()}>
            <button className="delete-item-btn" onClick={() => deleteItem(id)}>
              delete
            </button>
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

              return (
                // displays the items in gear tab
                <GearItem key={uuid()} title={key} value={renderedValue} />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
export default Gear
