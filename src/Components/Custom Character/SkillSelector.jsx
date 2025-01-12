import {useEffect, useState, useCallback} from "react"
import axios from "axios"
import useCounter from "../../hooks/useCounter"
import {RiDeleteBinLine} from "react-icons/ri"

const SkillSelector = ({setDetails, type, data, isCustom, maxChoices}) => {
  const [skills, setSkills] = useState([])
  const [chosenskills, setChosenSkills] = useState({})
  const counter = useCounter([], maxChoices)

  useEffect(() => {
    if (isCustom === true) {
      axios.get(`https://www.dnd5eapi.co/api/${data}/`).then((res) => {
        const urlData = res.data.results

        setSkills(urlData)
      })
    } else {
      // if choices already exist, don't fetch api and just use the existing data.
      setSkills(data)
    }
  }, [data, isCustom])
  const totalCount = useCallback(() => {
    return counter.value.reduce((total, current) => total + current, 0)
  }, [counter])

  const isMax = totalCount() >= counter.maxValue ? true : false
  useEffect(() => {
    setDetails((prev) => ({
      ...prev,
      [type]: {...chosenskills, isMax},
    }))
  }, [chosenskills, setDetails, type, isMax])

  return (
    <div className="skills-container">
      <h4 className="h4-title">{`${type}:`}</h4>
      {isCustom && (
        <div className="ismax-container">
          <label htmlFor="maxNum">Max Choices: </label>
          <input
            className="max-input"
            type="number"
            name="maxNum"
            onFocus={(e) => e.target.select()}
            defaultValue={maxChoices}
            onChange={(e) => {
              counter.setMax(e.target.value)
            }}
          />
        </div>
      )}
      <p className="skill-choose">{!isCustom && `choose ${maxChoices}`}</p>
      {Object.keys(chosenskills).length ? (
        <div className="chosen-skills-wrapper">
          <span>
            {type === "ability_improvement"
              ? "*click to increase or remove ability score."
              : "*click to remove."}
          </span>
          <div className="chosen-skills">
            {Object.keys(chosenskills).map((item, index) => {
              // displays selected proficiencies
              return (
                <button
                  className="chosen-skill"
                  key={`chosen_${item}`}
                  type="button"
                  onClick={() => {
                    if (type === "ability_improvement") {
                      counter.increment(index)
                      setChosenSkills((prev) => ({
                        ...prev,
                        [item]: counter.value[index] + 1,
                      }))
                      // delete item
                      if (
                        counter.value[index] >= counter.maxValue ||
                        totalCount() >= counter.maxValue
                      ) {
                        counter.reset(index)
                        const skillCopy = {...chosenskills}
                        delete skillCopy[item]

                        setChosenSkills(skillCopy)
                      }
                    } else {
                      counter.reset(index)
                      const skillCopy = {...chosenskills}
                      delete skillCopy[item]

                      setChosenSkills(skillCopy)
                    }
                  }}
                >
                  {item}
                  {type === "ability_improvement"
                    ? `: ${counter.value[index]}`
                    : ""}
                  {counter.value[index] >= counter.maxValue && (
                    <RiDeleteBinLine />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        ""
      )}
      {/* displays all available skills  */}
      <div
        className="all-skills"
        style={{
          display: totalCount() >= counter.maxValue ? "none" : "block",
        }}
      >
        {skills.map((skill, index) => {
          return (
            <button
              className="skill"
              key={`allskills_${skill.name}`}
              type="button"
              onClick={() => {
                counter.setCurrent([...counter.value, 1])

                setChosenSkills((prev) => ({
                  ...prev,
                  [skill.name]: counter.value?.[index] || 1,
                }))
              }}
              disabled={Object.keys(chosenskills).includes(skill.name)}
            >
              {skill.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
export default SkillSelector
