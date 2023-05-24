import axios from "axios"
import {useEffect, useState} from "react"

const ProfStats = ({showStats, setShowStats}) => {
  const [stats, setStats] = useState([])

  useEffect(() => {
    axios.get(`https://www.dnd5eapi.co/api/skills/`).then((res) => {
      const data = res.data.results
      setStats(data)
    })
  }, [])

  return (
    <div className="stat-wrapper">
      <button className="close-stats" onClick={() => setShowStats(!showStats)}>
        Close
      </button>
      {stats.length ? (
        stats.map((stat, index) => (
          <div className="stat-container" key={index}>
            <label>{stat.name}: </label>
            <input className="stat-input" type="number" />
          </div>
        ))
      ) : (
        <p className="loading">loading</p>
      )}
    </div>
  )
}
export default ProfStats
