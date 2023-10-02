import {handleformat} from "./utilities"

const PerkMap = ({filteredRaceDetails, perkFilter}) => {
  if (!Array.isArray(filteredRaceDetails)) {
    return null
  }
  return filteredRaceDetails?.map(([key, value]) => {
    const customizeValue = perkFilter?.[key]?.(value)
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

    return (
      <div className={`perk perk_${key}`} key={`perk key_${key}`}>
        <h4>{renderedValue ? key.replaceAll("_", " ") + ":" : ""}</h4>
        {renderedValue}
      </div>
    )
  })
}
export default PerkMap
