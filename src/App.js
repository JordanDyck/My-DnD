import "./App.scss"
import {useState} from "react"
import {useSelector} from "react-redux"

import CharacterDetails from "./Components/character sheet/CharacterDetails"
import BaseStats from "./Components/character sheet/BaseStats"
import ProfStats from "./Components/character sheet/ProfStats"
import Inventory from "./Components/character sheet/Inventory"
import Gear from "./Components/Gear"
import ItemsTab from "./Components/ItemsTab"
import CharacterCreator from "./Components/character sheet/CharacterCreator"
import CharacterSelecter from "./Components/character sheet/CharacterSelecter"
import DeletePopUp from "./Components/DeletePopUp"
import SpellTab from "./Components/SpellTab"
function App() {
  const [tabs, setTabs] = useState({
    stats: false,
    gear: false,
    items: false,
    spells: false,
    creator: false,
  })

  const [deleteCharacterComponent, setDeleteCharacterComponent] =
    useState(false)

  const character = useSelector((store) => store.character.value)

  return (
    <div className="App">
      {!tabs.creator && (
        <CharacterSelecter
          setShowCreator={setTabs}
          deleteCharacter={setDeleteCharacterComponent}
        />
      )}

      {!tabs.creator && character && (
        <CharacterDetails showSkillsTab={setTabs} />
      )}
      {tabs.creator && (
        <div className="character-info-container">
          <CharacterCreator setShowCreator={setTabs} />
        </div>
      )}
      {deleteCharacterComponent && (
        <div className="delete-character-wrapper">
          <DeletePopUp showDeleteComponent={setDeleteCharacterComponent} />
        </div>
      )}
      {character && !tabs.creator && (
        <div className="category-tabs">
          <button
            className="category-btn"
            onClick={() =>
              setTabs((prev) => ({
                ...prev,
                gear: !prev.gear,
              }))
            }
          >
            Equipped
          </button>
          <button
            className="category-btn"
            onClick={() =>
              setTabs((prev) => ({
                ...prev,
                items: !prev.items,
              }))
            }
          >
            Item List
          </button>
          <button
            className="category-btn"
            onClick={() =>
              setTabs((prev) => ({
                ...prev,
                spells: !prev.spells,
              }))
            }
          >
            Spell List
          </button>
        </div>
      )}

      {tabs.items && <ItemsTab type={"items-tab"} setShowItemTab={setTabs} />}

      {tabs.spells && <SpellTab setShowSpellTab={setTabs} />}

      {tabs.stats && <ProfStats setShowStats={setTabs} />}

      {tabs.gear && <Gear />}

      {character && !tabs.creator && <BaseStats />}
      {character && !tabs.creator && <Inventory />}
    </div>
  )
}

export default App
