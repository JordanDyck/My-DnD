import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"

import CharacterOptionsPopUp from "../CharacterOptionsPopup"
import Perks from "../Perks"
import {setLocalStorage} from "../utilities"
import CustomClass from "../Custom Character/CustomClass"
import SubClassBuilder from "../Sub Class/SubClassBuilder"
import CustomRace from "../Custom Character/CustomRace"

const CharacterCreator = ({setShowCreator}) => {
  const [storedDetails, setStoredDetails] = useState({
    characterName: "",
    classDetails: "",
    subClass: {},
    levels: [],
    health: {currentHP: 100, maxHP: 100},
    race: {},
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
  const [newProfDetails, setNewProfDetails] = useState([])

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
          onBlur={(e) => {
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
                }))
                setShowCharacterDetails((prev) => ({
                  ...prev,
                  class: false,
                  subClass: false,
                }))
              }}
            >
              <RiDeleteBinLine />
            </button>
          </div>
        )}
        <button
          // for choosing your class. shows class popup and disables unrelated btns.
          className="class-btn"
          onClick={() => {
            setShowCharacterPopUps((prev) => ({...prev, classes: true}))
            // setShowCharacterDetails((prev) => ({
            //   ...prev,
            //   class: true,
            //   subClass: false,
            // }))
          }}
          disabled={
            // showCharacterDetails.race ||
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
              newProfDetails={newProfDetails}
              setNewProfDetails={setNewProfDetails}
              category={"classes"}
              subCategory={classNameOption.toLowerCase()}
              optionalURL={""}
              setStoredDetails={setStoredDetails}
            />

            <button
              className="save-race-btn"
              onClick={() =>
                setShowCharacterDetails((prev) => ({...prev, class: false}))
              }
              disabled={
                newProfDetails.proficiency_choices?.maxChoicesReached === false
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
            // setShowCharacterDetails((prev) => ({...prev, race: true}))
          }}
          disabled={
            showCharacterDetails.class ||
            showCharacterDetails.subClass ||
            showCharacterDetails.race ||
            showCharacterDetails.customRace ||
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
              newProfDetails={newProfDetails}
              setNewProfDetails={setNewProfDetails}
              category={"races"}
              subCategory={raceName.toLowerCase()}
              optionalURL={""}
              setStoredDetails={setStoredDetails}
            />
            <button
              className="save-race-btn"
              onClick={() =>
                setShowCharacterDetails((prev) => ({...prev, race: false}))
              }
              disabled={
                newProfDetails.ability_bonus_options?.maxChoicesReached ===
                  false ||
                newProfDetails.starting_proficiency_options
                  ?.maxChoicesReached === false
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
      {storedDetails.characterName &&
        storedDetails.classDetails &&
        storedDetails.levels &&
        storedDetails.raceName &&
        storedDetails.subClass.name &&
        !showCharacterDetails.class &&
        !showCharacterDetails.subClass &&
        !showCharacterDetails.race && (
          <button
            className="save-character-btn"
            onClick={() => {
              setLocalStorage(storedDetails.characterName, storedDetails)
              setShowCreator(false)
            }}
          >
            Save Character
          </button>
        )}
    </div>
  )
}
export default CharacterCreator
