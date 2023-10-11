import {handleformat} from "./utilities"

const PerkMap = ({filteredRaceDetails, perkFilter}) => {
  return filteredRaceDetails?.map(([key, value]) => {
    // classlvl gets turned into just an object (THIS IS WHAT WE WANT)
    // figure out how to seperate the object into their own objects

    const customizeValue = perkFilter?.[key]?.(value, key)
    // console.log(filteredRaceDetails)
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
