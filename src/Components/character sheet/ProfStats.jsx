import {useMemo} from "react"
import {useSelector} from "react-redux"

import SkillCategories from "../filters/SkillCategories.json"

const ProfStats = ({setShowStats}) => {
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
  return (
    <div className="stat-wrapper">
      <button
        className="close-stats"
        onClick={() =>
          setShowStats((prev) => ({
            ...prev,
            stats: !prev.stats,
          }))
        }
      >
        Close
      </button>
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
    </div>
  )
}
export default ProfStats
