import {useState} from "react"
import Select from "react-select"
import ClassLvlDetails from "../../ClassLvlDetails"

const CharacterOverview = ({character}) => {
  const [level, setLevel] = useState()

  const checkIsCustom = character.classDetails.isCustom
  const classDetails = character.classDetails
  const raceDetails = character.race
  const subRaceDetails = character.subRace

  const gearProficiencies = () => {
    //sorts through all proficiencies that don't include skills & puts them into an array.
    const gearProfs = [
      ...classDetails.base_proficiencies
        .map((gear) => gear.name)
        .filter((item) => !item.includes("Saving Throw:")),
      ...subRaceDetails.base_proficiencies?.map((gear) => gear.name),
      ...(raceDetails.starting_proficiencies
        .map((gear) => gear.name)
        .filter((item) => !item?.includes("Skill: ")) || ""),

      ...(!!raceDetails.proficiencies.skill_proficiencies
        ? Object.keys(raceDetails.proficiencies?.skill_proficiencies).filter(
            (gear) => !gear.includes("Skill: ") && !gear.includes("isMax")
          )
        : ""),
    ]

    return gearProfs
  }

  const skillProficiencies = () => {
    const startingSkills = raceDetails.starting_proficiencies
      .map((item) => item.name)
      .filter((skill) => skill.includes("Skill: "))

    const proficiencySkills = !!raceDetails.proficiencies.skill_proficiencies
      ? Object.keys(raceDetails.proficiencies?.skill_proficiencies)
          ?.map((item) => item)
          .filter((skill) => skill.includes("Skill: "))
      : ""

    const skills = [
      ...Object.keys(classDetails.skill_proficiencies),
      ...Object.keys(subRaceDetails.skill_proficiencies),
      ...proficiencySkills,
      ...(startingSkills || ""),
    ]

    return skills.filter((item) => item !== "isMax")
  }

  const languages = [...raceDetails.languages, ...subRaceDetails.languages]

  const levelOptions = character.levels?.map(({level}) => ({
    value: level,
    label: "level " + level,
  }))

  const totalAbilityScore = (abilityScore) => {
    const total = Object.entries(
      abilityScore.reduce((acc, obj) => {
        // removes the duplecates while adding the value ([{DEX: 1}, {DEX: 1}] = [{DEX: 2}])
        if (acc[obj.name]) {
          acc[obj.name].value += obj.value
        } else {
          acc[obj.name] = {...obj}
        }

        return acc
      }, {})
    )
    return total.map((item) => item[1])
  }

  const abilityImprovements = () => {
    const abilityBonus =
      !!raceDetails.ability_bonus &&
      raceDetails.ability_bonus.map((ability) => {
        return {name: ability.ability_score.name, value: ability.bonus}
      })
    const abilityImprovement =
      !!raceDetails.proficiencies.ability_improvement &&
      Object.entries(raceDetails.proficiencies.ability_improvement).map(
        (score) => {
          return {name: score[0], value: score[1]}
        }
      )

    const subRaceAbilities =
      !!subRaceDetails.ability_improvement &&
      Object.entries(subRaceDetails.ability_improvement).map((score) => {
        return {name: score[0], value: score[1]}
      })
    const abilityScores = [
      ...(abilityBonus || ""),
      ...(subRaceAbilities || ""),
      ...(abilityImprovement || ""),
    ] // groups all objects together

    return totalAbilityScore(abilityScores)
  }

  return (
    <div className="overview-container">
      <h4 className="char-name">Name: {character.characterName}</h4>
      <header>class details:</header>
      <div className="base-detail">
        <h4>class: </h4>
        <p>{character.classDetails.name}</p>
      </div>
      <div className="base-detail">
        <h4>subClass:</h4>
        <p>{character.subClass.name}</p>
      </div>
      <div className="base-detail">
        <h4>hit dice:</h4>
        <p>D{classDetails.hit_die}</p>
      </div>
      {classDetails.spellcasting.spell_save && (
        <div className="base-detail">
          <h4>spell save: </h4>
          <p>{classDetails.spellcasting.spell_save}</p>
        </div>
      )}
      <div className="class-details">
        <h4 className="h4-title">proficiencies:</h4>
        {/* display class details */}
        <div className="overview">
          <h4 className="h4-title">gear:</h4>
          <div className="base-proficiencies">
            {gearProficiencies().map((prof, index) => {
              return !!prof && <p key={`${prof}_${index}`}>{prof}</p>
            })}
          </div>
        </div>
        <div className="overview">
          <h4 className="h4-title">skills</h4>
          <div className="skill-profs">
            {skillProficiencies().map((skill) => {
              return (
                skill !== "isMax" && (
                  <p key={`p_skill_${skill}`}>
                    {skill.replaceAll("Skill: ", "")}
                  </p>
                )
              )
            })}
          </div>
        </div>

        <div className="overview">
          <h4 className="h4-title">ability improvements</h4>
          <div className="ability-improvements">
            {abilityImprovements().map((ability) => {
              return (
                ability.name !== "isMax" && (
                  <p key={`p_ability_${ability.name}`}>
                    {ability.name} + {ability.value}
                  </p>
                )
              )
            })}
          </div>
        </div>

        <div className="overview">
          <h4 className="h4-title">saving throws:</h4>
          <div className="saving-throws">
            {Object.entries(classDetails.saving_throws).map((item) => {
              return (
                item[0] !== "isMax" && (
                  <p
                    key={`p_save_throw_${
                      checkIsCustom ? item[0] : item[1].name
                    }`}
                  >
                    {checkIsCustom ? item[0] : item[1].name}
                  </p>
                )
              )
            })}
          </div>
        </div>
      </div>

      <div className="race-details">
        {/* display race details */}
        <header>race details:</header>
        <h4 className="h4-title race-name">name: </h4>
        <p>{raceDetails.name}</p>
        {raceDetails.subRace && (
          <h4 className="h4-title race-name">subrace: </h4>
        )}
        {raceDetails.subRace && <p>{raceDetails.subRace}</p>}
        <div className="base-details-container">
          <div className="race-detail">
            <h4 className="h4-title">age: </h4>
            <p>{raceDetails.age}</p>
          </div>
          <span className="line-brake">||</span>
          <div className="race-detail">
            <h4 className="h4-title">size:</h4>
            <p>
              {raceDetails.size.ft}
              <span>ft</span> {raceDetails.size.inch}
              <span>″</span>
            </p>
          </div>
          <span className="line-brake">||</span>
          <div className="race-detail">
            <h4 className="h4-title">speed:</h4>
            <p>
              {raceDetails.speed}
              <span>ft</span>
            </p>
          </div>
        </div>
        <div className="languages">
          <h4 className="h4-title">languages:</h4>
          {languages.map((lang) => {
            return lang && <p key={lang.name}>{lang.name}</p>
          })}
        </div>
      </div>
      <div className="class-lvl-details">
        <h4 className="h4-title">levels:</h4>

        <Select
          options={levelOptions}
          isSearchable={false}
          placeholder="level preview"
          onChange={(choice) => {
            setLevel(choice.value)
          }}
        />

        {level && (
          <ClassLvlDetails
            mainLevel={character.levels[level - 1]}
            character={character}
          />
        )}
      </div>
    </div>
  )
}
export default CharacterOverview
