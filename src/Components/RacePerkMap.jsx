import {handleformat, perkFilter} from "./utilities"

const RacePerkMap = ({filteredRaceDetails}) => {
  return filteredRaceDetails.map(([key, value]) => {
    const customizeValue = perkFilter?.[key]?.(value)
    const valueToCheck = customizeValue === undefined ? value : customizeValue
    const renderedValue = handleformat(valueToCheck, key)

    return (
      <div className={`race-perk perk_${key}`} key={`race-perk key_${key}`}>
        <h4>{renderedValue ? key.replaceAll("_", " ") + ":" : ""}</h4>
        {renderedValue}
      </div>
    )
  })
}
export default RacePerkMap
