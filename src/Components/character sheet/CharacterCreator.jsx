import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"

import CharacterOptionsPopUp from "../CharacterOptionsPopup"
import Perks from "../Perks"
import {setLocalStorage} from "../utilities"
import CustomClass from "../Custom Character/CustomClass"
import SubClassBuilder from "../Sub Class/SubClassBuilder"
import CustomRace from "../Custom Character/CustomRace"
import StatRolls from "./StatRolls"
import SubRace from "../Sub Class/SubRace"

const CharacterCreator = ({setShowCreator}) => {
  const [storedDetails, setStoredDetails] = useState({
    characterName: "",
    classDetails: "",
    subClass: "",
    levels: [],
    currentLevel: 1,
    gear: [],
    spells: [],
    stats: {},
    inventory: [],
    health: "",
    race: "",
    subRace: {},
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
    subRace: false,
    customClass: false,
    customRace: false,
  })
  const [characterDetails, setCharacterDetails] = useState([]) // stores pre-made data from api
  const [newDetails, setNewDetails] = useState({}) // stores custom made data

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

  const areTabsFalse = (currentTab) => {
    if (showCharacterDetails[currentTab] === true) {
      return true
    } else {
      return Object.entries(showCharacterDetails).every(
        (item) => item[1] === false
      )
    }
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
        {classNameOption && areTabsFalse("class") && (
          <div>
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
            {showCharacterDetails.class && (
              <div className="starting-level">
                <label htmlFor="level">
                  starting level:
                  <input
                    name="level"
                    type="number"
                    onFocus={(e) => e.target.select()}
                    value={newDetails.starting_level || 1}
                    min={1}
                    onChange={(e) =>
                      // keeps the character level within 1-20 to prevent breaks
                      e.target.value <= 20
                        ? setNewDetails((prev) => ({
                            ...prev,
                            starting_level: parseInt(e.target.value),
                          }))
                        : ""
                    }
                  />
                </label>
              </div>
            )}
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
            showCharacterDetails.subRace ||
            classNameOption
          }
        >
          select class
        </button>
        {classNameOption && showCharacterDetails.class && (
          <>
            {/* for choosing your class. displays all class related info & choices. */}
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
            storedDetails={storedDetails}
            setClassNameOption={setClassNameOption}
            setShowCharacterDetails={setShowCharacterDetails}
            linkedCharacter={storedDetails.characterName}
          />
        )}

        {storedDetails.subClass.name && areTabsFalse("subClass") && (
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
        {/* for choosing subclass */}
        {storedDetails.classDetails && showCharacterDetails.class === false && (
          <button
            className="class-btn"
            onClick={() =>
              setShowCharacterDetails((prev) => ({...prev, subClass: true}))
            }
            disabled={
              showCharacterDetails.class ||
              showCharacterDetails.subClass ||
              showCharacterDetails.race ||
              showCharacterDetails.subRace ||
              showCharacterDetails.customRace ||
              showCharacterDetails.customClass ||
              storedDetails.subClass.name
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
        {raceName && areTabsFalse("race") && (
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
            showCharacterDetails.subRace ||
            showCharacterDetails.customRace ||
            showCharacterDetails.customClass ||
            raceName
          }
        >
          select race
        </button>
        {storedDetails?.subRace?.name && areTabsFalse("subRace") && (
          <div className="subrace-name-container">
            <label htmlFor="subrace">subRace:</label>
            <h4 className="subrace-name">{storedDetails?.subRace?.name}</h4>
            <button
              // for deleting race
              className="delete-race-btn"
              onClick={() => {
                setStoredDetails((prev) => ({...prev, subRace: {}}))
                setShowCharacterDetails((prev) => ({...prev, subRace: false}))
              }}
            >
              <RiDeleteBinLine />
            </button>
          </div>
        )}
        {storedDetails.race && !showCharacterDetails.race && (
          <button
            className="sub-race-btn"
            onClick={() =>
              setShowCharacterDetails((prev) => ({...prev, subRace: true}))
            }
            disabled={
              showCharacterDetails.class ||
              showCharacterDetails.subClass ||
              showCharacterDetails.race ||
              showCharacterDetails.subRace ||
              showCharacterDetails.customRace ||
              showCharacterDetails.customClass ||
              storedDetails.subRace?.name
            }
          >
            Subrace
          </button>
        )}

        {showCharacterDetails.subRace && (
          <SubRace
            setStoredDetails={setStoredDetails}
            setShowCharacterDetails={setShowCharacterDetails}
          />
        )}

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
