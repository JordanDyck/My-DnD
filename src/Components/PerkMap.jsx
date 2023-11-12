import {useState} from "react"
import {handleformat} from "./utilities"

import ProficiencyBonus from "./ProficiencyBonus"

const PerkMap = ({filteredRaceDetails, perkFilter}) => {
  const [skillCounter, setSkillCounter] = useState({})

  return filteredRaceDetails?.map(([key, value]) => {
    const customizeValue = perkFilter?.[key]?.(value, key)
    const valueToCheck = customizeValue === undefined ? value : customizeValue
    const renderedValue = handleformat(valueToCheck, key)
    if (key === "starting_equipment") {
      // if starting_equipment has no value, dont display it
      if (!value.length) {
        return ""
      }
    }
    if (key === "spellcasting") {
      // this way "spellcasting" doesn't get displayed because its empty anyway.
      return (
        <div className={`perk perk_${key}`} key={`perk key_${key}`}>
          <b>spell save:</b> <p>{value.spellcasting_ability.name}</p>
        </div>
      )
    }

    if (key === "proficiency_choices") {
      const options = value[0].from.options.map((element) => {
        return (
          <ProficiencyBonus
            skillCounter={skillCounter}
            setSkillCounter={setSkillCounter}
            maxChoices={value[0].choose}
            profName={element.item.name}
            key={`profBonus_${element.item.name}`}
          />
        )
      })

      return (
        <div className={`perk ${key}`} key={`profBonus_${key}`}>
          <h4>proficiency choices:</h4>
          <p>choose {value[0].choose}</p>
          {options}
        </div>
      )
    }

    return (
      <div className={`perk perk_${key}`} key={`perk key_${key}`}>
        <h4>{renderedValue ? key.replaceAll("_", " ") + ":" : ""}</h4>
        {renderedValue}
      </div>
    )
  })
}
export default PerkMap
