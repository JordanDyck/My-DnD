import axios from "axios"
import {useEffect, useState} from "react"

const ClassPopup = ({setPopUp, setRaceName}) => {
  const [races, setRaces] = useState([])

  useEffect(() => {
    axios.get(`https://www.dnd5eapi.co/api/races/`).then((res) => {
      const data = res.data.results
      setRaces(data)
    })
  }, [])

  return (
    <div className="popup-container">
      <input id="race-input" type="text" placeholder="Make your own" />
      {races.map((race, index) => (
        <button
          className="race-option"
          key={index}
          onClick={() => setRaceName(race.name)}
        >
          {race.name}
        </button>
      ))}
      <button id="save-race-btn" onClick={() => setPopUp(false)}>
        Save
      </button>
    </div>
  )
}
export default ClassPopup
