import {useState} from "react"
import {RiDeleteBinLine} from "react-icons/ri"

import RacePopUp from "../RacePopup"
import RacePerks from "../RacePerks"

const CharacterCreator = () => {
  const [popUp, setPopUp] = useState(false)
  const [raceName, setRaceName] = useState("")

  return (
    <div className="character-creator">
      <header className="tab-header">Create Character</header>

      <label>
        Name:
        <input />
      </label>

      <div className="class">
        <label id="class-label" htmlFor="class">
          Class:
        </label>
        <input id="class-name" />
      </div>

      <div className="race-container">
        {raceName && (
          <div className="race-name">
            <label id="race-label" htmlFor="race">
              Race:
            </label>
            <h4 id="race">{raceName}</h4>
            <button className="delete-race-btn" onClick={() => setRaceName("")}>
              <RiDeleteBinLine />
            </button>
          </div>
        )}

        <button
          className="race-btn"
          onClick={() => setPopUp(true)}
          disabled={raceName}
        >
          select race
        </button>
      </div>
      {popUp && <RacePopUp setPopUp={setPopUp} setRaceName={setRaceName} />}
      {raceName && <RacePerks raceName={raceName.toLowerCase()} />}
    </div>
  )
}
export default CharacterCreator
