import {useEffect, useState} from "react"
import axios from "axios"

import {RiDeleteBinLine} from "react-icons/ri"

const ProficiencySelector = ({setDetails}) => {
  const [skills, setSkills] = useState([])
  const [chosenskills, setChosenSkills] = useState([])
  useEffect(() => {
    axios.get(`https://www.dnd5eapi.co/api/skills/`).then((res) => {
      const data = res.data.results

      setSkills(data)
    })
  }, [])

  useEffect(() => {
    setDetails((prev) => ({
      ...prev,
      skill_proficiencies: chosenskills,
    }))
  }, [chosenskills, setDetails])

  return (
    <div className="skills-container">
      <div
        className="chosen-skills"
        style={{
          border: chosenskills.length ? "1px solid #9d9d9d" : "none",
          marginBottom: chosenskills.length ? "10px" : "0px",
        }}
      >
        <h4> skill proficiencies:</h4>
        {chosenskills.map((item) => {
          return (
            // displays current proficiencies
            <button
              className="chosen-skill"
              key={`chosen_${item}`}
              type="button"
              onClick={() => {
                // delete item
                setChosenSkills((prev) => [
                  ...prev.filter((ele) => ele !== item),
                ])
              }}
            >
              {item} <RiDeleteBinLine />
            </button>
          )
        })}
      </div>
      {skills.map((skill) => {
        return (
          <button
            className="skill"
            key={skill.name}
            type="button"
            onClick={() => {
              setChosenSkills((prev) => [...prev, skill.name])
            }}
            disabled={chosenskills.includes(skill.name)}
          >
            {skill.name}
          </button>
        )
      })}
    </div>
  )
}
export default ProficiencySelector