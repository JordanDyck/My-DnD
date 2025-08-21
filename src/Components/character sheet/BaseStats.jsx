import "../../styles/BaseStats.scss"
import {useSelector, useDispatch} from "react-redux"

import SkillCategories from "../filters/SkillCategories.json"
import {updateCharacter} from "../../Store/slices/characterSlice"

const BaseStats = () => {
  const character = useSelector((store) => store.character.value)
  const passivStats = ["speed", "ac", "initiative"]
  const dispatch = useDispatch()
  const updateAbilityStats = (baseStat, statName) => {
    let result = Math.floor((baseStat - 10) / 2) // calculates the stat bonus
    const updatedStats = {
      ...character,
      stats: {
        ...character.stats,
        [statName]: {
          base: isNaN(parseInt(baseStat)) ? 0 : parseInt(baseStat),
          bonus: result,
          skills: SkillCategories[statName],
        },
      },
    }
    dispatch(updateCharacter(updatedStats))
  }

  const updatePassiveStats = (statName, newStat) => {
    const updatedPassives = {
      ...character,
      stats: {
        ...character.stats,
        [statName]: newStat,
      },
    }
    dispatch(updateCharacter(updatedPassives))
  }

  return (
    <>
      <div className="passive-stats base-stat-wrapper">
        <div className={"initiative, base-stat-container"}>
          <label id="initiative-label" htmlFor="initiative">
            initiative
          </label>
          <div>
            <input
              onFocus={(e) => e.target.select()}
              id="initiative"
              type="number"
              onChange={(e) =>
                e.target.value.length <= 2 && updatePassiveStats("initiative", e.target.value)
              }
              value={character?.stats.initiative}
            />
          </div>
        </div>
        <div className="armour-class base-stat-container">
          <label id="ac-label" htmlFor="ac-input">
            AC
          </label>
          <input
            type="number"
            onFocus={(e) => e.target.select()}
            onChange={(e) => e.target.value.length <= 2 && updatePassiveStats("ac", e.target.value)}
            id="ac-input"
            value={character?.stats?.ac}
          ></input>
        </div>
        <div className="speed base-stat-container">
          <label id="speed-label" htmlFor="speed-input">
            wlk-speed
          </label>
          <input
            id="speed-input"
            type="number"
            onFocus={(e) => e.target.select()}
            onChange={(e) => updatePassiveStats("speed", e.target.value)}
            value={character?.stats?.speed}
          ></input>
        </div>
      </div>

      <div className="base-stat-wrapper">
        {Object.keys(character?.stats)?.map((statName, index) => {
          return (
            !passivStats.includes(statName) && (
              <div className="base-stat-container" key={`baseStat_${index}`}>
                <label className="stat-name">{statName}</label>

                <h4 className="bonus-stat">
                  {character?.stats[statName].bonus > 0 ? "+" : ""}
                  {character?.stats[statName].bonus}
                </h4>
                <input
                  onChange={(e) => {
                    if (e.target.value.length <= 2) {
                      updateAbilityStats(e.target.value, e.target.name)
                    }
                  }}
                  name={statName}
                  className="base-stat"
                  onFocus={(e) => e.target.select()}
                  type="number"
                  value={character?.stats[statName].base}
                />
              </div>
            )
          )
        })}
      </div>
    </>
  )
}
export default BaseStats
