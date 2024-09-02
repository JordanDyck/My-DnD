import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"

import CharacterOptionsPopUp from "../CharacterOptionsPopup"
import Perks from "../Perks"
import {setLocalStorage} from "../utilities"
import CustomClass from "../Custom Character/CustomClass"
import SubClassBuilder from "../Sub Class/SubClassBuilder"
import CustomRace from "../Custom Character/CustomRace"
import StatRolls from "./StatRolls"

const CharacterCreator = ({setShowCreator}) => {
  const [storedDetails, setStoredDetails] = useState({
    characterName: "",
    classDetails: "",
    subClass: "",
    levels: [],
    gear: [],
    stats: {},
    inventory: [],
    health: "",
    race: "",
  })

  const [showCharacterPopUps, setShowCharacterPopUps] = useState({
    classes: false,
    races: false,
  })
  const [classNameOption, setClassNameOption] = useState("")
  const [raceName, setRaceName] = useState("")
  const [showCharacterDetails, setShowCharacterDetails] = useState({
    class: false,
    subClass: false,
    race: false,
    customClass: false,
    customRace: false,
  })
  const [characterDetails, setCharacterDetails] = useState([])
  const [newDetails, setNewDetails] = useState({})

  // check if character name is already in use
  const checkStoredNames = (nameToCheck) => {
    if (
      Object.keys(localStorage).filter(
        (storedName) => storedName === nameToCheck
      ).length
    ) {
      return true
    } else return false
  }

  return (
    <div className="character-creator">
      <header className="tab-header">Create Character</header>

      <label className="name-label">
        Name:
        <input
          className="name"
          onChange={(e) => {
            if (checkStoredNames(e.target.value) === false) {
              setStoredDetails((prev) => ({
                ...prev,
                characterName: e.target.value,
              }))
            } else {
              e.target.value = ""
            }
          }}
        />
      </label>

      <div className="class-container">
        {classNameOption && (
          <div className="class-name">
            <label id="class-label">Class:</label>
            <h4 className="class">{classNameOption}</h4>
            <button
              // for deleting class
              className="delete-class-btn"
              onClick={() => {
                setClassNameOption("")
                setStoredDetails((prev) => ({
                  ...prev,
                  classDetails: "",
                  levels: "",
                  subClass: "",
                  stats: "",
                }))
                setShowCharacterDetails((prev) => ({
                  ...prev,
                  class: false,
                  subClass: false,
                }))
                setNewDetails({})
                setCharacterDetails([])
              }}
            >
              <RiDeleteBinLine />
            </button>
          </div>
        )}
        {showCharacterDetails.class && (
          <StatRolls setStoredDetails={setStoredDetails} />
        )}
        <button
          // for choosing your class. shows class popup and disables unrelated btns.
          className="class-btn"
          onClick={() => {
            setShowCharacterPopUps((prev) => ({...prev, classes: true}))
          }}
          disabled={
            showCharacterDetails.customClass ||
            showCharacterDetails.customRace ||
            showCharacterDetails.race ||
            classNameOption
          }
        >
          select class
        </button>
        {classNameOption && showCharacterDetails.class && (
          <>
            {/* for choosing your class */}
            <Perks
              characterDetails={characterDetails}
              setCharacterDetails={setCharacterDetails}
              newDetails={newDetails}
              setNewDetails={setNewDetails}
              linkedCharacter={storedDetails.characterName}
              category={"classes"}
              subCategory={classNameOption.toLowerCase()}
              optionalURL={""}
              setStoredDetails={setStoredDetails}
            />

            <button
              className="save-race-btn"
              onClick={() => {
                setShowCharacterDetails((prev) => ({...prev, class: false}))
                setNewDetails({})
                setCharacterDetails([])
              }}
              disabled={
                !newDetails.health?.currentHP?.length ||
                !newDetails.proficiency_bonus?.isMax ||
                !newDetails.starting_equipment?.length ||
                !Object.keys(storedDetails?.stats).length
              }
            >
              save
            </button>
          </>
        )}
        {showCharacterDetails.customClass && (
          <CustomClass
            setStoredDetails={setStoredDetails}
            setClassNameOption={setClassNameOption}
            setShowCharacterDetails={setShowCharacterDetails}
            linkedCharacter={storedDetails.characterName}
          />
        )}
        {/* for choosing subclass */}
        {storedDetails.subClass.name && (
          <div className="subclass-name-container">
            <label id="subclass-label">subclass:</label>
            <h4>{storedDetails.subClass.name}</h4>
            <button
              // for deleting subclass
              className="delete-class-btn"
              onClick={() => {
                setStoredDetails((prev) => ({
                  ...prev,
                  subClass: "",
                }))
                setShowCharacterDetails((prev) => ({
                  ...prev,
                  subClass: false,
                }))
                setNewDetails({})
                setCharacterDetails([])
              }}
            >
              <RiDeleteBinLine />
            </button>
          </div>
        )}

        {storedDetails.classDetails && showCharacterDetails.class === false && (
          <button
            className="class-btn"
            onClick={() =>
              setShowCharacterDetails((prev) => ({...prev, subClass: true}))
            }
            disabled={
              showCharacterDetails.subClass || storedDetails.subClass.name
            }
          >
            SubClass
          </button>
        )}
        {showCharacterDetails.subClass && classNameOption && (
          <>
            <SubClassBuilder
              setStoredDetails={setStoredDetails}
              setShowCharacterDetails={setShowCharacterDetails}
            />
          </>
        )}
      </div>

      <div className="race-container">
        {raceName && (
          <div className="race-name">
            <label id="race-label" htmlFor="race">
              Race:
            </label>
            <h4 id="race">{raceName}</h4>
            <button
              // for deleting race
              className="delete-race-btn"
              onClick={() => {
                setRaceName("")
                setStoredDetails((prev) => ({...prev, race: ""}))
                setShowCharacterDetails((prev) => ({...prev, race: false}))
                setNewDetails({})
                setCharacterDetails([])
              }}
            >
              <RiDeleteBinLine />
            </button>
          </div>
        )}

        <button
          className="race-btn"
          onClick={() => {
            setShowCharacterPopUps((prev) => ({...prev, races: true}))
          }}
          disabled={
            showCharacterDetails.class ||
            showCharacterDetails.subClass ||
            showCharacterDetails.race ||
            showCharacterDetails.customRace ||
            showCharacterDetails.customClass ||
            raceName
          }
        >
          select race
        </button>
        {showCharacterDetails.customRace && (
          <CustomRace
            setStoredDetails={setStoredDetails}
            setShowCharacterDetails={setShowCharacterDetails}
            setRaceName={setRaceName}
          />
        )}
        {/* for choosing your Race */}
        {raceName && showCharacterDetails.race && (
          <>
            <Perks
              characterDetails={characterDetails}
              setCharacterDetails={setCharacterDetails}
              newDetails={newDetails}
              setNewDetails={setNewDetails}
              category={"races"}
              subCategory={raceName.toLowerCase()}
              optionalURL={""}
              setStoredDetails={setStoredDetails}
            />
            <button
              className="save-race-btn"
              onClick={() => {
                setShowCharacterDetails((prev) => ({...prev, race: false}))
                setNewDetails({})
                setCharacterDetails([])
              }}
              disabled={
                !newDetails?.age ||
                !newDetails?.size?.ft ||
                (newDetails?.ability_improvement !== undefined &&
                  newDetails?.ability_improvement.isMax === false) ||
                (newDetails.race_custom_proficiencies !== undefined &&
                  newDetails.race_custom_proficiencies?.isMax === false)
              }
            >
              save
            </button>
          </>
        )}
      </div>
      {showCharacterPopUps.classes && (
        <CharacterOptionsPopUp
          setPopUp={setShowCharacterPopUps}
          setOptionName={setClassNameOption}
          url={"classes"}
          type={"class"}
          setIsCustom={setShowCharacterDetails}
        />
      )}
      {showCharacterPopUps.races && (
        <CharacterOptionsPopUp
          setPopUp={setShowCharacterPopUps}
          setOptionName={setRaceName}
          url={"races"}
          type={"race"}
          setIsCustom={setShowCharacterDetails}
        />
      )}

      {/* if all requirements are reached, display save character btn */}
      <button
        className="save-character-btn"
        onClick={() => {
          setLocalStorage(storedDetails.characterName, storedDetails)
          setShowCreator((prev) => ({
            ...prev,
            creator: false,
          }))
        }}
        disabled={
          Object.values(storedDetails).includes("") ||
          Object.values(showCharacterDetails).includes(true)
        }
      >
        Save Character
      </button>
    </div>
  )
}
export default CharacterCreator
