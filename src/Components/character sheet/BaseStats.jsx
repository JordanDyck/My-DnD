import {useSelector, useDispatch} from "react-redux"

import SkillCategories from "../SkillCategories.json"
import {updateCharacter} from "../../Store/slices/characterSlice"

const BaseStats = () => {
  const character = useSelector((store) => store.character.value)

  const dispatch = useDispatch()
  const updateStats = (baseStat, statName) => {
    let result = Math.floor((baseStat - 10) / 2)
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

  return (
    <>
      <div className="passive-stats base-stat-wrapper">
        <div className="initiative base-stat-container">
          <label id="initiative-label" htmlFor="initiative">
            initiative
          </label>
          <h4 id="initiative">
            {character?.stats.dex.bonus > 0 ? "+" : ""}
            {character?.stats.dex.bonus}
          </h4>
        </div>
        <div className="armour-class base-stat-container">
          <label id="ac-label" htmlFor="ac-input">
            AC
          </label>
          <input
            onFocus={(e) => e.target.select()}
            id="ac-input"
            defaultValue={10 + character?.stats.dex.bonus}
          ></input>
        </div>
        <div className="speed base-stat-container">
          <label id="speed-label" htmlFor="speed-input">
            wlk-speed
          </label>
          <input
            id="speed-input"
            onFocus={(e) => e.target.select()}
            defaultValue={character?.race.speed}
          ></input>
        </div>
      </div>

      <div className="base-stat-wrapper">
        {Object.keys(character?.stats)?.map((statName, index) => {
          return (
            <div className="base-stat-container" key={`baseStat_${index}`}>
              <label className="stat-name">{statName}</label>

              <h4 className="bonus-stat">
                {character?.stats[statName].bonus > 0 ? "+" : ""}
                {character?.stats[statName].bonus}
              </h4>
              <input
                onChange={(e) => {
                  updateStats(e.target.value, e.target.name)
                }}
                name={statName}
                className="base-stat"
                onFocus={(e) => e.target.select()}
                type="number"
                value={character?.stats[statName].base}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
export default BaseStats
