import {useSelector} from "react-redux"
import CharacterFeatures from "./CharacterFeatures"
import {useState} from "react"
import CharacterSpells from "./CharacterSpells"
import CharacterOverview from "./CharacterOverview"

const CharacterInfo = () => {
  const character = useSelector((store) => store.character.value)
  const [tabs, setTabs] = useState({features: false, spells: false})
  const areAllTabsFalse = () => {
    return !tabs.features && !tabs.spells
  }

  return (
    <div className="character-info-wrapper">
      <header className="tab-header">Character info</header>
      <div className="character-tabs">
        <button
          style={{borderColor: tabs.features ? "#00ff00c9" : "#a7a7a7"}}
          onClick={() =>
            setTabs((prev) => ({
              ...prev,
              features: !prev.features,
              spells: false,
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
            }))
          }
          disabled={
            !character?.classDetails?.spellcasting?.spell_save ||
            !Object.keys(character.classDetails.spellcasting.spell_save)[0]
          }
        >
          spells
        </button>
      </div>
      {areAllTabsFalse() && <CharacterOverview character={character} />}
      {tabs.features && <CharacterFeatures character={character} />}

      {tabs.spells && <CharacterSpells character={character} />}
    </div>
  )
}
export default CharacterInfo
