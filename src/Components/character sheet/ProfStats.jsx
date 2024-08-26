import {useMemo} from "react"
import {useSelector} from "react-redux"

import SkillCategories from "../SkillCategories.json"

const ProfStats = ({setShowStats}) => {
  const character = useSelector((store) => store.character.value)

  const skillList = useMemo(() => {
    return Object.keys(SkillCategories)
      .map((key) => {
        return SkillCategories[key]
      })
      .flat()
      .sort()
  }, [])

  const skillBonusSorter = (skill) => {
    return Object.keys(SkillCategories).map((key) => {
      if (character.stats[key].skills?.includes(skill)) {
        return character.stats[key].bonus
      } else return undefined
    })
  }
  const checkProficiency = () => {
    const profs = Object.keys(
      character.classDetails.skill_proficiencies
    ).concat(Object.keys(character.race.proficiencies.skill_proficiencies))
    return profs
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
          console.log(skill)
          return (
            <div className="stat-container" key={index}>
              <input
                type="checkbox"
                className="proficiency-checkbox"
                checked={checkProficiency().includes(skill)}
                readOnly
                disabled={!checkProficiency().includes(skill)}
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
