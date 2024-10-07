import {useSelector, useDispatch} from "react-redux"
import {updateCharacter} from "../../Store/slices/characterSlice"
import Health from "./Health"

const CharacterDetails = ({showSkillsTab}) => {
  const character = useSelector((store) => store.character.value)
  const dispatch = useDispatch()

  const handleLevelUp = (e) => {
    if (!isNaN(e.target.value)) {
      const updatedLevel = {
        ...character,
        currentLevel: parseInt(e.target.value),
      }

      dispatch(updateCharacter(updatedLevel))
    }
  }

  if (!character) {
    return null
  }
  try {
    return (
      <div className="character-info-container">
        <header className="tab-header">
          {character?.characterName} | {character.classDetails.name}
        </header>

        <div className="character-details">
          <div>
            <button
              className="category-btn skills-tab"
              onClick={() =>
                showSkillsTab((prev) => ({
                  ...prev,
                  stats: !prev.stats,
                }))
              }
            >
              skills
            </button>
          </div>

          <div className="detail">
            <label className="lvl-label">level:</label>
            <input
              className="level"
              type="number"
              value={character.currentLevel}
              onChange={(e) => handleLevelUp(e)}
            ></input>
          </div>
        </div>
        <Health
          key={character?.characterName}
          currentCharacter={character?.characterName}
        />
      </div>
    )
  } catch (error) {
    console.error("unable to get Character Data", error)
    return null
  }
}
export default CharacterDetails
