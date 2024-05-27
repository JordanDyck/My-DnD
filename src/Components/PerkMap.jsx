import {handleformat} from "./utilities"

import SkillSelector from "./Custom Character/SkillSelector"

const PerkMap = ({filteredRaceDetails, perkFilter, setNewDetails}) => {
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

    if (key === "hit_die") {
      return (
        <div className={`perk perk_${key}`} key={`perk key_${key}`}>
          <h4 className="h4-title">
            hit dice: <span>D{value}</span>
          </h4>
          <div className="perk_health">
            <h4 className="h4-title">
              health:
              <input
                type="number"
                onChange={(e) => {
                  setNewDetails((prev) => ({
                    ...prev,
                    health: {currentHP: e.target.value, maxHP: e.target.value},
                  }))
                }}
              />
            </h4>
          </div>
        </div>
      )
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
          key={`class_skills_proficiency_choices${index}`}
          setDetails={setNewDetails}
          maxChoices={value[0].choose}
          type={"class_custom_proficiencies"}
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
            <input
              name="age"
              onChange={(e) => {
                setNewDetails((prev) => ({
                  ...prev,
                  age: e.target.value,
                }))
              }}
            />
          </h4>

          <p>{value}</p>
        </div>
      )
    }
    if (key === "size_description") {
      return (
        <div className={`perk perk_${key}`} key={`perk_${key}`}>
          <div
            className="custom-size"
            onChange={(e) => {
              setNewDetails((prev) => ({
                ...prev,
                size: {
                  ...prev.size,
                  [e.target.name]: e.target.value,
                },
              }))
            }}
          >
            <h4 className="h4-title">size:</h4>
            <span>ft</span>
            <input type="number" name="ft" />
            <span>in</span>
            <input type="number" name="inch" />
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
          setDetails={setNewDetails}
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
          key={`race_proficiency_choices${index}`}
          setDetails={setNewDetails}
          maxChoices={value.choose}
          type={"race_custom_proficiencies"}
          data={options}
          isCustom={false}
        />
      )
    }

    return (
      <div className={`perk perk_${key}`} key={`perk key_${key}`}>
        <h4 className="h4-title">
          {renderedValue ? key.replaceAll("_", " ") + ":" : ""}
        </h4>
        {renderedValue}
      </div>
    )
  })
}
export default PerkMap
