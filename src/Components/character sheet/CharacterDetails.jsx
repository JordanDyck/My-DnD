// import {useState} from "react"
import {useSelector} from "react-redux"
import Health from "./Health"

const CharacterDetails = () => {
  const character = useSelector((store) => store.character.value)

  if (!character) {
    return null
  }
  try {
    return (
      <div className="character-info-container">
        <header className="tab-header">{character.characterName}</header>

        <div className="character-details">
          <div className="detail">
            <label className="class-label">Class:</label>
            <h4>{character.classDetails.name}</h4>
          </div>

          <div className="detail">
            <label className="lvl-label">level:</label>
            <input className="level" defaultValue={20}></input>
          </div>
        </div>
        <Health
          key={character.characterName}
          currentCharacter={character.characterName}
        />
      </div>
    )
  } catch (error) {
    console.error("Character data was corrupt and removed.", error)
    localStorage.removeItem(character.characterName)
  }
}
export default CharacterDetails
