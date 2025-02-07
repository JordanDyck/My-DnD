import {useSelector, useDispatch} from "react-redux"
import {useState} from "react"
import {MdClose} from "react-icons/md"

import {updateCharacter} from "../Store/slices/characterSlice"
import ClassLvlDetails from "./ClassLvlDetails"

const LevelUpTab = ({toggleLvlUp}) => {
  const character = useSelector((store) => store.character.value)
  const [newHealth, setNewHealth] = useState(character.health.maxHP)

  const dispatch = useDispatch()
  const newLevel = character.levels[character.currentLevel] // currentlevel is + 1 because of index

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
          hit dice(D{character.classDetails.hit_die}) + CON
          {`(${character.stats.con.bonus})`}
        </h4>

        <h4 className="new-health" htmlFor="new-health">
          New Health: {character.health.maxHP} +
          <input
            className="new-health-input"
            type="number"
            name="new-health"
            onChange={(e) => {
              setNewHealth(character.health.maxHP + parseInt(e.target.value))
            }}
          />
          = {newHealth ? newHealth : character.health.maxHP}hp
        </h4>
      </div>
      <div className="new-features-container">
        <ClassLvlDetails mainLevel={newLevel} character={character} />

        <h4 className="h4-title">subclass features</h4>
        {character.subClass.features.map((item) => {
          if (parseInt(item.level) === character.currentLevel + 1) {
            return <p key={`levelUp_${item.featureName}`}>{item.featureName}</p>
          } else return ""
        })}
      </div>
      <button
        className="save-btn"
        disabled={!newHealth}
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
