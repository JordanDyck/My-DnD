import {useState} from "react"
import {useDispatch} from "react-redux"

import {updateCharacter} from "../../../Store/slices/characterSlice"
import SkillSelector from "../../Custom Character/SkillSelector"

const AddNewSkills = ({updateEditor, obj, character}) => {
  const [newSkills, setNewSkills] = useState({})
  const dispatch = useDispatch()

  const saveNewSkills = () => {
    const classDetails = character.classDetails
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

    dispatch(updateCharacter(updateSkills))
    updateEditor(() => ({
      skills: false,
      gear: false,
    }))
  }

  return (
    <div className="skill-editor">
      <SkillSelector
        maxChoices={99}
        isCustom={true}
        setDetails={setNewSkills}
        type={"skill_proficiencies"}
        data={obj}
        isEditing={true}
      />
      <button onClick={() => saveNewSkills()}>save</button>
    </div>
  )
}
export default AddNewSkills
