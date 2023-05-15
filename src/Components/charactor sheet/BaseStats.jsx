import {useState} from "react"

const BaseStats = () => {
  const [baseStats, setBaseStat] = useState({
    str: {base: 10, bonus: 3},
    dex: {base: 10, bonus: 3},
    con: {base: 10, bonus: 3},
    int: {base: 10, bonus: 3},
    wis: {base: 10, bonus: 3},
    chr: {base: 10, bonus: 3},
  })

  return (
    <div className="stat-wrapper">
      {Object.keys(baseStats).map((stat, index) => (
        <div className="stat-container" key={index}>
          <label className="stat-name" htmlFor="bonus-stat">
            {stat}
          </label>
          <label className="bonus-label" htmlFor="bonus-stat">
            +
          </label>
          <input className="bonus-stat" type="number" defaultValue={5} />
          <input className="base-stat" type="number" defaultValue={10} />
        </div>
      ))}
    </div>
  )
}
export default BaseStats
