import {useSelector} from "react-redux"

import "../../styles/CharacterDetails.scss"
import Health from "./Health"
import {useState} from "react"
import LevelUpTab from "../LevelUpTab"
import ProfStats from "./ProfStats"
import CharacterInfo from "./characterInfo/CharacterInfo"
import {IoMdMenu} from "react-icons/io"

const CharacterDetails = () => {
  const character = useSelector((store) => store.character.value)
  const [levelUP, setLevelUP] = useState(false)
  const [showInfo, setShowInfo] = useState({stats: false, info: false})

  if (localStorage.getItem("currentCharacter")) {
    try {
      return (
        <div className="character-wrapper">
          <ProfStats setShowSkillsTab={setShowInfo} showSkillsTab={showInfo.stats} />
          <button
            className="show-character-info-btn"
            onClick={() => {
              setShowInfo((prev) => ({
                ...prev,
                info: !prev.info,
              }))
            }}
          >
            <IoMdMenu />
          </button>
          <div className="character-details-container">
            <header className="tab-header">
              {character?.characterName} | {character?.classDetails?.name}
            </header>

            <div className="character-details">
              <button
                className="category-btn skills-tab"
                onClick={() =>
                  setShowInfo((prev) => ({
                    ...prev,
                    stats: true,
                  }))
                }
              >
                skills
              </button>

              <h4 className="level">level: {character?.currentLevel} </h4>

              <button
                className="lvl-up-btn"
                onClick={() => setLevelUP(true)}
                disabled={!character?.levels[character?.currentLevel]}
              >
                {character?.levels[character.currentLevel] ? "level up" : "max level"}
              </button>
            </div>
            {levelUP && <LevelUpTab toggleLvlUp={setLevelUP} />}
            <Health key={character?.characterName} currentCharacter={character?.characterName} />
          </div>
          {<CharacterInfo showInfo={showInfo.info} />}
        </div>
      )
    } catch (error) {
      console.error("unable to get Character Data", error)
      localStorage.removeItem(JSON.parse(localStorage.getItem("currentCharacter")))
      localStorage.setItem("currentCharacter", "")
      return null
    }
  }
}
export default CharacterDetails
