import {useEffect, useState} from "react"
import axios from "axios"
import useCounter from "../../hooks/useCounter"
import {RiDeleteBinLine} from "react-icons/ri"

const SkillSelector = ({setDetails, type, url}) => {
  const [skills, setSkills] = useState([])
  const [chosenskills, setChosenSkills] = useState({})
  const counter = useCounter([], 2)

  useEffect(() => {
    axios.get(`https://www.dnd5eapi.co/api/${url}/`).then((res) => {
      const data = res.data.results

      setSkills(data)
    })
  }, [url])

  useEffect(() => {
    setDetails((prev) => ({
      ...prev,
      [type]: [chosenskills],
    }))
  }, [chosenskills, setDetails, type])

  return (
    <div className="skills-container">
      <h4
        className="h4-title"
        style={{
          paddingBottom: !Object.keys(chosenskills).length ? "10px" : "0",
        }}
      >{`${type}:`}</h4>
      {Object.keys(chosenskills).length ? (
        <div className="chosen-skills-wrapper">
          <div className="chosen-skills">
            {Object.keys(chosenskills).map((item, index) => {
              return (
                // displays current proficiencies
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
                      if (counter.value[index] >= counter.maxValue) {
                        counter.reset(index)
                        const skillCopy = {...chosenskills}
                        delete skillCopy[item]

                        setChosenSkills(skillCopy)
                      }
                    } else {
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
      <div className="all-skills">
        {skills.map((skill, index) => {
          return (
            <button
              className="skill"
              key={skill.name}
              type="button"
              onClick={() => {
                if (type === "ability_improvement") {
                  counter.setCurrent([...counter.value, 1])

                  setChosenSkills((prev) => ({
                    ...prev,
                    [skill.name]: counter.value?.[index] || 1,
                  }))
                } else {
                  setChosenSkills((prev) => ({
                    ...prev,
                    [skill.name]: 1,
                  }))
                }
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
