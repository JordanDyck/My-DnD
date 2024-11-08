import {useState} from "react"

import SkillCategories from "../filters/SkillCategories.json"

const StatRolls = ({setStoredDetails}) => {
  const [stats, setStats] = useState({
    ac: 10,
    initiative: 0,
    speed: 30,
    str: {base: 0, bonus: -5, skills: SkillCategories["str"]},
    dex: {base: 0, bonus: -5, skills: SkillCategories["dex"]},
    con: {base: 0, bonus: -5},
    int: {base: 0, bonus: -5, skills: SkillCategories["int"]},
    wis: {base: 0, bonus: -5, skills: SkillCategories["wis"]},
    chr: {base: 0, bonus: -5, skills: SkillCategories["chr"]},
  })
  const [btnText, setBtnText] = useState("save rolls")
  const passiveStats = ["speed", "ac", "initiative"]

  const calculateBonus = (statName, baseStat) => {
    // calculates & updates the stat bonus based on the base stat.
    let result = Math.floor((baseStat - 10) / 2)
    if (baseStat.length <= 2) {
      setStats((prev) => ({
        ...prev,
        [statName]: {
          base: parseInt(baseStat),
          bonus: result,
          skills: SkillCategories[statName],
        },
      }))
    }
  }

  const handleSave = () => {
    setStoredDetails((prev) => ({
      ...prev,
      stats: stats,
    }))
    setBtnText("saved")
    const timoutId = setTimeout(() => {
      setBtnText("save rolls")
    }, 2000)

    return () => clearTimeout(timoutId)
  }

  return (
    <div className="stat-roll-wrapper">
      <h4 className="h4-title">Stat Rolls:</h4>
      <div className="stat-roll-container">
        {Object.keys(stats).map((stat) => {
          return (
            !passiveStats.includes(stat) && (
              <div className={`stat stat_${stat}`} key={`statRoll_${stat}`}>
                <h4>{stat}</h4>
                <h4 className="base-stat-bonus">
                  {stats[stat].bonus > 0 ? "+" : ""}
                  {stats[stat].bonus}
                </h4>
                <input
                  type="number"
                  name={`statroll_${stat}`}
                  id={stat}
                  value={!isNaN(stats[stat].base) && stats[stat].base}
                  onFocus={(e) => e.target.select()}
                  onBlur={() =>
                    isNaN(stats[stat].base)
                      ? setStats((prev) => ({
                          ...prev,
                          [stat]: {
                            ...prev[stat],
                            base: 0,
                          },
                        }))
                      : ""
                  }
                  className="base-stat-roll"
                  onChange={(e) => calculateBonus(e.target.id, e.target.value)}
                />
              </div>
            )
          )
        })}
      </div>
      <button
        className="roll-save-btn"
        type="button"
        onClick={() => handleSave()}
      >
        {btnText}
      </button>
    </div>
  )
}
export default StatRolls
