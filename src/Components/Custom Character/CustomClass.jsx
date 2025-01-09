import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"
import Switch from "react-switch"

import SkillSelector from "./SkillSelector"
import ItemsTab from "../ItemsTab"
import StartingSpellSlots from "./StartingSpellSlots"
import CustomLevels from "./CustomLevels"
import CustomProficiencies from "./CustomProficiencies"
import StatRolls from "../character sheet/StatRolls"

const CustomClass = ({
  setStoredDetails,
  setClassNameOption,
  setShowCharacterDetails,
  linkedCharacter,
}) => {
  const [toggleSwitch, setToggleSwitch] = useState(false)
  const [details, setDetails] = useState({
    name: "",
    hit_dice: "",
    stats: {},
    proficiencies: [""],
    starting_equipment: [],
    levels: [],
  })
  // console.log("main", details)
  const onSubmit = (e) => {
    e.preventDefault()

    if (
      e.target.name !== "health" &&
      e.target.name !== "hit_dice" &&
      e.target.name !== "proficiency" &&
      !e.target.name.includes("statroll_")
    ) {
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
          <input name="name" />
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
        <div className="stat-roller">
          <StatRolls setStoredDetails={setDetails} />
        </div>
        <div className="hp-container">
          <label htmlFor="hit_dice">Hit dice:</label>
          <span>
            D
            <input
              onChange={(e) => {
                if (e.target.value.length <= 2) {
                  setDetails((prev) => ({
                    ...prev,
                    hit_dice: e.target.value,
                  }))
                }
              }}
              name="hit_dice"
              className="hit-dice"
              type="number"
              value={details?.hit_dice}
            />
          </span>
          <label htmlFor="health">health:</label>
          <input
            name="health"
            className="health"
            type="number"
            onChange={(e) => {
              setStoredDetails((prev) => ({
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
            array={details?.proficiencies}
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
                      // deletes all spellcasting, returns the rest.
                      const {
                        spell_saves,
                        cantrips,
                        spells,
                        spellslots,
                        ...rest
                      } = prev
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
            {details?.starting_equipment?.map((item) => {
              const amount = item.find((prop) => prop[0] === "amount")?.[1]
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
                  {item[0][1]} {amount >= 2 && amount} <RiDeleteBinLine />
                </button>
              )
            })}
          </div>
          <ItemsTab
            type={"starting-equipment"}
            linkedCharacter={linkedCharacter}
            setDetails={setDetails}
            details={details}
          />
        </div>
      </form>
      <div className="custom-levels">
        <h4 className="h4-title">levels:</h4>
        <CustomLevels
          setDetails={setDetails}
          details={details}
          type={"levels"}
        />
      </div>
      <button
        type="button"
        className="save-custom-class-btn"
        onClick={() => {
          const {
            levels,
            spells,
            spell_saves,
            spellslots,
            stats,
            cantrips,
            ...rest
          } = details
          setStoredDetails((prev) => ({
            ...prev,
            classDetails: {
              spellcasting: {spells, spellslots, cantrips, spell_saves},
              ...rest,
            },
            levels: levels,
            stats: stats,
          }))
          setClassNameOption(details.name)
          setShowCharacterDetails((prev) => ({
            ...prev,
            customClass: false,
            class: false,
          }))
        }}
        disabled={
          Object.values(details).includes("") ||
          details.proficiencies.isMax === false ||
          details.spell_saves?.isMax === false ||
          details.saving_throws?.isMax === false ||
          !Object.keys(details.stats).length
        }
      >
        Save Class
      </button>
    </div>
  )
}
export default CustomClass
