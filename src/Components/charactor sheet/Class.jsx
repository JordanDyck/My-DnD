import {useState} from "react"

import CharacterDetails from "../CharacterDetails"
import BaseStats from "./BaseStats"
import ProfStats from "./ProfStats"

const Class = () => {
  const [showCharDetails, setShowCharDetails] = useState(false)
  const [showStats, setShowStats] = useState(false)
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

      <button
        className="details-btn"
        onClick={() => setShowCharDetails(!showCharDetails)}
      >
        details
      </button>
      <button className="details-btn" onClick={() => setShowStats(!showStats)}>
        stats
      </button>

      {showCharDetails && (
        <CharacterDetails raceName={raceName} setRaceName={setRaceName} />
      )}
      {showStats && (
        <ProfStats showStats={showStats} setShowStats={setShowStats} />
      )}
      <BaseStats />
    </div>
  )
}
export default Class
