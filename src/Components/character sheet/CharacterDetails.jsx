// import {useState} from "react"

import Health from "./Health"

// 1. check if local storage has chars. if not, create char
// 2. make selector to show each char.
// 3. display last used char by default.

const CharacterDetails = ({selectedCharacter}) => {
  const character = JSON.parse(localStorage.getItem(selectedCharacter))

  return (
    <div className="character-info-container">
      <header className="tab-header">{character.characterName}</header>

      <div className="character-details">
        <div className="detail">
          <label className="class-label">Class:</label>
          <h4>{character.classDetails.name}</h4>
        </div>
        <div className="detail">
          <label className="race-label">Race:</label>
          <h4>{character.race.name}</h4>
        </div>
        <div className="detail">
          <label className="hit-dice">Hit Dice:</label>
          <h4>D{character.classDetails.hit_die}</h4>
        </div>
        <div className="detail">
          <label className="lvl-label">level:</label>
          <h4 className="level">1</h4>
        </div>
      </div>
      <Health />
    </div>
  )
}
export default CharacterDetails
