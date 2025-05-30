import "../../styles/Stats.scss"
import {useMemo} from "react"
import {useSelector} from "react-redux"

import SkillCategories from "../filters/SkillCategories.json"

const ProfStats = ({setShowSkillsTab, showSkillsTab}) => {
  const character = useSelector((store) => store.character.value)
  const calcProficiencyBonus = Math.ceil(character.currentLevel / 4) + 1

  const skillList = useMemo(() => {
    return Object.keys(SkillCategories)
      .map((key) => {
        return SkillCategories[key]
      })
      .flat()
      .sort()
  }, [])

  const lowerCaseArray = (obj) => {
    //  turns all object keys into lower case.
    const isCustom = character.classDetails.isCustom
    if (isCustom) {
      return Object.keys(obj).map((string) => string.toLowerCase())
    } else {
      return obj.map((ooh) => ooh.index)
    }
  }

  const calcSavingThowBonus = (skill) => {
    const stats = character.stats[skill].bonus
    const saveSkills = lowerCaseArray(
      character.classDetails?.saving_throws
    ).includes(skill)
    // check if saving throw bonus exists, returns the bonus, else returns the base stat bonus
    if (saveSkills) {
      return stats + calcProficiencyBonus
    } else return stats
  }

  const skillProficiencies = () => {
    //sorts through all proficiencies that are skills & puts them into an array.
    const classDetails = character.classDetails
    const raceDetails = character.race
    const subRaceDetails = character.subRace

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

    return skills.map((skill) => skill.replaceAll("Skill: ", ""))
  }
  const skillBonusSorter = (skill) => {
    return Object.keys(SkillCategories).map((key) => {
      if (character.stats[key]?.skills?.includes(skill)) {
        if (skillProficiencies().includes(skill)) {
          return character.stats[key].bonus + calcProficiencyBonus
        }

        return character.stats[key].bonus
      } else return undefined
    })
  }

  const calcPassivePerception = () => {
    const skill = skillBonusSorter("Perception").filter(
      (skill) => skill !== undefined
    )
    return 10 + skill[0]
  }
  return (
    <div
      className={showSkillsTab ? "stat-wrapper visible" : "stat-wrapper hidden"}
    >
      <button
        className="close-stats"
        onClick={() => {
          setShowSkillsTab((prev) => ({...prev, stats: false}))
        }}
      >
        Close
      </button>
      <div className="saving-throws">
        {Object.keys(SkillCategories).map((save) => {
          return (
            <div key={`save_${save}`} className="stat-container">
              <input
                type="checkbox"
                className="proficiency-checkbox"
                readOnly
                checked={lowerCaseArray(
                  character.classDetails?.saving_throws
                ).includes(save)}
                disabled={
                  !lowerCaseArray(
                    character.classDetails?.saving_throws
                  ).includes(save)
                }
              />
              <h4>{save}</h4>
              <h4>
                {calcSavingThowBonus(save) > 0
                  ? `+${calcSavingThowBonus(save)}`
                  : calcSavingThowBonus(save)}
              </h4>
            </div>
          )
        })}
      </div>
      {skillList ? (
        skillList.map((skill, index) => {
          return (
            <div className="stat-container" key={index}>
              <input
                type="checkbox"
                className="proficiency-checkbox"
                checked={skillProficiencies().includes(skill)}
                readOnly
                disabled={!skillProficiencies().includes(skill)}
              />
              <label htmlFor={skill}>{skill}: </label>
              <h4 className="stat-input" id={skill}>
                {skillBonusSorter(skill)}
              </h4>
            </div>
          )
        })
      ) : (
        <p className="loading">loading</p>
      )}
      <div className="passive-perception">
        <label>Passive Perception:</label>
        <h4>{calcPassivePerception()}</h4>
      </div>
    </div>
  )
}
export default ProfStats
