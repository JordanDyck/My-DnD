import axios from "axios"
import {useEffect, useState} from "react"

const RacePopUp = ({setPopUp, setRaceName}) => {
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
      {races.length ? (
        races.map((race, index) => (
          <button
            className="race-option"
            key={index}
            onClick={() => {
              setTimeout(() => {
                setRaceName(race.name)
                setPopUp(false)
              }, 300)
            }}
          >
            {race.name}
          </button>
        ))
      ) : (
        <p className="loading">loading</p>
      )}
    </div>
  )
}
export default RacePopUp
