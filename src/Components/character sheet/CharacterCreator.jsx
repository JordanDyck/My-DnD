import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"
import {useDispatch} from "react-redux"

import {clearCharacterDetails} from "../../Store/slices/characterSlice"
import CharacterOptionsPopUp from "../CharacterOptionsPopup"
import Perks from "../Perks"

const CharacterCreator = () => {
  const [racePopUp, setRacePopUp] = useState(false)
  const [classPopUp, setClassPopUp] = useState(false)
  const [classNameOption, setClassNameOption] = useState("")
  const [raceName, setRaceName] = useState("")
  const [characterName, setcharacterName] = useState([])
  const dispatch = useDispatch()

  return (
    <div className="character-creator">
      <header className="tab-header">Create Character</header>

      <label id="character-name">
        Name:
        <input
          className="name"
          onBlur={(e) => setcharacterName(["characterName", e.target.value])}
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
              }}
            >
              <RiDeleteBinLine />
            </button>
          </div>
        )}
        <button
          id="class-btn"
          onClick={() => setClassPopUp(true)}
          disabled={classNameOption}
        >
          select class
        </button>
        {classNameOption && (
          <>
            <Perks
              category={"classes"}
              subCategory={classNameOption.toLowerCase()}
              optionalURL={""}
            />
            <Perks
              category={"classes"}
              subCategory={classNameOption.toLowerCase()}
              optionalURL={"/levels"}
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
              className="delete-race-btn"
              onClick={() => {
                setRaceName("")
                dispatch(clearCharacterDetails([]))
                localStorage.removeItem("raceStats")
              }}
            >
              <RiDeleteBinLine />
            </button>
          </div>
        )}

        <button
          className="race-btn"
          onClick={() => setRacePopUp(true)}
          disabled={raceName}
        >
          select race
        </button>
        {raceName && (
          <Perks
            category={"races"}
            subCategory={raceName.toLowerCase()}
            optionalURL={""}
          />
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
    </div>
  )
}
export default CharacterCreator
