import "../../../styles/CharacterInfo.scss"
import {useSelector} from "react-redux"

import CharacterFeatures from "./CharacterFeatures"
import {useState} from "react"
import CharacterSpells from "./CharacterSpells"
import CharacterOverview from "./CharacterOverview"
import EditCharacter from "./EditCharacter"
import Notes from "./Notes"

const CharacterInfo = ({showInfo}) => {
  const character = useSelector((store) => store.character.value)
  const [tabs, setTabs] = useState({
    features: false,
    spells: false,
    editor: false,
    notes: false,
  })
  const areAllTabsFalse = () => {
    return !tabs.features && !tabs.spells && !tabs.editor && !tabs.notes
  }

  return (
    <div
      className={
        showInfo
          ? "character-info-wrapper visible"
          : "character-info-wrapper hidden"
      }
    >
      <header className="tab-header">Character info</header>
      <div className="character-tabs">
        <button
          style={{borderColor: tabs.features ? "#00ff00c9" : "#a7a7a7"}}
          onClick={() =>
            setTabs((prev) => ({
              ...prev,
              features: !prev.features,
              spells: false,
              editor: false,
              notes: false,
            }))
          }
        >
          features
        </button>
        <button
          style={{borderColor: tabs.spells ? "#00ff00c9" : "#a7a7a7"}}
          onClick={() =>
            setTabs((prev) => ({
              ...prev,
              spells: !prev.spells,
              features: false,
              editor: false,
              notes: false,
            }))
          }
          disabled={
            !character?.classDetails?.spellcasting?.spell_save ||
            !Object.keys(character.classDetails.spellcasting.spell_save)[0]
          }
        >
          spells
        </button>
        <button
          style={{borderColor: tabs.editor ? "#00ff00c9" : "#a7a7a7"}}
          onClick={() =>
            setTabs((prev) => ({
              ...prev,
              editor: !prev.editor,
              features: false,
              spells: false,
              notes: false,
            }))
          }
        >
          editor
        </button>
        <button
          style={{borderColor: tabs.notes ? "#00ff00c9" : "#a7a7a7"}}
          onClick={() =>
            setTabs((prev) => ({
              ...prev,
              notes: !prev.notes,
              editor: false,
              features: false,
              spells: false,
            }))
          }
        >
          notes
        </button>
      </div>
      {areAllTabsFalse() && <CharacterOverview character={character} />}
      {tabs.features && <CharacterFeatures character={character} />}
      {tabs.editor && <EditCharacter character={character} />}
      {tabs.spells && <CharacterSpells character={character} />}
      {tabs.notes && <Notes character={character} />}
    </div>
  )
}
export default CharacterInfo
