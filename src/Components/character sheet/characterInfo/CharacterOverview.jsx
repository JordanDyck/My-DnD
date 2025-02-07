import {useState} from "react"
import Select from "react-select"
import ClassLvlDetails from "../../ClassLvlDetails"

const CharacterOverview = ({character}) => {
  const [level, setLevel] = useState()

  const checkIsCustom = character.classDetails.isCustom
  const classDetails = character.classDetails
  const raceDetails = character.race

  const gearProficiencies = [
    ...classDetails.base_proficiencies,
    ...raceDetails.starting_proficiencies,
  ]
  const skillProficiencies = [
    {
      ...classDetails.skill_proficiencies,
      ...raceDetails.proficiencies.skill_proficiencies,
    },
  ]

  const levelOptions = character.levels?.map(({level}) => ({
    value: level,
    label: "level " + level,
  }))

  const abilityImprovements = () => {
    const abilityscore = raceDetails.ability_bonus?.map((ability) => {
      return [ability.ability_score.name, ability.bonus]
    })

    // 3 checks: 1: if they both exist. 2: if only ability_bonus exists. 3: if only ability_improvement exists
    if (
      raceDetails.proficiencies?.ability_improvement &&
      raceDetails.ability_bonus
    ) {
      const combine = [
        ...Object.entries(raceDetails.proficiencies?.ability_improvement),
      ].concat(abilityscore)
      return combine
    } else if (
      !raceDetails.proficiencies?.ability_improvement &&
      raceDetails.ability_bonus
    ) {
      return abilityscore
    } else if (
      raceDetails.proficiencies?.ability_improvement &&
      !raceDetails.ability_bonus
    ) {
      return Object.entries(raceDetails.proficiencies?.ability_improvement)
    }
  }

  // const proficiencyBonus = Math.ceil(character.currentLevel / 4) + 1 // starting at 2 and goes up every 4 levels

  return (
    <div className="overview-container">
      <h4 className="char-name">Name: {character.characterName}</h4>
      <header>class details:</header>
      <h4 className="class-name">class: {character.classDetails.name}</h4>
      <h4 className="class-name">subClass: {character.subClass.name}</h4>
      <h4 className="hit-dice">hit dice: D{classDetails.hit_die}</h4>
      {classDetails.spellcasting.spell_save && (
        <div className="spell-save">
          <h4>spell save: </h4>
          <p className="spell-save">{classDetails.spellcasting.spell_save}</p>
        </div>
      )}
      <div className="class-details">
        <h4 className="h4-title">proficiencies:</h4>
        {/* display class details */}
        <div className="overview">
          <h4 className="h4-title">gear:</h4>
          <div className="base-proficiencies">
            {gearProficiencies.map((prof, index) => {
              return !prof.name.includes("Saving Throw:") &&
                prof.name?.length ? (
                <p key={`${prof.name}_${index}`}>{prof.name}</p>
              ) : (
                ""
              )
            })}
          </div>
        </div>
        <div className="overview">
          <h4 className="h4-title">skills</h4>
          <div className="skill-profs">
            {Object.entries(skillProficiencies[0]).map((skill) => {
              return (
                skill[0] !== "isMax" && (
                  <p key={`p_skill_${skill[0]}`}>{skill[0]}</p>
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
                ability[0] !== "isMax" && (
                  <p key={`p_ability_${ability[0]}`}>
                    {ability[0]} + {ability[1]}
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
          <div className="base-detail">
            <h4 className="h4-title">age: </h4>
            <p>{raceDetails.age}</p>
          </div>
          <span className="line-brake">||</span>
          <div className="base-detail">
            <h4 className="h4-title">size:</h4>
            <p>
              {raceDetails.size.ft}
              <span>ft</span> {raceDetails.size.inch}
              <span>″</span>
            </p>
          </div>
          <span className="line-brake">||</span>
          <div className="base-detail">
            <h4 className="h4-title">speed:</h4>
            <p>
              {raceDetails.speed}
              <span>ft</span>
            </p>
          </div>
        </div>
        <div className="languages">
          <h4 className="h4-title">languages:</h4>
          {raceDetails.languages.map((lang) => {
            return <p key={lang.name}>{lang.name}</p>
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
