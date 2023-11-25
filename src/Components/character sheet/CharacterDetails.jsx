// import {useState} from "react"

import Health from "./Health"

const CharacterDetails = ({selectedCharacter}) => {
  const getCharacter = () => {
    try {
      const character = JSON.parse(localStorage.getItem(selectedCharacter))
      return character
    } catch (error) {
      alert("No character found")
    }
  }
  const currentCharacter = getCharacter()
  try {
    return (
      <div className="character-info-container">
        <header className="tab-header">{currentCharacter.characterName}</header>

        <div className="character-details">
          <div className="detail">
            <label className="class-label">Class:</label>
            <h4>{currentCharacter.classDetails.name}</h4>
          </div>
          <div className="detail">
            <label className="race-label">Race:</label>
            <h4>{currentCharacter.race.name}</h4>
          </div>
          <div className="detail">
            <label className="hit-dice">Hit Dice:</label>
            <h4>D{currentCharacter.classDetails.hit_die}</h4>
          </div>
          <div className="detail">
            <label className="lvl-label">level:</label>
            <h4 className="level">20</h4>
          </div>
        </div>
        <Health currentCharacter={currentCharacter.characterName} />
      </div>
    )
  } catch (error) {
    console.error("Character data was corrupt and removed.", error)
    localStorage.removeItem(currentCharacter.characterName)
  }
}
export default CharacterDetails
