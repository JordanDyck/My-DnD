import {useState} from "react"
import {TbArrowBack} from "react-icons/tb"

import {setLocalStorage} from "./utilities"
const ImportCharacter = ({setCharacterDetails, setShowCreator}) => {
  const [importData, setImportData] = useState({})
  const [error, setError] = useState(false)

  // check if character name is already in use
  const checkStoredNames = (nameToCheck) => {
    if (Object.keys(localStorage).filter((storedName) => storedName === nameToCheck).length) {
      return true
    } else return false
  }
  const handleForm = (e) => {
    e.preventDefault()
    try {
      setImportData(JSON.parse(e.target.value))
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const saveImport = () => {
    // if no errors, saves pasted JSON data to local storage
    const objNamesToCheck = [
      "classDetails",
      "subClass",
      "levels",
      "currentLevel",
      "gear",
      "spells",
      "stats",
      "inventory",
      "health",
      "race",
      "subRace",
    ]
    if (
      checkStoredNames(importData?.characterName) === true ||
      objNamesToCheck.every((key) => Object.keys(importData).includes(key)) === false
      // check if JSON data has all the correct key names so you cant just put whatever you want in there.
    ) {
      setError(true)
    } else {
      setError(false)
      setLocalStorage(importData.characterName, importData)
      setCharacterDetails((prev) => ({
        ...prev,
        import: false,
      }))
      setShowCreator((prev) => ({
        ...prev,
        creator: false,
      }))
    }
  }
  return (
    <div className="import-container">
      <div className="import-header">
        <header>paste character data</header>
        <button
          onClick={() =>
            setCharacterDetails((prev) => ({
              ...prev,
              import: false,
            }))
          }
        >
          <TbArrowBack />
        </button>
      </div>
      {error ? <span>{`{ Error: data not valid }`}</span> : ""}
      <form className="import-form" onChange={handleForm} spellCheck={false}>
        <textarea className="import-area"></textarea>
        <button type="button" disabled={error} onClick={() => saveImport()}>
          import
        </button>
      </form>
    </div>
  )
}
export default ImportCharacter
