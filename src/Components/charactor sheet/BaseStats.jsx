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
    <>
      <div className="passive-stats stat-wrapper">
        <div className="initiative stat-container">
          <label id="initiative-label" htmlFor="initiative-input">
            initiative
          </label>
          <input type="number" id="initiative-input" defaultValue={1} />
        </div>
        <div className="armour-class stat-container">
          <label id="ac-label" htmlFor="ac-input">
            AC
          </label>
          <input type="number" id="ac-input" defaultValue={10} />
        </div>
        <div className="speed stat-container">
          <label id="speed-label" htmlFor="speed-input">
            wlk-speed
          </label>
          <input type="number" id="speed-input" defaultValue={10} />
        </div>
      </div>

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
    </>
  )
}
export default BaseStats
