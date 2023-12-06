import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"

import CharacterOptionsPopUp from "../CharacterOptionsPopup"
import Perks from "../Perks"
import {setLocalStorage} from "../utilities"

const CharacterCreator = ({setShowCreator}) => {
  const [racePopUp, setRacePopUp] = useState(false)
  const [classPopUp, setClassPopUp] = useState(false)
  const [storedDetails, setStoredDetails] = useState({
    characterName: "",
    classDetails: "",
    levels: "",
    health: {currentHP: 50, maxHP: 100},
    race: "",
  })
  const [classNameOption, setClassNameOption] = useState("")
  const [raceName, setRaceName] = useState("")
  const [showCharacterDetails, setshowCharacterDetails] = useState({
    class: false,
    race: false,
  })

  const checkStoredNames = (nameToCheck) => {
    if (
      Object.keys(localStorage).filter(
        (storedName) => storedName === nameToCheck
      ).length
    ) {
      return false
    } else return true
  }

  return (
    <div className="character-creator">
      <header className="tab-header">Create Character</header>

      <label className="name-label">
        Name:
        <input
          className="name"
          onBlur={(e) => {
            if (checkStoredNames(e.target.value) === true) {
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
              className="delete-class-btn"
              onClick={() => {
                setClassNameOption("")
                setStoredDetails((prev) => ({
                  ...prev,
                  classDetails: "",
                  levels: "",
                }))
                setshowCharacterDetails((prev) => ({...prev, class: false}))
              }}
            >
              <RiDeleteBinLine />
            </button>
          </div>
        )}
        <button
          id="class-btn"
          onClick={() => {
            setClassPopUp(true)
            setshowCharacterDetails((prev) => ({...prev, class: true}))
          }}
          disabled={showCharacterDetails.race || classNameOption}
        >
          select class
        </button>
        {classNameOption && showCharacterDetails.class && (
          <>
            {/* for choosing your class */}
            <Perks
              category={"classes"}
              subCategory={classNameOption.toLowerCase()}
              optionalURL={""}
              setStoredDetails={setStoredDetails}
            />
            {/* displays the level info */}
            <Perks
              category={"classes"}
              subCategory={classNameOption.toLowerCase()}
              optionalURL={"/levels"}
              setStoredDetails={setStoredDetails}
            />
            <button
              className="save-race-btn"
              onClick={() =>
                setshowCharacterDetails((prev) => ({...prev, class: false}))
              }
            >
              save
            </button>
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
              className="delete-race-btn"
              onClick={() => {
                setRaceName("")
                setStoredDetails((prev) => ({...prev, race: ""}))
                setshowCharacterDetails((prev) => ({...prev, race: false}))
              }}
            >
              <RiDeleteBinLine />
            </button>
          </div>
        )}

        <button
          className="race-btn"
          onClick={() => {
            setRacePopUp(true)
            setshowCharacterDetails((prev) => ({...prev, race: true}))
          }}
          disabled={showCharacterDetails.class || raceName}
        >
          select race
        </button>
        {raceName && showCharacterDetails.race && (
          <>
            <Perks
              category={"races"}
              subCategory={raceName.toLowerCase()}
              optionalURL={""}
              setStoredDetails={setStoredDetails}
            />
            <button
              className="save-race-btn"
              onClick={() =>
                setshowCharacterDetails((prev) => ({...prev, race: false}))
              }
            >
              save
            </button>
          </>
        )}
      </div>
      {classPopUp && (
        <CharacterOptionsPopUp
          setPopUp={setClassPopUp}
          setOptionName={setClassNameOption}
          type={{name: "classes"}}
        />
      )}
      {racePopUp && (
        <CharacterOptionsPopUp
          setPopUp={setRacePopUp}
          setOptionName={setRaceName}
          type={{name: "races"}}
        />
      )}
      {storedDetails.characterName &&
        storedDetails.classDetails &&
        storedDetails.levels &&
        storedDetails.race &&
        !showCharacterDetails.class &&
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
