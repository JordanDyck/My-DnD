import {useState} from "react"
import ClassDetails from "./ClassDetails"
import CharacterCreator from "./CharacterCreator"

const CharacterDetails = () => {
  const [details, setDetails] = useState()
  return (
    <div className="character-info-container">
      <CharacterCreator />
    </div>
  )
}
export default CharacterDetails
