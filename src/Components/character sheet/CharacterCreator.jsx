import {useState} from "react"

import RacePopUp from "../RacePopup"

const CharacterCreator = () => {
  const [popUp, setPopUp] = useState(false)
  const [raceName, setRaceName] = useState("")

  return (
    <div className="details-container">
      <div className="class-container">
        <label id="class-label" htmlFor="class">
          Class:
        </label>
        <input id="class" />
        <button id="save-class-btn">save</button>
      </div>

      <div className="race-container">
        <label id="race-label" htmlFor="race">
          Race:
        </label>
        <h4 id="race">{raceName}</h4>

        <button
          className="race-btn"
          onClick={() => setPopUp(true)}
          disabled={raceName}
        >
          select race
        </button>
        <button
          className="delete-race-btn"
          onClick={() => setRaceName("")}
          disabled={!raceName}
        >
          X
        </button>
      </div>

      {popUp && <RacePopUp setPopUp={setPopUp} setRaceName={setRaceName} />}
    </div>
  )
}
export default CharacterCreator
