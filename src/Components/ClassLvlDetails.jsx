import {useMemo} from "react"

import PerkFilterBlackList from "./filters/PerkFilterBlackList.json"
import {handleformat, classLvlFilter} from "./utilities"
const ClassLvlDetails = ({mainLevel, character}) => {
  //used for previewing a level. Ex: the level list in class creator, or seeing the next level in LevelUpTab.

  const displayCustomLvlData = () => {
    // after character is created and if custom, display this instead.
    return Object.entries(mainLevel).map((category) => {
      const categoryData =
        category[0] !== "level" &&
        category[1].map((item, index) => {
          return (
            item.value !== 0 && (
              <p key={`${item.name}_${index}`}>
                {item.name.replaceAll("_", " ")}
                {category[0] !== "features" ? ":" : ""} {item.value}
              </p>
            )
          )
        })

      return (
        category[0] !== "level" && (
          <div
            className={`perk perk_${category[0]}`}
            key={`next-lvl_${category[0]}`}
          >
            <h4>{category[0].replaceAll("_", " ")}:</h4>
            {categoryData}
          </div>
        )
      )
    })
  }

  const filteredLevelDetails = useMemo(() => {
    return Object.entries(mainLevel).filter((value) => {
      if (!PerkFilterBlackList.level.includes(value[0])) {
        return true
      }
      return false
    })
  }, [mainLevel])
  if (character?.classDetails.isCustom) {
    return displayCustomLvlData()
  } else {
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
            {renderedValue ? key.replaceAll("_", " ") + ":" : "none"}
          </h4>
          {renderedValue}
        </div>
      )
    })
  }
}
export default ClassLvlDetails
