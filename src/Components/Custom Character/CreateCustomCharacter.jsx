import {useState} from "react"

import SkillSelector from "./SkillSelector"
import SavingThrowSelector from "./SavingThrowSelector"

const CreateOwnCharacter = () => {
  const [details, setDetails] = useState({
    class_name: "",
    hit_dice: "",
    proficiencies: [""],
    skill_proficiencies: [],
    saving_throws: [],
  })
  console.log(details)
  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const {class_name, hit_dice, ...profs} = data
    setDetails(() => ({
      class_name,
      hit_dice: hit_dice.match(/^[Dd](\d+)?$/) ? hit_dice : "",
      skill_profs: details.skill_profs,
      proficiencies: [...Object.values(profs)],
    }))
  }
  return (
    <div>
      <form onChange={onSubmit} className="custom-class">
        <label htmlFor="name">
          class:
          <input name="class_name" />
        </label>
        <label htmlFor="hit_dice">
          Hit dice:
          <input
            // onchange does nothing, but needed to prevent uncontrolled input
            onChange={() => ""}
            name="hit_dice"
            value={details.hit_dice}
            className="hit-dice"
            maxLength={3}
          />
        </label>
        <div className="proficiency-container">
          <label>equipment proficiencies:</label>
          <span>*Ex. Heavy armor, Martial weapons, Bows.</span>
          <div className="proficiencies">
            {details.proficiencies?.map((_, index) => {
              return <input key={index} name={`proficiency_${[index + 1]}`} />
            })}
            <button
              type="button"
              onClick={() =>
                setDetails((prev) => ({
                  ...prev,
                  proficiencies: [...prev.proficiencies, ""],
                }))
              }
              disabled={details.proficiencies.includes("")}
            >
              +
            </button>
          </div>
        </div>
        <div className="skills">
          <SkillSelector setDetails={setDetails} />
        </div>
        <div className="saving-throw-container">
          <SavingThrowSelector setDetails={setDetails} />
        </div>
        <button type="button">Save</button>
      </form>
    </div>
  )
}
export default CreateOwnCharacter
