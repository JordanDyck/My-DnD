import {useState} from "react"
import CustomProficiencies from "../Custom Character/CustomProficiencies"
import SkillSelector from "../Custom Character/SkillSelector"
import CustomLevels from "../Custom Character/CustomLevels"

const SubRace = ({setStoredDetails, setShowCharacterDetails}) => {
  const [subRaceDetails, setSubRaceDetails] = useState({
    name: "",
    ability_improvement: {},
    skill_proficiencies: {},
    base_proficiencies: [],
    languages: [],
    traits: [{}],
  })

  return (
    <div className="sub-race-container">
      <div className="name-container">
        <h4 className="h4-title">subrace:</h4>
        <input
          onChange={(e) =>
            setSubRaceDetails((prev) => ({...prev, name: e.target.value}))
          }
        />
      </div>
      {/* <CustomProficiencies /> */}
      <div className="extra-proficiencies">
        <SkillSelector
          setDetails={setSubRaceDetails}
          type={"ability_improvement"}
          data={"ability-scores"}
          maxChoices={1}
          isCustom={true}
          isEditing={false}
        />
      </div>
      <div className="extra-proficiencies">
        <SkillSelector
          setDetails={setSubRaceDetails}
          type={"skill_proficiencies"}
          data={"skills"}
          maxChoices={1}
          isCustom={true}
          isEditing={false}
        />
      </div>
      <div className="custom-proficiencies-container">
        <h4 className="h4-title">languages:</h4>
        <CustomProficiencies
          array={
            subRaceDetails.languages.length
              ? subRaceDetails.languages
              : [{name: ""}]
          }
          updateDetails={setSubRaceDetails}
          ObjKey={"languages"}
        />
      </div>
      <div className="custom-proficiencies-container">
        <h4 className="h4-title">equipment proficiencies:</h4>
        <CustomProficiencies
          array={
            subRaceDetails.languages.length
              ? subRaceDetails.languages
              : [{name: ""}]
          }
          updateDetails={setSubRaceDetails}
          ObjKey={"base_proficiencies"}
        />
      </div>
      <div className="sub-traits">
        <CustomLevels
          setDetails={setSubRaceDetails}
          details={subRaceDetails}
          type={"traits"}
        />
      </div>
      <button
        className="save-subrace-btn"
        disabled={
          !subRaceDetails.ability_improvement.isMax ||
          !subRaceDetails.skill_proficiencies.isMax ||
          !subRaceDetails.name.length
        }
        onClick={() => {
          setStoredDetails((prev) => ({
            ...prev,
            subRace: subRaceDetails,
          }))
          setShowCharacterDetails((prev) => ({
            ...prev,
            subRace: false,
          }))
        }}
      >
        save subrace
      </button>
    </div>
  )
}
export default SubRace
