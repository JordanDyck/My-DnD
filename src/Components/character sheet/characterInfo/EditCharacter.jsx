import {useDispatch} from "react-redux"
import {updateCharacter} from "../../../Store/slices/characterSlice"
import AddNewSkills from "./AddNewSkills"
import {useState} from "react"

const EditCharacter = ({character}) => {
  const [editor, setEditor] = useState({skills: false, gear: false})
  const dispatch = useDispatch()
  const classDetails = character.classDetails
  const raceDetails = character.race

  const removeSkill = (obj, locationName, index) => {
    // depending on the object, removes the clicked item and returns the rest
    switch (locationName) {
      case "base_proficiencies":
        const newGear = character[obj][locationName].filter(
          (_, i) => i !== index
        )
        const updateBase = {
          ...character,
          [obj]: {
            ...character[obj],
            [locationName]: [...newGear],
          },
        }
        return dispatch(updateCharacter(updateBase))
      case "skill_proficiencies":
        const newSkills = Object.entries(character[obj][locationName]).filter(
          (_, i) => i !== index
        )
        const updateSkillProfs = {
          ...character,
          [obj]: {
            ...character[obj],
            [locationName]: {
              ...Object.fromEntries(newSkills),
            },
          },
        }

        return dispatch(updateCharacter(updateSkillProfs))

      case "proficiencies":
        const newRaceSkills = Object.entries(
          character[obj][locationName].skill_proficiencies
        ).filter((_, i) => i !== index)
        const updateRaceSkills = {
          ...character,
          [obj]: {
            ...character[obj],
            [locationName]: {
              ...character[obj][locationName],
              skill_proficiencies: {
                ...Object.fromEntries(newRaceSkills),
              },
            },
          },
        }
        return dispatch(updateCharacter(updateRaceSkills))

      default:
        return null
    }
  }

  return (
    <div className="editor-container">
      <span>*click on proficiencies to remove them</span>
      <div className="editor">
        <div className="gear-editor">
          <h4 className="h4-title"> gear proficiencies:</h4>
          <div className="skill-profs">
            {classDetails.base_proficiencies?.map((gear, i) => {
              return (
                !gear.name.includes("Saving Throw:") && (
                  <p
                    key={gear.name}
                    onClick={() => {
                      removeSkill("classDetails", "base_proficiencies", i)
                    }}
                  >
                    {gear.name}
                  </p>
                )
              )
            })}
          </div>
        </div>
        <div className="add-gear-profs">
          <button
            className="add-gear"
            style={{display: editor.gear ? "none" : "initial"}}
            onClick={() =>
              setEditor((prev) => ({
                ...prev,
                skills: false,
                gear: !prev.gear,
              }))
            }
          >
            add gear proficiencies
          </button>
          {editor.gear && (
            <AddNewSkills
              updateEditor={setEditor}
              obj={"gear"}
              character={character}
            />
          )}
        </div>
        <div className="skill-editor">
          <h4 className="h4-title">class skills:</h4>
          <div className="skill-profs">
            {Object.keys(classDetails.skill_proficiencies).map((skill, i) => {
              return (
                skill !== "isMax" && (
                  <p
                    key={skill}
                    onClick={() => {
                      removeSkill("classDetails", "skill_proficiencies", i)
                    }}
                  >
                    {skill.replaceAll("Skill: ", "")}
                  </p>
                )
              )
            })}
          </div>

          {raceDetails.proficiencies?.skill_proficiencies ? (
            <div className="race-editor">
              <h4 className="h4-title">race skills:</h4>

              <div className="skill-profs">
                {Object.keys(
                  raceDetails.proficiencies?.skill_proficiencies
                )?.map((skill, i) => {
                  return (
                    skill !== "isMax" && (
                      <p
                        key={skill}
                        onClick={() => {
                          removeSkill("race", "proficiencies", i)
                        }}
                      >
                        {skill.replaceAll("Skill: ", "")}
                      </p>
                    )
                  )
                })}
              </div>
            </div>
          ) : (
            ""
          )}
          {Object.keys(character.subRace?.skill_proficiencies).length > 1 ? (
            <div className="subrace-editor">
              <h4 className="h4-title">subrace skills:</h4>
              <div className="skill-profs">
                {Object.keys(character.subRace.skill_proficiencies)?.map(
                  (skill, i) => {
                    return (
                      skill !== "isMax" && (
                        <p
                          key={skill}
                          onClick={() => {
                            removeSkill("subRace", "skill_proficiencies", i)
                          }}
                        >
                          {skill.replaceAll("Skill: ", "")}
                        </p>
                      )
                    )
                  }
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="add-skills">
        <button
          className="add-skills-btn"
          style={{display: editor.skills ? "none" : "initial"}}
          onClick={() =>
            setEditor((prev) => ({
              ...prev,
              skills: !prev.skills,
              gear: false,
            }))
          }
        >
          add new skills
        </button>

        {editor.skills && (
          <AddNewSkills
            updateEditor={setEditor}
            obj={"skills"}
            character={character}
          />
        )}
      </div>
    </div>
  )
}
export default EditCharacter
