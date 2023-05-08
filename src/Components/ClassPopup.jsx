import axios from "axios"
import {useEffect, useState} from "react"

const ClassPopup = ({setPopUp}) => {
  const [races, setRaces] = useState([])
  console.log(races)

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
        <button className="race-option" key={index}>
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
