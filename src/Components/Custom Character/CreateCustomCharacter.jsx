import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"

import SkillSelector from "./SkillSelector"
import ItemsTab from "../ItemsTab"

const CreateOwnCharacter = () => {
  const [details, setDetails] = useState({
    class_name: "",
    hit_dice: "",
    proficiencies: [""],
    skill_proficiencies: [],
    saving_throws: [],
    starting_equipment: [],
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
      skill_proficiencies: details.skill_proficiencies,
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
          {/* proficiencies */}
          <SkillSelector
            setDetails={setDetails}
            type={"skill proficiencies"}
            url={"skills"}
          />
        </div>
        <div className="saving-throw-container">
          {/* saving throws */}
          <SkillSelector
            setDetails={setDetails}
            type={"saving throws"}
            url={"ability-scores"}
          />
        </div>
        <div className="saving-throw-container">
          {/* spell-saving throws */}
          <SkillSelector
            setDetails={setDetails}
            type={"spell saves"}
            url={"ability-scores"}
          />
        </div>
        <div className="starting-equipment-container">
          <h4>starting equipment:</h4>

          <div className="chosen-skills">
            {details.starting_equipment.map((item) => {
              return (
                // displays starting gear
                <button
                  className="chosen-skill"
                  key={`chosen_${item}`}
                  type="button"
                  onClick={() => {
                    // delete item
                    setDetails((prev) => ({
                      ...prev,
                      starting_equipment: prev.starting_equipment?.filter(
                        (ele) => ele !== item
                      ),
                    }))
                  }}
                >
                  {item} <RiDeleteBinLine />
                </button>
              )
            })}
          </div>
          <ItemsTab
            type={"starting-equipment"}
            setDetails={setDetails}
            details={details}
          />
        </div>

        <button type="button">Save</button>
      </form>
    </div>
  )
}
export default CreateOwnCharacter
