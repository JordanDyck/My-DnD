import {useMemo} from "react"

import PerkFilterBlackList from "./PerkFilterBlackList.json"
import {handleformat, classLvlFilter} from "./utilities"
const ClassLvlDetails = ({perk}) => {
  const filteredClassDetails = useMemo(() => {
    return Object.entries(perk).filter((value) => {
      if (!PerkFilterBlackList.level.includes(value[0])) {
        return true
      }
      return false
    })
  }, [perk])
  return filteredClassDetails.map(([key, value]) => {
    const customizeValue = classLvlFilter?.[key]?.(value)
    const valueToCheck = customizeValue === undefined ? value : customizeValue
    const renderedValue = handleformat(valueToCheck, key)
    if (key === "ability_score_bonuses") {
      return ""
    }

    return (
      <div className={`perk perk_${key}`} key={`perk key_${key}`}>
        <h4 className={`${key}_title`}>
          {renderedValue ? key.replaceAll("_", " ") + ":" : ""}
        </h4>
        {renderedValue}
      </div>
    )
  })
}
export default ClassLvlDetails
