import {handleformat} from "./utilities"

import SkillSelector from "./Custom Character/SkillSelector"

const PerkMap = ({
  filteredRaceDetails,
  perkFilter,
  newProfDetails,
  setNewProfDetails,
}) => {
  return filteredRaceDetails?.map(([key, value], index) => {
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
        return {
          name: element.item.name.replaceAll("Skill:", ""),
        }
      })
      return (
        <SkillSelector
          key={`skills_proficiency_choices${index}`}
          setDetails={setNewProfDetails}
          maxChoices={value[0].choose}
          type={"skill_proficiencies"}
          data={options}
          isCustom={false}
        />
      )
    }
    if (key === "age") {
      return (
        <div className={`perk perk_${key}`} key={`perk_${key}`}>
          <h4>
            age:
            <input name="age" />
          </h4>

          <p>{value}</p>
        </div>
      )
    }
    if (key === "size_description") {
      return (
        <div className={`perk perk_${key}`} key={`perk_${key}`}>
          <div className="custom-size">
            <h4>size:</h4>
            <span>ft</span>
            <input type="number" name="size-ft" />
            <span>in</span>
            <input type="number" name="size-inch" />
          </div>
          <p>{value}</p>
        </div>
      )
    }
    if (key === "ability_bonus_options") {
      const options = value.from.options.map((element) => {
        return {name: element.ability_score.name}
      })
      return (
        <SkillSelector
          key={`skills_ability_bonus_choices${index}`}
          setDetails={setNewProfDetails}
          maxChoices={value.choose}
          type={"ability_improvement"}
          data={options}
          isCustom={false}
        />
      )
    }
    if (key === "starting_proficiency_options") {
      const options = value.from.options.map((element) => {
        return {name: element.item.name.replaceAll("Skill:", "")}
      })

      return (
        <SkillSelector
          key={`starting_proficiency_choices${index}`}
          setDetails={setNewProfDetails}
          maxChoices={value.choose}
          type={"skill_proficiencies"}
          data={options}
          isCustom={false}
        />
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
