import {useState} from "react"
import {useDispatch} from "react-redux"

import {updateCharacter} from "../../../Store/slices/characterSlice"
import SkillSelector from "../../Custom Character/SkillSelector"
import CustomProficiencies from "../../Custom Character/CustomProficiencies"
import CustomTraits from "../../Custom Character/CustomTraits"
const AddNewSkills = ({updateEditor, obj, character}) => {
  const [newSkills, setNewSkills] = useState({})
  const [newGear, setNewGear] = useState({base_proficiencies: [{name: ""}]})
  const [newTraits, setNewTraits] = useState([])
  const dispatch = useDispatch()

  const saveNewSkills = () => {
    const classDetails = character.classDetails
    const raceDetails = character.race
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

      case "traits":
        const updateTraits = {
          ...character,
          race: {
            ...raceDetails,
            traits: [...raceDetails.traits, ...newTraits.traits],
          },
        }
        return dispatch(updateCharacter(updateTraits))
      default:
        return null
    }
  }

  return (
    <div className="skill-editor">
      {obj === "skills" ? (
        <>
          <span>*new skills are added to your class</span>
          <SkillSelector
            maxChoices={99}
            isCustom={true}
            setDetails={setNewSkills}
            type={"skill_proficiencies"}
            data={obj}
            isEditing={true}
          />
        </>
      ) : (
        ""
      )}

      {obj === "gear" ? (
        <CustomProficiencies
          array={newGear.base_proficiencies}
          updateDetails={setNewGear}
          ObjKey={"base_proficiencies"}
          isEditing={true}
        />
      ) : (
        ""
      )}

      {obj === "traits" ? (
        <CustomTraits setTraitData={setNewTraits} isEditing={true} />
      ) : (
        ""
      )}

      <button
        className="save-skills"
        onClick={() => {
          saveNewSkills()
          updateEditor({
            skills: false,
            gear: false,
            traits: false,
          })
        }}
      >
        save
      </button>
    </div>
  )
}
export default AddNewSkills
