import {useSelector} from "react-redux"

import Health from "./Health"
import {useState} from "react"
import LevelUpTab from "../LevelUpTab"

const CharacterDetails = ({showSkillsTab, unfocused}) => {
  const character = useSelector((store) => store.character.value)
  const [levelUP, setLevelUP] = useState(false)

  if (!character) {
    return null
  }
  try {
    return (
      <div
        className="character-details-container"
        style={{pointerEvents: unfocused ? "none" : "initial"}}
      >
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
            <h4 className="level">level: {character.currentLevel} </h4>
          </div>
          <button className="lvl-up-btn" onClick={() => setLevelUP(true)}>
            level up
          </button>
        </div>
        {levelUP && <LevelUpTab toggleLvlUp={setLevelUP} />}
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
