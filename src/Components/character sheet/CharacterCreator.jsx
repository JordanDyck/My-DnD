import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"
import {setStorage} from "../utilities"
import CharacterOptionsPopUp from "../CharacterOptionsPopup"
import Perks from "../Perks"

const CharacterCreator = ({setShowCreator}) => {
  const [racePopUp, setRacePopUp] = useState(false)
  const [classPopUp, setClassPopUp] = useState(false)
  const [storedDetails, setStoredDetails] = useState({
    characterName: "",
    classDetails: "",
    levels: "",
    race: "",
  })
  const [classNameOption, setClassNameOption] = useState("")
  const [raceName, setRaceName] = useState("")
  const [showCharacterDetails, setshowCharacterDetails] = useState({
    class: false,
    race: false,
  })

  return (
    <div className="character-creator">
      <header className="tab-header">Create Character</header>

      <label className="name-label">
        Name:
        <input
          className="name"
          onBlur={(e) =>
            setStoredDetails((prev) => ({
              ...prev,
              characterName: e.target.value,
            }))
          }
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
                setshowCharacterDetails({class: false})
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
            setshowCharacterDetails({class: true})
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
              onClick={() => setshowCharacterDetails({class: false})}
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
                setshowCharacterDetails({race: false})
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
            setshowCharacterDetails({race: true})
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
              onClick={() => setshowCharacterDetails({race: false})}
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
        storedDetails.race && (
          <button
            className="save-character-btn"
            onClick={() => {
              setStorage(`${storedDetails.characterName}`, storedDetails)
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
