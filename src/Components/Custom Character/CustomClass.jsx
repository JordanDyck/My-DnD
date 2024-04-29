import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"
import Switch from "react-switch"

import SkillSelector from "./SkillSelector"
import ItemsTab from "../ItemsTab"
import StartingSpellSlots from "./StartingSpellSlots"
import CustomLevels from "./CustomLevels"

// .match(/^[Dd](\d+)?$/) ? hit_dice : "",

const CustomClass = ({setStoredDetails}) => {
  const [toggleSwitch, setToggleSwitch] = useState(false)
  const [details, setDetails] = useState({
    class_name: "",
    hit_dice: "",
    proficiencies: [""],
    skill_proficiencies: [],
    saving_throws: [],
    starting_equipment: [],
    levels: [],
  })
  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const {class_name, hit_dice, cantrips, spellslots, spells, ...profs} = data
    setDetails(() => ({
      class_name,
      hit_dice: hit_dice,
      skill_proficiencies: details.skill_proficiencies,
      starting_equipment: details.starting_equipment,
      proficiencies: [...Object.values(profs)],
      spellcasting: {cantrips, spellslots, spells},
      spell_saves: details.spell_saves,
      levels: details.levels,
    }))
  }

  return (
    <div className="custom-class-wrapper">
      <form onChange={onSubmit} className="custom-class">
        <label htmlFor="name">
          class:
          <input name="class_name" />
        </label>
        <label htmlFor="hit_dice">
          Hit dice:
          <input name="hit_dice" className="hit-dice" maxLength={3} />
        </label>
        <div className="proficiency-container">
          <h4 className="h4-title">equipment proficiencies:</h4>
          <span>*Ex. Heavy armor, Martial weapons, Bows.</span>
          <div className="proficiencies">
            {Object.values(details.proficiencies).map((_, index) => {
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
              disabled={
                !details.proficiencies[details.proficiencies.length - 1]
              }
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
        <div className="spell-section">
          <div className="spellcaster-switch">
            <label>
              <span>spellcaster?</span>
              <Switch
                className="toggle-switch"
                checked={toggleSwitch}
                onColor="#4ae173"
                onHandleColor="#6dff79"
                handleDiameter={29}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                width={60}
                height={30}
                onChange={() => {
                  setToggleSwitch((prev) => !prev)
                  if (toggleSwitch === true) {
                    // toggleSwitch is actually false.
                    setDetails((prev) => {
                      // deletes spellcasting & spell_saves, returns the rest.
                      const {spellcasting, spell_saves, ...rest} = prev
                      return rest
                    })
                  }
                }}
              />
            </label>
          </div>
          {toggleSwitch && (
            <div className="saving-throw-container">
              {/* spell-saving throws */}
              <SkillSelector
                setDetails={setDetails}
                type={"spell saves"}
                url={"ability-scores"}
              />
            </div>
          )}
          {toggleSwitch && <StartingSpellSlots />}
        </div>
        <div className="starting-equipment-container">
          <h4 className="h4-title">starting equipment:</h4>

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
      </form>
      <div className="custom-levels">
        <h4 className="h4-title">levels:</h4>
        <span className="tool-tip">
          *Levels can be edited at any time after.
        </span>
        <CustomLevels setDetails={setDetails} />
      </div>
      {details.class_name &&
        details.hit_dice &&
        details.proficiencies &&
        details.skill_proficiencies &&
        details.starting_equipment &&
        details.saving_throws && (
          <button
            type="button"
            className="save-custom-class-btn"
            onClick={() =>
              setStoredDetails((prev) => ({
                ...prev,
                classDetails: details,
              }))
            }
          >
            Save Class
          </button>
        )}
    </div>
  )
}
export default CustomClass
