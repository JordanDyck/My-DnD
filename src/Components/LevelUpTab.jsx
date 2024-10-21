import {useSelector, useDispatch} from "react-redux"
import {useState} from "react"
import {MdClose} from "react-icons/md"

import {updateCharacter} from "../Store/slices/characterSlice"
import ClassLvlDetails from "./ClassLvlDetails"

const LevelUpTab = ({toggleLvlUp}) => {
  const [newHealth, setNewHealth] = useState()
  const character = useSelector((store) => store.character.value)

  const dispatch = useDispatch()
  const newLevel = character.levels[character.currentLevel]
  const handleLevelUp = () => {
    const updatedLevel = {
      ...character,
      currentLevel: parseInt(character.currentLevel + 1),
      health: {
        ...character.health,
        maxHP: parseInt(newHealth),
      },
    }

    dispatch(updateCharacter(updatedLevel))
  }

  return (
    <div className="level-up-tab-container">
      <header className="tab-header">
        level: {character.currentLevel + 1}
      </header>
      <button className="close-btn" onClick={() => toggleLvlUp(false)}>
        <MdClose />
      </button>

      <div className="new-health-container">
        <h4 className="hit-dice">
          hit dice: D{character.classDetails.hit_die} + CON
          {` (+${character.stats.con.bonus})`}
        </h4>

        <h4 className="old-health">
          old health: {character.health.maxHP}
          <span>HP</span>
        </h4>
        <label className="new-health" htmlFor="new-health">
          New Health:
          <input
            className="new-health-input"
            type="number"
            name="new-health"
            onChange={(e) => setNewHealth(e.target.value)}
          />
        </label>
      </div>
      <div className="new-features-container">
        <ClassLvlDetails mainLevel={newLevel} />
      </div>
      <button
        className="save-btn"
        disabled={!newHealth?.length}
        onClick={() => {
          handleLevelUp()
          toggleLvlUp(false)
        }}
      >
        Level up!
      </button>
    </div>
  )
}
export default LevelUpTab
