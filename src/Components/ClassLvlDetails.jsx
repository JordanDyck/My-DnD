import {useMemo} from "react"

import PerkFilterBlackList from "./filters/PerkFilterBlackList.json"
import {handleformat, classLvlFilter} from "./utilities"
const ClassLvlDetails = ({mainLevel}) => {
  //used for previewing a level. Ex: the level list in class creator, or seeing the next level in LevelUpTab.

  const filteredLevelDetails = useMemo(() => {
    return Object.entries(mainLevel).filter((value) => {
      if (!PerkFilterBlackList.level.includes(value[0])) {
        return true
      }
      return false
    })
  }, [mainLevel])

  return filteredLevelDetails.map(([key, value]) => {
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
