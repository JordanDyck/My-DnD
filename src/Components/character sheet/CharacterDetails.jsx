// import {useState} from "react"

// 1. check if local storage has chars. if not, create char
// 2. make selector to show each char.
// 3. display last used char by default.

const CharacterDetails = ({selectedCharacter}) => {
  const character = JSON.parse(localStorage.getItem(selectedCharacter))

  return (
    <div className="character-info-container">
      <div className="name-container">
        <label className="name-label">Name:</label>
        <h4 className="name">{character.characterName}</h4>

        <label className="class-label">Class:</label>
        <h4>{character.classDetails.name}</h4>

        <label className="race-label">Race:</label>
        <h4>{character.race.name}</h4>
      </div>
    </div>
  )
}
export default CharacterDetails
