import {useState} from "react"
import {useSelector} from "react-redux"
import {v4 as uuid} from "uuid"

import {filter, handleformat} from "../FilterValues"
import GearItemDesc from "../GearItemDesc"
import GearItem from "../GearItem"

const Gear = () => {
  const gear = useSelector((store) => store.gear)
  const [showDesc, setShowDesc] = useState([])
  console.log("beep")

  return (
    <div className="gear-wrapper">
      {gear.value.map((item) => {
        return (
          <div className="gear-item" key={uuid()}>
            {item.map(([key, value]) => {
              const customizeValue = filter?.[key]?.(value)
              const valueToCheck =
                customizeValue === undefined ? value : customizeValue
              const renderedValue = handleformat(valueToCheck, key)

              if (key === "desc") {
                const id = item.find((prop) => prop[0] === "id")?.[1]

                return (
                  // displays description for item in gear tab

                  <GearItemDesc
                    key={uuid()}
                    id={id}
                    update={setShowDesc}
                    showDesc={showDesc.includes(id)}
                    value={value}
                  />
                )
              }

              if (key === "id") {
                return ""
              }

              return (
                // displays the item in gear tab

                <GearItem
                  key={uuid()}
                  title={key}
                  renderedValue={renderedValue}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
export default Gear
