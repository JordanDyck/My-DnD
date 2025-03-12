import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"

import CustomProficiencies from "./CustomProficiencies"
import SkillSelector from "./SkillSelector"
import CustomLevels from "./CustomLevels"

const CustomRace = ({
  setStoredDetails,
  setShowCharacterDetails,
  setRaceName,
}) => {
  const [raceDetails, setRaceDetails] = useState({
    age: "",
    languages: [],
    starting_proficiencies: [],
    traits: [],
    name: "",
    ft: "",
    inch: "",
    speed: "",
    isCustom: true,
  })

  const handleFormData = (e) => {
    e.preventDefault()

    setRaceDetails((prev) => ({
      ...prev,
      [e.target?.name]: e.target.value,
    }))
  }

  return (
    <div className="custom-race">
      <form onChange={handleFormData}>
        <label htmlFor="name">
          race name:
          <input className="custom-race-name" name="name" />
          <button
            className="delete-race-btn"
            type="button"
            onClick={() => {
              setRaceDetails({})
              setShowCharacterDetails((prev) => ({
                ...prev,
                customRace: false,
              }))
            }}
          >
            <RiDeleteBinLine />
          </button>
        </label>

        <div className="age-size-speed">
          <label htmlFor="age">
            age:
            <input className="custom-age" type="number" name="age" />
          </label>
          <label className="c-size-label" htmlFor="size">
            size:
          </label>
          <div className="custom-size">
            <span>ft</span>
            <input type="number" name="ft" />,<span>in</span>
            <input type="number" name="inch" />
          </div>
          <label htmlFor="speed">
            speed:
            <input className="custom-speed" type="number" name="speed" />
          </label>
        </div>
      </form>
      <div className="custom-proficiencies-container">
        <h4 className="h4-title">languages:</h4>
        <CustomProficiencies
          array={
            raceDetails.languages.length ? raceDetails.languages : [{name: ""}]
          }
          updateDetails={setRaceDetails}
          ObjKey={"languages"}
        />
      </div>
      <div className="custom-proficiencies-container">
        <h4 className="h4-title">equipment proficiencies:</h4>
        <span>*Ex. Heavy armor, Martial weapons, Bows.</span>
        <CustomProficiencies
          array={
            raceDetails.starting_proficiencies.length
              ? raceDetails.starting_proficiencies
              : [{name: ""}]
          }
          updateDetails={setRaceDetails}
          ObjKey={"starting_proficiencies"}
        />
      </div>
      <div className="ability-bonus-container">
        <SkillSelector
          setDetails={setRaceDetails}
          type={"ability_improvement"}
          data={"ability-scores"}
          maxChoices={2}
          isCustom={true}
          isEditing={false}
        />
      </div>
      <div className="proficiency-bonus-container">
        <SkillSelector
          setDetails={setRaceDetails}
          type={"skill_proficiencies"}
          data={"skills"}
          maxChoices={2}
          isCustom={true}
          isEditing={false}
        />
      </div>
      <div className="custom-traits-wrapper">
        <CustomLevels setDetails={setRaceDetails} type={"traits"} />
      </div>
      <button
        type="button"
        className="save-race-btn"
        onClick={() => {
          const {ft, inch, skill_proficiencies, ability_improvement, ...rest} =
            raceDetails
          setStoredDetails((prev) => ({
            ...prev,
            race: {
              size: {ft, inch},
              proficiencies: {
                ability_improvement: ability_improvement,
                skill_proficiencies: skill_proficiencies,
              },
              ...rest,
            },
          }))
          setRaceName(raceDetails.name)
          setShowCharacterDetails((prev) => ({
            ...prev,
            customRace: false,
          }))
        }}
        disabled={
          Object.values(raceDetails).includes("") ||
          !raceDetails.languages[raceDetails.languages.length - 1]?.name
            .length ||
          raceDetails.skill_proficiencies?.isMax === false ||
          raceDetails.ability_improvement?.isMax === false ||
          !raceDetails.traits.length
        }
      >
        save race
      </button>
    </div>
  )
}
export default CustomRace
