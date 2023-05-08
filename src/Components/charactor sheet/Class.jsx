// import Select from "react-select"
import {useState} from "react"
import ClassPopup from "../ClassPopup"

const Class = () => {
  const [popUp, setPopUp] = useState(false)

  return (
    <div className="class-container">
      <div className="name-container">
        <label htmlFor="name">Name:</label>
        <input id="name" />
      </div>

      <div className="lvl-containter">
        <label id="lvl-label" htmlFor="level">
          Lvl:
        </label>
        <input type="number" id="level" />
      </div>

      <div className="race-container">
        <label htmlFor="race">Race:</label>
        <h4 id="race">placeholder</h4>

        <button onClick={() => setPopUp(true)}>select race</button>
      </div>
      {/* <label htmlFor="background">background:</label>
      <input id="background" /> */}
      {popUp && <ClassPopup setPopUp={setPopUp} />}
    </div>
  )
}
export default Class
