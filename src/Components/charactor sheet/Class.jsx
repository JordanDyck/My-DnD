// import Select from "react-select"
import {useState} from "react"
import ClassPopup from "../ClassPopup"

const Class = () => {
  const [popUp, setPopUp] = useState(false)
  const [raceName, setRaceName] = useState("")

  return (
    <div className="character-info-container">
      <div className="name-container">
        <label htmlFor="name">Name:</label>
        <input id="name" />
      </div>

      <div className="lvl-containter">
        <label id="lvl-label" htmlFor="level">
          Lvl:
        </label>
        <input type="number" id="level" defaultValue={1} />
      </div>

      <div className="class-container">
        <label htmlFor="class">Class: </label>
        <input id="class" />
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

      {popUp && <ClassPopup setPopUp={setPopUp} setRaceName={setRaceName} />}
    </div>
  )
}
export default Class
