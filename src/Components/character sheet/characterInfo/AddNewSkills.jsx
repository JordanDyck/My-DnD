import {useState} from "react"
import {useDispatch} from "react-redux"

import {updateCharacter} from "../../../Store/slices/characterSlice"
import SkillSelector from "../../Custom Character/SkillSelector"
import CustomProficiencies from "../../Custom Character/CustomProficiencies"

const AddNewSkills = ({updateEditor, obj, character}) => {
  const [newSkills, setNewSkills] = useState({})
  const [newGear, setNewGear] = useState({base_proficiencies: [{name: ""}]})
  const dispatch = useDispatch()

  const saveNewSkills = () => {
    const classDetails = character.classDetails
    switch (obj) {
      case "skills":
        const updateSkills = {
          ...character,
          classDetails: {
            ...classDetails,
            skill_proficiencies: {
              ...classDetails.skill_proficiencies,
              ...newSkills.skill_proficiencies,
            },
          },
        }

        return dispatch(updateCharacter(updateSkills))
      case "gear":
        const updateGear = {
          ...character,
          classDetails: {
            ...classDetails,
            base_proficiencies: [
              ...classDetails.base_proficiencies,
              ...newGear.base_proficiencies,
            ],
          },
        }

        if (newGear.base_proficiencies[0].name.length) {
          return dispatch(updateCharacter(updateGear))
        } else return ""
      default:
        return null
    }
  }

  return (
    <div className="skill-editor">
      <span>*new skills are added to your class</span>
      {obj === "skills" ? (
        <SkillSelector
          maxChoices={99}
          isCustom={true}
          setDetails={setNewSkills}
          type={"skill_proficiencies"}
          data={obj}
          isEditing={true}
        />
      ) : (
        <CustomProficiencies
          array={newGear.base_proficiencies}
          updateDetails={setNewGear}
          ObjKey={"base_proficiencies"}
          isEditing={true}
        />
      )}
      <button
        className="save-skills"
        onClick={() => {
          saveNewSkills()
          updateEditor({
            skills: false,
            gear: false,
          })
        }}
      >
        save
      </button>
    </div>
  )
}
export default AddNewSkills
