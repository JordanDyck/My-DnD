import {useState} from "react"

import CharacterDetails from "../CharacterDetails"
import BaseStats from "./BaseStats"

const Class = () => {
  const [details, setDetails] = useState(false)
  const [raceName, setRaceName] = useState("")

  return (
    <div className="character-info-container">
      <div className="name-container">
        <label htmlFor="name">Name:</label>
        <input id="name" />
        <label id="lvl-label" htmlFor="level">
          Lvl:
        </label>
        <input type="number" id="level" defaultValue={1} />
      </div>

      <button className="details-btn" onClick={() => setDetails(!details)}>
        details
      </button>

      {details && (
        <CharacterDetails raceName={raceName} setRaceName={setRaceName} />
      )}
      <BaseStats />
    </div>
  )
}
export default Class
