import ClassDetails from "./ClassDetails"
import CharacterCreator from "./CharacterCreator"

const CharacterDetails = () => {
  return (
    <div className="character-info-container">
      <CharacterCreator />
      <div className="name-container">
        <label htmlFor="name">Name:</label>
        <input id="name" />
        <label id="lvl-label" htmlFor="level">
          Lvl:
        </label>
        <input type="number" id="level" defaultValue={1} />
        <div className="class-details-container">
          <ClassDetails />
        </div>
      </div>
    </div>
  )
}
export default CharacterDetails
