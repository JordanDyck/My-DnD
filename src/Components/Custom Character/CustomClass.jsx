import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"

import SkillSelector from "./SkillSelector"
import ItemsTab from "../ItemsTab"

import CustomLevels from "./CustomLevels"
import CustomProficiencies from "./CustomProficiencies"
import StatRolls from "../character sheet/StatRolls"

const CustomClass = ({
  storedDetails,
  setStoredDetails,
  setClassNameOption,
  setShowCharacterDetails,
  linkedCharacter,
}) => {
  const [details, setDetails] = useState({
    name: "",
    hit_die: "",
    stats: {},
    base_proficiencies: [{name: ""}],
    starting_equipment: [],
    levels: [],
    isCustom: true,
  })

  return (
    <div className="custom-class-wrapper">
      <div className="custom-class">
        <label htmlFor="name" className="custom-class-name">
          class:
          <input
            name="name"
            onChange={(e) =>
              setDetails((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
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
        <div className="starting-level">
          <label htmlFor="level">
            starting level:
            <input
              name="level"
              type="number"
              value={storedDetails?.currentLevel || ""}
              min={1}
              onChange={(e) =>
                // keeps the character level within 1-20 to prevent breaks
                e.target.value <= 20
                  ? setStoredDetails((prev) => ({
                      ...prev,
                      currentLevel: parseInt(e.target.value),
                    }))
                  : ""
              }
            />
          </label>
        </div>
        <div className="stat-roller">
          <StatRolls setStoredDetails={setDetails} />
        </div>
        <div className="hp-container">
          <label htmlFor="hit_die">Hit dice:</label>
          <span>
            D
            <input
              onChange={(e) => {
                if (e.target.value.length <= 2) {
                  setDetails((prev) => ({
                    ...prev,
                    hit_die: e.target.value,
                  }))
                }
              }}
              name="hit_die"
              className="hit-dice"
              type="number"
              value={details?.hit_die}
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
                health: {
                  currentHP: e.target.value,
                  maxHP: e.target.value,
                  temp: 0,
                },
              }))
            }}
          />
        </div>
        <div className="custom-proficiencies-container">
          <h4 className="h4-title">equipment proficiencies:</h4>
          <span>*Ex. Heavy armor, Martial weapons, Bows.</span>
          <CustomProficiencies
            array={details?.base_proficiencies}
            updateDetails={setDetails}
            ObjKey={"base_proficiencies"}
            isEditing={false}
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
            isEditing={false}
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
            isEditing={false}
          />
        </div>
        <div className="spell-section">
          <div className="saving-throw-container">
            {/* spell-saving throws */}
            <SkillSelector
              maxChoices={1}
              isCustom={true}
              setDetails={setDetails}
              type={"spell_save"}
              data={"ability-scores"}
              isEditing={false}
            />
          </div>
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
      </div>
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
          const {levels, spell_save, stats, starting_equipment, ...rest} =
            details
          setStoredDetails((prev) => ({
            ...prev,
            classDetails: {
              spellcasting: {spell_save},
              ...rest,
            },
            levels: levels,
            inventory: starting_equipment,
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
          !details.base_proficiencies[details.base_proficiencies.length - 1]
            .name.length ||
          details.spell_save?.isMax === false ||
          details.saving_throws?.isMax === false ||
          !Object.keys(details.stats).length ||
          !storedDetails.currentLevel ||
          storedDetails.currentLevel > details.levels.length
        }
      >
        Save Class
      </button>
    </div>
  )
}
export default CustomClass
