import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"
import Switch from "react-switch"

import SkillSelector from "./SkillSelector"
import ItemsTab from "../ItemsTab"
import StartingSpellSlots from "./StartingSpellSlots"
import CustomLevels from "./CustomLevels"
import CustomProficiencies from "./CustomProficiencies"

const CustomClass = ({
  setStoredDetails,
  setClassNameOption,
  setShowCharacterDetails,
}) => {
  const [toggleSwitch, setToggleSwitch] = useState(false)
  const [details, setDetails] = useState({
    class_name: "",
    hit_dice: "",
    health: {currentHP: "", maxHP: ""},
    proficiencies: [""],
    starting_equipment: [],
    levels: [],
  })

  const onSubmit = (e) => {
    e.preventDefault()
    if (e.target.name !== "health" && e.target.name !== "hit_dice") {
      setDetails((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    }
  }

  return (
    <div className="custom-class-wrapper">
      <form onChange={onSubmit} className="custom-class">
        <label htmlFor="name" className="custom-class-name">
          class:
          <input name="class_name" />
          <button
            className="delete-class-btn"
            type="button"
            onClick={() => {
              setDetails({})
              setShowCharacterDetails((prev) => ({
                ...prev,
                customClass: false,
              }))
            }}
          >
            <RiDeleteBinLine />
          </button>
        </label>
        <div className="hp-container">
          <label htmlFor="hit_dice">Hit dice:</label>
          <span>
            D:
            <input
              onChange={(e) => {
                let dice = e.target.value > 20 ? "20" : e.target.value
                setDetails((prev) => ({
                  ...prev,
                  hit_dice: dice,
                }))
              }}
              name="hit_dice"
              className="hit-dice"
              type="number"
              value={details.hit_dice}
            />
          </span>
          <label htmlFor="health">health:</label>
          <input
            name="health"
            className="health"
            type="number"
            onChange={(e) => {
              setDetails((prev) => ({
                ...prev,
                health: {currentHP: e.target.value, maxHP: e.target.value},
              }))
            }}
          />
        </div>
        <div className="custom-proficiencies-container">
          <h4 className="h4-title">equipment proficiencies:</h4>
          <span>*Ex. Heavy armor, Martial weapons, Bows.</span>
          <CustomProficiencies
            array={details.proficiencies}
            updateDetails={setDetails}
            ObjKey={"proficiencies"}
          />
        </div>
        <div className="skills">
          {/* skill proficiencies */}
          <SkillSelector
            maxChoices={2}
            isCustom={true}
            setDetails={setDetails}
            type={"skill_proficiencies"}
            data={"skills"}
          />
        </div>
        <div className="saving-throw-container">
          {/* saving throws */}
          <SkillSelector
            maxChoices={2}
            isCustom={true}
            setDetails={setDetails}
            type={"saving_throws"}
            data={"ability-scores"}
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
                maxChoices={2}
                isCustom={true}
                setDetails={setDetails}
                type={"spell_saves"}
                data={"ability-scores"}
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
        <CustomLevels setDetails={setDetails} type={"levels"} />
      </div>
      <button
        type="button"
        className="save-custom-class-btn"
        onClick={() => {
          const {levels, ...rest} = details
          setStoredDetails((prev) => ({
            ...prev,
            classDetails: rest,
            levels: levels,
          }))
          setClassNameOption(details.class_name)
          setShowCharacterDetails((prev) => ({
            ...prev,
            customClass: false,
            class: false,
          }))
        }}
        disabled={Object.values(details).includes("")}
      >
        Save Class
      </button>
    </div>
  )
}
export default CustomClass
