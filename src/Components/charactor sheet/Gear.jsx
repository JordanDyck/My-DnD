import {useSelector} from "react-redux"
import {v4 as uuid} from "uuid"

import {filter, handleformat} from "../FilterValues"

const Gear = () => {
  const gear = useSelector((store) => store.gear)

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

              return (
                // displays the values
                <div className={`gear-info key_${key}`} key={uuid()}>
                  <h4>
                    {key.replaceAll("_", " ")}
                    {renderedValue ? ":" : ""}
                  </h4>
                  {renderedValue}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
export default Gear
