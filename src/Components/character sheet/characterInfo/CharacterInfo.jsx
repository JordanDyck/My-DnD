import {useSelector} from "react-redux"
import CharacterFeatures from "./CharacterFeatures"
import {useState} from "react"
import CharacterSpells from "./CharacterSpells"

const CharacterInfo = () => {
  const character = useSelector((store) => store.character.value)
  const [tabs, setTabs] = useState({features: false, spells: false})
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
          disabled={!character?.classDetails?.spellcasting?.spell_save}
        >
          spells
        </button>
      </div>
      {tabs.features && <CharacterFeatures character={character} />}
      <div className="spell-wrapper">
        {tabs.spells && <CharacterSpells character={character} />}
      </div>
    </div>
  )
}
export default CharacterInfo
