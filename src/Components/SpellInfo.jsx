import {handleformat, spellFilter} from "./utilities"

const SpellInfo = ({spell}) => {
  // console.log(spell)
  return Object.entries(spell)?.map(([key, value]) => {
    const customizeValue = spellFilter?.[key]?.(value)
    const valueToCheck = customizeValue === undefined ? value : customizeValue
    const renderedValue = handleformat(valueToCheck, key)
    const keysToHide = ["subclasses", "url", "index"]
    if (keysToHide.includes(key)) {
      return ""
    }
    if (key === "higher_level") {
      if (!value.length) return ""
    }
    return (
      <div className={`spell-info key_${key}`} key={`spell_${key}`}>
        <h4>
          {key.replaceAll("_", " ")}
          {renderedValue ? ":" : ""}
        </h4>
        {renderedValue}
      </div>
    )
  })
}
export default SpellInfo
